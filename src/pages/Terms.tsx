import { LegalLayout } from "@/components/legal/LegalLayout";

const Terms = () => (
  <LegalLayout
    title="Terms of Service"
    description="The terms and conditions governing your use of the Bulgarian Spiritual Treasury platform, NFTs, and DAO governance."
    updated="April 17, 2026"
  >
    <section>
      <h2 className="text-2xl font-display font-semibold text-foreground mb-3">1. Acceptance</h2>
      <p>
        By accessing this site, connecting a wallet, or minting a membership NFT, you agree to be
        bound by these Terms.
      </p>
    </section>

    <section>
      <h2 className="text-2xl font-display font-semibold text-foreground mb-3">2. Eligibility</h2>
      <p>
        You must be at least 18 years old and legally able to enter into binding agreements in your
        jurisdiction.
      </p>
    </section>

    <section>
      <h2 className="text-2xl font-display font-semibold text-foreground mb-3">3. Membership & NFTs</h2>
      <p>
        Membership NFTs grant participation rights in DAO governance. NFTs are issued under the CC0
        license; underlying blockchain transactions are irreversible and non-refundable.
      </p>
    </section>

    <section>
      <h2 className="text-2xl font-display font-semibold text-foreground mb-3">4. DAO governance</h2>
      <p>
        Governance proposals and voting outcomes are recorded on-chain and may be acted upon by the
        Foundation's multi-signature trustees. Participation is voluntary and at your own risk.
      </p>
    </section>

    <section>
      <h2 className="text-2xl font-display font-semibold text-foreground mb-3">5. Acceptable use</h2>
      <p>You agree not to use the platform for unlawful, fraudulent, or harmful purposes.</p>
    </section>

    <section>
      <h2 className="text-2xl font-display font-semibold text-foreground mb-3">6. Disclaimers</h2>
      <p>
        The platform is provided "as is" without warranties of any kind. Cryptocurrency and NFTs are
        volatile and may lose value. You are responsible for safeguarding your wallet and keys.
      </p>
    </section>

    <section>
      <h2 className="text-2xl font-display font-semibold text-foreground mb-3">7. Governing law</h2>
      <p>These Terms are governed by the laws of Bulgaria.</p>
    </section>
  </LegalLayout>
);

export default Terms;
