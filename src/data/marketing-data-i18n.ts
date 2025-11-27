"use client";

import { useTranslation } from "~i18n/useTranslation";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useMarketingData = () => {
  const translate = useTranslation({ nameSpace: "translation" });

  return {
    hero: {
      eyebrow: translate("homepage.hero.eyebrow"),
      headline: translate("homepage.hero.headline"),
      subheadline: translate("homepage.hero.subheadline"),
      primaryCta: translate("homepage.hero.primaryCta"),
      secondaryCta: translate("homepage.hero.secondaryCta"),
      videoUrl: "https://youtu.be/dQw4w9WgXcQ", // placeholder
    },

    logoStrip: {
      title: translate("homepage.logoStrip.title"),
      logos: [
        { name: "Acme Corp", src: "/datadog.png" },
        { name: "TechFlow", src: "/datadog.png" },
        { name: "DataViz Inc", src: "/datadog.png" },
        { name: "Analytics Pro", src: "/datadog.png" },
        { name: "InsightCo", src: "/datadog.png" },
        { name: "MetricLabs", src: "/datadog.png" },
      ],
    },

    coreFeatures: {
      sectionTitle: translate("homepage.coreFeatures.sectionTitle"),
      sectionDescription: translate("homepage.coreFeatures.sectionDescription"),
      features: [
        {
          icon: "MessageSquare",
          title: translate("homepage.coreFeatures.converseAndAct.title"),
          tagline: translate("homepage.coreFeatures.converseAndAct.tagline"),
          description: translate("homepage.coreFeatures.converseAndAct.description"),
          highlight: translate("homepage.coreFeatures.converseAndAct.highlight"),
          features: [
            translate("homepage.coreFeatures.converseAndAct.features.naturalLanguage"),
            translate("homepage.coreFeatures.converseAndAct.features.deepDive"),
            translate("homepage.coreFeatures.converseAndAct.features.actions"),
            translate("homepage.coreFeatures.converseAndAct.features.segments"),
          ],
        },
        {
          icon: "CalendarDays",
          title: translate("homepage.coreFeatures.weeklyDigest.title"),
          tagline: translate("homepage.coreFeatures.weeklyDigest.tagline"),
          description: translate("homepage.coreFeatures.weeklyDigest.description"),
          highlight: translate("homepage.coreFeatures.weeklyDigest.highlight"),
          features: [
            translate("homepage.coreFeatures.weeklyDigest.features.blocks"),
            translate("homepage.coreFeatures.weeklyDigest.features.anomalies"),
            translate("homepage.coreFeatures.weeklyDigest.features.splitScreen"),
            translate("homepage.coreFeatures.weeklyDigest.features.recurrence"),
          ],
        },
        {
          icon: "Shield",
          title: translate("homepage.coreFeatures.semanticExposure.title"),
          tagline: translate("homepage.coreFeatures.semanticExposure.tagline"),
          description: translate("homepage.coreFeatures.semanticExposure.description"),
          highlight: translate("homepage.coreFeatures.semanticExposure.highlight"),
          features: [
            translate("homepage.coreFeatures.semanticExposure.features.slices"),
            translate("homepage.coreFeatures.semanticExposure.features.dbt"),
            translate("homepage.coreFeatures.semanticExposure.features.governance"),
            translate("homepage.coreFeatures.semanticExposure.features.sources"),
          ],
        },
      ],
    },

    personas: {
      sectionTitle: translate("homepage.personas.sectionTitle"),
      sectionDescription: translate("homepage.personas.sectionDescription"),
      personas: [
        {
          icon: "Briefcase",
          title: translate("homepage.personas.headOfX.title"),
          subtitle: translate("homepage.personas.headOfX.subtitle"),
          role: translate("homepage.personas.headOfX.role"),
          description: translate("homepage.personas.headOfX.description"),
          benefits: [
            translate("homepage.personas.headOfX.benefits.autonomy"),
            translate("homepage.personas.headOfX.benefits.proactive"),
            translate("homepage.personas.headOfX.benefits.action"),
            translate("homepage.personas.headOfX.benefits.speed"),
          ],
        },
        {
          icon: "TrendingUp",
          title: translate("homepage.personas.businessOps.title"),
          subtitle: translate("homepage.personas.businessOps.subtitle"),
          role: translate("homepage.personas.businessOps.role"),
          description: translate("homepage.personas.businessOps.description"),
          benefits: [
            translate("homepage.personas.businessOps.benefits.investigations"),
            translate("homepage.personas.businessOps.benefits.segments"),
            translate("homepage.personas.businessOps.benefits.analysis"),
            translate("homepage.personas.businessOps.benefits.automation"),
          ],
        },
        {
          icon: "Database",
          title: translate("homepage.personas.dataTeam.title"),
          subtitle: translate("homepage.personas.dataTeam.subtitle"),
          role: translate("homepage.personas.dataTeam.role"),
          description: translate("homepage.personas.dataTeam.description"),
          benefits: [
            translate("homepage.personas.dataTeam.benefits.governance"),
            translate("homepage.personas.dataTeam.benefits.dbt"),
            translate("homepage.personas.dataTeam.benefits.auditability"),
            translate("homepage.personas.dataTeam.benefits.quality"),
          ],
        },
      ],
    },

    deepDive: {
      eyebrow: translate("homepage.deepDive.eyebrow"),
      headline: translate("homepage.deepDive.headline"),
      description: translate("homepage.deepDive.description"),
      features: [
        translate("homepage.deepDive.features.connect"),
        translate("homepage.deepDive.features.ask"),
        translate("homepage.deepDive.features.visualize"),
        translate("homepage.deepDive.features.share"),
        translate("homepage.deepDive.features.export"),
      ],
      image: "/connectors.png",
    },

    testimonials: [
      {
        quote: translate("homepage.testimonials.sarah.quote"),
        author: translate("homepage.testimonials.sarah.author"),
        role: translate("homepage.testimonials.sarah.role"),
        company: translate("homepage.testimonials.sarah.company"),
        avatar: "/avatars/sarah.jpg",
      },
      {
        quote: translate("homepage.testimonials.marcus.quote"),
        author: translate("homepage.testimonials.marcus.author"),
        role: translate("homepage.testimonials.marcus.role"),
        company: translate("homepage.testimonials.marcus.company"),
        avatar: "/avatars/marcus.jpg",
      },
      {
        quote: translate("homepage.testimonials.emily.quote"),
        author: translate("homepage.testimonials.emily.author"),
        role: translate("homepage.testimonials.emily.role"),
        company: translate("homepage.testimonials.emily.company"),
        avatar: "/avatars/emily.jpg",
      },
    ],

    pricing: {
      eyebrow: translate("homepage.pricing.eyebrow"),
      headline: translate("homepage.pricing.headline"),
      description: translate("homepage.pricing.description"),
      cta: translate("homepage.pricing.cta"),
      plans: [
        {
          name: translate("homepage.pricing.plans.starter.name"),
          price: translate("homepage.pricing.plans.starter.price"),
          description: translate("homepage.pricing.plans.starter.description"),
          features: [
            translate("homepage.pricing.plans.starter.features.dataSources"),
            translate("homepage.pricing.plans.starter.features.dashboards"),
            translate("homepage.pricing.plans.starter.features.support"),
          ],
        },
        {
          name: translate("homepage.pricing.plans.professional.name"),
          price: translate("homepage.pricing.plans.professional.price"),
          billing: translate("homepage.pricing.plans.professional.billing"),
          description: translate("homepage.pricing.plans.professional.description"),
          features: [
            translate("homepage.pricing.plans.professional.features.dataSources"),
            translate("homepage.pricing.plans.professional.features.analytics"),
            translate("homepage.pricing.plans.professional.features.support"),
          ],
          popular: true,
        },
        {
          name: translate("homepage.pricing.plans.enterprise.name"),
          price: translate("homepage.pricing.plans.enterprise.price"),
          description: translate("homepage.pricing.plans.enterprise.description"),
          features: [
            translate("homepage.pricing.plans.enterprise.features.integrations"),
            translate("homepage.pricing.plans.enterprise.features.support"),
            translate("homepage.pricing.plans.enterprise.features.sla"),
          ],
        },
      ],
    },

    cta: {
      eyebrow: translate("homepage.cta.eyebrow"),
      headline: translate("homepage.cta.headline"),
      description: translate("homepage.cta.description"),
      primaryCta: translate("homepage.cta.primaryCta"),
      secondaryCta: translate("homepage.cta.secondaryCta"),
      features: [
        translate("homepage.cta.features.noCredit"),
        translate("homepage.cta.features.trial"),
        translate("homepage.cta.features.cancel"),
      ],
    },

    footer: {
      company: {
        name: translate("homepage.footer.company.name"),
        description: translate("homepage.footer.company.description"),
      },
      links: [
        {
          title: translate("homepage.footer.links.product.title"),
          items: [
            { label: translate("homepage.footer.links.product.features"), href: "/features" },
            { label: translate("homepage.footer.links.product.pricing"), href: "/pricing" },
            { label: translate("homepage.footer.links.product.integrations"), href: "/integrations" },
            { label: translate("homepage.footer.links.product.api"), href: "/api" },
          ],
        },
        {
          title: translate("homepage.footer.links.resources.title"),
          items: [
            { label: translate("homepage.footer.links.resources.documentation"), href: "/docs" },
            { label: translate("homepage.footer.links.resources.helpCenter"), href: "/help" },
            { label: translate("homepage.footer.links.resources.blog"), href: "/blog" },
            { label: translate("homepage.footer.links.resources.caseStudies"), href: "/cases" },
          ],
        },
        {
          title: translate("homepage.footer.links.company.title"),
          items: [
            { label: translate("homepage.footer.links.company.about"), href: "/about" },
            { label: translate("homepage.footer.links.company.careers"), href: "/careers" },
            { label: translate("homepage.footer.links.company.contact"), href: "/contact" },
            { label: translate("homepage.footer.links.company.privacy"), href: "/privacy" },
          ],
        },
      ],
      social: [
        {
          platform: translate("homepage.footer.social.twitter"),
          href: "https://twitter.com/numize",
          icon: "Twitter",
        },
        {
          platform: translate("homepage.footer.social.linkedin"),
          href: "https://linkedin.com/company/numize",
          icon: "Linkedin",
        },
        {
          platform: translate("homepage.footer.social.github"),
          href: "https://github.com/numize",
          icon: "Github",
        },
      ],
    },
  };
};
