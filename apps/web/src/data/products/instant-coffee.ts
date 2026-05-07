import type { Product } from "./types";

export const instantCoffeeProducts: Product[] = [
  {
    slug: "instant-coffee-spray-dried",
    name: "Instant Coffee (Spray Dried)",
    image: "/products/ground-coffee.png",
    description:
      "Premium spray-dried instant coffee with excellent solubility and rich coffee flavor for quick preparation.",
    longDescription:
      "Our spray-dried instant coffee is manufactured using advanced processing technology to preserve the authentic coffee taste. The fine powder dissolves instantly in hot or cold water, making it perfect for busy commercial kitchens, vending machines, and ready-to-drink applications. Available in various intensities to match your requirements.",
    details: [
      "Instant solubility",
      "Rich authentic taste",
      "No residue formula",
      "Hot and cold compatible",
      "Consistent quality",
      "Long shelf life",
    ],
    locations: ["Chikmagalur", "Coorg", "Wayanad"],
    category: "Coffee",
    priceRange: {
      min: 300,
      max: 900,
      unit: "per kg",
    },
    minimumOrder: {
      quantity: 50,
      unit: "kg",
    },
    grades: ["Premium", "Standard", "Economy"],
    packaging: ["25kg bags", "10kg boxes", "Bulk drums"],
  },
  {
    slug: "instant-coffee-freeze-dried",
    name: "Instant Coffee (Freeze Dried)",
    image: "/products/ground-coffee.png",
    description:
      "Superior freeze-dried instant coffee that retains maximum aroma and delivers a café-quality experience.",
    longDescription:
      "Our freeze-dried instant coffee represents the pinnacle of instant coffee technology. The low-temperature freeze-drying process locks in volatile aromatics and flavor compounds, resulting in a product that closely mimics freshly brewed coffee. Ideal for premium retail products and specialty food service applications.",
    details: [
      "Superior aroma retention",
      "Café-quality taste",
      "Crystal granule format",
      "Premium bean selection",
      "No artificial additives",
      "Perfect for specialty retail",
    ],
    locations: ["Coorg", "Chikmagalur", "Araku Valley"],
    category: "Coffee",
    priceRange: {
      min: 600,
      max: 1800,
      unit: "per kg",
    },
    minimumOrder: {
      quantity: 25,
      unit: "kg",
    },
    grades: ["Specialty", "Premium", "Gourmet"],
    packaging: ["5kg boxes", "10kg boxes", "25kg bags"],
  },
  {
    slug: "instant-coffee-chicory-blend",
    name: "Instant Coffee Chicory Blend",
    image: "/products/ground-coffee.png",
    description:
      "Traditional South Indian style instant coffee blended with chicory for a rich, smooth flavor profile.",
    longDescription:
      "Our Instant Coffee Chicory Blend brings the beloved South Indian filter coffee taste in an instant format. The carefully balanced ratio of coffee and chicory creates a full-bodied, slightly sweet brew with reduced bitterness. Perfect for traditional coffee lovers who want convenience without compromising on authentic taste.",
    details: [
      "Authentic South Indian taste",
      "Coffee-chicory balanced blend",
      "Smooth and less bitter",
      "Rich dark color",
      "Traditional flavor profile",
      "Economical choice",
    ],
    locations: ["Chikmagalur", "Coorg", "Salem"],
    category: "Coffee",
    priceRange: {
      min: 250,
      max: 700,
      unit: "per kg",
    },
    minimumOrder: {
      quantity: 50,
      unit: "kg",
    },
    grades: ["70:30 Blend", "60:40 Blend", "80:20 Blend"],
    packaging: ["10kg boxes", "25kg bags", "50kg bags"],
  },
];
