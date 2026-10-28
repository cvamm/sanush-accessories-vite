"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/data/site";
import { InstagramIcon } from "@/components/BrandIcons";
import { asset } from "@/utils/asset";

const IMAGES = [
  { src: "/images/products/jhumka-pink-pearl.jpg", alt: "Gold jhumka earrings with pink stones and pearl drops", label: "Pink jhumka" },
  { src: "/images/products/jhumka-green-pearl.jpg", alt: "Gold jhumka earrings with green stones and pearl drops", label: "Green jhumka" },
  { src: "/images/products/bracelet-blue-clover.jpg", alt: "Gold chain bracelet with blue enamel clovers", label: "Clover" },
  { src: "/images/products/bangle-white-enamel.jpg", alt: "Slim gold bangle with white enamel inlay", label: "Enamel" },
  { src: "/images/products/bracelet-baby-gold.jpg", alt: "Slim gold bracelet worn on a thin wrist", label: "Baby size" },
  { src: "/images/products/ring-stone-gold.jpg", alt: "Gold ring with an oval clear stone", label: "Solitaire" },
  { src: "/images/products/bangle-leaf-pair.jpg", alt: "Two slim bangles with leaf details", label: "Leaf pair" },
];

type Vec = { x: number; y: number; rotateZ: number; rotateY: number; scale: number };

type CardModel = {
  item: (typeof IMAGES)[number];
  z: number;
  desktop: {
    stacked: Vec;
    panoramic: Vec;
    size: { w: string; h: string; ml: string; mt: string };
  };
  mobile: {
    stacked: Vec;
    panoramic: Vec;
    size: { w: string; h: string; ml: string; mt: string };
  };
};

const generateCards = (): CardModel[] => {
  const total = IMAGES.length;
  const centerIndex = (total - 1) / 2;

  return IMAGES.map((item, i) => {
    const offset = i - centerIndex;
    const absOffset = Math.abs(offset);

    return {
      item,
      z: Math.round(20 - absOffset),
      desktop: {
        stacked: {
          x: offset * 1.8,
          y: offset * -0.8 + 23,
          rotateZ: offset * 3.4,
          rotateY: offset * 1.5,
          scale: 1 - absOffset * 0.008,
        },
        panoramic: {
          x: offset * 11.4,
          y: absOffset * 1.8 + 4,
          rotateZ: offset * 1.7,
          rotateY: offset * -8,
          scale: 1 - absOffset * 0.028,
        },
        size: { w: "19.5vw", h: "28vh", ml: "-9.75vw", mt: "-14vh" },
      },
      mobile: {
        stacked: {
          x: offset * 1.6,
          y: offset * -0.8 + 25,
          rotateZ: offset * 3.8,
          rotateY: 0,
          scale: 1 - absOffset * 0.008,
        },
        panoramic: {
          x: offset * 13,
          y: absOffset * 3 + 4,
          rotateZ: offset * 2.2,
          rotateY: offset * -12,
          scale: 1 - absOffset * 0.035,
        },
        size: { w: "42vw", h: "26vh", ml: "-21vw", mt: "-13vh" },
      },
    };
  });
};

const CARDS = generateCards();

const PROGRESS_SPRING = { stiffness: 80, damping: 26, mass: 0.5, restDelta: 0.001 };
const PARALLAX_SPRING = { stiffness: 50, damping: 25, mass: 0.5 };

function usePointerTilt(active: boolean, enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const tiltX = useSpring(rawX, PARALLAX_SPRING);
  const tiltY = useSpring(rawY, PARALLAX_SPRING);

  useEffect(() => {
    if (!enabled || !active) {
      rawX.set(0);
      rawY.set(0);
      return;
    }
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientY / window.innerHeight - 0.5) * -6);
      rawY.set((e.clientX / window.innerWidth - 0.5) * 6);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [active, enabled, rawX, rawY]);

  return { tiltX, tiltY };
}

