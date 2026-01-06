import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import ChampionshipsPreview from "@/components/landing/ChampionshipsPreview";
import CTA from "@/components/landing/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <ChampionshipsPreview />
      <CTA />
    </main>
  );
}
