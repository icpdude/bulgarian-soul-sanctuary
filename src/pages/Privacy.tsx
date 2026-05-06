import { LegalLayout } from "@/components/legal/LegalLayout";
import { LegalSection } from "@/components/legal/LegalSection";

const Privacy = () => (
  <LegalLayout
    title="Privacy Policy"
    description="How the Bulgarian Spiritual Treasury Foundation collects, uses, and safeguards your personal information."
    updated="April 17, 2026"
  >
    <LegalSection title="1. Introduction">
      <p>
        The Bulgarian Spiritual Treasury Foundation ("BST", "we", "us") respects your privacy. This
        policy explains what information we collect when you visit our site, mint a membership NFT,
        connect a wallet, or contact us, and how we use it.
      </p>
    </LegalSection>

    <LegalSection title="2. Information we collect">
      <ul className="list-disc pl-6 space-y-2">
        <li><strong className="text-foreground">Account data:</strong> email and display name when you register.</li>
        <li><strong className="text-foreground">Wallet data:</strong> public wallet address when you connect Web3.</li>
        <li><strong className="text-foreground">On-chain activity:</strong> mints, transfers, and votes are publicly visible on the blockchain.</li>
        <li><strong className="text-foreground">Contact submissions:</strong> name, email, and message you send via the contact form.</li>
        <li><strong className="text-foreground">Technical data:</strong> anonymized analytics, device, and browser information.</li>
      </ul>
    </LegalSection>

    <LegalSection title="3. How we use it">
      <p>
        We use your data to operate the platform, provide governance access, respond to inquiries,
        and improve our services. We do not sell personal data.
      </p>
    </LegalSection>

    <LegalSection title="4. Data retention">
      <p>
        Account and contact data is retained for as long as your account is active or as required by
        law. On-chain data is permanent and cannot be deleted by us.
      </p>
    </LegalSection>

    <LegalSection title="5. Your rights">
      <p>
        Under GDPR you may request access, correction, or deletion of your personal data. Contact us
        at <a href="mailto:contact@spiritofbulgaria.org" className="text-primary hover:underline">contact@spiritofbulgaria.org</a>.
      </p>
    </LegalSection>

    <LegalSection title="6. Changes">
      <p>We may update this policy. Material changes will be announced on the site.</p>
    </LegalSection>
  </LegalLayout>
);

export default Privacy;
