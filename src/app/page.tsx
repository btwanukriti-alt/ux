import { PageBackground } from "@/components/landing/PageBackground";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Recognition } from "@/components/landing/Recognition";
import { WhatIsJaadu } from "@/components/landing/WhatIsJaadu";
import { QuantLab } from "@/components/landing/QuantLab";
import { Features } from "@/components/landing/Features";
import { FounderNote } from "@/components/landing/FounderNote";
import { Timeline } from "@/components/landing/Timeline";
import { Team } from "@/components/landing/Team";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="jaadu-landing">
      <PageBackground />
      <Nav />
      <main>
        <Hero />
        <Recognition />
        <WhatIsJaadu />
        <QuantLab />
        <Features />
        <FounderNote />
        <Timeline />
        <Team />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
