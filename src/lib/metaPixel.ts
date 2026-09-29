/**
 * Meta Pixel Integration Utility for TrendTide Connect
 * Fully SSR-safe and compliant with TanStack Start / React architecture.
 */

declare global {
  interface Window {
    fbq?: {
      (...args: any[]): void;
      callMethod?: (...args: any[]) => void;
      queue?: any[];
      loaded?: boolean;
      version?: string;
      push?: (...args: any[]) => void;
    };
    _fbq?: any;
  }
}

// Set of standard Meta Pixel events
const STANDARD_EVENTS = new Set([
  "AddPaymentInfo",
  "AddToCart",
  "AddToWishlist",
  "CompleteRegistration",
  "Contact",
  "CustomizeProduct",
  "Donate",
  "FindLocation",
  "InitiateCheckout",
  "Lead",
  "PageView",
  "Purchase",
  "Schedule",
  "Search",
  "StartTrial",
  "SubmitApplication",
  "Subscribe",
  "ViewContent",
]);

let isInitialized = false;
let lastTrackedPath: string | null = null;

/**
 * Returns the configured Meta Pixel ID from Vite environment variables.
 * Safe to call on both server and client.
 */
export function getMetaPixelId(): string | undefined {
  let pixelId: string | undefined;
  try {
    if (typeof import.meta !== "undefined" && import.meta.env) {
      pixelId = import.meta.env.VITE_META_PIXEL_ID;
    }
  } catch {
    // Ignore error in non-Vite environments
  }

  if (!pixelId && typeof process !== "undefined" && process.env) {
    pixelId = process.env.VITE_META_PIXEL_ID;
  }

  return pixelId;
}

/**
 * Initializes the Meta Pixel snippet once in the browser.
 * SSR-safe: does nothing when running on the server.
 * If VITE_META_PIXEL_ID is missing or empty, exits gracefully without errors.
 */
export function initMetaPixel(): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  if (isInitialized) {
    return true;
  }

  const pixelId = getMetaPixelId();
  if (!pixelId || typeof pixelId !== "string" || !pixelId.trim()) {
    return false;
  }

  const cleanPixelId = pixelId.trim();

  // Avoid inserting duplicate script if already present in DOM
  if (!window.fbq) {
    const fbq: any = function (...args: any[]) {
      if (fbq.callMethod) {
        fbq.callMethod.apply(fbq, args);
      } else {
        fbq.queue.push(args);
      }
    };
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq = fbq;

    const script = document.createElement("script");
    script.id = "meta-pixel-script";
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";

    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  }

  if (window.fbq) {
    window.fbq("init", cleanPixelId);
  }
  isInitialized = true;
  return true;
}

/**
 * Tracks a PageView event in Meta Pixel.
 * Ensures the event is not duplicated for the exact same route path.
 */
export function trackMetaPageView(path?: string): void {
  if (typeof window === "undefined") {
    return;
  }

  const currentPath = path || window.location.pathname;

  // On first client run, check if base script in HTML head already fired initial PageView
  if (lastTrackedPath === null) {
    lastTrackedPath = currentPath;
    isInitialized = true;
    const fbqFn = (window as any).fbq;
    if (!fbqFn) {
      const initialized = initMetaPixel();
      if (initialized && (window as any).fbq) {
        (window as any).fbq("track", "PageView");
      }
    }
    return;
  }

  // Prevent duplicate PageView events for the same path
  if (lastTrackedPath === currentPath) {
    return;
  }

  if (!isInitialized) {
    const initialized = initMetaPixel();
    if (!initialized) {
      return;
    }
  }

  if (window.fbq) {
    window.fbq("track", "PageView");
    lastTrackedPath = currentPath;
  }
}

/**
 * Tracks standard or custom Meta Pixel events.
 * Automatically chooses 'track' for standard Meta events and 'trackCustom' for custom events.
 */
export function trackMetaEvent(
  eventName: string,
  parameters?: Record<string, any>,
): void {
  if (typeof window === "undefined") {
    return;
  }

  if (!isInitialized) {
    const initialized = initMetaPixel();
    if (!initialized) {
      return;
    }
  }

  if (window.fbq) {
    const isStandard = STANDARD_EVENTS.has(eventName);
    const method = isStandard ? "track" : "trackCustom";

    if (parameters && Object.keys(parameters).length > 0) {
      window.fbq(method, eventName, parameters);
    } else {
      window.fbq(method, eventName);
    }
  }
}

/**
 * Tracks a custom Meta Pixel event explicitly with fbq('trackCustom').
 */
export function trackMetaCustomEvent(
  eventName: string,
  parameters?: Record<string, any>,
): void {
  trackMetaEvent(eventName, parameters);
}
