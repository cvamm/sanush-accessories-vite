import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, Check, Copy, Loader2, Lock, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { InstagramIcon } from "@/components/BrandIcons";
import type { CartLine } from "@/components/CartDrawer";
import { openRazorpayCheckout } from "@/lib/razorpay";
import {
  BRAND_NAME,
  formatINR,
  FREE_SHIPPING_AT,
  INSTAGRAM_URL,
  PAYMENT_NOTE,
  RAZORPAY_KEY_ID,
  SHIPPING_FEE,
} from "@/data/site";

type CheckoutModalProps = {
  open: boolean;
  items: CartLine[];
  onClose: () => void;
  onPaid: (paymentId: string) => void;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  notes: "",
};

const FIELDS: {
  key: keyof FormState;
  label: string;
  type?: string;
  wide?: boolean;
  optional?: boolean;
  placeholder?: string;
}[] = [
  { key: "name", label: "Full name", placeholder: "Manvi Shukla" },
  { key: "email", label: "Email", type: "email", placeholder: "you@email.com" },
  { key: "phone", label: "Mobile number", type: "tel", placeholder: "10-digit number" },
  { key: "address", label: "Shipping address", wide: true, placeholder: "Flat, street, landmark" },
  { key: "city", label: "City", placeholder: "Noida" },
  { key: "state", label: "State", placeholder: "Uttar Pradesh" },
  { key: "pincode", label: "Pincode", type: "tel", placeholder: "6-digit pincode" },
  { key: "notes", label: "Note for us (optional)", wide: true, optional: true, placeholder: "Gift wrap, sizing, delivery day…" },
];

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (form.name.trim().length < 3) errors.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) errors.email = "Enter a valid email address.";
  if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, ""))) errors.phone = "Enter a 10-digit Indian mobile number.";
  if (form.address.trim().length < 8) errors.address = "Add a complete street address.";
  if (form.city.trim().length < 2) errors.city = "Add your city.";
  if (form.state.trim().length < 2) errors.state = "Add your state.";
  if (!/^\d{6}$/.test(form.pincode.trim())) errors.pincode = "Enter a 6-digit pincode.";
  return errors;
}