function GalleryCard({
  card,
  progress,
  isMobile,
  eager,
}: {
  card: CardModel;
  progress: MotionValue<number>;
  isMobile: boolean;
  eager: boolean;
}) {
  const { item, desktop, mobile, z } = card;
  const active = isMobile ? mobile : desktop;
  const { stacked, panoramic, size } = active;

  const ease = useTransform(progress, (p: number) =>
    p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
  );

  const xRaw = useTransform(ease, [0, 1], [stacked.x, panoramic.x]);
  const yRaw = useTransform(ease, [0, 1], [stacked.y, panoramic.y]);
  const rotZ = useTransform(ease, [0, 1], [stacked.rotateZ, panoramic.rotateZ]);
  const rotY = useTransform(ease, [0, 1], [stacked.rotateY, panoramic.rotateY]);
  const scale = useTransform(ease, [0, 1], [stacked.scale, panoramic.scale]);

  const x = useTransform(xRaw, (v) => `${v}vw`);
  const y = useTransform(yRaw, (v) => `${v}vh`);

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2"
      style={{ zIndex: z }}
    >
      <motion.div
        className="pointer-events-auto will-change-transform"
        style={{
          width: size.w,
          height: size.h,
          marginLeft: size.ml,
          marginTop: size.mt,
          x,
          y,
          rotateZ: rotZ,
          rotateY: rotY,
          scale,
          transformOrigin: "center center -40px",
        }}
      >
        <a
          href="#shop"
          aria-label={`${item.label} — explore the collection`}
          className="group relative flex h-full w-full flex-col rounded-[3px] bg-ivory p-1.5 shadow-[0_18px_45px_-18px_rgba(38,32,25,0.45)] ring-1 ring-ink/10 transition-shadow duration-500 hover:shadow-[0_26px_60px_-20px_rgba(38,32,25,0.55)] md:p-2"
        >
          <div className="relative min-h-0 w-full flex-1 overflow-hidden rounded-[2px] bg-sand">
            <img
              src={asset(item.src)}
              alt={item.alt}
              draggable={false}
              loading={eager ? "eager" : "lazy"}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-20" />
            <span className="absolute right-1.5 top-1.5 h-5 w-5 rounded-full border border-ivory/60 bg-ivory/20 backdrop-blur-sm md:h-6 md:w-6" />
          </div>
          <div className="flex h-5 shrink-0 items-center justify-between gap-1 px-1 md:h-7 md:px-1.5">
            <span className="hidden truncate font-serif text-[11px] italic tracking-wide text-ink/75 md:block">
              {item.label}
            </span>
            <span className="label hidden shrink-0 text-[6px] tracking-[0.2em] text-ink/35 md:block">
              Sanush
            </span>
            <span className="mx-auto h-px w-5 bg-ink/10 md:hidden" />
          </div>
        </a>
      </motion.div>
    </div>
  );
}

