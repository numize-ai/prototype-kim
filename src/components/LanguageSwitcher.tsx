"use client";

import { Button } from "~/components/ui/button";
import { Language } from "~i18n/types";
import { useLanguage } from "~i18n/useLanguage";

export const LanguageSwitcher: React.FC = () => {
  const [language, setLanguage] = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-md border border-border bg-background p-1">
      <Button
        variant={language === Language.EN ? "default" : "ghost"}
        size="sm"
        onClick={() => {
          setLanguage(Language.EN).catch(() => {
            // Handle language change error silently
          });
        }}
        className="h-7 px-2 text-xs"
      >
        EN
      </Button>
      <Button
        variant={language === Language.FR ? "default" : "ghost"}
        size="sm"
        onClick={() => {
          setLanguage(Language.FR).catch(() => {
            // Handle language change error silently
          });
        }}
        className="h-7 px-2 text-xs"
      >
        FR
      </Button>
    </div>
  );
};
