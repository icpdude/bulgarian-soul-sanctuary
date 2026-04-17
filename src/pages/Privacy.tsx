import { LegalLayout } from "@/components/legal/LegalLayout";

const Privacy = () => (
  <LegalLayout
    title="Privacy Policy"
    description="How the Bulgarian Spiritual Treasury Foundation collects, uses, and safeguards your personal information."
    updated="April 17, 2026"
  >
    <section>
      <h2 className="text-2xl font-display font-semibold text-foreground mb-3">1. Introduction</h2>
      <p>
        The Bulgarian Spiritual Treasury Foundation ("BST", "we", "us") respects your privacy. This
        policy explains what information we collect when you visit our site, mint a membership NFT,
        connect a wallet, or contact us, and how we use it.
      </p>
    </section>

    <section>
      <h2 className="text-2xl font-display font-semibold text-foreground mb-3">2. Information we collect</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Account data:</strong> email and display name when you register.</li>
        <li><strong>Wallet data:</strong> public wallet address when you connect Web3.</li>
        <li><strong>On-chain activity:</strong> mints, transfers, and votes are publicly visible on the blockchain.</li>
        <li><strong>Contact submissions:</strong> name, email, and message you send via the contact form.</li>
        <li><strong>Technical data:</strong> anonymized analytics, device, and browser information.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-2xl font-display font-semibold text-foreground mb-3">3. How we use it</h2>
      <p>
        We use your data to operate the platform, provide governance access, respond to inquiries,
        and improve our services. We do not sell personal data.
      </p>
    </section>

    <section>
      <h2 className="text-2xl font-display font-semibold text-foreground mb-3">4. Data retention</h2>
      <p>
        Account and contact data is retained for as long as your account is active or as required by
        law. On-chain data is permanent and cannot be deleted by us.
      </p>
    </section>

    <section>
      <h2 className="text-2xl font-display font-semibold text-foreground mb-3">5. Your rights</h2>
      <p>
        Under GDPR you may request access, correction, or deletion of your personal data. Contact us
        at <a href="mailto:contact@spiritofbulgaria.org" className="text-primary hover:underline">contact@spiritofbulgaria.org</a>.
      </p>
    </section>

    <section>
      <h2 className="text-2xl font-display font-semibold text-foreground mb-3">6. Changes</h2>
      <p>We may update this policy. Material changes will be announced on the site.</p>
    </section>
  </LegalLayout>
);

export default Privacy;