export default function PanoramicSpreadHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [textHidden, setTextHidden] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, PROGRESS_SPRING);
  const progress = useTransform(smoothProgress, [0.05, 0.6], [0, 1]);

  const [spread, setSpread] = useState(false);
  useMotionValueEvent(progress, "change", (p) => setSpread(p > 0.9));

  const { tiltX, tiltY } = usePointerTilt(spread, !reduce);

  const textY = useTransform(progress, [0, 0.62], ["0vh", "-7vh"]);
  const textScale = useTransform(progress, [0, 0.62], [1, 0.95]);
  const textOpacity = useTransform(progress, [0.18, 0.48], [1, 0]);
  const hintOpacity = useTransform(progress, [0, 0.22], [1, 0]);
  const spreadOpacity = useTransform(progress, [0.62, 0.95], [0, 1]);
  const spreadY = useTransform(progress, [0.62, 1], ["18px", "0px"]);
  const scrollBarScale = useTransform(progress, [0, 1], [0, 1]);

  useMotionValueEvent(textOpacity, "change", (v) => setTextHidden(v < 0.2));

  return (
    <section
      ref={wrapRef}
      id="home"
      className="relative h-[235vh] w-full md:h-[255vh]"
      aria-label="The Sanush everyday collection"
    >
      <div className="hero-wash sticky top-14 h-[calc(100svh-5.5rem)] w-full overflow-hidden md:top-[69px] md:h-[calc(100svh-6.375rem)]">
        {/* texture + ambient light */}
        <div className="paper-texture pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute left-1/2 top-[-18%] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,253,246,0.95),transparent_65%)]" />

        {/* corner micro-labels */}
        <div className="pointer-events-none absolute inset-x-0 top-4 z-30 flex items-center justify-between px-5 md:top-6 md:px-9">
          <span className="label text-[8px] text-ink/45 md:text-[9px]">
            The Everyday Edit · Nº 01
          </span>
          <span className="label hidden items-center gap-2 text-[9px] text-ink/45 sm:flex">
            18k gold plated <span className="text-gold">✦</span> anti-tarnish
          </span>
        </div>

        {/* headline */}
        <motion.div
          className={`absolute inset-x-0 top-[10%] z-30 flex flex-col items-center px-5 text-center md:top-[9%] ${
            textHidden ? "pointer-events-none" : ""
          }`}
          style={{ y: textY, scale: textScale, opacity: textOpacity }}
        >
          <span className="label mb-3 flex items-center justify-center gap-2 text-gold md:mb-4">
            <Sparkles className="h-3 w-3" strokeWidth={1.4} aria-hidden="true" />
            Sanush Accessories
          </span>
          <h1 className="max-w-[16ch] font-serif text-[clamp(2.7rem,9vw,5.7rem)] leading-[0.92] tracking-[-0.015em] text-ink">
            Everyday gold,
            <br />
            <span className="serif-italic text-gold">made to last.</span>
          </h1>
          <p className="mt-4 max-w-[42ch] text-[12px] font-light leading-relaxed text-muted md:mt-5 md:text-[14px]">
            18k gold plated jewelry with an anti-tarnish finish. Light enough to
            live in, made to be worn every single day.
          </p>
          <div className="mt-5 flex w-full max-w-sm flex-col items-stretch gap-3 sm:flex-row sm:justify-center md:hidden">
            <a href="#shop" className="btn btn-dark w-full sm:w-auto">
              Shop the edit
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
            </a>
            <a href="#journal" className="btn btn-dark w-full sm:w-auto">
              Follow the journal
            </a>
          </div>
        </motion.div>

        <motion.div
          className={`pointer-events-none absolute inset-x-0 top-[55%] z-30 hidden items-center justify-between px-10 md:flex lg:px-16 ${
            textHidden ? "pointer-events-none" : ""
          }`}
          style={{ y: textY, opacity: textOpacity }}
        >
          <a href="#shop" className="btn btn-dark pointer-events-auto">
            Shop the edit
          </a>
          <a href="#journal" className="btn btn-dark pointer-events-auto">
            Follow the journal
          </a>
        </motion.div>

        {/* spread caption — fades in once the collection unfurls */}
        <div className="pointer-events-none absolute inset-x-0 top-11 z-30 flex justify-center md:hidden">
          <motion.div
            className="flex flex-col items-center px-5 text-center"
            style={{ opacity: spreadOpacity, y: spreadY }}
          >
            <span className="label flex items-center gap-2 text-gold">
              <span className="h-px w-5 bg-gold/40" />
              The everyday edit
              <span className="h-px w-5 bg-gold/40" />
            </span>
            <h2 className="mt-1.5 font-serif text-[1.45rem] leading-[1.05] text-ink">
              {IMAGES.length} little pieces.{" "}
              <span className="serif-italic text-gold">One gold wardrobe.</span>
            </h2>
            <a
              href="#shop"
              className="link-line pointer-events-auto mt-2 inline-flex items-center gap-1.5 text-[8px] uppercase tracking-[0.18em] text-ink/60"
            >
              Shop every piece
              <ArrowRight className="h-2.5 w-2.5" strokeWidth={1.5} />
            </a>
          </motion.div>
        </div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 top-[11%] z-30 hidden flex-col items-center px-5 text-center md:flex"
          style={{ opacity: spreadOpacity, y: spreadY }}
        >
          <span className="label flex items-center gap-2 text-gold">
            <span className="h-px w-6 bg-gold/40" />
            The everyday edit
            <span className="h-px w-6 bg-gold/40" />
          </span>
          <h2 className="mt-2.5 font-serif text-[clamp(1.6rem,3.3vw,2.7rem)] leading-[1.04] text-ink md:mt-3">
            {IMAGES.length} little pieces.
            <br />
            <span className="serif-italic text-gold">One gold wardrobe.</span>
          </h2>
          <a
            href="#shop"
            className="link-line mt-3 inline-flex items-center gap-1.5 text-[8px] uppercase tracking-[0.2em] text-ink/60 transition-colors hover:text-gold md:text-[9px]"
          >
            Shop every piece
            <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
          </a>
        </motion.div>

        {/* panoramic deck */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d", perspective: 1200 }}
        >
          {CARDS.map((card, i) => (
            <GalleryCard
              key={card.item.label}
              card={card}
              progress={progress}
              isMobile={isMobile}
              eager={i < 4}
            />
          ))}
        </motion.div>

        {/* scroll cue */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-5 pb-4 md:px-9 md:pb-5 md:pr-24"
          style={{ opacity: hintOpacity }}
        >
          <div className="flex items-center justify-between gap-4 border-t border-ink/10 pt-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-ink/20 md:h-7 md:w-7">
                <span className="soft-bounce block text-[10px] text-ink/60">↓</span>
              </span>
              <span className="label text-[8px] text-ink/50 md:text-[9px]">
                Scroll to unfold the edit
              </span>
            </div>
            <span className="label hidden text-[8px] text-ink/40 sm:block md:text-[9px]">
              {IMAGES.length} pieces · one golden wardrobe
            </span>
          </div>
        </motion.div>

        {/* spread footer — appears with the panorama */}
        <motion.div
          className="absolute inset-x-0 bottom-11 z-30 flex flex-col items-center justify-between gap-3 px-5 sm:flex-row md:bottom-12 md:px-9 md:pr-24"
          style={{ opacity: spreadOpacity }}
        >
          <p className="label hidden text-[8px] text-ink/45 sm:block md:text-[9px]">
            18k gold plated <span className="mx-1.5 text-gold">✦</span> anti-tarnish
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <a
              href="#shop"
              className="btn btn-dark px-5 py-3 text-[8.5px] md:text-[9px]"
            >
              Explore all {IMAGES.length} pieces
              <ArrowRight className="h-3 w-3" strokeWidth={1.6} />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-[8px] uppercase tracking-[0.18em] text-ink/55 transition-colors hover:text-gold md:text-[9px]"
            >
              <InstagramIcon className="h-3 w-3" />
              Ask us anything
            </a>
          </div>
          <p className="label hidden text-[8px] text-ink/45 sm:block md:text-[9px]">
            {INSTAGRAM_HANDLE}
          </p>
        </motion.div>

        {/* progress rail */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[3px] bg-ink/[0.07]">
          <motion.div
            className="h-full w-full origin-left bg-gold/80"
            style={{ scaleX: scrollBarScale }}
          />
        </div>
      </div>
    </section>
  );
}


