/* eslint-disable id-length */
"use client";

import { Button } from "~/components/ui/button";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

interface CTAProps {
  eyebrow: string;
  headline: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  features: string[];
}

export const CTA: React.FC<CTAProps> = ({ eyebrow, headline, description, primaryCta, secondaryCta, features }) => {
  return (
    <section className="relative py-10 sm:py-14 lg:py-16 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-lighten filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-lighten filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 px-4 py-2 text-sm font-medium text-primary ring-1 ring-inset ring-primary/40 backdrop-blur-sm shadow-lg">
              {eyebrow}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-6 text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-white to-slate-200 bg-clip-text text-transparent sm:text-4xl"
          >
            {headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-slate-300"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/onboard">
              <Button
                size="lg"
                className="h-12 px-8 text-base group shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  {primaryCta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base border-slate-600 text-white hover:bg-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              {secondaryCta}
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-slate-400"
          >
            {features.map((feature, index) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                {feature}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};
