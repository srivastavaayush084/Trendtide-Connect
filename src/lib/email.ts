import { createServerFn } from "@tanstack/react-start";
import nodemailer from "nodemailer";
import { z } from "zod";
import { getServerConfig } from "./config.server";

// Interfaces
export interface CampaignData {
  brandName: string;
  website: string;
  industry: string;
  contact: string;
  email: string;
  phone: string;
  objective: string;
  budget: string;
  platforms: string[];
  categories: string[];
  languages: string[];
  state: string;
  place: string;
}

export interface ContactData {
  name: string;
  email: string;
  message: string;
}

// Schemas for server validation
const campaignDataSchema = z.object({
  brandName: z.string(),
  website: z.string(),
  industry: z.string(),
  contact: z.string(),
  email: z.string().email(),
  phone: z.string(),
  objective: z.string(),
  budget: z.string(),
  platforms: z.array(z.string()),
  categories: z.array(z.string()),
  languages: z.array(z.string()),
  state: z.string(),
  place: z.string(),
});

const contactDataSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

const transportsCache: Record<number, nodemailer.Transporter> = {};

// Helper: Get nodemailer transport for specific port
function getMailTransport(port: number) {
  const config = getServerConfig();

  if (!config.smtpUser || !config.smtpPass) {
    console.error("[SMTP ERROR] Missing SMTP_USER or SMTP_PASS environment variables.");
    throw new Error(
      "SMTP credentials are not configured in environment variables.",
    );
  }

  if (!transportsCache[port]) {
    const isSecure = port === 465;
    transportsCache[port] = nodemailer.createTransport({
      host: config.smtpHost || "smtp.hostinger.com",
      port: port,
      secure: isSecure,
      requireTLS: !isSecure,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass,
      },
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
      dnsTimeout: 10000,
      tls: {
        rejectUnauthorized: false, // Prevents self-signed or proxy SSL handshake errors
      },
    });
  }

  return transportsCache[port];
}

async function sendMailWithResend(mailOptions: {
  from?: string;
  to: string;
  subject: string;
  html: string;
}) {
  const config = getServerConfig();
  const apiKey = config.resendApiKey?.trim();

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured or empty.");
  }

  // Clean and sanitize sender address
  let rawFrom = (process.env.RESEND_FROM_EMAIL || config.smtpFromEmail || "").trim();
  rawFrom = rawFrom.replace(/^["']|["']$/g, "").trim();

  let fromAddress = `"TrendTide Connect" <onboarding@resend.dev>`;
  if (rawFrom && !rawFrom.includes("yourdomain.com")) {
    if (rawFrom.includes("<") && rawFrom.includes(">")) {
      fromAddress = rawFrom;
    } else if (rawFrom.includes("@")) {
      const senderName = (config.smtpFromName || "TrendTide Connect").replace(/["']/g, "");
      fromAddress = `${senderName} <${rawFrom}>`;
    }
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [mailOptions.to],
      subject: mailOptions.subject,
      html: mailOptions.html,
    }),
  });

  const resData = await response.json();

  if (!response.ok) {
    console.error("[RESEND ERROR]", response.status, resData);
    throw new Error(
      resData?.message || resData?.name || `Resend API error (${response.status})`,
    );
  }

  console.log(
    `[RESEND SUCCESS] Message sent to ${mailOptions.to}. ID: ${resData?.id}`,
  );
  return resData;
}

async function sendMailWithLogging(mailOptions: {
  from?: string;
  to: string;
  subject: string;
  html: string;
}) {
  const config = getServerConfig();

  // If RESEND_API_KEY is present, use Resend HTTP API (Bypasses Render Free SMTP port block)
  if (config.resendApiKey) {
    return sendMailWithResend(mailOptions);
  }

  // Fallback to Nodemailer SMTP
  const primaryPort = config.smtpPort || 587;

  try {
    const transport = getMailTransport(primaryPort);
    const info = await transport.sendMail(mailOptions);
    console.log(
      `[SMTP SUCCESS] Message sent to ${mailOptions.to} via port ${primaryPort}. MessageId: ${info.messageId}`,
    );
    return info;
  } catch (err: any) {
    console.warn(
      `[SMTP WARNING] Primary port ${primaryPort} failed (${err?.message || err}). Trying fallback port...`,
    );
    const fallbackPort = primaryPort === 465 ? 587 : 465;
    try {
      const fallbackTransport = getMailTransport(fallbackPort);
      const info = await fallbackTransport.sendMail(mailOptions);
      console.log(
        `[SMTP SUCCESS] Message sent via fallback port ${fallbackPort}. MessageId: ${info.messageId}`,
      );
      return info;
    } catch (fallbackErr: any) {
      console.error(
        `[SMTP ERROR] Both primary (${primaryPort}) and fallback (${fallbackPort}) failed for ${mailOptions.to}:`,
        fallbackErr?.message || fallbackErr,
      );
      throw fallbackErr;
    }
  }
}

