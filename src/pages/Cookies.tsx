import { LegalLayout } from "@/components/legal/LegalLayout";
import { LegalSection } from "@/components/legal/LegalSection";

const Cookies = () => (
  <LegalLayout
    title="Cookie Policy"
    description="How and why the Bulgarian Spiritual Treasury platform uses cookies and similar storage technologies."
    updated="April 17, 2026"
  >
    <LegalSection title="1. What are cookies?">
      <p>
        Cookies are small text files stored on your device that help websites function and gather
        usage information.
      </p>
    </LegalSection>
    <LegalSection title="2. Cookies we use">
      <ul className="list-disc pl-6 space-y-2">
        <li><strong className="text-foreground">Essential:</strong> required for authentication, session management, and wallet connection.</li>
        <li><strong className="text-foreground">Preferences:</strong> remember your language and theme choices.</li>
        <li><strong className="text-foreground">Analytics:</strong> anonymized usage statistics to improve the platform.</li>
      </ul>
    </LegalSection>
    <LegalSection title="3. Local storage">
      <p>
        We also use browser local storage to keep your authenticated session and wallet preferences
        across visits.
      </p>
    </LegalSection>
    <LegalSection title="4. Managing cookies">
      <p>
        You can disable cookies in your browser settings. Note that disabling essential cookies may
        prevent login and wallet features from working.
      </p>
    </LegalSection>
  </LegalLayout>
);

export default Cookies;
