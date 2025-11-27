/* eslint-disable id-length */
"use client";

import { useEffect, useRef } from "react";

import { Button } from "~/components/ui/button";

import { motion } from "framer-motion";
import gsap from "gsap";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

interface HeroProps {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  videoUrl?: string;
}

export function Hero({
  eyebrow,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  videoUrl,
}: HeroProps): React.ReactElement {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headlineRef.current !== null) {
      // Set initial state - characters start from below
      gsap.set(".char", { y: 100, opacity: 0 });

      // Animate characters up with stagger
      gsap.to(".char", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.03,
        delay: 0.3,
      });
    }
  }, []);

  // Function to split text into words and characters
  const renderAnimatedText = (text: string) => {
    return text.split(" ").map((word, wordIndex) => (
      <div key={wordIndex} className="inline-block overflow-visible mr-4 last:mr-0 pb-2">
        {word.split("").map((char, charIndex) => (
          <span key={`${wordIndex}-${charIndex}`} className="char inline-block">
            {char}
          </span>
        ))}
      </div>
    ));
  };
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Enhanced gradient mesh background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/40 via-transparent to-purple-50/30 dark:from-blue-950/20 dark:to-purple-950/20" />

      {/* Animated gradient orbs for depth */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300/20 dark:bg-purple-600/10 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300/20 dark:bg-blue-600/10 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300/20 dark:bg-pink-600/10 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-70 animate-blob animation-delay-4000" />

      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pb-32 lg:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-4xl text-center"
            >
              {/* Enhanced eyebrow badge with floating animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="mb-6"
              >
                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 px-4 py-2 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 shadow-sm backdrop-blur-sm">
                  {eyebrow}
                </span>
              </motion.div>

              <h1
                ref={headlineRef}
                className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl lg:text-7xl flex flex-wrap justify-center"
              >
                {renderAnimatedText(headline)}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400"
              >
                {subheadline}
              </motion.p>

              {/* Enhanced CTA buttons with better hover states */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link href="/onboard">
                  <Button
                    size="lg"
                    className="group h-12 px-8 text-base w-full sm:w-auto shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
                  >
                    {primaryCta}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>

                {videoUrl !== undefined && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 px-8 text-base w-full sm:w-auto hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-105 hover:border-primary/50"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    {secondaryCta}
                  </Button>
                )}
              </motion.div>
            </motion.div>

            {/* Enhanced video preview with better shadows and effects */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mx-auto mt-16 max-w-5xl"
            >
              <div className="relative rounded-2xl bg-gradient-to-br from-white/40 to-white/10 p-2 ring-1 ring-inset ring-white/20 backdrop-blur-lg dark:from-slate-800/50 dark:to-slate-800/20 dark:ring-slate-700/50 shadow-2xl">
                {/* Glow effect around video container */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-2xl blur-lg opacity-60" />

                <div className="relative overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-slate-900/10 dark:bg-slate-900 dark:ring-slate-800">
                  <video src="/video.mp4" autoPlay muted loop playsInline className="w-full object-cover" />
                  {/* Enhanced fade effect at the bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-slate-900" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
