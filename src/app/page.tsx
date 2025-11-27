"use client";

import { CoreFeaturesShowcase } from "~components/marketing/CoreFeaturesShowcase";
import { CTA } from "~components/marketing/CTA";
import { DeepDive } from "~components/marketing/DeepDive";
import { Footer } from "~components/marketing/Footer";
import { Hero } from "~components/marketing/Hero";
import { LogoStrip } from "~components/marketing/LogoStrip";
import { Navbar } from "~components/marketing/Navbar";
import { PersonaSection } from "~components/marketing/PersonaSection";
import { PricingTeaser } from "~components/marketing/PricingTeaser";
import { Testimonials } from "~components/marketing/Testimonials";
import { useMarketingData } from "~data/marketing-data-i18n";

const HomePage: React.FC = () => {
  const marketingData = useMarketingData();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />

      <main>
        <Hero
          eyebrow={marketingData.hero.eyebrow}
          headline={marketingData.hero.headline}
          subheadline={marketingData.hero.subheadline}
          primaryCta={marketingData.hero.primaryCta}
          secondaryCta={marketingData.hero.secondaryCta}
          videoUrl={marketingData.hero.videoUrl}
        />

        <LogoStrip title={marketingData.logoStrip.title} logos={marketingData.logoStrip.logos} />

        <CoreFeaturesShowcase
          sectionTitle={marketingData.coreFeatures.sectionTitle}
          sectionDescription={marketingData.coreFeatures.sectionDescription}
          features={marketingData.coreFeatures.features}
        />

        <PersonaSection
          sectionTitle={marketingData.personas.sectionTitle}
          sectionDescription={marketingData.personas.sectionDescription}
          personas={marketingData.personas.personas}
        />

        <DeepDive
          eyebrow={marketingData.deepDive.eyebrow}
          headline={marketingData.deepDive.headline}
          description={marketingData.deepDive.description}
          features={marketingData.deepDive.features}
          image={marketingData.deepDive.image}
        />

        <Testimonials testimonials={marketingData.testimonials} />

        <PricingTeaser
          eyebrow={marketingData.pricing.eyebrow}
          headline={marketingData.pricing.headline}
          description={marketingData.pricing.description}
          cta={marketingData.pricing.cta}
          plans={marketingData.pricing.plans}
        />

        <CTA
          eyebrow={marketingData.cta.eyebrow}
          headline={marketingData.cta.headline}
          description={marketingData.cta.description}
          primaryCta={marketingData.cta.primaryCta}
          secondaryCta={marketingData.cta.secondaryCta}
          features={marketingData.cta.features}
        />
      </main>

      <Footer
        company={marketingData.footer.company}
        links={marketingData.footer.links}
        social={marketingData.footer.social}
      />
    </div>
  );
};

export default HomePage;
