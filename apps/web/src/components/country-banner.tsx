"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

interface LocationData {
  country: string;
  city?: string;
  region?: string;
}

// Map of country codes to friendly names
const COUNTRY_NAMES: Record<string, string> = {
  US: "United States",
  GB: "United Kingdom",
  CA: "Canada",
  AU: "Australia",
  DE: "Germany",
  FR: "France",
  JP: "Japan",
  CN: "China",
  SG: "Singapore",
  AE: "UAE",
  SA: "Saudi Arabia",
  KW: "Kuwait",
  QA: "Qatar",
  BH: "Bahrain",
  OM: "Oman",
  MY: "Malaysia",
  TH: "Thailand",
  ID: "Indonesia",
  PH: "Philippines",
  VN: "Vietnam",
  KR: "South Korea",
  NZ: "New Zealand",
  ZA: "South Africa",
  NG: "Nigeria",
  KE: "Kenya",
  EG: "Egypt",
  BR: "Brazil",
  MX: "Mexico",
  AR: "Argentina",
  CL: "Chile",
  CO: "Colombia",
  NL: "Netherlands",
  BE: "Belgium",
  SE: "Sweden",
  NO: "Norway",
  DK: "Denmark",
  FI: "Finland",
  IT: "Italy",
  ES: "Spain",
  PT: "Portugal",
  PL: "Poland",
  RU: "Russia",
  TR: "Turkey",
  IL: "Israel",
  PK: "Pakistan",
  BD: "Bangladesh",
  LK: "Sri Lanka",
  NP: "Nepal",
  IN: "India",
};

export function CountryBanner() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // Check for environment override first (for testing)
        const locationOverride = process.env.NEXT_PUBLIC_LOCATION_OVERRIDE;

        if (locationOverride) {
          // Format: "US" or "US,New York,New York"
          const [country, city, region] = locationOverride.split(",");
          setLocation({ country: country.trim(), city, region });
          setIsVisible(country.trim().toUpperCase() !== "IN");
          setIsLoading(false);
          return;
        }

        // Fetch from ipinfo.io
        const token = process.env.NEXT_PUBLIC_IPINFO_TOKEN;
        const url = token
          ? `https://ipinfo.io/json?token=${token}`
          : "https://ipinfo.io/json";
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch location");

        const data = await response.json();
        setLocation({
          country: data.country,
          city: data.city,
          region: data.region,
        });

        // Show banner only if NOT from India
        setIsVisible(data.country !== "IN");
      } catch (error) {
        console.error("Error fetching location:", error);
        // Don't show banner on error
        setIsVisible(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (isLoading || !isVisible || !location) {
    return null;
  }

  const countryName = COUNTRY_NAMES[location.country] || location.country;

  return (
    <div className="bg-neutral-700 text-white py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 text-center text-sm md:text-base">
          <span>
            👋 Seems like you&apos;re visiting from{" "}
            <strong>{countryName}</strong>! This website is for customers in
            India.{" "}
            <Link
              href="/contact"
              className="underline font-semibold hover:text-blue-100 transition-colors"
            >
              Contact us
            </Link>{" "}
            for international inquiries.
          </span>
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Close banner"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
