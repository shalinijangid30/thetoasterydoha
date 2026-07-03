import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { WoodFrame } from "@/components/wood-frame";
import { assetPath } from "@/lib/asset-path";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("story");

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <p className="text-wood-dark font-medium">{t("kicker")}</p>
      <h1 className="text-4xl font-bold mt-2">{t("title")}</h1>

      <div className="grid md:grid-cols-2 gap-12 items-center mt-10">
        <WoodFrame className="aspect-[4/3] overflow-hidden">
          <Image
            src={assetPath("/images/story-2.jpeg")}
            alt={t("title")}
            width={600}
            height={450}
            className="w-full h-full object-cover"
          />
        </WoodFrame>
        <div className="space-y-4 text-ink/70 leading-relaxed">
          <p>{t("body1")}</p>
          <p>{t("body2")}</p>
        </div>
      </div>

      <blockquote className="mt-16 border-s-4 border-butter ps-6 text-2xl font-medium italic text-wood-dark max-w-2xl">
        "{t("quote")}"
      </blockquote>

      <div className="grid grid-cols-2 gap-4 mt-16">
        <WoodFrame className="aspect-video overflow-hidden">
          <Image
            src={assetPath("/images/story-3.jpeg")}
            alt={t("title")}
            width={600}
            height={340}
            className="w-full h-full object-cover"
          />
        </WoodFrame>
        <WoodFrame className="aspect-video overflow-hidden">
          <Image
            src={assetPath("/images/story-4.jpeg")}
            alt={t("title")}
            width={600}
            height={340}
            className="w-full h-full object-cover object-bottom"
          />
        </WoodFrame>
      </div>
    </div>
  );
}
