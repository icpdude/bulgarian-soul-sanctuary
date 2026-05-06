import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Database, Shield, Globe2, ExternalLink } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { FooterSection } from "@/components/FooterSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHead } from "@/components/PageHead";
import { BulgarianRose } from "@/components/atomic/BulgarianRose";

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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-14 text-center"
          >
            <div className="inline-flex items-center gap-3 text-primary/70 mb-4">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-primary/40" />
              <BulgarianRose size={20} />
              <span className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Decentralized storage</span>
              <BulgarianRose size={20} />
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-primary/40" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient-dawn mb-4 tracking-tight">
              IPFS Gateway
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Our digital heritage lives on the InterPlanetary File System — a decentralized,
              tamper-resistant network that keeps Bulgarian spiritual artifacts accessible forever.
            </p>
          </motion.header>

          <section className="grid md:grid-cols-3 gap-5 mb-16">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Card className="border-primary/20 bg-card/50 backdrop-blur h-full hover:border-primary/40 hover:-translate-y-1 transition-elegant">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-rose/10 border border-primary/20 flex items-center justify-center mb-3">
                      <f.icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{f.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-semibold mb-3 tracking-tight">
              Public gateways
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              You can retrieve any of our pinned content using any public IPFS gateway. Append the
              CID of the file to any of the URLs below.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {gateways.map((g) => (
                <Card key={g.name} className="border-border/60 bg-card/40 hover:border-primary/30 transition-colors">
                  <CardContent className="py-4 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-semibold">{g.name}</p>
                      <p className="text-xs text-muted-foreground font-mono truncate">{g.url}</p>
                    </div>
                    <Button asChild variant="ghost" size="icon" className="shrink-0">
                      <a href={g.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${g.name}`}>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="relative bg-gradient-to-br from-card/60 to-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 heritage-border-top overflow-hidden">
            <h2 className="text-2xl font-display font-semibold mb-4 tracking-tight">How to verify a file</h2>
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
