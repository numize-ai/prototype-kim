"use client";

import Image from "next/image";

interface LogoStripProps {
  title: string;
  logos: Array<{
    name: string;
    src: string;
  }>;
}

export function LogoStrip({ title, logos }: LogoStripProps): React.ReactElement {
  // Create enough duplicates for seamless infinite scroll
  const tripleLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="relative py-12 sm:py-16 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950">
      {/* Subtle decorative background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 [mask-image:linear-gradient(90deg,transparent,white,transparent)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <p className="text-base font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">{title}</p>
          <div className="mt-8 space-y-8 overflow-hidden">
            {/* First row - moves left with fade edges */}
            <div className="relative overflow-hidden">
              {/* Fade gradient at edges */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />

              <div className="flex items-center gap-12 sm:gap-16 animate-scroll-left">
                {tripleLogos.map((logo, index) => (
                  <div
                    key={`row1-${logo.name}-${index}`}
                    className="group flex h-16 items-center justify-center grayscale opacity-50 transition-all duration-500 hover:grayscale-0 hover:opacity-100 hover:scale-110 shrink-0 cursor-pointer"
                  >
                    <div className="relative">
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Image
                        src={logo.src}
                        alt={logo.name}
                        width={140}
                        height={56}
                        className="relative h-10 w-auto object-contain sm:h-12 filter drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Second row - moves right with fade edges */}
            <div className="relative overflow-hidden">
              {/* Fade gradient at edges */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />

              <div className="flex items-center gap-12 sm:gap-16 animate-scroll-right">
                {tripleLogos.map((logo, index) => (
                  <div
                    key={`row2-${logo.name}-${index}`}
                    className="group flex h-16 items-center justify-center grayscale opacity-50 transition-all duration-500 hover:grayscale-0 hover:opacity-100 hover:scale-110 shrink-0 cursor-pointer"
                  >
                    <div className="relative">
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Image
                        src={logo.src}
                        alt={logo.name}
                        width={140}
                        height={56}
                        className="relative h-10 w-auto object-contain sm:h-12 filter drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
