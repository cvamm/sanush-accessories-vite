import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { InstagramIcon } from "@/components/BrandIcons";
import CartDrawer, { type CartLine } from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import { FaqSection, Footer } from "@/components/FaqFooter";
import { InstagramSection, Newsletter } from "@/components/InstagramSection";
import CategoryRail from "@/components/CategoryRail";
import {
  PromiseSection,
  StorySection,
  ValueMarquee,
} from "@/components/BrandStory";
import ShopSection from "@/components/ShopSection";
import SiteHeader from "@/components/SiteHeader";
import PanoramicSpreadHero from "@/components/ui/panoramic-spread-hero";
import {
  INSTAGRAM_URL,
  isPriced,
  products,
  type PricedProduct,
  type Product,
} from "@/data/site";

type ToastState = { id: number; message: string };

const CART_KEY = "sanush:cart";

type StoredLine = { id: string; qty: number };

function loadCart(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const stored = JSON.parse(raw) as StoredLine[];
    return stored.reduce<CartLine[]>((lines, line) => {
      const product = products.find((item) => item.id === line.id);
      if (!product || !isPriced(product)) return lines;
      return [...lines, { product, qty: Math.min(9, Math.max(1, line.qty)) }];
    }, []);
  } catch {
    return [];
  }
}

export default function App() {
  const [cart, setCart] = useState<CartLine[]>(loadCart);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<ToastState | null>(null);

  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);

  useEffect(() => {
    const stored = cart.map<StoredLine>(({ product, qty }) => ({ id: product.id, qty }));
    window.localStorage.setItem(CART_KEY, JSON.stringify(stored));
  }, [cart]);

  const notify = useCallback((message: string) => {
    setToast({ id: Date.now(), message });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const addToCart = useCallback((product: PricedProduct, qty = 1) => {
    setCart((current) => {
      const existing = current.find((line) => line.product.id === product.id);
      if (existing) {
        return current.map((line) =>
          line.product.id === product.id
            ? { ...line, qty: Math.min(9, line.qty + qty) }
            : line
        );
      }
      return [...current, { product, qty }];
    });
    setCartOpen(true);
  }, []);

  const updateQty = useCallback((id: string, delta: number) => {
    setCart((current) =>
      current
        .map((line) =>
          line.product.id === id
            ? { ...line, qty: Math.min(9, Math.max(0, line.qty + delta)) }
            : line
        )
        .filter((line) => line.qty > 0)
    );
  }, []);

  const removeLine = useCallback((id: string) => {
    setCart((current) => current.filter((line) => line.product.id !== id));
  }, []);

  const toggleWishlist = useCallback(
    (product: Product) => {
      setWishlist((current) => {
        const saved = current.includes(product.id);
        notify(
          saved
            ? `${product.name} removed from your wishlist`
            : `${product.name} saved to your wishlist`
        );
        return saved
          ? current.filter((id) => id !== product.id)
          : [...current, product.id];
      });
    },
    [notify]
  );

  const handleSearchSelect = useCallback((term: string) => {
    setSearch(term);
    window.setTimeout(() => {
      document.getElementById("shop")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-ink">
      <a
        href="#shop"
        className="sr-only z-[100] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-xs focus:text-ivory"
      >
        Skip to the collection
      </a>

      <SiteHeader
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onCartOpen={() => setCartOpen(true)}
        onSearchSelect={handleSearchSelect}
      />

      <main>
        <PanoramicSpreadHero />
        <ValueMarquee />
        <CategoryRail />
        <ShopSection
          search={search}
          onClearSearch={() => setSearch("")}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onAddToCart={addToCart}
        />
        <StorySection />
        <PromiseSection />
        <InstagramSection />
        <Newsletter />
        <FaqSection />
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onUpdateQty={updateQty}
        onRemove={removeLine}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        open={checkoutOpen}
        items={cart}
        onClose={() => setCheckoutOpen(false)}
        onPaid={() => {
          setCart([]);
          setCheckoutOpen(false);
          notify("Payment received — your order is confirmed. ✦");
        }}
      />

      {/* floating DM / instagram button */}
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message Sanush Accessories on Instagram"
        className="group fixed bottom-4 right-4 z-40 flex h-11 items-center gap-0 rounded-full bg-ivory/95 p-1 text-ink shadow-[0_10px_28px_-10px_rgba(38,32,25,0.5)] ring-1 ring-ink/10 backdrop-blur-md transition-all duration-300 hover:bg-ink hover:text-ivory md:bottom-6 md:right-6 md:h-12 md:hover:gap-2.5 md:hover:pr-4"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-ivory transition-colors group-hover:bg-gold group-hover:text-ink md:h-10 md:w-10">
          <InstagramIcon className="h-4 w-4" />
        </span>
        <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.16em] opacity-0 transition-all duration-300 md:block md:group-hover:max-w-[9rem] md:group-hover:opacity-100">
          Message us
        </span>
      </a>

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            className="fixed bottom-20 left-1/2 z-[90] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center gap-2.5 rounded-full border border-line bg-ivory px-4 py-3 text-[11px] text-ink shadow-xl md:bottom-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            role="status"
            aria-live="polite"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
              <Check className="h-3 w-3" strokeWidth={2} />
            </span>
            <span className="font-light leading-snug">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
