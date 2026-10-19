import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useState } from "react";
import { InstagramIcon } from "@/components/BrandIcons";
import Reveal from "@/components/Reveal";
import { INSTAGRAM_URL, testimonials } from "@/data/site";
import { asset } from "@/utils/asset";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const active = testimonials[index];

  const move = (direction: number) => {
    setIndex((current) => (current + direction + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-12 px-4 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal className="relative">
          <div className="relative mx-auto max-w-[26rem] lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-sand">
              <img
                src={asset("/images/ear-stack.jpg")}
                alt="Close-up of a curated stack of gold earrings"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 text-ivory">
                <div>
                  <p className="label text-[7px] text-ivory/70">Loved across Instagram</p>
                  <p className="mt-1 flex items-center gap-1.5 font-serif text-lg italic">
                    Little everyday gold
                  </p>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-ivory/15 px-2.5 py-1.5 backdrop-blur-sm">
                  <Star className="h-3 w-3 fill-gold-light text-gold-light" strokeWidth={1} />
                  <span className="text-[10px] font-medium">4.9</span>
                </div>
              </div>
            </div>
            <div className="absolute -right-2 -top-4 rounded-full border border-gold/30 bg-ivory px-4 py-2 shadow-sm sm:-right-4">
              <span className="label text-[7px] text-gold">900+ golden girls</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="label text-gold">Love notes</span>
          <h2 className="mt-3 max-w-[18ch] font-serif text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[0.98] text-ink">
            The reviews we{" "}
            <span className="serif-italic text-gold">screenshot.</span>
          </h2>

          <div className="relative mt-7 min-h-[16.5rem] border-t border-line pt-7 sm:min-h-[14rem]">
            <Quote className="h-7 w-7 text-gold/30" strokeWidth={1.1} aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div className="mt-3 flex items-center gap-0.5 text-gold" aria-label="5 out of 5 stars">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star key={star} className="h-3 w-3 fill-gold" strokeWidth={1} />
                  ))}
                </div>
                <blockquote className="mt-3 max-w-[36ch] font-serif text-[clamp(1.35rem,2.4vw,1.9rem)] leading-[1.32] text-ink/85">
                  “{active.quote}”
                </blockquote>
                <div className="mt-5 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/25 bg-sand/70 font-serif text-[11px] tracking-wider text-gold">
                    {active.initials}
                  </span>
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.04em] text-ink">
                      {active.name}
                      <span className="ml-2 text-[8px] uppercase tracking-[0.14em] text-gold">
                        Verified
                      </span>
                    </p>
                    <p className="text-[9px] uppercase tracking-[0.16em] text-muted">
                      {active.piece}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label="Previous love note"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink/60 transition-colors hover:border-ink hover:text-ink"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={1.4} />
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                aria-label="Next love note"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink/60 transition-colors hover:border-ink hover:text-ink"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={1.4} />
              </button>
              <span className="ml-2 text-[9px] tabular-nums tracking-[0.18em] text-muted">
                0{index + 1} / 0{testimonials.length}
              </span>
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-[9px] uppercase tracking-[0.16em] text-ink/60 transition-colors hover:text-gold"
            >
              <InstagramIcon className="h-3 w-3" />
              More love on Instagram
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
