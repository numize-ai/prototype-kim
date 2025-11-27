/* eslint-disable id-length */
"use client";

import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { CheckCircle2 } from "lucide-react";

interface CoreFeature {
  icon: string;
  title: string;
  tagline: string;
  description: string;
  highlight: string;
  features: string[];
}

interface CoreFeaturesShowcaseProps {
  sectionTitle: string;
  sectionDescription: string;
  features: CoreFeature[];
}

export const CoreFeaturesShowcase: React.FC<CoreFeaturesShowcaseProps> = ({
  sectionTitle,
  sectionDescription,
  features,
}) => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0.3),white)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent sm:text-4xl lg:text-5xl">
            {sectionTitle}
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">{sectionDescription}</p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const IconComponent = (LucideIcons as never)[feature.icon] as React.ComponentType<{
              className?: string;
            }>;

            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <Card className="group relative overflow-hidden border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                  {/* Gradient accent */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className={`grid lg:grid-cols-2 gap-8 ${isEven ? "" : "lg:grid-flow-dense"}`}>
                    {/* Content side */}
                    <div className={String(isEven ? "" : "lg:col-start-2")}>
                      <CardHeader className="pb-6">
                        <div className="flex items-start gap-4 mb-4">
                          {/* Icon container */}
                          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg flex-shrink-0">
                            <IconComponent className="h-8 w-8" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <CardTitle className="text-2xl sm:text-3xl group-hover:text-primary transition-colors duration-300">
                                {feature.title}
                              </CardTitle>
                              <Badge
                                variant="outline"
                                className="text-xs border-primary/30 bg-primary/10 whitespace-nowrap"
                              >
                                {feature.highlight}
                              </Badge>
                            </div>
                            <p className="text-base sm:text-lg font-medium text-primary/90 dark:text-primary/80 mt-2">
                              {feature.tagline}
                            </p>
                          </div>
                        </div>
                        <CardDescription className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent>
                        <ul className="space-y-3">
                          {feature.features.map((item, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: 0.1 * idx }}
                              viewport={{ once: true }}
                              className="flex items-start gap-3 text-slate-700 dark:text-slate-300"
                            >
                              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm sm:text-base leading-relaxed">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </div>

                    {/* Visual side - placeholder for now */}
                    <div
                      className={`flex items-center justify-center p-8 ${isEven ? "" : "lg:col-start-1 lg:row-start-1"}`}
                    >
                      <div className="relative w-full aspect-video rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 overflow-hidden shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                        {/* Placeholder gradient mesh */}
                        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <IconComponent className="h-24 w-24 text-primary/20 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
