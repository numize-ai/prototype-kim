"use client";

import * as React from "react";

import { Button } from "~/components/ui/button";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/ask" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Numize</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/ask">
              <Button variant={isActive("/ask") ? "secondary" : "ghost"} size="sm" className="text-sm">
                Ask Question
              </Button>
            </Link>
            <Link href="/history">
              <Button variant={isActive("/history") ? "secondary" : "ghost"} size="sm" className="text-sm">
                History
              </Button>
            </Link>
            <Link href="/dbt-dictionary">
              <Button variant={isActive("/dbt-dictionary") ? "secondary" : "ghost"} size="sm" className="text-sm">
                🔵 dbt Dictionary
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant={isActive("/settings") ? "secondary" : "ghost"} size="sm" className="text-sm">
                Settings
              </Button>
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600">DA</span>
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">Data Analyst</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};
