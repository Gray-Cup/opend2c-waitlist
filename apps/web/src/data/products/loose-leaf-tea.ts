import type { Product } from "./types";

export const looseLeafTeaProducts: Product[] = [
  {
    slug: "loose-leaf-tea",
    name: "Loose Leaf Tea",
    image: "/products/loose-leaf-tea.png",
    description:
      "Artisanal loose leaf tea with whole leaves that unfurl beautifully, delivering a delicate and aromatic experience.",
    longDescription:
      "Our loose leaf teas represent the pinnacle of tea craftsmanship. Each batch is carefully hand-picked and processed to preserve the natural oils and complex flavor compounds. The whole leaves allow for multiple infusions, making it an economical choice for premium tea service. Available in orthodox and specialty varieties.",
    details: [
      "Whole leaf quality",
      "Complex flavor notes",
      "Multiple infusions possible",
      "Natural and unprocessed",
      "Hand-picked selection",
      "Premium grade options",
    ],
    locations: ["Darjeeling", "Assam", "Kangra", "Munnar"],
    category: "Tea",
    priceRange: {
      min: 300,
      max: 2500,
      unit: "per kg",
    },
    minimumOrder: {
      quantity: 50,
      unit: "kg",
    },
    grades: ["SFTGFOP", "FTGFOP", "TGFOP", "FOP", "OP"],
    packaging: ["5kg boxes", "10kg boxes", "25kg bags"],
  },
  {
    slug: "darjeeling-first-flush",
    name: "Darjeeling First Flush",
    image: "/products/loose-leaf-tea.png",
    description:
      "The champagne of teas - delicate, floral first flush Darjeeling with bright muscatel notes.",
    longDescription:
      "Harvested in early spring, our Darjeeling First Flush captures the essence of the Himalayan terroir. These tender young leaves produce a light, golden liquor with distinctive muscatel character and floral undertones. Highly prized by tea connoisseurs worldwide for its unique and refreshing taste.",
    details: [
      "Spring harvest excellence",
      "Distinctive muscatel flavor",
      "Light golden liquor",
      "Floral and fruity notes",
      "Single estate sourced",
      "Limited seasonal availability",
    ],
    locations: ["Darjeeling"],
    category: "Tea",
    priceRange: {
      min: 800,
      max: 3500,
      unit: "per kg",
    },
    minimumOrder: {
      quantity: 25,
      unit: "kg",
    },
    grades: ["SFTGFOP1", "FTGFOP1", "TGFOP1"],
    packaging: ["1kg boxes", "5kg boxes", "10kg boxes"],
  },
  {
    slug: "assam-orthodox",
    name: "Assam Orthodox",
    image: "/products/loose-leaf-tea.png",
    description:
      "Full-bodied Assam orthodox tea with bold malty character and rich golden tips.",
    longDescription:
      "Our Assam Orthodox tea is sourced from the lush gardens of the Brahmaputra Valley. Unlike CTC, these whole leaf teas are processed using traditional methods, resulting in a complex, full-bodied brew with distinctive malty sweetness and a hint of honey. The golden tips indicate the highest quality plucking standards.",
    details: [
      "Traditional orthodox processing",
      "Bold malty character",
      "Golden tips present",
      "Rich and full-bodied",
      "Second flush specialty",
      "Perfect for connoisseurs",
    ],
    locations: ["Assam", "Upper Assam", "Dibrugarh"],
    category: "Tea",
    priceRange: {
      min: 500,
      max: 2000,
      unit: "per kg",
    },
    minimumOrder: {
      quantity: 30,
      unit: "kg",
    },
    grades: ["TGFOP", "GFOP", "FOP", "FBOP"],
    packaging: ["5kg boxes", "10kg boxes", "25kg bags"],
  },
];
