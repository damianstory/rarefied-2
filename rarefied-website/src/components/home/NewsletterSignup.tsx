"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    // TODO: Integrate with Beehiiv API
    // For now, simulate a successful submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="bg-[var(--sage-light)] py-16">
      <div className="container-narrow text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-black mb-4">
          Stay in the Loop
        </h2>
        <p className="text-gray-700 mb-8 max-w-md mx-auto">
          Subscribe to our newsletter for the latest episodes, conservation news,
          and behind-the-scenes content.
        </p>

        {status === "success" ? (
          <div className="bg-white/50 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-[var(--olive-dark)] font-medium">
              Thanks for subscribing! Check your inbox to confirm.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-lg border border-[var(--sage-dark)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--sky)] focus:border-transparent"
            />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-4 text-red-600 text-sm">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  );
}
