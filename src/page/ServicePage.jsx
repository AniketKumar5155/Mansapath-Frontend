import { motion } from "framer-motion";
import { Brain, Sparkles, Eye } from "lucide-react";


const Section = ({ icon: Icon, title, subtitle, children, reverse }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-20 ${
      reverse ? "md:[&>*:first-child]:order-2" : ""
    }`}
  >
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="p-4 rounded-2xl bg-primary/10 text-primary">
            <Icon size={32} />
          </div>
        )}

        <div>
          <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <p className="text-lg leading-relaxed text-muted-foreground">
        {children}
      </p>
    </div>

    <div className="relative">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-primary/30 blur-2xl" />
      <div className="relative rounded-3xl border bg-background/70 backdrop-blur p-10 shadow-xl">
        <p className="text-base leading-relaxed text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  </motion.section>
);

export default function ServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/30" />
        <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-bold tracking-tight"
          >
            About <span className="text-primary">Us</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 max-w-3xl mx-auto text-xl text-muted-foreground"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </motion.p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6">
        <Section
          icon={Brain}
          title="Brain Gym"
          subtitle="Strengthening the mind"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
          malesuada. Integer nec odio.
        </Section>

        <Section
          icon={Eye}
          title="Bodh"
          subtitle="Awareness and understanding"
          reverse
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nisi.
          Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
        </Section>

        <Section
          icon={Sparkles}
          title="Chaitanya"
          subtitle="Awakening inner potential"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ipsum.
          Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.
        </Section>
      </main>

      <section className="relative mt-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30" />
        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <h3 className="text-4xl font-semibold">
            Experience the Transformation
          </h3>

          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <button className="mt-10 px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-medium shadow-lg hover:scale-[1.03] transition">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}
