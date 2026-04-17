import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Database, Shield, Globe2, ExternalLink } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { FooterSection } from "@/components/FooterSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHead } from "@/components/PageHead";

const gateways = [
  { name: "ipfs.io", url: "https://ipfs.io/ipfs/" },
  { name: "Cloudflare", url: "https://cloudflare-ipfs.com/ipfs/" },
  { name: "Pinata", url: "https://gateway.pinata.cloud/ipfs/" },
  { name: "Web3.Storage", url: "https://w3s.link/ipfs/" },
];

const features = [
  {
    icon: Database,
    title: "Permanent storage",
    text: "Every NFT artwork and metadata file is pinned across multiple IPFS nodes, ensuring long-term availability even if our servers go offline.",
  },
  {
    icon: Shield,
    title: "Content addressing",
    text: "Files are referenced by their cryptographic hash (CID), so content cannot be silently altered or substituted.",
  },
  {
    icon: Globe2,
    title: "Decentralized access",
    text: "Anyone can retrieve our cultural archive through any public IPFS gateway worldwide — no single point of failure.",
  },
];

const IPFSGateway = () => (
  <>
    <PageHead
      title="IPFS Gateway — Bulgarian Spiritual Treasury"
      description="How the Bulgarian Spiritual Treasury uses IPFS to permanently store and serve NFT metadata, artwork, and cultural archives."
    />
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-28 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-elegant mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient-dawn mb-4">
              IPFS Gateway
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our digital heritage lives on the InterPlanetary File System — a decentralized,
              tamper-resistant network that keeps Bulgarian spiritual artifacts accessible forever.
            </p>
          </motion.header>

          <section className="grid md:grid-cols-3 gap-6 mb-16">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-primary/20 bg-card/50 backdrop-blur h-full">
                  <CardHeader>
                    <f.icon className="w-8 h-8 text-primary mb-2" />
                    <CardTitle>{f.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4">
              Public gateways
            </h2>
            <p className="text-muted-foreground mb-6">
              You can retrieve any of our pinned content using any public IPFS gateway. Append the
              CID of the file to any of the URLs below.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {gateways.map((g) => (
                <Card key={g.name} className="border-border/60 bg-card/40">
                  <CardContent className="py-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold">{g.name}</p>
                      <p className="text-xs text-muted-foreground font-mono break-all">{g.url}</p>
                    </div>
                    <Button asChild variant="ghost" size="icon">
                      <a href={g.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${g.name}`}>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="bg-card/40 border border-border/60 rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-display font-semibold mb-3">How to verify a file</h2>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>Locate the IPFS CID in an NFT's on-chain metadata.</li>
              <li>Open any gateway above and paste the CID after <code className="text-primary">/ipfs/</code>.</li>
              <li>The gateway resolves the same content from the global IPFS network.</li>
              <li>The CID itself is the content's fingerprint — if it loads, it is authentic.</li>
            </ol>
          </section>
        </div>
      </main>
      <FooterSection />
    </div>
  </>
);

export default IPFSGateway;
