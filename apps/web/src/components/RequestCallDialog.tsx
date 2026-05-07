"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Turnstile, useTurnstile } from "@/components/ui/turnstile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type FormData = {
  name: string;
  phone: string;
  companyName: string;
  agenda: string;
};

function formatPhoneNumber(value: string): string {
  // Remove all non-digit characters except +
  const cleaned = value.replace(/[^\d+]/g, "");

  // Handle numbers with country code (starting with +)
  if (cleaned.startsWith("+")) {
    const countryCode = cleaned.slice(0, 3); // e.g., +91
    const number = cleaned.slice(3);

    if (number.length <= 5) {
      return `${countryCode} ${number}`;
    } else {
      return `${countryCode} ${number.slice(0, 5)} ${number.slice(5, 10)}`;
    }
  }

  // Handle numbers without country code (assume Indian)
  if (cleaned.length <= 5) {
    return cleaned;
  } else {
    return `${cleaned.slice(0, 5)} ${cleaned.slice(5, 10)}`;
  }
}

export function RequestCallDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const turnstile = useTurnstile();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    companyName: "",
    agenda: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setFormData((prev) => ({ ...prev, phone: formatPhoneNumber(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/call-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken: turnstile.token,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setIsSubmitted(true);

      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
        turnstile.reset();
        setFormData({
          name: "",
          phone: "",
          companyName: "",
          agenda: "",
        });
      }, 2000);
    } catch (error) {
      console.error("Call request error:", error);
      alert("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="lightgray" size="sm">
          Request Call
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Request a Call</DialogTitle>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Call Request Submitted!
            </h3>
            <p className="text-muted-foreground">
              Our team will call you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                placeholder="Your company name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="agenda">Agenda / Purpose of Call *</Label>
              <Textarea
                id="agenda"
                name="agenda"
                value={formData.agenda}
                onChange={handleChange}
                required
                placeholder="What would you like to discuss?"
                rows={3}
              />
            </div>

            <Turnstile
              onVerify={turnstile.handleVerify}
              onError={turnstile.handleError}
              onExpire={turnstile.handleExpire}
              size="normal"
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="blue"
                size="lg"
                className="w-full"
                disabled={isSubmitting || !turnstile.isVerified}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Request"
                )}
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              By submitting, you agree to be contacted by our team.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
