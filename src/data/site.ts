export const INSTAGRAM_URL = "https://www.instagram.com/sanush_accessories";
export const INSTAGRAM_HANDLE = "@sanush_accessories";

export type Category = "Necklaces" | "Earrings" | "Bracelets" | "Rings";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  alt: string;
  tag?: string;
  tagTone?: "dark" | "light";
  rating: number;
  reviews: number;
  description: string;
  details: string[];
};

export const categories: ("All" | Category)[] = [
  "All",
  "Necklaces",
  "Earrings",
  "Bracelets",
  "Rings",
];

export const products: Product[] = [
  {
    id: "solaire-coin-necklace",
    name: "Solaire Coin Necklace",
    price: 1299,
    category: "Necklaces",
    image: "/images/necklace.jpg",
    alt: "Delicate 18k gold plated chain necklace with a small coin pendant on ivory silk",
    tag: "Bestseller",
    tagTone: "dark",
    rating: 4.9,
    reviews: 218,
    description:
      "Our most-loved little layer. A sunstruck coin on the finest gold chain — the one you put on and forget you're wearing.",
    details: [
      "18k gold plated over stainless steel",
      "Anti-tarnish finish for everyday wear",
      "45cm chain with a 5cm extender",
      "Hypoallergenic & nickel-free",
      "Arrives in gift-ready packaging",
    ],
  },
  {
    id: "layered-muse-set",
    name: "The Layered Muse Set",
    price: 1699,
    category: "Necklaces",
    image: "/images/pendant-neck.jpg",
    alt: "Three layered fine gold necklaces worn with a mocha silk top",
    tag: "New in",
    tagTone: "light",
    rating: 4.8,
    reviews: 94,
    description:
      "Three fine chains, already styled. A layered look that takes seconds and stays exactly where you left it.",
    details: [
      "Set of three pre-layered chains",
      "18k gold plated, anti-tarnish finish",
      "Adjustable clasp, 40–48cm",
      "Designed to be worn in the shower",
      "Gift-ready keepsake box included",
    ],
  },
  {
    id: "perle-coin-necklace",
    name: "Perle & Coin Necklace",
    price: 1499,
    category: "Necklaces",
    image: "/images/coin-pearl.jpg",
    alt: "Gold chain necklace with a freshwater pearl and vintage coin pendant on warm paper",
    rating: 4.7,
    reviews: 61,
    description:
      "An irregular freshwater pearl next to a tiny vintage-style coin. Softly one-of-a-kind, just like the person wearing it.",
    details: [
      "Freshwater pearl with a natural silhouette",
      "18k gold plated over stainless steel",
      "Anti-tarnish, water-friendly finish",
      "42cm chain with a 5cm extender",
      "Each pearl is uniquely shaped",
    ],
  },
  {
    id: "everyday-huggies",
    name: "The Everyday Huggies",
    price: 899,
    category: "Earrings",
    image: "/images/hoops.jpg",
    alt: "Pair of chunky gold huggie hoop earrings on a travertine stone",
    tag: "Bestseller",
    tagTone: "dark",
    rating: 4.9,
    reviews: 312,
    description:
      "A quiet little statement. Weighted just enough to feel special, small enough to never take off. Sleep, shower, repeat.",
    details: [
      "Chunky huggie silhouette, 14mm",
      "18k gold plated, anti-tarnish finish",
      "Secure click closure",
      "Lightweight at 1.8g per earring",
      "Suitable for healed piercings",
    ],
  },
  {
    id: "golden-hour-ear-stack",
    name: "Golden Hour Ear Stack",
    price: 1199,
    category: "Earrings",
    image: "/images/ear-stack.jpg",
    alt: "Curated stack of small gold hoops and drop earrings worn on one ear",
    tag: "New in",
    tagTone: "light",
    rating: 4.8,
    reviews: 127,
    description:
      "The curated ear, done for you. Four mixed gold pieces designed to sit together like they were always meant to.",
    details: [
      "Set of four mixed studs & huggies",
      "18k gold plated, hypoallergenic",
      "Anti-tarnish, everyday finish",
      "Mix, match or wear as a stack",
      "Gift-ready card & pouch included",
    ],
  },
  {
    id: "aria-chain-bracelet",
    name: "Aria Chain Bracelet",
    price: 1099,
    category: "Bracelets",
    image: "/images/bracelet.jpg",
    alt: "Two delicate gold chain bracelets worn on a wrist against cream linen",
    tag: "Bestseller",
    tagTone: "dark",
    rating: 4.9,
    reviews: 176,
    description:
      "Fine, fluid and made for movement. A whisper of gold at the wrist that works from morning coffee to last call.",
    details: [
      "18k gold plated paperclip chain",
      "Anti-tarnish & splash-resistant",
      "16cm with a 4cm extender",
      "Lobster clasp closure",
      "Layers beautifully with the bangle set",
    ],
  },
  {
    id: "sunlit-bangle-set",
    name: "Sunlit Bangle Set",
    price: 1399,
    category: "Bracelets",
    image: "/images/bangles.jpg",
    alt: "Stack of slim gold bangles worn on a wrist resting on cream stone",
    tag: "New in",
    tagTone: "light",
    rating: 4.8,
    reviews: 83,
    description:
      "Five slim bangles that catch the light as you type, wave, reach. The easiest way to feel put together.",
    details: [
      "Set of five slim bangles",
      "18k gold plated, anti-tarnish",
      "Inner diameter 6cm",
      "Lightweight, quiet stack",
      "Gift-ready packaging",
    ],
  },
  {
    id: "lune-ring-stack",
    name: "The Lune Ring Stack",
    price: 999,
    category: "Rings",
    image: "/images/rings.jpg",
    alt: "Stack of three thin gold rings with a small pearl detail on ivory marble",
    rating: 4.7,
    reviews: 108,
    description:
      "Three thin bands, one little pearl. Wear them together or spread them across fingers — either way, they go everywhere.",
    details: [
      "Set of three stacking rings",
      "18k gold plated, anti-tarnish finish",
      "Available in sizes 5–9",
      "Hypoallergenic & nickel-free",
      "Gift-ready pouch included",
    ],
  },
];

