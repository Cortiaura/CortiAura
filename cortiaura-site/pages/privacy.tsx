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
              <li>
                <strong>Research register and involvement panel:</strong> your first name, email address, country,
                optionally your nearest town or city, how you would like to be involved, and, if you choose, the research
                topics that interest you.
              </li>
            </ul>
            <p>We do not ask for health information through any of our forms.</p>

            <h2 id="research">Research register and involvement panel</h2>
            <p>
              If you join our research interest register or our patient and public involvement panel, we use your details
              only to tell you about CortiAura research and involvement opportunities. Joining does not enrol you in a
              study. We keep these details separate from our marketing emails: you will only receive general updates if
              you also tick the box for them.
            </p>
            <p>
              We do not collect health information at this stage. If a study opens and you choose to find out more, any
              health information needed to check whether you can take part will be collected separately by the study team,
              under that study’s own approved participant information and privacy notice.
            </p>
            <p>
              We keep register and panel details for up to three years from when you last confirmed your interest, after
              which we will ask whether you would like to stay on, or delete them. You can ask us to remove you at any
              time by emailing us.
            </p>

            <h2 id="use">How we use your data</h2>
            <p>
              We use your details to send the updates and offers you signed up for, to reply to your enquiry, and to
              improve our communications. We never sell your data.
            </p>

            <h2 id="processors">Who processes your data</h2>
            <p>
              Founding Community, newsletter, research register and panel details are stored in our customer relationship system, HubSpot. HubSpot stores
              our data in its EU data centre; any transfer outside the UK is protected by appropriate legal safeguards. Contact
              and investor enquiries are delivered to our inbox through our email delivery provider, Resend. If you accept
              analytics cookies, HubSpot records how you use this website on our behalf.
            </p>

            <h2 id="legal">Legal basis</h2>
            <p>
              We rely on your consent for marketing emails, which you can withdraw at any time using the unsubscribe link
              in every email, and on your consent to contact you about research and involvement opportunities, which you
              can withdraw at any time by emailing us. We rely on our legitimate interests to respond to enquiries you send us.
            </p>

            <h2 id="retention">Retention</h2>
            <p>
              We keep personal data only as long as needed for these purposes, or as required by law. Research register
              and panel details are kept as described above.
            </p>

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
