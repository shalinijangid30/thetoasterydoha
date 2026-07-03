import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { WoodFrame } from "@/components/wood-frame";
import { StripeSection } from "@/components/stripe-section";
import { assetPath } from "@/lib/asset-path";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hero");
  const h = await getTranslations("home");

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="stripe-bg">
          <div className="mx-auto max-w-[1400px] px-6 py-20 md:py-28 grid md:grid-cols-[auto_1fr_auto] gap-8 items-center">
            <WoodFrame className="aspect-video overflow-hidden order-1 w-full md:w-[520px] animate-slide-in-right">
              <video
                src={assetPath("/videos/toast1.mp4")}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </WoodFrame>
            <div className="order-2 text-center animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold mt-3 leading-tight">
                {t("title")}
              </h1>
              <p className="mt-4 text-lg text-ink/70">{t("subtitle")}</p>
              <Link
                href="/menu"
                className="inline-block mt-8 bg-butter hover:bg-butter-dark transition-colors px-6 py-3 rounded-sm font-medium animate-toast-pop"
              >
                {t("cta")}
              </Link>
            </div>
            <WoodFrame className="aspect-video overflow-hidden order-3 w-full md:w-[520px] animate-slide-in-left">
              <video
                src={assetPath("/videos/toast2.mp4")}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </WoodFrame>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <WoodFrame className="aspect-[4/3] order-2 md:order-1">
          <Image
            src={assetPath("/images/story-1.jpeg")}
            alt="our story"
            width={600}
            height={450}
            className="w-full h-full object-cover"
          />
        </WoodFrame>
        <div className="order-1 md:order-2">
          <h2 className="text-3xl font-bold">{h("aboutTitle")}</h2>
          <p className="mt-4 text-ink/70 leading-relaxed">{h("aboutBody")}</p>
        </div>
      </section>

      <StripeSection>
        <h2 className="text-3xl font-bold mb-8">{h("galleryTitle")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["/images/menu-1.jpeg", "/images/menu-2.jpeg", "/images/gallery-1.jpeg", "/images/gallery-2.jpeg"].map(
            (rawSrc) => (
              <WoodFrame key={rawSrc} className="aspect-square">
                <Image
                  src={assetPath(rawSrc)}
                  alt=""
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </WoodFrame>
            )
          )}
        </div>
      </StripeSection>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24 text-center">
        <h2 className="text-3xl font-bold">{h("ctaTitle")}</h2>
        <p className="mt-4 text-ink/70 max-w-xl mx-auto">{h("ctaBody")}</p>
        <Link
          href="/enquire"
          className="inline-block mt-8 bg-wood text-cream hover:bg-wood-dark transition-colors px-6 py-3 rounded-sm font-medium"
        >
          {h("ctaButton")}
        </Link>
      </section>
    </>
  );
}
