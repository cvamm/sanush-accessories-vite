const RAZORPAY_SRC = "https://checkout.razorpay.com/v1/checkout.js";

export type RazorpaySuccess = {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
};

export type RazorpayOptions = {
  key: string;
  amount: number;
  currency: "INR";
  name: string;
  description: string;
  notes?: Record<string, string>;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  handler: (response: RazorpaySuccess) => void;
  modal: { ondismiss: (reason?: unknown) => void };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

let loading: Promise<NonNullable<Window["Razorpay"]>> | null = null;

export function loadRazorpay() {
  if (window.Razorpay) return Promise.resolve(window.Razorpay);
  if (loading) return loading;

  loading = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = RAZORPAY_SRC;
    script.async = true;
    script.onload = () => {
      if (window.Razorpay) resolve(window.Razorpay);
      else reject(new Error("Razorpay loaded but is unavailable in this browser."));
    };
    script.onerror = () => {
      loading = null;
      script.remove();
      reject(new Error("Could not reach Razorpay. Check your connection and try again."));
    };
    document.head.appendChild(script);
  });

  return loading;
}

export async function openRazorpayCheckout(options: RazorpayOptions) {
  const Razorpay = await loadRazorpay();
  new Razorpay(options).open();
}
