import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { sendContactEnquiry } from "@/lib/email";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — TrendTide Connect" },
      {
        name: "description",
        content:
          "Get in touch with TrendTide Connect — partnerships, support and press.",
      },
      { property: "og:title", content: "Contact — TrendTide Connect" },
      {
        property: "og:description",
        content:
          "Contact TrendTide Connect for partnerships, support and press enquiries.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState({ name: "", email: "", message: "" });

  const update = (k: keyof typeof data, v: string) =>
    setData((d) => ({ ...d, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.message) {
      toast.error("Please fill in all the fields.");
      return;
    }
    setSubmitting(true);
    try {
      await sendContactEnquiry({ data });
      toast.success("Thank you! Your message has been sent successfully.");
      setData({ name: "", email: "", message: "" });
    } catch (err: any) {
      console.error("Failed to send contact enquiry:", err);
      toast.error(
        err?.message || "Failed to send your message. Please try again later.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-3xl font-bold">Contact Us</h1>
          <p className="text-muted-foreground">
            Have a question or want to partner with us? Fill the form or reach
            out directly.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-border/60 p-6 bg-card">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  name="name"
                  value={data.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Your name"
                  disabled={submitting}
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@company.com"
                  disabled={submitting}
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={data.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Tell us about your enquiry"
                  disabled={submitting}
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-95"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
                <span className="text-sm text-muted-foreground">
                  We'll reply within 2 business days.
                </span>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-border/60 p-6 bg-card">
              <h3 className="mb-2 text-lg font-semibold">General enquiries</h3>
              <p className="text-muted-foreground">info@trendtideconnect.com</p>
            </div>

            <div className="rounded-lg border border-border/60 p-6 bg-card">
              <h3 className="mb-2 text-lg font-semibold">Head office</h3>
              <p className="text-muted-foreground">
                Azamgarh, Uttar Pradesh, India
              </p>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

export default Contact;
