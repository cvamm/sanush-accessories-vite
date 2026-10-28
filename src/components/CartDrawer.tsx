import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Lock, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useEffect } from "react";
import { asset } from "@/utils/asset";
import {
  formatINR,
  FREE_SHIPPING_AT,
  PAYMENT_NOTE,
  SHIPPING_FEE,
  type PricedProduct,
} from "@/data/site";

export type CartLine = { product: PricedProduct; qty: number };

type CartDrawerProps = {
  open: boolean;
  items: CartLine[];
  onClose: () => void;
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
};

export default function CartDrawer({
  open,
  items,
  onClose,
  onUpdateQty,
  onRemove,
  onCheckout,
}: CartDrawerProps) {
  const subtotal = items.reduce((sum, line) => sum + line.product.price * line.qty, 0);
  const remaining = Math.max(0, FREE_SHIPPING_AT - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_FEE;

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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label="Shopping bag"
        >
          <div className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]" onClick={onClose} />

          <motion.aside
            className="drawer-shadow relative flex h-full w-full max-w-[26.5rem] flex-col bg-ivory"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-4 w-4 text-ink" strokeWidth={1.4} />
                <h2 className="font-serif text-xl text-ink">
                  Your bag{" "}
                  <span className="font-sans text-[10px] align-middle tracking-[0.15em] text-muted">
                    ({items.reduce((sum, line) => sum + line.qty, 0)})
                  </span>
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close bag"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-sand hover:text-ink"
              >
                <X className="h-4.5 w-4.5" strokeWidth={1.4} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-line">
                  <ShoppingBag className="h-6 w-6 text-gold" strokeWidth={1.2} />
                </span>
                <h3 className="font-serif text-2xl text-ink">Your bag is still dreaming.</h3>
                <p className="mt-2 max-w-[30ch] text-xs font-light leading-relaxed text-muted">
                  A little gold goes a long way. Start with the jhumkas everyone
                  asks about, or a bracelet you&apos;ll forget you&apos;re wearing.
                </p>
                <a href="#shop" onClick={onClose} className="btn btn-dark mt-6">
                  Shop the edit
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                </a>
              </div>
            ) : (
              <>
                <div className="border-b border-line/70 bg-sand/40 px-5 py-3">
                  <p className="text-[10px] font-light tracking-[0.04em] text-ink/75">
                    {remaining > 0 ? (
                      <>
                        You&apos;re <span className="font-medium">{formatINR(remaining)}</span> away from
                        complimentary shipping.
                      </>
                    ) : (
                      <>Complimentary shipping unlocked — little luxuries, on us. ✦</>
                    )}
                  </p>
                  <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-ink/10">
                    <div
                      className="h-full rounded-full bg-gold transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-5">
                  <ul className="divide-y divide-line/70">
                    {items.map(({ product, qty }) => (
                      <li key={product.id} className="flex gap-4 py-5">
                        <a
                          href="#shop"
                          onClick={onClose}
                          className="block h-[7.5rem] w-24 shrink-0 overflow-hidden rounded-sm bg-sand"
                        >
                          <img
                            src={asset(product.image)}
                            alt={product.alt}
                            className="h-full w-full object-cover"
                          />
                        </a>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-serif text-[17px] leading-tight text-ink">
                                {product.name}
                              </h3>
                              <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-muted">
                                {product.category} · 18k gold plated
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => onRemove(product.id)}
                              aria-label={`Remove ${product.name}`}
                              className="text-ink/35 transition-colors hover:text-ink"
                            >
                              <X className="h-3.5 w-3.5" strokeWidth={1.5} />
                            </button>
                          </div>
                          <div className="mt-auto flex items-end justify-between gap-2 pt-3">
                            <div className="flex items-center rounded-full border border-line">
                              <button
                                type="button"
                                onClick={() => onUpdateQty(product.id, -1)}
                                aria-label="Decrease quantity"
                                className="flex h-7 w-7 items-center justify-center text-ink/60 hover:text-ink"
                              >
                                <Minus className="h-3 w-3" strokeWidth={1.6} />
                              </button>
                              <span className="w-6 text-center text-[11px] tabular-nums">{qty}</span>
                              <button
                                type="button"
                                onClick={() => onUpdateQty(product.id, 1)}
                                aria-label="Increase quantity"
                                className="flex h-7 w-7 items-center justify-center text-ink/60 hover:text-ink"
                              >
                                <Plus className="h-3 w-3" strokeWidth={1.6} />
                              </button>
                            </div>
                            <span className="text-xs font-medium tabular-nums text-ink">
                              {formatINR(product.price * qty)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mb-6 flex items-start gap-2.5 rounded-sm bg-sand/50 p-3">
                    <span className="mt-0.5 text-gold">✦</span>
                    <p className="text-[10px] font-light leading-relaxed text-ink/70">
                      Every order arrives in our signature gift-ready pouch. Leave a
                      note at checkout and we&apos;ll pack it in.
                    </p>
                  </div>
                </div>

                <div className="border-t border-line bg-ivory px-5 pb-5 pt-4">
                  <div className="flex items-baseline justify-between">
                    <span className="label text-[9px] text-ink/60">Subtotal</span>
                    <span className="font-serif text-2xl text-ink">{formatINR(subtotal)}</span>
                  </div>
                  <div className="mt-1.5 flex items-baseline justify-between">
                    <span className="text-[10px] font-light text-muted">Shipping</span>
                    <span className="text-[11px] font-light tabular-nums text-ink/75">
                      {shipping === 0 ? "Free" : formatINR(shipping)}
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between border-t border-line/70 pt-2">
                    <span className="label text-[9px] text-ink/60">Total</span>
                    <span className="font-serif text-xl text-ink">{formatINR(subtotal + shipping)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={onCheckout}
                    className="btn btn-dark mt-4 w-full"
                  >
                    <Lock className="h-3.5 w-3.5" strokeWidth={1.6} />
                    Pay securely with Razorpay
                  </button>
                  <p className="mt-2.5 text-center text-[9px] font-light leading-relaxed text-muted">
                    {PAYMENT_NOTE}
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-3 w-full text-center text-[9px] uppercase tracking-[0.2em] text-ink/50 transition-colors hover:text-ink"
                  >
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
