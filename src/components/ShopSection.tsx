import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Check,
  Heart,
  Minus,
  Plus,
  Star,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { InstagramIcon } from "@/components/BrandIcons";
import Reveal from "@/components/Reveal";
import { asset } from "@/utils/asset";
import {
  categories,
  formatINR,
  INSTAGRAM_URL,
  products,
  type Category,
  type Product,
} from "@/data/site";

type ShopSectionProps = {
  search: string;
  onClearSearch: () => void;
  wishlist: string[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, qty?: number) => void;
};

function Stars({
  rating,
  reviews,
  compact = false,
}: {
  rating: number;
  reviews?: number;
  compact?: boolean;
}) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="flex items-center gap-0.5 text-gold" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((star) => (
          <Star
            key={star}
            className={`h-2.5 w-2.5 ${star < Math.round(rating) ? "fill-gold" : "fill-transparent"}`}
            strokeWidth={1.2}
          />
        ))}
      </span>
      <span className="whitespace-nowrap text-[9px] font-light tracking-[0.04em] text-muted">
        {rating.toFixed(1)}
        {reviews !== undefined && !compact ? ` (${reviews})` : ""}
      </span>
    </span>
  );
}

function ProductCard({
  product,
  saved,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
}: {
  product: Product;
  saved: boolean;
  onQuickView: () => void;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
}) {
  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-sm bg-sand">
        <button
          type="button"
          onClick={onQuickView}
          className="block w-full cursor-pointer"
          aria-label={`View ${product.name}`}
        >
          <div className="aspect-[4/5] w-full overflow-hidden">
            <img
              src={asset(product.image)}
              alt={product.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.045]"
            />
          </div>
        </button>

        {product.tag && (
          <span
            className={`absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[8px] uppercase tracking-[0.16em] ${
              product.tagTone === "dark"
                ? "bg-ink/90 text-ivory"
                : "bg-ivory/90 text-ink"
            }`}
          >
            {product.tag}
          </span>
        )}

        <button
          type="button"
          onClick={onToggleWishlist}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={saved}
          className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-ivory/80 text-ink backdrop-blur-sm transition-all hover:bg-ivory"
        >
          <Heart
            className={`h-3.5 w-3.5 transition-colors ${saved ? "fill-gold text-gold" : "text-ink/70"}`}
            strokeWidth={1.5}
          />
        </button>

        <div className="absolute inset-x-2 bottom-2 translate-y-0 opacity-100 transition-all duration-300 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <button
            type="button"
            onClick={onAddToCart}
            className="flex w-full items-center justify-center gap-1.5 rounded-full bg-ivory/95 py-2.5 text-[9px] font-medium uppercase tracking-[0.18em] text-ink shadow-sm backdrop-blur-sm transition-colors hover:bg-ink hover:text-ivory"
          >
            <Plus className="h-3 w-3" strokeWidth={1.8} />
            Quick add
          </button>
        </div>
      </div>

      <div className="mt-3">
        <span className="label block text-[0.4375rem] tracking-[0.22em] text-gold/80 md:text-[0.48rem]">
          {product.category}
        </span>
        <div className="mt-1.5 flex items-start justify-between gap-2">
          <button
            type="button"
            onClick={onQuickView}
            className="min-w-0 text-left font-serif text-[15px] leading-[1.2] text-ink transition-colors hover:text-gold md:text-[19px]"
          >
            {product.name}
          </button>
          <span className="mt-0.5 shrink-0 whitespace-nowrap text-[11px] font-medium tabular-nums text-ink/80 md:text-xs">
            {formatINR(product.price)}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between gap-2 border-t border-line/60 pt-1.5">
          <span className="text-[8.5px] font-light uppercase tracking-[0.14em] text-muted/80">
            Anti-tarnish
          </span>
          <Stars rating={product.rating} reviews={product.reviews} compact />
        </div>
      </div>
    </article>
  );
}

