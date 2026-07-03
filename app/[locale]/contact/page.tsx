import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { assetPath } from "@/lib/asset-path";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <div className="relative bg-cream">
      <div
        className="fixed inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url(${assetPath("/images/contact-bg.jpeg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-2xl px-6 py-16 md:py-24 text-center">
        <h1 className="text-4xl font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
          {t("title")}
        </h1>
        <p className="mt-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
          {t("body")}
        </p>

        <div className="wood-frame rounded-sm overflow-hidden bg-pastel-brown mt-10 p-8 grid gap-4">
          <a
            href={`mailto:${siteConfig.email}`}
            className="bg-pale-brown text-ink hover:opacity-90 transition-opacity px-6 py-3 rounded-sm font-medium"
          >
            {t("email")} — {siteConfig.email}
          </a>
          <a
            href={whatsappLink("Hi! I have a question for The Toastery.")}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pale-brown text-ink hover:opacity-90 transition-opacity px-6 py-3 rounded-sm font-medium"
          >
            {t("whatsapp")}
          </a>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pale-brown text-ink hover:opacity-90 transition-opacity px-6 py-3 rounded-sm font-medium"
          >
            {t("instagram")}
          </a>
        </div>
      </div>
    </div>
  );
}
