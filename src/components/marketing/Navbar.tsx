"use client";

import { useState } from "react";

import { Button } from "~/components/ui/button";
import { LanguageSwitcher } from "~components/LanguageSwitcher";

import { Menu, X } from "lucide-react";
import Link from "next/link";

const navigation = [
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Numize</span>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-slate-100">Numize</span>
            </div>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700 dark:text-slate-300"
            onClick={() => {
              setMobileMenuOpen(true);
            }}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-base font-semibold leading-6 text-slate-800 hover:text-primary dark:text-slate-200 dark:hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 lg:items-center">
          <LanguageSwitcher />
          <Link href="/onboard">
            <Button variant="ghost">Sign in</Button>
          </Link>
          <Link href="/onboard">
            <Button>Get started</Button>
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-slate-900/10 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Numize</span>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">N</span>
                  </div>
                  <span className="text-xl font-bold text-slate-900 dark:text-slate-100">Numize</span>
                </div>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-slate-700 dark:text-slate-300"
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-slate-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-900 hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-800"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <LanguageSwitcher />
                    </div>
                    <Link href="/onboard" className="block">
                      <Button variant="ghost" className="w-full">
                        Sign in
                      </Button>
                    </Link>
                    <Link href="/onboard" className="block">
                      <Button className="w-full">Get started</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
