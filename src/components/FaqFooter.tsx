import { ArrowUp, ArrowUpRight, Plus } from "lucide-react";
import { useState } from "react";
import { InstagramIcon } from "@/components/BrandIcons";
import Reveal from "@/components/Reveal";
import {
  faqs,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
} from "@/data/site";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 border-t border-line/70 bg-cream py-20 md:py-24">
      <div className="mx-auto grid w-full max-w-[1300px] gap-10 px-4 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <span className="label text-gold">Good to know</span>
            <h2 className="mt-3 max-w-[15ch] font-serif text-[clamp(2.1rem,4.4vw,3.5rem)] leading-[0.98] text-ink">
              A little more <span className="serif-italic text-gold">gold,</span> explained.
            </h2>
            <p className="mt-4 max-w-[38ch] text-[12.5px] font-light leading-relaxed text-muted">
              Anti-tarnish, plating, sizing, shipping — the honest answers.
              Anything we&apos;ve missed is one message away.
            </p>

            <div className="mt-6 rounded-sm border border-line bg-ivory p-5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sand/70 text-gold">
                  <InstagramIcon className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-serif text-lg leading-none text-ink">Still wondering?</p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-muted">
                    Real humans, real replies
                  </p>
                </div>
              </div>
              <p className="mt-3 text-[11.5px] font-light leading-relaxed text-muted">
                Message us on Instagram for styling help, sizing questions or a
                little nudge on what to choose. We&apos;ll reply as soon as we can.
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark mt-4 w-full"
              >
                <InstagramIcon className="h-3.5 w-3.5" />
                DM {INSTAGRAM_HANDLE}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="border-t border-line">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.question} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    className="flex w-full items-start gap-4 py-5 text-left transition-colors hover:text-gold md:py-6"
                  >
                    <span className="label mt-1.5 shrink-0 text-[8px] text-gold/60">
                      0{index + 1}
                    </span>
                    <span className="flex-1 font-serif text-[1.15rem] leading-snug text-ink md:text-[1.35rem]">
                      {faq.question}
                    </span>
                    <span
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line transition-transform duration-300 ${
                        isOpen ? "rotate-45 border-ink bg-ink text-ivory" : "text-ink/50"
                      }`}
                      aria-hidden="true"
                    >
                      <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${index}`}
                    className="faq-body"
                    data-open={isOpen}
                    role="region"
                  >
                    <div>
                      <p className="pb-6 pl-8 pr-10 text-[12px] font-light leading-[1.85] text-muted md:pl-9 md:text-[12.5px]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-sm bg-sand/50 px-4 py-3.5">
            <p className="text-[10px] font-light leading-relaxed text-ink/70">
              Every order is packed by hand, in small batches. Care notes included —
              always.
            </p>
            <a
              href="#shop"
              className="group flex items-center gap-1.5 text-[9px] uppercase tracking-[0.16em] text-gold"
            >
              Back to the gold
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const shopLinks = [
  { label: "Shop all", href: "#shop" },
  { label: "Necklaces", href: "#shop" },
  { label: "Earrings", href: "#shop" },
  { label: "Bracelets", href: "#shop" },
  { label: "Rings", href: "#shop" },
];

const helpLinks = [
  { label: "FAQs", href: "#faq" },
  { label: "Shipping & delivery", href: "#faq" },
  { label: "How to order", href: "#faq" },
  { label: "Jewelry care", href: "#faq" },
  { label: "Get in touch", href: "#contact" },
];

export function Footer() {
  return (
    <footer id="contact" className="scroll-mt-24 bg-espresso text-ivory/65">
      <div className="mx-auto w-full max-w-[1500px] px-4 py-14 md:px-8 md:py-16">
        <div className="grid gap-10 border-b border-ivory/10 pb-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.25fr]">
          <div>
            <a href="#home" className="flex flex-col items-start" aria-label="Sanush Accessories home">
              <span className="font-serif text-[30px] leading-none tracking-[0.2em] text-ivory">
                SANUSH
              </span>
              <span className="label mt-1.5 text-[7px] tracking-[0.56em] text-gold-light">
                Accessories
              </span>
            </a>
            <p className="mt-5 max-w-[30ch] text-[12px] font-light leading-[1.8] text-ivory/50">
              Anti-tarnish 18k gold plated jewelry for every day. Designed in
              small batches, shared first on Instagram, made to be lived in.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-champagne transition-colors hover:text-ivory"
            >
              <InstagramIcon className="h-4 w-4" />
              {INSTAGRAM_HANDLE}
              <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
            </a>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {["UPI", "Visa", "Mastercard", "RuPay"].map((method) => (
                <span
                  key={method}
                  className="rounded-[2px] border border-ivory/15 px-2 py-1 text-[8px] uppercase tracking-[0.12em] text-ivory/45"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="label text-[8px] text-champagne">Shop</h3>
            <ul className="mt-4 space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="link-line text-[12px] font-light text-ivory/55 transition-colors hover:text-ivory"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label text-[8px] text-champagne">Help</h3>
            <ul className="mt-4 space-y-2.5">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="link-line text-[12px] font-light text-ivory/55 transition-colors hover:text-ivory"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label text-[8px] text-champagne">Let&apos;s talk gold</h3>
            <p className="mt-4 text-[12px] font-light leading-[1.8] text-ivory/55">
              The fastest way to reach us is a DM on Instagram. Orders, sizing,
              gifting, custom requests — our inbox is open.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold mt-4 w-full"
            >
              <InstagramIcon className="h-3.5 w-3.5" />
              Message us
            </a>
            <p className="mt-3 text-[9px] uppercase tracking-[0.14em] text-ivory/35">
              Ships across India · prices in INR
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-[9px] font-light uppercase tracking-[0.14em] text-ivory/35">
            © {new Date().getFullYear()} Sanush Accessories · All little
            luxuries reserved.
          </p>
          <div className="flex items-center gap-5">
            <p className="text-[9px] font-light uppercase tracking-[0.14em] text-ivory/35">
              18k gold plated · anti-tarnish
            </p>
            <a
              href="#home"
              aria-label="Back to top"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-ivory/20 text-ivory/60 transition-colors hover:border-ivory/50 hover:text-ivory"
            >
              <ArrowUp className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
