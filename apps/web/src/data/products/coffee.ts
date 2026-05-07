import type { Product } from "./types";

export const coffeeProducts: Product[] = [
  {
    slug: "green-coffee-beans",
    name: "Green Coffee Beans",
    image: "/products/green-coffee-beans.png",
    description:
      "Unroasted green coffee beans with potential health benefits and perfect for custom roasting profiles.",
    longDescription:
      "Our green coffee beans are sourced directly from premium estates across South India. These unroasted beans offer roasters complete control over the final flavor profile. With high chlorogenic acid content and extended shelf life, green beans are ideal for roasteries seeking consistent, traceable coffee origins.",
    details: [
      "High chlorogenic acid content",
      "Customizable roast levels",
      "Fresh and natural",
      "Rich in antioxidants",
      "Extended shelf stability",
      "Single origin available",
    ],
    locations: ["Coorg", "Chikmagalur", "Wayanad", "Araku Valley"],
    category: "Coffee",
    priceRange: {
      min: 200,
      max: 800,
      unit: "per kg",
    },
    minimumOrder: {
      quantity: 60,
      unit: "kg",
    },
    grades: ["AAA", "AA", "A", "PB", "C"],
    packaging: ["60kg jute bags", "25kg bags", "Bulk containers"],
  },
  {
    slug: "roasted-coffee-beans",
    name: "Roasted Coffee Beans",
    image: "/products/roasted-coffee-beans.png",
    description:
      "Expertly roasted coffee beans with a perfect balance of aroma, flavor, and body for the ultimate coffee experience.",
    longDescription:
      "Our roasted coffee beans undergo precision roasting to unlock their full potential. Available in light, medium, and dark roast profiles, each batch is carefully monitored for optimal flavor development. Perfect for cafes, restaurants, and retail, our roasted beans deliver consistent quality cup after cup.",
    details: [
      "Medium to dark roast options",
      "Rich, bold flavor",
      "Aromatic and fresh",
      "Perfect for espresso or filter",
      "Consistent roast profile",
      "Freshly roasted to order",
    ],
    locations: ["Chikmagalur", "Coorg", "Wayanad", "Bababudangiri"],
    category: "Coffee",
    priceRange: {
      min: 350,
      max: 1200,
      unit: "per kg",
    },
    minimumOrder: {
      quantity: 25,
      unit: "kg",
    },
    grades: ["Premium", "Specialty", "Commercial"],
    packaging: ["1kg bags", "5kg bags", "10kg bags"],
  },
  {
    slug: "ground-coffee",
    name: "Ground Coffee",
    image: "/products/ground-coffee.png",
    description:
      "Freshly ground coffee powder ready to brew, delivering convenience without compromising on quality and taste.",
    longDescription:
      "Our ground coffee is freshly milled from premium roasted beans, ensuring maximum freshness and flavor extraction. Available in various grind sizes to suit different brewing methods - from espresso fine to French press coarse. Nitrogen-flushed packaging preserves aroma and extends shelf life.",
    details: [
      "Ready to brew",
      "Consistent grind size",
      "Rich aroma",
      "Versatile brewing methods",
      "Nitrogen-flushed freshness",
      "Multiple grind options",
    ],
    locations: ["Wayanad", "Chikmagalur", "Coorg", "Araku Valley"],
    category: "Coffee",
    priceRange: {
      min: 400,
      max: 1400,
      unit: "per kg",
    },
    minimumOrder: {
      quantity: 20,
      unit: "kg",
    },
    grades: ["Premium", "Specialty", "Commercial"],
    packaging: ["250g packs", "500g packs", "1kg bags", "5kg bags"],
  },
];
