/* eslint-disable id-length */
"use client";

import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { CheckCircle2 } from "lucide-react";

interface Persona {
  icon: string;
  title: string;
  subtitle: string;
  role: string;
  description: string;
  benefits: string[];
}

interface PersonaSectionProps {
  sectionTitle: string;
  sectionDescription: string;
  personas: Persona[];
}

export const PersonaSection: React.FC<PersonaSectionProps> = ({ sectionTitle, sectionDescription, personas }) => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />

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

        {/* Personas grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {personas.map((persona, index) => {
            const IconComponent = (LucideIcons as never)[persona.icon] as React.ComponentType<{
              className?: string;
            }>;

            return (
              <motion.div
                key={persona.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <Card className="group relative h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 border-slate-200 dark:border-slate-700 hover:border-primary/40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                  {/* Gradient accent line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg" />

                  <CardHeader className="pb-4">
                    {/* Icon and badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                        <IconComponent className="h-7 w-7" />
                      </div>
                      <Badge
                        variant="outline"
                        className="text-xs border-primary/30 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300"
                      >
                        {persona.role}
                      </Badge>
                    </div>

                    {/* Title and subtitle */}
                    <div className="space-y-2">
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                        {persona.title}
                      </CardTitle>
                      <p className="text-sm font-medium text-primary/80 dark:text-primary/70">{persona.subtitle}</p>
                    </div>

                    {/* Description */}
                    <CardDescription className="text-base leading-relaxed mt-4">{persona.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col">
                    {/* Benefits list */}
                    <div className="space-y-3 mt-2">
                      {persona.benefits.map((benefit, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 * idx }}
                          viewport={{ once: true }}
                          className="flex items-start gap-3 text-slate-700 dark:text-slate-300"
                        >
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm leading-relaxed">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>

                  {/* Decorative bottom gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50/50 to-transparent dark:from-slate-800/50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
