import type { Product } from "./types";

export const ctcTeaProducts: Product[] = [
  {
    slug: "ctc-tea",
    name: "CTC Tea",
    image: "/products/ctc-tea.png",
    description:
      "Premium CTC (Crush, Tear, Curl) black tea with a robust flavor profile and rich, malty taste.",
    longDescription:
      "Our CTC tea is sourced from the finest tea gardens across India. The Crush, Tear, Curl process creates small, uniform granules that brew quickly and produce a strong, full-bodied cup. Perfect for chai preparations and milk tea blends, this tea offers consistent quality and exceptional value for bulk buyers.",
    details: [
      "Strong and full-bodied flavor",
      "Perfect for milk tea",
      "Quick brewing time",
      "Rich in antioxidants",
      "Consistent particle size",
      "Extended shelf life",
    ],
    locations: ["Assam", "Darjeeling", "Nilgiri", "Dooars"],
    category: "Tea",
    categoryTwo: "Single Origin",
    priceRange: {
      min: 150,
      max: 450,
      unit: "per kg",
    },
    minimumOrder: {
      quantity: 100,
      unit: "kg",
    },
    grades: ["BOP", "BOPSM", "BP", "PD", "Dust"],
    packaging: ["25kg bags", "50kg bags", "Bulk containers"],
  },
  {
    slug: "ctc-premium-blend",
    name: "CTC Premium Blend",
    image: "/products/ctc-tea.png",
    description:
      "A carefully crafted blend of premium CTC teas from multiple estates for a balanced, consistent taste.",
    longDescription:
      "Our CTC Premium Blend combines the best characteristics of teas from Assam, Dooars, and Nilgiri regions. This expertly blended tea delivers a consistent cup every time, with rich color, strong body, and a satisfying finish. Ideal for commercial tea service and retail packaging.",
    details: [
      "Expertly blended for consistency",
      "Rich amber liquor",
      "Strong malty notes",
      "Excellent milk absorption",
      "Quality assured batches",
      "Versatile brewing applications",
    ],
    locations: ["Assam", "Dooars", "Nilgiri"],
    category: "Tea",
    categoryTwo: "Blend",
    priceRange: {
      min: 200,
      max: 550,
      unit: "per kg",
    },
    minimumOrder: {
      quantity: 50,
      unit: "kg",
    },
    grades: ["Premium BOP", "Super Fine", "Export Grade"],
    packaging: ["10kg boxes", "25kg bags", "50kg bags"],
  },
];
