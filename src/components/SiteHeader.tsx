import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { InstagramIcon } from "@/components/BrandIcons";
import { asset } from "@/utils/asset";
import {
  formatINR,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  products,
} from "@/data/site";

const NAV_LINKS = [
  { label: "Shop", href: "#shop" },
  { label: "Bestsellers", href: "#shop" },
  { label: "Our Story", href: "#story" },
  { label: "The Journal", href: "#journal" },
  { label: "FAQs", href: "#faq" },
];

const ANNOUNCEMENTS = [
  "Complimentary shipping on orders over ₹1,499",
  "18k gold plated · anti-tarnish · made for every day",
  "New here? Slide into our DMs for styling help",
  "Gift-ready packaging with every piece",
];

type SiteHeaderProps = {
  cartCount: number;
  wishlistCount: number;
  onCartOpen: () => void;
  onSearchSelect: (query: string) => void;
};

function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [locked]);
}

export default function SiteHeader({
  cartCount,
  wishlistCount,
  onCartOpen,
  onSearchSelect,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useBodyLock(menuOpen || searchOpen);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!searchOpen) {
      setQuery("");
      return;
    }
    const timer = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => window.clearTimeout(timer);
  }, [searchOpen]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return products.slice(0, 4);
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
    );
  }, [query]);

  const runSearch = (value: string) => {
    const term = value.trim();
    setSearchOpen(false);
    onSearchSelect(term);
  };

  return (
    <>
      {/* announcement bar */}
      <div className="relative z-40 bg-espresso text-ivory">
        <div className="marquee hidden h-8 items-center md:flex">
          <div className="marquee-track">
            {[0, 1].map((group) => (
              <div key={group} className="flex shrink-0 items-center" aria-hidden={group === 1}>
                {ANNOUNCEMENTS.map((text) => (
                  <span
                    key={`${group}-${text}`}
                    className="label flex items-center gap-5 px-7 text-[8.5px] tracking-[0.26em] text-ivory/75"
                  >
                    {text}
                    <span className="text-gold-light">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <p className="label flex h-8 items-center justify-center px-4 text-center text-[8px] tracking-[0.22em] text-ivory/80 md:hidden">
          Free shipping over ₹1,499 · anti-tarnish gold
        </p>
      </div>

      {/* main navigation */}
      <header className="sticky top-0 z-50 border-b border-line/70 bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-[1600px] items-center justify-between px-4 md:h-[68px] md:px-8">
          <div className="flex flex-1 items-center">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="-ml-2 flex h-9 w-9 items-center justify-center text-ink/80 transition-colors hover:text-ink md:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.3} />
            </button>

            <a href="#home" className="mx-auto flex flex-col items-center md:mx-0" aria-label="Sanush Accessories home">
              <span className="font-serif text-[23px] leading-none tracking-[0.2em] text-ink md:text-[27px]">
                SANUSH
              </span>
              <span className="label mt-1 text-[6.5px] tracking-[0.56em] text-gold md:text-[7.5px]">
                Accessories
              </span>
            </a>
          </div>

          <nav className="hidden shrink-0 items-center justify-center gap-5 md:flex lg:gap-8" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="link-line whitespace-nowrap text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink/65 transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-1 items-center justify-end gap-0.5 md:gap-1.5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search the collection"
              className="flex h-9 w-9 items-center justify-center text-ink/75 transition-colors hover:text-ink"
            >
              <Search className="h-[19px] w-[19px]" strokeWidth={1.3} />
            </button>
            <a
              href="#shop"
              aria-label={`Wishlist, ${wishlistCount} saved pieces`}
              className="relative hidden h-9 w-9 items-center justify-center text-ink/75 transition-colors hover:text-ink sm:flex"
            >
              <Heart className="h-[19px] w-[19px]" strokeWidth={1.3} />
              {wishlistCount > 0 && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-medium text-ivory">
                  {wishlistCount}
                </span>
              )}
            </a>
            <button
              type="button"
              onClick={onCartOpen}
              aria-label={`Open shopping bag, ${cartCount} items`}
              className="relative ml-1 flex h-9 items-center gap-2 rounded-full border border-ink/15 px-3 text-ink transition-colors hover:border-ink/40 md:ml-2"
            >
              <ShoppingBag className="h-[17px] w-[17px]" strokeWidth={1.3} />
              <span className="text-[11px] font-medium tabular-nums">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-cream md:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex h-14 items-center justify-between border-b border-line px-4">
              <span className="flex flex-col items-start">
                <span className="font-serif text-[21px] leading-none tracking-[0.2em] text-ink">SANUSH</span>
                <span className="label mt-1 text-[6px] tracking-[0.5em] text-gold">Accessories</span>
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center text-ink"
              >
                <X className="h-5 w-5" strokeWidth={1.3} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center px-6" aria-label="Mobile">
              {NAV_LINKS.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-baseline gap-4 border-b border-line/70 py-4"
                >
                  <span className="label text-[8px] text-gold/70">0{index + 1}</span>
                  <span className="font-serif text-[2rem] leading-none text-ink transition-colors group-hover:text-gold">
                    {link.label}
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4 self-center text-ink/30" strokeWidth={1.3} />
                </a>
              ))}
            </nav>

            <div className="border-t border-line px-6 py-5">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark mb-4 w-full"
              >
                <InstagramIcon className="h-4 w-4" />
                DM us to order
              </a>
              <p className="label text-center text-[7.5px] text-muted">
                {INSTAGRAM_HANDLE} · 18k gold plated · anti-tarnish
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="fixed inset-0 z-[70] bg-ink/45 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSearchOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            <motion.div
              className="mx-auto mt-20 w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-sm bg-ivory shadow-2xl md:mt-28"
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <form
                className="flex items-center gap-3 border-b border-line px-5 py-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  runSearch(query);
                }}
              >
                <Search className="h-5 w-5 shrink-0 text-ink/45" strokeWidth={1.3} />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search necklaces, huggies, rings…"
                  aria-label="Search products"
                  className="w-full bg-transparent text-sm font-light text-ink placeholder:text-muted/70 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink/50 hover:bg-sand hover:text-ink"
                >
                  <X className="h-4 w-4" strokeWidth={1.4} />
                </button>
              </form>

              <div className="px-5 py-4">
                <p className="label mb-3 text-[8px] text-muted">
                  {query.trim() ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Most loved right now"}
                </p>

                {results.length > 0 ? (
                  <ul className="divide-y divide-line/70">
                    {results.slice(0, 4).map((product) => (
                      <li key={product.id}>
                        <button
                          type="button"
                          onClick={() => runSearch(product.name)}
                          className="group flex w-full items-center gap-4 py-2.5 text-left"
                        >
                          <img
                            src={asset(product.image)}
                            alt=""
                            className="h-14 w-12 shrink-0 rounded-sm object-cover"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-serif text-[17px] leading-tight text-ink group-hover:text-gold">
                              {product.name}
                            </span>
                            <span className="mt-0.5 block text-[10px] font-light uppercase tracking-[0.16em] text-muted">
                              {product.category} · {formatINR(product.price)}
                            </span>
                          </span>
                          <ArrowRight className="h-4 w-4 text-ink/25 transition-transform group-hover:translate-x-1 group-hover:text-gold" strokeWidth={1.4} />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="py-6 text-center">
                    <p className="font-serif text-xl text-ink">No little luxuries found.</p>
                    <p className="mt-1 text-xs font-light text-muted">
                      Try “necklace”, “hoops” or ask us in the DMs.
                    </p>
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-gold"
                    >
                      <InstagramIcon className="h-3.5 w-3.5" /> Ask @sanush_accessories
                    </a>
                  </div>
                )}

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-line/70 pt-3">
                  <div className="flex flex-wrap gap-2">
                    {["Huggies", "Coin necklace", "Bangle", "Rings"].map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => setQuery(chip)}
                        className="rounded-full border border-line px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-ink/65 transition-colors hover:border-ink/40 hover:text-ink"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => runSearch(query)}
                    className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.18em] text-gold"
                  >
                    View in shop <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
