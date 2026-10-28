import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Droplets,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { InstagramIcon } from "@/components/BrandIcons";
import Reveal from "@/components/Reveal";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, promises } from "@/data/site";
import { asset } from "@/utils/asset";

const VALUES = [
  "Anti-tarnish finish",
  "18k gold plated",
  "Skin-friendly",
  "Made for daily wear",
  "Small-batch drops",
  "Gift-ready always",
];

export function ValueMarquee() {
  return (
    <div className="marquee border-y border-line/80 bg-cream">
      <div className="marquee-track items-center py-3.5">
        {[0, 1].map((group) => (
          <div key={group} className="flex shrink-0 items-center" aria-hidden={group === 1}>
            {VALUES.map((value) => (
              <span
                key={`${group}-${value}`}
                className="label flex items-center gap-4 whitespace-nowrap px-5 text-[8.5px] text-ink/60 md:text-[9px]"
              >
                {value}
                <Sparkles className="h-2.5 w-2.5 text-gold/70" strokeWidth={1.3} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function StorySection() {
  return (
    <section id="story" className="scroll-mt-24 overflow-hidden bg-cream py-20 md:py-28">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-14 px-4 md:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative mx-auto max-w-[30rem] lg:max-w-none">
            <div className="relative aspect-[4/5] w-[88%] overflow-hidden rounded-sm bg-sand md:w-[85%]">
              <img
                src={asset("/images/products/jhumka-pink-pearl.jpg")}
                alt="Hand holding a pair of gold jhumka earrings set with pale pink stones and pearl drops"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-8 right-0 w-[52%] max-w-[16rem] border-[7px] border-cream bg-cream shadow-[0_18px_40px_-24px_rgba(38,32,25,0.5)] md:-right-2 md:border-[10px]">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={asset("/images/products/bracelet-blue-clover.jpg")}
                  alt="Fine gold chain bracelet with blue enamel clover motifs held in a hand"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="label bg-cream pt-2.5 text-[7px] tracking-[0.24em] text-ink/50">
                The little things · Nº 02
              </p>
            </div>

            <div className="absolute -left-2 top-5 flex h-[5.2rem] w-[5.2rem] -rotate-6 flex-col items-center justify-center rounded-full border border-gold/35 bg-cream/90 text-center shadow-sm backdrop-blur-sm md:-left-5 md:h-24 md:w-24">
              <span className="font-serif text-[17px] italic leading-tight text-gold md:text-xl">
                worn
                <br />
                daily
              </span>
              <span className="label mt-1 text-[5.5px] tracking-[0.3em] text-ink/45">
                since forever
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="label text-gold">Our story</span>
          <h2 className="mt-3 max-w-[16ch] font-serif text-[clamp(2.2rem,4.7vw,4rem)] leading-[0.98] text-ink">
            Made to be worn,
            <br />
            <span className="serif-italic text-gold">not saved</span> for later.
          </h2>
          <div className="mt-6 max-w-[48ch] space-y-4 text-[13px] font-light leading-[1.85] text-muted md:text-sm">
            <p>
              Sanush Accessories began the way so many good things do — in the DMs.
              We wanted small pieces of gold we could actually live in. The kind you
              don&apos;t take off to wash your hands, that don&apos;t make your ears itch,
              and that don&apos;t cost a week&apos;s rent.
            </p>
            <p>
              So we made them. Every piece is 18k gold plated over a strong,
              skin-friendly base, then finished with an anti-tarnish seal. New
              drops are designed in small batches and shared first on Instagram,
              where our community tells us what to make next.
            </p>
            <p className="font-serif text-[1.35rem] italic leading-snug text-ink/80">
              “The best jewelry isn&apos;t the one you save for a special day. It&apos;s
              the one you forget you&apos;re wearing.”
            </p>
            <p className="label pt-1 text-[7.5px] tracking-[0.22em] text-gold">
              From the Sanush studio
            </p>
          </div>

          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {[
              "Anti-tarnish, everyday finish",
              "18k gold plated, always",
              "Hypoallergenic & nickel-free",
              "Small-batch, considered drops",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-[11.5px] font-light text-ink/75">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.8} />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark"
            >
              <InstagramIcon className="h-3.5 w-3.5" />
              Follow {INSTAGRAM_HANDLE}
            </a>
            <a href="#shop" className="group flex items-center justify-center gap-2 px-2 py-2 text-[9px] uppercase tracking-[0.2em] text-ink/70 transition-colors hover:text-gold sm:justify-start">
              Shop the everyday edit
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const promiseIcons = {
  shield: ShieldCheck,
  sparkle: Sparkles,
  drop: Droplets,
  heart: HeartHandshake,
} as const;

export function PromiseSection() {
  return (
    <section className="border-y border-line/70 bg-sand/45 py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 md:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="label text-gold">The Sanush promise</span>
              <h2 className="mt-3 max-w-[20ch] font-serif text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.02] text-ink">
                Little luxuries, <span className="serif-italic">no compromises.</span>
              </h2>
            </div>
            <p className="max-w-sm text-[12px] font-light leading-relaxed text-muted md:text-right">
              Jewellery you can live in. Every piece is checked by hand before it
              leaves the studio — and backed by a team that actually replies.
            </p>
          </div>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((promise, index) => {
            const Icon = promiseIcons[promise.icon as keyof typeof promiseIcons] ?? Sparkles;
            return (
              <Reveal key={promise.title} delay={index * 0.07} className="h-full">
                <div className="flex h-full flex-col bg-ivory/85 p-5 md:p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 bg-cream text-gold">
                    <Icon className="h-4 w-4" strokeWidth={1.3} />
                  </span>
                  <h3 className="mt-4 font-serif text-[1.2rem] leading-tight text-ink">
                    {promise.title}
                  </h3>
                  <p className="mt-2 text-[11.5px] font-light leading-relaxed text-muted">
                    {promise.copy}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[10px] font-light tracking-[0.04em] text-muted">
            <span className="text-gold">✦</span> Care notes come with every order — and
            we&apos;re always a DM away.
          </p>
          <a
            href="#faq"
            className="group flex items-center gap-1.5 text-[9px] uppercase tracking-[0.18em] text-ink/70 transition-colors hover:text-gold"
          >
            How to care for your gold
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  );
}