export const sendAdminNotification = createServerFn({ method: "POST" })
  .validator(campaignDataSchema)
  .handler(async ({ data }) => {
    const config = getServerConfig();
    const adminTarget = config.adminEmail || config.smtpUser;

    const mailOptions = {
      from: `"${config.smtpFromName}" <${config.smtpFromEmail || config.smtpUser}>`,
      to: adminTarget,
      subject: `New Campaign Brief from ${data.brandName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #2563EB; border-bottom: 2px solid #2563EB; padding-bottom: 10px;">New Campaign Brief Received</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 150px;">Brand Name:</td><td>${data.brandName}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Website:</td><td><a href="${data.website}" target="_blank">${data.website}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Industry:</td><td>${data.industry}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Contact Person:</td><td>${data.contact}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td>${data.phone}</td></tr>
            <tr style="border-top: 1px solid #eee;"><td colspan="2" style="padding: 10px 0;"></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Objective:</td><td>${data.objective}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Budget:</td><td>${data.budget}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Platforms:</td><td>${data.platforms.join(", ") || "—"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Categories:</td><td>${data.categories.join(", ") || "—"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Languages:</td><td>${data.languages.join(", ") || "—"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">State:</td><td>${data.state || "—"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Place:</td><td>${data.place || "—"}</td></tr>
          </table>
        </div>
      `,
    };

    return sendMailWithLogging(mailOptions);
  });

export const sendBrandConfirmation = createServerFn({ method: "POST" })
  .validator(campaignDataSchema)
  .handler(async ({ data }) => {
    const config = getServerConfig();
    const mailOptions = {
      from: `"${config.smtpFromName}" <${config.smtpFromEmail || config.smtpUser}>`,
      to: data.email,
      subject: `Campaign briefing received — TrendTide Connect`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #2563EB;">Hi ${data.contact},</h2>
          <p>Thank you for submitting your campaign brief on TrendTide Connect!</p>
          <p>Our team is already reviewing your requirements. We will analyze our database of 50,000+ verified creators to match you with the best fits.</p>
          
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Brief Summary:</h3>
            <ul style="padding-left: 20px; color: #4b5563;">
              <li><strong>Brand:</strong> ${data.brandName}</li>
              <li><strong>Objective:</strong> ${data.objective}</li>
              <li><strong>Budget:</strong> ${data.budget}</li>
              <li><strong>Platforms:</strong> ${data.platforms.join(", ") || "—"}</li>
            </ul>
          </div>
          
          <p>A campaign manager will reach out to you within <strong>24 hours</strong> with creator recommendations and a tailored execution roadmap.</p>
          <p>If you have any questions in the meantime, feel free to reply directly to this email.</p>
          
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #9ca3af;">Best regards,<br/>The TrendTide Connect Team</p>
        </div>
      `,
    };

    return sendMailWithLogging(mailOptions);
  });

export const sendContactEnquiry = createServerFn({ method: "POST" })
  .validator(contactDataSchema)
  .handler(async ({ data }) => {
    const config = getServerConfig();
    const adminTarget = config.adminEmail || config.smtpUser;
    const mailOptions = {
      from: `"${config.smtpFromName}" <${config.smtpFromEmail || config.smtpUser}>`,
      to: adminTarget,
      subject: `New Contact Us Message from ${data.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #7C3AED; border-bottom: 2px solid #7C3AED; padding-bottom: 10px;">New Contact Enquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 120px;">Sender Name:</td><td>${data.name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message:</td><td style="white-space: pre-wrap;">${data.message}</td></tr>
          </table>
        </div>
      `,
    };

    return sendMailWithLogging(mailOptions);
  });
