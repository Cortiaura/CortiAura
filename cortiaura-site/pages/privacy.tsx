import Head from 'next/head';
import SiteLayout from '../components/SiteLayout';

export default function Privacy() {
  return (
    <SiteLayout>
      <Head>
        <title>Privacy Policy — CortiAura™</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="bg-[#0B0B1A] py-16">
        <section className="container mx-auto px-4 lg:px-8 max-w-3xl text-[#F9F6FA]">
          <h1 className="text-3xl font-semibold text-white">Privacy Policy</h1>
          <nav className="mt-6 text-sm text-[#F9F6FA]/80">
            <ul className="list-disc list-inside space-y-1">
              <li><a href="#data" className="hover:underline">Data we collect</a></li>
              <li><a href="#use" className="hover:underline">How we use your data</a></li>
              <li><a href="#legal" className="hover:underline">Legal basis</a></li>
              <li><a href="#retention" className="hover:underline">Retention</a></li>
              <li><a href="#rights" className="hover:underline">Your rights</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
            </ul>
          </nav>

          <div className="prose prose-invert max-w-none mt-8">
            <h2 id="data">Data we collect</h2>
            <p>We may collect contact information (name, email), role/interest, and basic interaction data on our website. If you subscribe, we will store the details you provide for communication purposes.</p>

            <h2 id="use">How we use your data</h2>
            <p>We use your data to provide updates, manage waitlist requests, improve our content, and communicate about research or product news. We do not sell your data.</p>

            <h2 id="legal">Legal basis</h2>
            <p>Our processing is based on consent (e.g., subscriptions) or legitimate interests (e.g., site analytics, essential operations).</p>

            <h2 id="retention">Retention</h2>
            <p>We retain personal data only as long as needed to fulfil the purposes outlined above or as required by law.</p>

            <h2 id="rights">Your rights</h2>
            <p>You may request access, correction, deletion, or restriction of your personal data, and withdraw consent at any time where applicable.</p>

            <h2 id="contact">Contact</h2>
            <p>Questions? Contact us at <a href="mailto:prashant@cortiaura.com">prashant@cortiaura.com</a>.</p>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
