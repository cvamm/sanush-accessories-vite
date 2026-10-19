import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { InstagramIcon } from "@/components/BrandIcons";
import Reveal from "@/components/Reveal";
import { gallery, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/data/site";
import { asset } from "@/utils/asset";

export function InstagramSection() {
  return (
    <section id="journal" className="relative scroll-mt-24 overflow-hidden bg-espresso py-20 text-ivory md:py-24">
      <div className="paper-texture pointer-events-none absolute inset-0 opacity-[0.12]" />
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-gold/10 blur-[100px]" />

      <div className="relative mx-auto w-full max-w-[1500px] px-4 md:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="label flex items-center gap-2 text-gold-light">
                <InstagramIcon className="h-3 w-3" /> The journal
              </span>
              <h2 className="mt-3 max-w-[20ch] font-serif text-[clamp(2.1rem,4.6vw,3.8rem)] leading-[0.98]">
                The grid is part of{" "}
                <span className="serif-italic text-champagne">the story.</span>
              </h2>
            </div>
            <div className="flex max-w-sm flex-col gap-4 md:items-end md:text-right">
              <p className="text-[12px] font-light leading-relaxed text-ivory/60">
                New drops, unreleased pieces, styling notes and the occasional
                behind-the-scenes. It all starts on Instagram — where you are.
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold self-start md:self-end"
              >
                <InstagramIcon className="h-3.5 w-3.5" />
                {INSTAGRAM_HANDLE}
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-9 grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-6">
          {gallery.map((item, index) => (
            <Reveal key={item.caption} delay={Math.min(index * 0.05, 0.3)} y={18}>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-sm"
                aria-label={`${item.caption} — view on Instagram`}
              >
                <div className="aspect-square overflow-hidden bg-ink">
                  <img
                    src={asset(item.image)}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-espresso/80 via-espresso/10 to-transparent p-3 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                  <p className="font-serif text-[13px] italic leading-tight text-ivory">
                    {item.caption}
                  </p>
                  <span className="label mt-2 flex items-center gap-1.5 text-[6.5px] text-ivory/60">
                    <InstagramIcon className="h-2.5 w-2.5" /> View post
                  </span>
                </div>
                <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-ivory/15 text-ivory backdrop-blur-sm transition-colors group-hover:bg-ivory group-hover:text-ink">
                  <InstagramIcon className="h-3 w-3" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-ivory/10 pt-5 sm:flex-row">
          <p className="text-[10px] font-light tracking-[0.05em] text-ivory/45">
            Tag <span className="text-ivory/75">{INSTAGRAM_HANDLE}</span> in your
            everyday gold — you might just make the next grid.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-champagne"
          >
            Follow along
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section className="relative overflow-hidden bg-ivory py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(220,201,166,0.35),transparent_68%)]" />
      </div>
      <Reveal className="relative mx-auto max-w-xl px-5 text-center">
        <span className="label mx-auto flex items-center justify-center gap-2 text-gold">
          <Sparkles className="h-3 w-3" strokeWidth={1.4} /> The golden list
        </span>
        <h2 className="mt-3 font-serif text-[clamp(2rem,4.6vw,3.4rem)] leading-[1] text-ink">
          Be first to the <span className="serif-italic text-gold">gold.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-[38ch] text-[12px] font-light leading-relaxed text-muted">
          First looks at new drops, restock notes and little care reminders.
          No noise, no spam — just the good gold.
        </p>

        {subscribed ? (
          <div className="mx-auto mt-6 flex max-w-sm items-center justify-center gap-2 rounded-full border border-gold/30 bg-sand/50 px-5 py-3.5 text-[11px] text-ink">
            <Check className="h-4 w-4 text-gold" strokeWidth={1.8} />
            You&apos;re on the list. Something golden is on its way. ✦
          </div>
        ) : (
          <form
            className="mx-auto mt-6 flex w-full max-w-md flex-col gap-2 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              if (!email.trim()) return;
              setSubscribed(true);
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your email address"
              className="h-12 flex-1 rounded-full border border-line bg-cream/70 px-5 text-[12px] font-light text-ink placeholder:text-muted/60 focus:border-gold focus:outline-none"
            />
            <button type="submit" className="btn btn-dark h-12 shrink-0">
              Join the list
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
            </button>
          </form>
        )}

        <p className="mt-3 text-[9px] font-light tracking-[0.04em] text-muted/70">
          By joining you agree to a little occasional gold in your inbox.
        </p>
      </Reveal>
    </section>
  );
}
