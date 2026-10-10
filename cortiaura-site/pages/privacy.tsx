import Head from 'next/head';
import SiteLayout from '../components/SiteLayout';
import PageHeader from '../components/PageHeader';

export default function Privacy() {
  return (
    <SiteLayout>
      <Head>
        <title>Privacy policy | CortiAura</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main>
        <PageHeader eyebrow="Legal" title="Privacy policy" />
        <section className="container-site max-w-[760px] py-14">
          <div className="article">
            <h2 id="data">Data we collect</h2>
            <ul>
              <li>
                <strong>Founding Community sign-ups:</strong> your first name, email address, country and, if you choose,
                the topics that interest you.
              </li>
              <li>
                <strong>Investor enquiries:</strong> your name, email address, organisation, investor type and, if you
                provide it, your LinkedIn profile.
              </li>
              <li>
                <strong>Contact form:</strong> your name, email address and message.
              </li>
            </ul>
            <p>We do not ask for health information through any of our forms.</p>

            <h2 id="use">How we use your data</h2>
            <p>
              We use your details to send the updates and offers you signed up for, to reply to your enquiry, and to
              improve our communications. We never sell your data.
            </p>

            <h2 id="processors">Who processes your data</h2>
            <p>
              Founding Community details are stored with our email provider, MailerLite. Contact and investor enquiries
              are delivered to our inbox through our email delivery provider, Resend. If you accept analytics cookies, HubSpot
              records how you use this website on our behalf.
            </p>

            <h2 id="legal">Legal basis</h2>
            <p>
              We rely on your consent for marketing emails, which you can withdraw at any time using the unsubscribe link
              in every email. We rely on our legitimate interests to respond to enquiries you send us.
            </p>

            <h2 id="retention">Retention</h2>
            <p>We keep personal data only as long as needed for these purposes, or as required by law.</p>

            <h2 id="rights">Your rights</h2>
            <p>
              You can ask to access, correct or delete your personal data, or restrict how we use it. You also have the
              right to complain to the Information Commissioner’s Office (ICO).
            </p>

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
