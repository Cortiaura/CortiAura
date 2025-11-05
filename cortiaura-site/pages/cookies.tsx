import Head from 'next/head';
import SiteLayout from '../components/SiteLayout';

export default function Cookies() {
  return (
    <SiteLayout>
      <Head>
        <title>Cookie Policy — CortiAura™</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="bg-[#0B0B1A] py-16">
        <section className="container mx-auto px-4 lg:px-8 max-w-3xl text-[#F9F6FA]">
          <h1 className="text-3xl font-semibold text-white">Cookie Policy</h1>
          <nav className="mt-6 text-sm text-[#F9F6FA]/80">
            <ul className="list-disc list-inside space-y-1">
              <li><a href="#what" className="hover:underline">What are cookies</a></li>
              <li><a href="#types" className="hover:underline">Types of cookies we use</a></li>
              <li><a href="#use" className="hover:underline">How we use cookies</a></li>
              <li><a href="#manage" className="hover:underline">Managing cookies</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
            </ul>
          </nav>

          <div className="prose prose-invert max-w-none mt-8">
            <h2 id="what">What are cookies</h2>
            <p>Cookies are small text files stored on your device to help websites function and improve your experience.</p>

            <h2 id="types">Types of cookies we use</h2>
            <ul>
              <li><strong>Essential</strong>: required for core site features.</li>
              <li><strong>Performance</strong>: helps us understand usage (aggregated).</li>
              <li><strong>Preferences</strong>: remembers your choices (e.g., consent).</li>
            </ul>

            <h2 id="use">How we use cookies</h2>
            <p>We use essential cookies for security and basic operations, and limited performance cookies to improve content. We do not use cookies for targeted ads.</p>

            <h2 id="manage">Managing cookies</h2>
            <p>You can accept or decline non-essential cookies via the banner, and manage cookies in your browser settings.</p>

            <h2 id="contact">Contact</h2>
            <p>Questions? Contact us at <a href="mailto:prashant@cortiaura.com">prashant@cortiaura.com</a>.</p>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
