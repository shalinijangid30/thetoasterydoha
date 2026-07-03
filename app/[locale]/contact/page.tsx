import { getTranslations, setRequestLocale } from "next-intl/server";
import { WoodFrame } from "@/components/wood-frame";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 md:py-24 text-center">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <p className="mt-4 text-ink/70">{t("body")}</p>

      <WoodFrame className="mt-10 p-8 grid gap-4">
        <a
          href={`mailto:${siteConfig.email}`}
          className="bg-ink text-cream hover:bg-wood-dark transition-colors px-6 py-3 rounded-sm font-medium"
        >
          {t("email")} — {siteConfig.email}
        </a>
        <a
          href={whatsappLink("Hi! I have a question for The Toastery.")}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-ink text-cream hover:bg-wood-dark transition-colors px-6 py-3 rounded-sm font-medium"
        >
          {t("whatsapp")}
        </a>
        <a
          href={siteConfig.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-ink text-cream hover:bg-wood-dark transition-colors px-6 py-3 rounded-sm font-medium"
        >
          {t("instagram")}
        </a>
      </WoodFrame>
    </div>
  );
}