export const gallery = [
  { image: "/images/ear-stack.jpg", caption: "The ear stack, softly done", alt: "Gold ear stack close-up" },
  { image: "/images/bracelet.jpg", caption: "Layers for every day", alt: "Gold bracelets on a wrist" },
  { image: "/images/bangles.jpg", caption: "A little light at the wrist", alt: "Gold bangle stack" },
  { image: "/images/lifestyle.jpg", caption: "Worn, not saved", alt: "Woman wearing gold jewelry in a sunlit interior" },
  { image: "/images/pendant-neck.jpg", caption: "Three chains, one mood", alt: "Layered gold necklaces on a neckline" },
  { image: "/images/coin-pearl.jpg", caption: "Pearl meets gold", alt: "Pearl and coin gold necklace" },
];

export const promises = [
  {
    title: "Anti-tarnish promise",
    copy: "A protective finish that keeps the gold glowing through real, everyday life.",
    icon: "shield",
  },
  {
    title: "18k gold plated",
    copy: "A generous layer of real 18k gold over a strong, skin-friendly base.",
    icon: "sparkle",
  },
  {
    title: "Made for daily wear",
    copy: "Splash-resistant and light enough to forget you have it on. Almost.",
    icon: "drop",
  },
  {
    title: "Kind to skin",
    copy: "Nickel-free, hypoallergenic and made for sensitive ears and hands.",
    icon: "heart",
  },
];

export const faqs = [
  {
    question: "What does anti-tarnish actually mean?",
    answer:
      "Every Sanush piece is 18k gold plated over stainless steel and sealed with a protective anti-tarnish finish. That means your gold stays golden for longer, even with daily wear. It isn't a forever-guarantee against every chemical, but with a little care it will keep its glow beautifully — think months and years, not weeks.",
  },
  {
    question: "Is it solid gold?",
    answer:
      "No — and we're always clear about that. Our pieces are 18k gold plated, which gives you the warm gold look and feel at an everyday price. The base is durable stainless steel, chosen because it's strong, water-friendly and kind to sensitive skin.",
  },
  {
    question: "Can I wear it in the shower or gym?",
    answer:
      "Gentle splashes are absolutely fine, and we know most of you will never take it off. To keep the plating at its best, we'd suggest removing your pieces before swimming, showering with strong soaps, or heavy workouts. Perfume, hairspray and chlorine are the three things gold plating likes least.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Add your favourites to the bag and head to checkout, or send us a DM on Instagram with a screenshot of the piece you love. We'll confirm availability, delivery and payment personally in your messages — a real human, every time.",
  },
  {
    question: "What about shipping and delivery?",
    answer:
      "We ship across India, usually within 2–4 business days of your order being confirmed. Every piece is packed in a gift-ready pouch or box, so it's ready for you or for someone you love. Tracking details are sent to you as soon as your parcel is on its way.",
  },
  {
    question: "What if something isn't right?",
    answer:
      "DM us within 48 hours of delivery with a photo and we'll sort it out together. For hygiene reasons, earrings and worn pieces can't be returned, but damaged or incorrect items are always made right. Our inbox is genuinely open — brands are built on the little things.",
  },
];

export const testimonials = [
  {
    quote:
      "I wore my Solaire chain in the shower, to the gym and to bed for three months. It still looks exactly like the day it arrived.",
    name: "Ananya R.",
    piece: "Solaire Coin Necklace",
    initials: "AR",
  },
  {
    quote:
      "The huggies are the perfect size — I have genuinely not taken them off. Ordering through Instagram was so easy too.",
    name: "Meher S.",
    piece: "The Everyday Huggies",
    initials: "MS",
  },
  {
    quote:
      "Bought the bangle set as a gift and ended up keeping it. Packaging felt like a proper little luxury, and nothing has faded.",
    name: "Riya K.",
    piece: "Sunlit Bangle Set",
    initials: "RK",
  },
  {
    quote:
      "Sensitive ears, happy ears. Three months of everyday wear and not a single itch or green mark. Already ordering the neck set.",
    name: "Tanvi P.",
    piece: "Golden Hour Ear Stack",
    initials: "TP",
  },
];

export const formatINR = (value: number) =>
  `₹${value.toLocaleString("en-IN")}`;
