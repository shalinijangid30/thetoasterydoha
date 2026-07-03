"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { useState } from "react";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: t("home") },
    { href: "/menu", label: t("menu") },
    { href: "/story", label: t("story") },
    { href: "/location", label: t("location") },
    { href: "/enquire", label: t("enquire") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-ink/95 backdrop-blur border-b-4 border-butter text-cream">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold lowercase tracking-tight">
          the toastery
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm lowercase">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`transition-colors hover:text-butter ${
                pathname === l.href ? "text-butter font-medium" : "text-cream/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LocaleSwitcher />
          <button
            className="md:hidden text-2xl leading-none"
            onClick={() => setOpen((o) => !o)}
            aria-label="menu"
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden flex flex-col gap-1 px-6 pb-4 lowercase text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`py-2 border-b border-butter/30 ${
                pathname === l.href ? "text-butter font-medium" : "text-cream/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
