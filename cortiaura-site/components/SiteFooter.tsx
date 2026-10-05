import React from 'react';
import Link from 'next/link';

const SiteFooter: React.FC = () => {
  return (
    <footer className="bg-raisin text-[#E8DEDF]">
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label="CortiAura home">
            <img src="/assets/logo-white.svg" alt="CortiAura" className="h-8 w-auto" />
          </Link>
          <p className="mt-4 max-w-sm text-[15px] text-[#BDB3B5]">
            A UK neurotechnology company developing a non-invasive wearable built around the gut–brain connection.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-white">Explore</h2>
          <ul className="mt-3 space-y-2 text-[15px]">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/news" className="hover:text-white">News</Link></li>
            <li><Link href="/founding" className="hover:text-white">Founding Community</Link></li>
            <li><Link href="/investors" className="hover:text-white">Investors</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-white">Follow us</h2>
          <ul className="mt-3 space-y-2 text-[15px]">
            <li>
              <a href="https://www.linkedin.com/company/cortiaura" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://x.com/CortiAura" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                X (Twitter)
              </a>
            </li>
          </ul>
          <h2 className="mt-6 font-semibold text-white">Legal</h2>
          <ul className="mt-3 space-y-2 text-[15px]">
            <li><Link href="/privacy" className="hover:text-white">Privacy policy</Link></li>
            <li><Link href="/cookies" className="hover:text-white">Cookie policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="container-site py-6 text-sm text-[#BDB3B5]">
          © {new Date().getFullYear()} CortiAura™. CortiAura is in development and not yet available. Content on this
          site is for general information only and is not medical advice.
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
