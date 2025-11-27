/* eslint-disable id-length, complexity */
"use client";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";

interface Plan {
  name: string;
  price: string;
  billing?: string;
  description: string;
  features: string[];
  popular?: boolean;
}

interface PricingTeaserProps {
  eyebrow: string;
  headline: string;
  description: string;
  cta: string;
  plans: Plan[];
}

export const PricingTeaser: React.FC<PricingTeaserProps> = ({ eyebrow, headline, description, cta, plans }) => {
  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-900/50 dark:to-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 px-4 py-2 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 shadow-sm">
              {eyebrow}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl"
          >
            {headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-slate-600 dark:text-slate-400"
          >
            {description}
          </motion.p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className={`group relative h-full transition-all duration-300 ${
                  (plan.popular ?? false)
                    ? "border-primary shadow-xl shadow-primary/20 ring-2 ring-primary/30 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 scale-105"
                    : "border-slate-200 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30"
                } bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm`}
              >
                {/* Shimmer badge for popular plan */}
                {(plan.popular ?? false) && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-primary via-purple-600 to-primary text-white shadow-lg relative overflow-hidden">
                      <span className="relative z-10 flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        Most Popular
                      </span>
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 animate-shimmer" />
                    </Badge>
                  </div>
                )}

                {/* Gradient accent for popular plan */}
                {(plan.popular ?? false) && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-lg" />
                )}

                <CardHeader className="text-center">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4 flex items-baseline justify-center gap-x-2">
                    <span className="text-4xl font-bold tracking-tight bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    {plan.billing !== undefined && (
                      <span className="text-sm font-semibold leading-6 tracking-wide text-slate-600 dark:text-slate-400">
                        {plan.billing}
                      </span>
                    )}
                  </div>
                  <CardDescription className="mt-4">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 + featureIndex * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 group/item"
                      >
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 group-hover/item:bg-primary/20 transition-colors duration-300">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <Button
                    className={`mt-8 w-full transition-all duration-300 hover:scale-105 ${
                      (plan.popular ?? false)
                        ? "bg-gradient-to-r from-primary to-purple-600 text-white hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
                        : "group-hover:border-primary/50"
                    }`}
                    variant={(plan.popular ?? false) ? "default" : "outline"}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button variant="link" className="text-primary hover:text-primary/80 transition-colors group">
            {cta}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