function QuickView({
  product,
  saved,
  onClose,
  onAddToCart,
  onToggleWishlist,
}: {
  product: Product;
  saved: boolean;
  onClose: () => void;
  onAddToCart: (qty: number) => void;
  onToggleWishlist: () => void;
}) {
  const [qty, setQty] = useState(1);

  useEffect(() => {
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
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[75] flex items-end justify-center bg-ink/50 backdrop-blur-[3px] p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      onClick={onClose}
    >
      <motion.div
        className="relative grid max-h-[94svh] w-full max-w-4xl overflow-y-auto rounded-t-sm bg-ivory sm:max-h-[92svh] sm:rounded-sm md:grid-cols-2 md:items-center md:overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product view"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 text-ink shadow-sm backdrop-blur-sm transition-colors hover:bg-sand"
        >
          <X className="h-4 w-4" strokeWidth={1.4} />
        </button>

        <div className="relative aspect-[4/5] w-full bg-sand md:aspect-auto md:h-[min(86svh,40rem)]">
          <img
            src={asset(product.image)}
            alt={product.alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {product.tag && (
            <span className="absolute left-4 top-4 rounded-full bg-ivory/90 px-3 py-1.5 text-[8px] uppercase tracking-[0.16em] text-ink">
              {product.tag}
            </span>
          )}
        </div>

        <div className="flex flex-col p-5 md:max-h-[min(86svh,40rem)] md:overflow-y-auto md:p-8">
          <div className="flex items-start justify-between gap-3 pr-8">
            <p className="label text-[8px] text-gold">{product.category} · 18k gold plated</p>
            <button
              type="button"
              onClick={onToggleWishlist}
              aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
              aria-pressed={saved}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line"
            >
              <Heart
                className={`h-3.5 w-3.5 ${saved ? "fill-gold text-gold" : "text-ink/60"}`}
                strokeWidth={1.5}
              />
            </button>
          </div>

          <h2 className="mt-2 font-serif text-[2rem] leading-[1.05] text-ink md:text-[2.6rem]">
            {product.name}
          </h2>
          <div className="mt-2 flex items-center gap-3">
            <Stars rating={product.rating} reviews={product.reviews} />
            <span className="h-3 w-px bg-line" />
            <span className="text-[10px] font-light uppercase tracking-[0.12em] text-ink/70">
              Anti-tarnish
            </span>
          </div>
          <p className="mt-4 font-serif text-2xl text-ink">{formatINR(product.price)}</p>
          <p className="mt-3 text-[12.5px] font-light leading-relaxed text-muted">
            {product.description}
          </p>

          <ul className="mt-4 space-y-1.5">
            {product.details.map((detail) => (
              <li key={detail} className="flex items-start gap-2 text-[11px] font-light text-ink/75">
                <Check className="mt-0.5 h-3 w-3 shrink-0 text-gold" strokeWidth={1.8} />
                {detail}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex items-center rounded-full border border-line">
              <button
                type="button"
                onClick={() => setQty((value) => Math.max(1, value - 1))}
                aria-label="Decrease quantity"
                className="flex h-9 w-9 items-center justify-center text-ink/60 hover:text-ink"
              >
                <Minus className="h-3 w-3" strokeWidth={1.6} />
              </button>
              <span className="w-7 text-center text-xs tabular-nums">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((value) => Math.min(9, value + 1))}
                aria-label="Increase quantity"
                className="flex h-9 w-9 items-center justify-center text-ink/60 hover:text-ink"
              >
                <Plus className="h-3 w-3" strokeWidth={1.6} />
              </button>
            </div>
            <button
              type="button"
              onClick={() => onAddToCart(qty)}
              className="btn btn-dark flex-1 px-4"
            >
              Add to bag
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
            </button>
          </div>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-[9px] font-light tracking-[0.05em] text-muted">
            <span className="text-gold">✦</span> Gift-ready packaging · ships across India
          </p>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-1.5 text-[9px] uppercase tracking-[0.16em] text-ink/50 transition-colors hover:text-gold"
          >
            <InstagramIcon className="h-3 w-3" /> Questions? DM us
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ShopSection({
  search,
  onClearSearch,
  wishlist,
  onToggleWishlist,
  onAddToCart,
}: ShopSectionProps) {
  const [category, setCategory] = useState<"All" | Category>("All");
  const [savedOnly, setSavedOnly] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);

  useEffect(() => {
    if (search.trim()) setCategory("All");
  }, [search]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter((product) => {
      const inCategory = category === "All" || product.category === category;
      const inSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term);
      const inSaved = !savedOnly || wishlist.includes(product.id);
      return inCategory && inSearch && inSaved;
    });
  }, [category, search, savedOnly, wishlist]);

  return (
    <section id="shop" className="scroll-mt-24 bg-ivory py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1500px] px-4 md:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-line pb-8 md:flex-row md:items-end md:justify-between md:pb-10">
            <div className="max-w-xl">
              <span className="label text-gold">The collection</span>
              <h2 className="mt-3 font-serif text-[clamp(2.1rem,4.6vw,3.9rem)] leading-[0.98] text-ink">
                The pieces you&apos;ll{" "}
                <span className="serif-italic text-gold">never take off.</span>
              </h2>
            </div>
            <div className="flex max-w-sm flex-col gap-4 md:items-end md:text-right">
              <p className="text-[12.5px] font-light leading-relaxed text-muted">
                Everyday necklaces, earrings and little stacks — designed to layer,
                live and travel with you. Every piece plated in 18k gold with an
                anti-tarnish finish.
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line flex items-center gap-1.5 text-[9px] uppercase tracking-[0.18em] text-gold"
              >
                <InstagramIcon className="h-3.5 w-3.5" />
                See it styled on Instagram
              </a>
            </div>
          </div>
        </Reveal>

        <div id="bestsellers" className="scroll-mt-24 pt-6 md:pt-8" />

        <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:gap-2.5 md:px-0" role="tablist" aria-label="Filter by category">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={category === item}
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[9px] uppercase tracking-[0.16em] transition-colors ${
                  category === item
                    ? "border-ink bg-ink text-ivory"
                    : "border-line bg-transparent text-ink/65 hover:border-ink/35 hover:text-ink"
                }`}
              >
                {item}
              </button>
            ))}
            {wishlist.length > 0 && (
              <button
                type="button"
                role="tab"
                aria-selected={savedOnly}
                onClick={() => setSavedOnly((value) => !value)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-[9px] uppercase tracking-[0.16em] transition-colors ${
                  savedOnly
                    ? "border-gold bg-gold text-ivory"
                    : "border-line bg-transparent text-ink/65 hover:border-ink/35 hover:text-ink"
                }`}
              >
                <Heart
                  className={`h-3 w-3 ${savedOnly ? "fill-ivory text-ivory" : ""}`}
                  strokeWidth={1.5}
                />
                Saved ({wishlist.length})
              </button>
            )}
          </div>
          <p className="label text-[8px] text-muted">
            {filtered.length} piece{filtered.length === 1 ? "" : "s"} · prices in INR
          </p>
        </div>

        {search.trim() && (
          <div className="mb-6 flex items-center justify-between gap-3 rounded-sm bg-sand/60 px-4 py-3">
            <p className="text-[11px] font-light text-ink/75">
              Showing pieces for <span className="font-medium">“{search.trim()}”</span>
            </p>
            <button
              type="button"
              onClick={onClearSearch}
              className="flex items-center gap-1 text-[9px] uppercase tracking-[0.16em] text-gold"
            >
              Clear <X className="h-3 w-3" strokeWidth={1.6} />
            </button>
          </div>
        )}

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-5 md:gap-y-12 lg:grid-cols-4">
            {filtered.map((product, index) => (
              <Reveal key={product.id} delay={Math.min(index * 0.05, 0.3)} y={20}>
                <ProductCard
                  product={product}
                  saved={wishlist.includes(product.id)}
                  onQuickView={() => setQuickView(product)}
                  onAddToCart={() => onAddToCart(product)}
                  onToggleWishlist={() => onToggleWishlist(product)}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-sm border border-line py-20 text-center">
            <h3 className="font-serif text-2xl text-ink">
              {savedOnly ? "Nothing saved just yet." : "No pieces in this little corner yet."}
            </h3>
            <p className="mt-2 max-w-sm text-xs font-light text-muted">
              {savedOnly
                ? "Tap the heart on any piece and it will wait for you right here."
                : "Try another category, or send us a DM — we love a custom request."}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setCategory("All");
                  setSavedOnly(false);
                  onClearSearch();
                }}
                className="btn btn-dark"
              >
                View everything
              </button>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <InstagramIcon className="h-3.5 w-3.5" /> DM us
              </a>
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="flex items-center gap-2 text-[10px] font-light tracking-[0.04em] text-muted">
            <span className="text-gold">✦</span>
            Every piece ships in gift-ready packaging. Complimentary shipping over ₹1,499.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-ink transition-colors hover:text-gold"
          >
            Can&apos;t decide? Let&apos;s chat
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          </a>
        </div>
      </div>

      <AnimatePresence>
        {quickView && (
          <QuickView
            key={quickView.id}
            product={quickView}
            saved={wishlist.includes(quickView.id)}
            onClose={() => setQuickView(null)}
            onAddToCart={(qty) => {
              onAddToCart(quickView, qty);
              setQuickView(null);
            }}
            onToggleWishlist={() => onToggleWishlist(quickView)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
