import Head from 'next/head';
import SiteLayout from '../components/SiteLayout';
import PageHeader from '../components/PageHeader';

export default function Cookies() {
  return (
    <SiteLayout>
      <Head>
        <title>Cookie policy | CortiAura</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main>
        <PageHeader eyebrow="Legal" title="Cookie policy" />
        <section className="container-site max-w-[760px] py-14">
          <div className="article">
            <h2 id="what">What cookies are</h2>
            <p>Cookies are small text files stored on your device to help websites work.</p>

            <h2 id="use">How we use them</h2>
            <p>
              We only use what is essential for this website to work, such as remembering that you have seen our cookie
              notice. We do not use analytics, advertising or tracking cookies.
            </p>

            <h2 id="manage">Managing cookies</h2>
            <p>You can delete or block cookies at any time in your browser settings.</p>

            <h2 id="contact">Contact</h2>
            <p>
              Questions? Email us at <a href="mailto:prashant@cortiaura.com">prashant@cortiaura.com</a>.
            </p>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
