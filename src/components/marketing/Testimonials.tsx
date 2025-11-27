/* eslint-disable id-length */
"use client";

import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps): React.ReactElement {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (testimonials.length === 0) {
    return <div>No testimonials available</div>;
  }

  const currentTestimonial = testimonials[currentIndex];
  if (currentTestimonial === undefined) {
    return <div>Invalid testimonial</div>;
  }

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const previous = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative py-10 sm:py-14 lg:py-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900/50 dark:via-slate-950 dark:to-slate-900/50 overflow-hidden">
      {/* Subtle gradient orb in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent sm:text-4xl">
            Loved by teams worldwide
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            See how Numize is transforming how teams work with data.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="relative">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Enhanced testimonial card with gradient background */}
              <Card className="border-0 bg-gradient-to-br from-white via-white to-slate-50/50 dark:from-slate-800/90 dark:via-slate-800/80 dark:to-slate-900/90 backdrop-blur-sm shadow-xl ring-1 ring-slate-200/50 dark:ring-slate-700/50">
                {/* Decorative gradient top border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-lg" />

                <CardContent className="p-8 sm:p-12 relative">
                  {/* Large decorative quote mark */}
                  <div className="absolute top-8 left-8 text-primary/10 text-6xl font-serif leading-none">&ldquo;</div>

                  <blockquote className="text-center relative z-10">
                    <p className="text-xl font-medium text-slate-900 dark:text-slate-100 sm:text-2xl leading-relaxed">
                      &ldquo;{currentTestimonial.quote}&rdquo;
                    </p>
                    <footer className="mt-8">
                      <div className="flex items-center justify-center gap-4">
                        {/* Enhanced avatar with gradient ring */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full blur-sm opacity-50" />
                          <Image
                            src={currentTestimonial.avatar}
                            alt={currentTestimonial.author}
                            width={48}
                            height={48}
                            className="relative h-12 w-12 rounded-full object-cover ring-2 ring-white dark:ring-slate-900"
                          />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-slate-900 dark:text-slate-100">
                            {currentTestimonial.author}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {currentTestimonial.role}, {currentTestimonial.company}
                          </div>
                        </div>
                      </div>
                    </footer>
                  </blockquote>
                </CardContent>
              </Card>
            </motion.div>

            {/* Enhanced navigation controls */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={previous}
                className="h-10 w-10 rounded-full hover:bg-primary/10 hover:border-primary/50 hover:scale-110 transition-all duration-300"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous testimonial</span>
              </Button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-primary w-8"
                        : "bg-slate-300 dark:bg-slate-600 w-2 hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={next}
                className="h-10 w-10 rounded-full hover:bg-primary/10 hover:border-primary/50 hover:scale-110 transition-all duration-300"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next testimonial</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
