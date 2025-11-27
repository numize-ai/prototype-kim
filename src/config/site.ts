import type { SiteConfiguration } from "./types";

export const SITE_CONFIG: SiteConfiguration = {
  description: `AI-native analytics workflow: from question to insight to action, governed by data teams and powered by semantic slices. Business teams gain autonomy without sacrificing governance.`,
  title: "Numize",
  titleSeparator: " · ",

  domain: `numize.ai`,
  siteUrl: `https://www.numize.ai`,
} as const;
