"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(nextLocale: string) {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        onClick={() => switchTo("en")}
        className={`px-2 py-1 rounded-sm ${
          locale === "en" ? "bg-butter text-ink" : "text-cream/70"
        }`}
      >
        EN
      </button>
      <span className="text-cream/30">/</span>
      <button
        onClick={() => switchTo("ar")}
        className={`px-2 py-1 rounded-sm ${
          locale === "ar" ? "bg-butter text-ink" : "text-cream/70"
        }`}
      >
        AR
      </button>
    </div>
  );
}