export default function CheckoutModal({ open, items, onClose, onPaid }: CheckoutModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const [paidId, setPaidId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const subtotal = useMemo(
    () => items.reduce((sum, line) => sum + line.product.price * line.qty, 0),
    [items]
  );
  const shipping = subtotal >= FREE_SHIPPING_AT || subtotal === 0 ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const orderSummary = () => {
    const lines = items.map(
      (line) => `• ${line.product.name} × ${line.qty} — ${formatINR(line.product.price * line.qty)}`
    );
    return [
      `${BRAND_NAME} order`,
      ...lines,
      `Subtotal: ${formatINR(subtotal)}`,
      `Shipping: ${shipping === 0 ? "Free" : formatINR(shipping)}`,
      `Total paid: ${formatINR(total)}`,
      paidId ? `Razorpay payment ID: ${paidId}` : "",
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Address: ${form.address}, ${form.city}, ${form.state} — ${form.pincode}`,
      form.notes.trim() ? `Note: ${form.notes.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  };

  const pay = async () => {
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!RAZORPAY_KEY_ID.startsWith("rzp_") || RAZORPAY_KEY_ID.includes("REPLACE")) {
      setFailure(
        "Razorpay is not connected yet. Add your test key id in src/data/site.ts (RAZORPAY_KEY_ID), then build again."
      );
      return;
    }

    setBusy(true);
    setFailure(null);
    try {
      await openRazorpayCheckout({
        key: RAZORPAY_KEY_ID,
        amount: total * 100,
        currency: "INR",
        name: BRAND_NAME,
        description: `${items.reduce((n, line) => n + line.qty, 0)} piece(s) · ${formatINR(total)}`,
        notes: {
          pincode: form.pincode.trim(),
          city: form.city.trim(),
          phone: form.phone.replace(/\D/g, ""),
          order_items: items
            .map((line) => `${line.product.name} x${line.qty}`)
            .join(", "),
        },
        prefill: {
          name: form.name.trim(),
          email: form.email.trim(),
          contact: form.phone.replace(/\D/g, ""),
        },
        theme: { color: "#9c7941" },
        handler: (response) => {
          setBusy(false);
          setPaidId(response.razorpay_payment_id);
          onPaid(response.razorpay_payment_id);
        },
        modal: {
          ondismiss: () => {
            setBusy(false);
            setFailure("Payment window closed. Your bag is still saved — you can pay whenever you're ready.");
          },
        },
      });
    } catch (error) {
      setBusy(false);
      setFailure(error instanceof Error ? error.message : "Payment could not be started. Please try again.");
    }
  };

  const field = (key: keyof FormState) => ({
    id: `checkout-${key}`,
    name: key,
    value: form[key],
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [key]: event.target.value }));
      setErrors((current) => ({ ...current, [key]: undefined }));
      setFailure(null);
    },
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[85] flex items-end justify-center bg-ink/55 backdrop-blur-[3px] p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label="Checkout"
          onClick={onClose}
        >
          <motion.div
            className="relative flex max-h-[94svh] w-full max-w-3xl flex-col overflow-hidden rounded-t-sm bg-ivory sm:max-h-[92svh] sm:rounded-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close checkout"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 text-ink shadow-sm backdrop-blur-sm transition-colors hover:bg-sand"
            >
              <X className="h-4 w-4" strokeWidth={1.4} />
            </button>

            {paidId ? (
              <div className="flex flex-col items-center px-6 py-12 text-center sm:py-16">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Check className="h-7 w-7" strokeWidth={1.6} />
                </span>
                <h2 className="mt-6 font-serif text-[clamp(1.8rem,4vw,2.6rem)] leading-tight text-ink">
                  Paid. Now it&apos;s on its way.
                </h2>
                <p className="mt-3 max-w-[42ch] text-[12.5px] font-light leading-relaxed text-muted">
                  Thank you, {form.name.trim().split(" ")[0]}. We&apos;ve logged your payment and will
                  pack your pieces by hand. Tracking reaches you as soon as the parcel ships.
                </p>

                <dl className="mt-7 w-full max-w-md space-y-2.5 rounded-sm border border-line bg-cream/60 p-4 text-left">
                  <div className="flex justify-between gap-4">
                    <dt className="text-[10px] uppercase tracking-[0.16em] text-muted">Amount paid</dt>
                    <dd className="text-[13px] font-medium tabular-nums text-ink">{formatINR(total)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[10px] uppercase tracking-[0.16em] text-muted">Payment ID</dt>
                    <dd className="truncate font-mono text-[11px] text-ink/80">{paidId}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[10px] uppercase tracking-[0.16em] text-muted">Delivering to</dt>
                    <dd className="max-w-[55%] text-right text-[11px] font-light text-ink/80">
                      {form.city.trim()}, {form.state.trim()} — {form.pincode.trim()}
                    </dd>
                  </div>
                </dl>

                <button
                  type="button"
                  onClick={async () => {
                    await navigator.clipboard.writeText(orderSummary());
                    setCopied(true);
                  }}
                  className="btn btn-outline mt-6"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Order details copied" : "Copy order details"}
                </button>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.16em] text-ink/50 transition-colors hover:text-gold"
                >
                  <InstagramIcon className="h-3 w-3" /> Send a copy to us on Instagram
                </a>
              </div>
            ) : (
              <>
                <div className="border-b border-line px-5 py-4 md:px-7">
                  <span className="label text-gold">Secure checkout</span>
                  <h2 className="mt-2 font-serif text-[clamp(1.5rem,3.4vw,2.2rem)] leading-none text-ink">
                    Where should your gold go?
                  </h2>
                </div>

                <div className="grid flex-1 gap-6 overflow-y-auto px-5 py-5 md:grid-cols-[1.25fr_0.75fr] md:px-7 md:py-6">
                  <div>
                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                      {FIELDS.map((item) => (
                        <div key={item.key} className={item.wide ? "sm:col-span-2" : undefined}>
                          <label
                            htmlFor={`checkout-${item.key}`}
                            className="label block text-[7.5px] text-muted"
                          >
                            {item.label}
                          </label>
                          <input
                            {...field(item.key)}
                            type={item.type ?? "text"}
                            placeholder={item.placeholder}
                            inputMode={item.type === "tel" ? "numeric" : undefined}
                            autoComplete={
                              item.key === "name"
                                ? "name"
                                : item.key === "email"
                                  ? "email"
                                  : item.key === "phone"
                                    ? "tel"
                                    : undefined
                            }
                            className={`mt-1.5 w-full rounded-sm border bg-cream/50 px-3.5 py-2.5 text-[12.5px] font-light text-ink placeholder:text-muted/55 focus:bg-ivory focus:outline-none ${
                              errors[item.key] ? "border-red-400" : "border-line focus:border-gold"
                            }`}
                          />
                          {errors[item.key] && (
                            <p className="mt-1 flex items-center gap-1 text-[9.5px] text-red-500">
                              <AlertCircle className="h-3 w-3" strokeWidth={1.6} />
                              {errors[item.key]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    <p className="mt-4 text-[9.5px] font-light leading-relaxed text-muted">
                      {PAYMENT_NOTE}
                    </p>
                  </div>

                  <aside className="h-fit rounded-sm border border-line bg-cream/60 p-4">
                    <h3 className="label text-[7.5px] text-muted">Order summary</h3>
                    <ul className="mt-3 space-y-2.5">
                      {items.map((line) => (
                        <li key={line.product.id} className="flex items-start justify-between gap-3">
                          <span className="min-w-0 text-[11px] font-light leading-snug text-ink/80">
                            {line.product.name}
                            <span className="block text-[9px] uppercase tracking-[0.14em] text-muted">
                              Qty {line.qty}
                            </span>
                          </span>
                          <span className="shrink-0 text-[11px] tabular-nums text-ink">
                            {formatINR(line.product.price * line.qty)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <dl className="mt-4 space-y-1.5 border-t border-line pt-3">
                      <div className="flex justify-between text-[11px] font-light text-muted">
                        <dt>Subtotal</dt>
                        <dd className="tabular-nums">{formatINR(subtotal)}</dd>
                      </div>
                      <div className="flex justify-between text-[11px] font-light text-muted">
                        <dt>Shipping</dt>
                        <dd className="tabular-nums">
                          {shipping === 0 ? "Free" : formatINR(shipping)}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between border-t border-line pt-2">
                        <dt className="label text-[7.5px] text-ink/70">Payable now</dt>
                        <dd className="font-serif text-xl text-ink">{formatINR(total)}</dd>
                      </div>
                    </dl>
                  </aside>
                </div>

                <div className="border-t border-line bg-ivory px-5 py-4 md:px-7">
                  {failure && (
                    <p className="mb-3 flex items-start gap-2 rounded-sm bg-sand/60 px-3 py-2.5 text-[10.5px] font-light leading-relaxed text-ink/80">
                      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.6} />
                      {failure}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={pay}
                    disabled={busy || items.length === 0}
                    className="btn btn-dark w-full disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {busy ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Lock className="h-3.5 w-3.5" strokeWidth={1.6} />
                    )}
                    Pay {formatINR(total)} with Razorpay
                  </button>
                  <p className="mt-2.5 text-center text-[9px] font-light tracking-[0.04em] text-muted">
                    Cards, UPI, netbanking & wallets · payments open in Razorpay&apos;s secure window
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
