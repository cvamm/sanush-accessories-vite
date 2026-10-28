import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { asset } from "@/utils/asset";
import { products } from "@/data/site";

const CATEGORY_CARDS = [
  {
    name: "Jhumkas",
    note: "Stone-set, pearl-dropped",
    image: "/images/products/jhumka-pink-pearl.jpg",
    alt: "Gold jhumka earrings with pink stones and pearl drops",
    className: "col-span-2 md:col-span-1 md:row-span-2",
    aspect: "aspect-[4/5] md:aspect-auto md:h-full",
  },
  {
    name: "Earrings",
    note: "Lightweight everyday gold",
    image: "/images/products/jhumka-green-pearl.jpg",
    alt: "Gold jhumka earrings with green stones and pearl drops",
    className: "col-span-1",
    aspect: "aspect-square",
  },
  {
    name: "Bangles",
    note: "Enamel petals, slim stack",
    image: "/images/products/bangle-white-enamel.jpg",
    alt: "Slim gold bangle inlaid with white enamel petals",
    className: "col-span-1",
    aspect: "aspect-square",
  },
  {
    name: "Bracelets",
    note: "Clovers & baby sizing",
    image: "/images/products/bracelet-blue-clover.jpg",
    alt: "Fine gold chain bracelet with blue enamel clover motifs",
    className: "col-span-2",
    aspect: "aspect-[2/1]",
  },
];

export default function CategoryRail() {
  return (
    <section className="bg-cream pb-14 pt-14 md:pb-20 md:pt-20">
      <div className="mx-auto w-full max-w-[1500px] px-4 md:px-8">
        <Reveal>
          <div className="mb-6 flex items-end justify-between gap-4 md:mb-8">
            <div>
              <span className="label text-gold">Shop by mood</span>
              <h2 className="mt-2.5 font-serif text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1] text-ink">
                Find your <span className="serif-italic text-gold">forever few.</span>
              </h2>
            </div>
            <a
              href="#shop"
              className="group hidden items-center gap-1.5 text-[9px] uppercase tracking-[0.18em] text-ink/55 transition-colors hover:text-gold sm:flex"
            >
              All {products.length} pieces
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:grid-rows-2 md:gap-3">
          {CATEGORY_CARDS.map((card, index) => (
            <Reveal
              key={card.name}
              delay={index * 0.06}
              y={18}
              className={card.className}
            >
              <a
                href="#shop"
                className={`group relative block h-full overflow-hidden rounded-sm bg-sand ${card.aspect}`}
                aria-label={`Shop ${card.name}`}
              >
                <img
                  src={asset(card.image)}
                  alt={card.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3.5 md:p-4">
                  <div>
                    <h3 className="font-serif text-[1.35rem] leading-none text-ivory md:text-[1.7rem]">
                      {card.name}
                    </h3>
                    <p className="mt-1.5 text-[8px] uppercase tracking-[0.16em] text-ivory/65">
                      {card.note}
                    </p>
                  </div>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-colors duration-300 group-hover:border-ivory group-hover:bg-ivory group-hover:text-ink">
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
