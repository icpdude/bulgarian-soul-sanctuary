import { LegalLayout } from "@/components/legal/LegalLayout";

const Cookies = () => (
  <LegalLayout
    title="Cookie Policy"
    description="How and why the Bulgarian Spiritual Treasury platform uses cookies and similar storage technologies."
    updated="April 17, 2026"
  >
    <section>
      <h2 className="text-2xl font-display font-semibold text-foreground mb-3">1. What are cookies?</h2>
      <p>
        Cookies are small text files stored on your device that help websites function and gather
        usage information.
      </p>
    </section>

    <section>
      <h2 className="text-2xl font-display font-semibold text-foreground mb-3">2. Cookies we use</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Essential:</strong> required for authentication, session management, and wallet connection.</li>
        <li><strong>Preferences:</strong> remember your language and theme choices.</li>
        <li><strong>Analytics:</strong> anonymized usage statistics to improve the platform.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-2xl font-display font-semibold text-foreground mb-3">3. Local storage</h2>
      <p>
        We also use browser local storage to keep your authenticated session and wallet preferences
        across visits.
      </p>
    </section>

    <section>
      <h2 className="text-2xl font-display font-semibold text-foreground mb-3">4. Managing cookies</h2>
      <p>
        You can disable cookies in your browser settings. Note that disabling essential cookies may
        prevent login and wallet features from working.
      </p>
    </section>
  </LegalLayout>
);

export default Cookies;
