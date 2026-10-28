export const INSTAGRAM_URL = "https://www.instagram.com/sanush_accessories";
export const INSTAGRAM_HANDLE = "@sanush_accessories";

export const post = (code: string) =>
  `https://www.instagram.com/sanush_accessories/reel/${code}/`;

export type Category = "Earrings" | "Bracelets" | "Bangles" | "Rings";

export type Product = {
  id: string;
  name: string;
  /** Catalog price in INR. */
  price?: number;
  category: Category;
  image: string;
  alt: string;
  tag?: string;
  tagTone?: "dark" | "light";
  description: string;
  details: string[];
  instagramUrl: string;
};

export type PricedProduct = Product & { price: number };

export const isPriced = (product: Product): product is PricedProduct =>
  product.price !== undefined;

export const categories: ("All" | Category)[] = [
  "All",
  "Earrings",
  "Bracelets",
  "Bangles",
  "Rings",
];

// Temporary demo prices; replace them with the brand's current rates.
export const products: Product[] = [
  {
    id: "pink-stone-pearl-jhumka",
    name: "Pink Stone & Pearl Jhumka",
    price: 649,
    category: "Earrings",
    image: "/images/products/jhumka-pink-pearl.jpg",
    alt: "Two gold jhumka earrings set with pale pink stones, framed with small clear stones and finished with pearl and pink bead drops",
    tag: "From Instagram",
    tagTone: "light",
    description:
      "A pair of gold jhumkas with soft pink centre stones, a halo of small clear stones and a fringe of pearls and pink beads. Shown in two sizes so you can pick the weight you want.",
    details: [
      "Pink stone centre with clear stone detailing",
      "Pearl and bead fringe",
      "Available in two sizes",
      "18k gold plated, anti-tarnish finish",
      "Packed in a gift-ready pouch",
    ],
    instagramUrl: post("De__uUcvC05"),
  },
  {
    id: "green-stone-pearl-jhumka",
    name: "Green Stone & Pearl Jhumka",
    price: 649,
    category: "Earrings",
    image: "/images/products/jhumka-green-pearl.jpg",
    alt: "Pair of gold jhumka earrings with rectangular green stones, filigree crown tops and drops of pearls and red beads",
    tag: "From Instagram",
    tagTone: "light",
    description:
      "Filigree crown tops, a rectangular green stone and a scatter of pearls and red beads underneath. The festive pair that finishes a look on its own.",
    details: [
      "Rectangular green stone centre",
      "Filigree crown detail at the top",
      "Pearl and red bead drops",
      "18k gold plated, anti-tarnish finish",
      "Packed in a gift-ready pouch",
    ],
    instagramUrl: post("DerV9XVPQ7m"),
  },
  {
    id: "blue-enamel-clover-bracelet",
    name: "Blue Enamel Clover Bracelet",
    price: 399,
    category: "Bracelets",
    image: "/images/products/bracelet-blue-clover.jpg",
    alt: "Fine gold chain bracelet with two blue enamel clover motifs and gold bead detailing on a wrist",
    description:
      "Blue enamel clovers on the finest gold chain, with a little gold bead work between them. A colour-pop bracelet that reads dainty rather than loud.",
    details: [
      "Blue enamel clover motifs",
      "Fine gold chain with bead detailing",
      "Adjustable clasp for a close fit",
      "18k gold plated, anti-tarnish finish",
      "Packed in a gift-ready pouch",
    ],
    instagramUrl: post("Deei2SzPsfT"),
  },
  {
    id: "baby-size-bracelet",
    name: "Baby Size Bracelet",
    price: 349,
    category: "Bracelets",
    image: "/images/products/bracelet-baby-gold.jpg",
    alt: "Slim flat gold bracelet with small set stones worn close on a thin wrist",
    description:
      "Made for slim wrists. A flat, close-fitting chain with tiny set stones — the one you can wear every day without noticing it.",
    details: [
      "Smaller sizing for thin wrists",
      "Flat chain with small set stones",
      "Lightweight and close-fitting",
      "18k gold plated, anti-tarnish, hypoallergenic",
      "Packed in a gift-ready pouch",
    ],
    instagramUrl: post("DS-OrdOj9WA"),
  },
  {
    id: "white-enamel-bangle",
    name: "White Enamel Bangle",
    price: 449,
    category: "Bangles",
    image: "/images/products/bangle-white-enamel.jpg",
    alt: "Slim gold bangle inlaid with white enamel petal shapes held between two fingers",
    description:
      "A slim bangle inlaid with white enamel petals, so it catches the light without any weight. Quiet on its own, lovely in a stack.",
    details: [
      "White enamel petal inlay",
      "Slim, lightweight bangle",
      "Wears well alone or stacked",
      "18k gold plated, anti-tarnish finish",
      "Packed in a gift-ready pouch",
    ],
    instagramUrl: post("De0dhs7vK8M"),
  },
  {
    id: "leaf-detail-bangle-pair",
    name: "Leaf Detail Bangle Pair",
    price: 499,
    category: "Bangles",
    image: "/images/products/bangle-leaf-pair.jpg",
    alt: "Two slim open bangles with small leaf motifs at the ends, one gold toned and one silver toned, held in hand",
    description:
      "Two slim open bangles finished with a little leaf at each end — one warm gold, one cool silver, so you can mix the pair or wear them apart.",
    details: [
      "Set of two open bangles",
      "Leaf motif at each end",
      "Gold and silver tones to mix",
      "Baby sizing for thinner wrists",
      "Anti-tarnish, hypoallergenic finish",
    ],
    instagramUrl: post("Dd1cQOjybY1"),
  },
  {
    id: "stone-solitaire-ring",
    name: "Stone Solitaire Ring",
    price: 299,
    category: "Rings",
    image: "/images/products/ring-stone-gold.jpg",
    alt: "Gold ring set with an oval clear stone in a stone-studded halo, with a chain-link band detail, held between two fingers",
    tag: "From Instagram",
    tagTone: "light",
    description:
      "An oval clear stone in a studded halo, on a band with a chain-link detail. The little solitaire that reads engagement-ring from across the room.",
    details: [
      "Oval clear stone with stone halo",
      "Chain-link band detailing",
      "Lightweight for everyday wear",
      "18k gold plated, anti-tarnish finish",
      "Packed in a gift-ready pouch",
    ],
    instagramUrl: post("Dd6g-pVyHcL"),
  },
  {
    id: "pink-stone-chandbali",
    name: "Pink Stone Chandbali",
    price: 549,
    category: "Earrings",
    image: "/images/products/chandbali-pink.jpg",
    alt: "Pair of pink chandbali earrings with open arcs, clear stone accents and clustered pink bead drops held in one hand",
    tag: "From Instagram",
    tagTone: "light",
    description:
      "A bright pink chandbali pair with open arcs, clustered stone-look drops and a playful fringe of matching beads.",
    details: [
      "Pink and clear stone-look detailing",
      "Open chandbali arcs",
      "Clustered drops with bead dangles",
      "Sold as a pair",
    ],
    instagramUrl: post("De3M-C-vrmk"),
  },
  {
    id: "blue-stone-chandbali",
    name: "Blue Stone Chandbali",
    price: 549,
    category: "Earrings",
    image: "/images/products/chandbali-blue.jpg",
    alt: "Pair of blue chandbali earrings with open arcs, clear stone accents and blue and white bead drops held in two hands",
    description:
      "Deep blue accents and clear stone-look details sit along open chandbali arcs, finished with blue and white bead dangles.",
    details: [
      "Blue and clear stone-look detailing",
      "Open chandbali arcs",
      "Blue and white bead dangles",
      "Sold as a pair",
    ],
    instagramUrl: post("DezPyyFv1q6"),
  },
  {
    id: "yellow-oxidised-drop-earrings",
    name: "Yellow Oxidised Drop Earrings",
    price: 499,
    category: "Earrings",
    image: "/images/products/earrings-yellow-oxidised.jpg",
    alt: "Pair of silver-toned drop earrings with yellow centre panels, floral studs and rows of small jhumka dangles",
    description:
      "Yellow centre panels framed by dark silver-toned scrollwork, with floral studs and a row of tiny jhumka drops.",
    details: [
      "Yellow centre panels",
      "Floral stud tops",
      "Oxidised silver-toned frames",
      "Small jhumka dangles",
    ],
    instagramUrl: post("De1zhZVPcUN"),
  },
  {
    id: "blush-green-silver-jhumka",
    name: "Blush & Green Silver Jhumka",
    price: 599,
    category: "Earrings",
    image: "/images/products/jhumka-blush-silver.jpg",
    alt: "Pair of ornate silver-toned jhumka earrings with blush pink stones, green accents and multiple bell-shaped drops",
    tag: "From Instagram",
    tagTone: "light",
    description:
      "Blush pink stones and green accents bring colour to this ornate silver-toned pair, layered with several bell-shaped jhumka drops.",
    details: [
      "Blush pink stone centres",
      "Green stone-look accents",
      "Ornate silver-toned detailing",
      "Multiple jhumka drops",
    ],
    instagramUrl: post("DUgC8y3jzk3"),
  },
  {
    id: "lavender-silver-jhumka",
    name: "Lavender Silver Jhumka",
    price: 599,
    category: "Earrings",
    image: "/images/products/jhumka-lavender-silver.jpg",
    alt: "Pair of silver-toned jhumka earrings with lavender teardrop tops, circular filigree panels and several bell-shaped drops",
    description:
      "Lavender teardrop tops meet circular silver-toned filigree panels and a lively cluster of small jhumka drops.",
    details: [
      "Lavender teardrop tops",
      "Circular filigree panels",
      "Silver-toned finish",
      "Multiple jhumka drops",
    ],
    instagramUrl: post("DdtdJJUPTVt"),
  },
];

