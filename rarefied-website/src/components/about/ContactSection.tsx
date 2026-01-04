import Link from "next/link";

export function ContactSection() {
  return (
    <section className="py-12 md:py-16 border-t border-gray-200">
      <div className="container-narrow">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Get in Touch
          </h2>

          <p className="text-gray-600 text-lg mb-10">
            Have questions, story ideas, or conservation success stories to
            share? We&apos;d love to hear from you.
          </p>

          {/* Two-card grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Email Card - Olive Green */}
            <a
              href="mailto:rarefiedpod@gmail.com"
              className="group relative bg-[var(--olive)] rounded-2xl p-8 text-left transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-[var(--olive-light)] opacity-30 rounded-bl-[4rem] rounded-tr-2xl" />

              <div className="relative">
                {/* Icon */}
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                <p className="text-white/90 font-medium group-hover:text-white transition-colors">
                  rarefiedpod@gmail.com
                </p>

                {/* Arrow indicator */}
                <div className="mt-4 flex items-center text-white/70 text-sm group-hover:text-white transition-colors">
                  <span>Send us a message</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </a>

            {/* Follow Us Card - White */}
            <Link
              href="https://www.instagram.com/rarefied.pod/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white border-2 border-gray-200 rounded-2xl p-8 text-left transition-all duration-300 hover:border-[var(--sky)] hover:shadow-xl hover:scale-[1.02]"
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-[var(--sage-light)] opacity-40 rounded-bl-[4rem] rounded-tr-2xl group-hover:bg-[var(--sky-light)] transition-colors" />

              <div className="relative">
                {/* Icon */}
                <div className="w-12 h-12 bg-[var(--sage-light)] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[var(--sky-light)] transition-colors">
                  <svg
                    className="w-6 h-6 text-[var(--olive)] group-hover:text-[var(--sky-dark)] transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>

                <h3 className="text-lg font-semibold text-black mb-2">
                  Follow Us
                </h3>
                <p className="text-gray-600 font-medium group-hover:text-[var(--sky-dark)] transition-colors">
                  @rarefied.pod
                </p>

                {/* Arrow indicator */}
                <div className="mt-4 flex items-center text-gray-400 text-sm group-hover:text-[var(--sky)] transition-colors">
                  <span>Follow on Instagram</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
