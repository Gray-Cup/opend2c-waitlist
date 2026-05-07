export type Product = {
  slug: string;
  name: string;
  image: string;
  description: string;
  longDescription?: string;
  details: string[];
  locations: string[];
  category: "Tea" | "Coffee" | "Matcha";
  categoryTwo?: "Single Origin" | "Blend" | "Premium";
  priceRange: {
    min: number;
    max: number;
    unit: string;
  };
  minimumOrder: {
    quantity: number;
    unit: string;
  };
  grades: string[];
  packaging: string[];
};