export const gallery = [
  {
    image: "/images/products/jhumka-pink-pearl.jpg",
    caption: "Pink stone, pearl drop",
    alt: "Gold jhumka earrings with pink stones and pearl drops",
    instagramUrl: post("De__uUcvC05"),
  },
  {
    image: "/images/products/bracelet-blue-clover.jpg",
    caption: "Blue clovers on fine gold",
    alt: "Gold chain bracelet with blue enamel clovers",
    instagramUrl: post("Deei2SzPsfT"),
  },
  {
    image: "/images/products/bangle-white-enamel.jpg",
    caption: "Enamel petals, worn close",
    alt: "Slim gold bangle with white enamel inlay",
    instagramUrl: post("De0dhs7vK8M"),
  },
  {
    image: "/images/products/jhumka-green-pearl.jpg",
    caption: "Green stone for festive days",
    alt: "Gold jhumka earrings with green stones and pearl drops",
    instagramUrl: post("DerV9XVPQ7m"),
  },
  {
    image: "/images/products/bracelet-baby-gold.jpg",
    caption: "Sized for thin wrists",
    alt: "Slim gold bracelet with small set stones on a wrist",
    instagramUrl: post("DS-OrdOj9WA"),
  },
  {
    image: "/images/products/ring-stone-gold.jpg",
    caption: "The little solitaire",
    alt: "Gold ring with an oval clear stone and chain-link band",
    instagramUrl: post("Dd6g-pVyHcL"),
  },
  {
    image: "/images/products/bangle-leaf-pair.jpg",
    caption: "Leaf at each end",
    alt: "Two slim open bangles with leaf motifs, gold and silver toned",
    instagramUrl: post("Dd1cQOjybY1"),
  },
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
      "Every Sanush piece is 18k gold plated over a durable base and sealed with a protective anti-tarnish finish. That means your gold stays golden for longer, even with daily wear. It isn't a forever-guarantee against every chemical, but with a little care it will keep its glow beautifully — think months and years, not weeks.",
  },
  {
    question: "Is it solid gold?",
    answer:
      "No — and we're always clear about that. Our pieces are 18k gold plated, which gives you the warm gold look and feel at an everyday price. The base is chosen because it's strong, water-friendly and kind to sensitive skin.",
  },
  {
    question: "Can I wear it in the shower or gym?",
    answer:
      "Gentle splashes are absolutely fine, and we know most of you will never take it off. To keep the plating at its best, we'd suggest removing your pieces before swimming, showering with strong soaps, or heavy workouts. Perfume, hairspray and chlorine are the three things gold plating likes least.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Add your favourites to the bag, fill in your shipping details and pay securely through Razorpay — cards, UPI, netbanking or wallets. Your order is confirmed the moment payment goes through, and we pack it by hand. If a piece shows as price on request, message us and we'll send today's price first.",
  },
  {
    question: "What about shipping and delivery?",
    answer:
      "We ship across India, usually within 2–4 business days of your order being confirmed. Shipping is complimentary on orders above ₹999. Every piece is packed in a gift-ready pouch or box, and tracking details reach you as soon as your parcel is on its way.",
  },
  {
    question: "What if something isn't right?",
    answer:
      "Please check your piece at delivery and message us within 48 hours with a photo if anything is off. As stated on our Instagram, orders are prepaid only, there's no cash on delivery, and we don't accept returns or exchanges — so if you have any doubt about size or colour, ask us before you pay and we'll sort it with you.",
  },
];

export const formatINR = (value: number) =>
  `₹${value.toLocaleString("en-IN")}`;

export const priceLabel = (product: Product) =>
  product.price === undefined ? "Price on request" : formatINR(product.price);

export const BRAND_NAME = "Sanush Accessories";

export const FREE_SHIPPING_AT = 999;
export const SHIPPING_FEE = 75;

export const PAYMENT_NOTE =
  "Prepaid orders only · no cash on delivery · free shipping on orders above ₹999.";

export const RAZORPAY_KEY_ID =
  import.meta.env.VITE_RAZORPAY_KEY_ID ?? "rzp_test_REPLACE_WITH_YOUR_KEY_ID";
