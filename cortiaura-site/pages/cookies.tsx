import Head from 'next/head';
import SiteLayout from '../components/SiteLayout';
import PageHeader from '../components/PageHeader';
import CookieSettingsButton from '../components/CookieSettingsButton';

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
              <strong>Essential cookies</strong> keep this website working, such as remembering your cookie choice and whether
              you have closed our sign-up box. These are always on.
            </p>
            <p>
              <strong>Analytics cookies</strong> are only set if you click &ldquo;Accept&rdquo;. We use HubSpot to
              understand which pages are visited and how people find us, and to show our sign-up form. HubSpot sets
              cookies such as <code>__hstc</code>, <code>hubspotutk</code>, <code>__hssc</code> and <code>__hssrc</code>.
              If you decline, none of these are set. We do not use advertising cookies.
            </p>

            <h2 id="manage">Changing your choice</h2>
            <p>You can change your mind at any time:</p>
            <p>
              <CookieSettingsButton />
            </p>
            <p>You can also delete or block cookies in your browser settings.</p>

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
