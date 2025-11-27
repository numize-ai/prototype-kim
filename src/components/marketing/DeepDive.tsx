/* eslint-disable id-length */
"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";

interface DeepDiveProps {
  eyebrow: string;
  headline: string;
  description: string;
  features: string[];
  image: string;
}

export const DeepDive: React.FC<DeepDiveProps> = ({ eyebrow, headline, description, features, image }) => {
  return (
    <section className="relative py-10 sm:py-14 lg:py-16 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/30 to-white dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      {/* Decorative gradient orb */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-300/10 dark:bg-purple-600/5 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <span className="inline-flex items-center rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 px-4 py-2 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 shadow-sm">
                {eyebrow}
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent sm:text-4xl">
              {headline}
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">{description}</p>

            <ul className="mt-8 space-y-4">
              {features.map((feature, index) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group flex items-start gap-3"
                >
                  {/* Enhanced animated checkmark */}
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="relative">
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-primary/5 text-primary ring-1 ring-primary/20 group-hover:ring-primary/40 group-hover:scale-110 transition-all duration-300">
                        <Check className="h-3.5 w-3.5 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 leading-6 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors duration-300">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Enhanced image container with multiple layers */}
            <div className="relative">
              {/* Gradient glow behind image */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-50" />

              {/* Main image container */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 shadow-2xl ring-1 ring-slate-900/10 dark:from-slate-800 dark:to-slate-900 dark:ring-slate-700">
                <Image
                  src={image}
                  alt="Product demonstration"
                  width={600}
                  height={400}
                  className="w-full object-cover"
                />
                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-purple-500/10" />

                {/* Decorative corner accents */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/30 to-transparent rounded-bl-full" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-tr-full" />
              </div>

              {/* Floating accent elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
