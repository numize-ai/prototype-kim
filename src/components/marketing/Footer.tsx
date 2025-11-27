import { Github, Linkedin, Twitter } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  items: FooterLink[];
}

interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}

interface FooterProps {
  company: {
    name: string;
    description: string;
  };
  links: FooterSection[];
  social: SocialLink[];
}

const iconMap = {
  Twitter,
  Linkedin,
  Github,
};

export const Footer: React.FC<FooterProps> = ({ company, links, social }) => {
  return (
    <footer className="relative bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-950 border-t border-slate-200 dark:border-slate-800">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 [mask-image:linear-gradient(180deg,white,transparent)]" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Company info section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              {company.name}
            </h3>
            <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">{company.description}</p>

            {/* Enhanced social icons */}
            <div className="mt-6 flex gap-3">
              {social.map((item) => {
                const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                return (
                  <a
                    key={item.platform}
                    href={item.href}
                    className="group relative flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-all duration-300 hover:bg-primary hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-primary/30 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-primary dark:hover:text-white"
                  >
                    <span className="sr-only">{item.platform}</span>
                    <IconComponent className="h-5 w-5 transition-transform group-hover:scale-110" />
                    {/* Subtle glow on hover */}
                    <div className="absolute inset-0 rounded-lg bg-primary/20 opacity-0 blur-md group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links sections with subtle dividers */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-3">
            {links.map((section, index) => (
              <div key={section.title} className="relative">
                {/* Vertical divider on desktop (hidden on mobile) */}
                {index > 0 && (
                  <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent dark:via-slate-700 hidden sm:block" />
                )}

                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                  {section.title}
                </h4>
                <ul className="mt-6 space-y-4">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="group inline-flex items-center text-sm text-slate-600 transition-colors duration-300 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                      >
                        <span className="relative">
                          {item.label}
                          {/* Animated underline on hover */}
                          <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced copyright section with gradient divider */}
        <div className="mt-12 pt-8 border-t border-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700">
          <div className="relative h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700" />
          <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-slate-900 dark:text-slate-100">{company.name}</span>. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
