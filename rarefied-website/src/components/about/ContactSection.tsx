import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export function ContactSection() {
  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/rarefied.pod/#",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="py-12 md:py-16 border-t border-gray-200">
      <div className="container-narrow">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Get in Touch
          </h2>

          <p className="text-gray-700 text-lg mb-8">
            Have questions, story ideas, or conservation success stories to share? We'd love to hear from you.
          </p>

          <div className="space-y-6">
            {/* Email */}
            <div className="bg-[var(--olive)] rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Email
              </h3>
              <a
                href="mailto:rarefiedpod@gmail.com"
                className="text-white hover:text-[var(--sage-light)] text-lg font-medium transition-colors"
              >
                rarefiedpod@gmail.com
              </a>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-4">
                Follow Us
              </h3>
              <div className="flex justify-center gap-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.url || "#"}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-[var(--sky)] hover:text-[var(--sky)] transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                    <span className="font-medium">{social.name}</span>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
