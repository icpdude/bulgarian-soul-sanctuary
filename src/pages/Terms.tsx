import { LegalLayout } from "@/components/legal/LegalLayout";
import { LegalSection } from "@/components/legal/LegalSection";

const Terms = () => (
  <LegalLayout
    title="Terms of Service"
    description="The terms and conditions governing your use of the Bulgarian Spiritual Treasury platform, NFTs, and DAO governance."
    updated="April 17, 2026"
  >
    <LegalSection title="1. Acceptance">
      <p>
        By accessing this site, connecting a wallet, or minting a membership NFT, you agree to be
        bound by these Terms.
      </p>
    </LegalSection>
    <LegalSection title="2. Eligibility">
      <p>
        You must be at least 18 years old and legally able to enter into binding agreements in your
        jurisdiction.
      </p>
    </LegalSection>
    <LegalSection title="3. Membership & NFTs">
      <p>
        Membership NFTs grant participation rights in DAO governance. NFTs are issued under the CC0
        license; underlying blockchain transactions are irreversible and non-refundable.
      </p>
    </LegalSection>
    <LegalSection title="4. DAO governance">
      <p>
        Governance proposals and voting outcomes are recorded on-chain and may be acted upon by the
        Foundation's multi-signature trustees. Participation is voluntary and at your own risk.
      </p>
    </LegalSection>
    <LegalSection title="5. Acceptable use">
      <p>You agree not to use the platform for unlawful, fraudulent, or harmful purposes.</p>
    </LegalSection>
    <LegalSection title="6. Disclaimers">
      <p>
        The platform is provided "as is" without warranties of any kind. Cryptocurrency and NFTs are
        volatile and may lose value. You are responsible for safeguarding your wallet and keys.
      </p>
    </LegalSection>
    <LegalSection title="7. Governing law">
      <p>These Terms are governed by the laws of Bulgaria.</p>
    </LegalSection>
  </LegalLayout>
);

export default Terms;
