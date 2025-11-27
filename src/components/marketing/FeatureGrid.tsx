/* eslint-disable id-length */
"use client";

import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

interface Feature {
  icon: string;
  title: string;
  description: string;
  highlight: string;
}

interface FeatureGridProps {
  features: Feature[];
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ features }) => {
  return (
    <section className="py-10 sm:py-14 lg:py-16 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/30 to-white dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent sm:text-4xl">
            Everything you need to unlock your data
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Powerful features designed for non-technical teams to explore data and generate insights.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const IconComponent = (LucideIcons as never)[feature.icon] as React.ComponentType<{
                className?: string;
              }>;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Enhanced card with gradient border on hover and lift effect */}
                  <Card className="group relative h-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2 border-slate-200 dark:border-slate-700 hover:border-primary/30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                    {/* Gradient accent line at the top */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg" />

                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        {/* Enhanced icon container with animation */}
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                          <IconComponent className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <Badge
                          variant="outline"
                          className="text-xs border-primary/20 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300"
                        >
                          {feature.highlight}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
