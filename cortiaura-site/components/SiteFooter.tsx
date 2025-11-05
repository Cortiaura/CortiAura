import React from 'react';

const SiteFooter: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#0B0B1A]">
      <div className="container mx-auto px-4 lg:px-8 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <a href="/" className="flex items-center gap-2 text-white/90">
            <img src="/assets/logo-dark.png" alt="CortiAura" className="h-10 md:h-12 w-auto" />
            <span className="sr-only">CortiAura</span>
          </a>
          <p className="mt-3 text-[#F9F6FA]/75 max-w-sm">
            Exploring the Science of Calm — evidence-led, ethical, and designed for everyday life.
          </p>
        </div>

        <div>
          <h3 className="text-white/90 font-medium">Links</h3>
          <ul className="mt-3 space-y-2 text-[#F9F6FA]/80">
            <li><a href="/about" className="hover:text-white transition">About</a></li>
            <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
            <li><a href="/privacy" className="hover:text-white transition">Privacy</a></li>
            <li><a href="/cookies" className="hover:text-white transition">Cookies</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white/90 font-medium">Social</h3>
          <div className="mt-3 flex items-center gap-3">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/cortiaura/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CortiAura on LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/80 hover:text-white hover:bg-[#0A66C2] transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7 0h3.8v2.05h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.75 2.63 4.75 6.05V23h-4v-6.7c0-1.6-.03-3.65-2.23-3.65-2.23 0-2.57 1.74-2.57 3.53V23h-4V8z"/>
              </svg>
            </a>
            {/* X (Twitter) */}
            <a
              href="#"
              aria-label="CortiAura on X"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/80 hover:text-black hover:bg-white transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.27l-4.91-5.95L5.7 22H2.44l8.02-9.17L1.5 2h6.36l4.45 5.39L18.244 2zm-1.1 18h2.04L8.91 4h-2.1l10.334 16z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="#"
              aria-label="CortiAura on Instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/80 hover:text-white transition [transition-background:colors] hover:[background:linear-gradient(135deg,_#F58529_0%,_#DD2A7B_50%,_#8134AF_100%)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3.5A5.5 5.5 0 117 13a5.5 5.5 0 015-5.5zm0 2A3.5 3.5 0 1015.5 13 3.5 3.5 0 0012 9.5zM17.5 6a1 1 0 11-1 1 1 1 0 011-1z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6 text-center text-[#F9F6FA]/60 text-sm">
          © CortiAura™ — Exploring the Science of Calm. Not medical advice.
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
