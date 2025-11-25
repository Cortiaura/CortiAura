import React from 'react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={
        `sticky top-0 inset-x-0 z-30 transition-colors` +
        (scrolled
          ? ' bg-[#231F20]/90 backdrop-blur border-b border-white/10'
          : ' bg-gradient-to-b from-[#F9E4E5]/95 to-transparent border-b border-white/0')
      }
    >
      <div className="container mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 text-white">
          <img src="/assets/logo.svg" alt="CortiAura" className="h-16 md:h-20 lg:h-24 w-auto" />
          <span className="sr-only">CortiAura</span>
        </a>
        <nav className="flex items-center gap-6">
          <a href="/about" className="text-[#970148] hover:text-[#FBDDCF] font-medium transition-colors">About</a>
          <a href="/blog" className="text-[#970148] hover:text-[#FBDDCF] font-medium transition-colors">Blog</a>
          <a href="/news" className="text-[#970148] hover:text-[#FBDDCF] font-medium transition-colors">News</a>
          <a href="/#get-involved" className="text-white rounded-md px-3 py-1.5 bg-gradient-to-r from-[#970148] to-[#FBDDCF] font-medium hover:opacity-95 transition">Join</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
