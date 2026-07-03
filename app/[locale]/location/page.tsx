import { getTranslations, setRequestLocale } from "next-intl/server";
import { WoodFrame } from "@/components/wood-frame";
import { siteConfig } from "@/lib/site-config";
import { assetPath } from "@/lib/asset-path";

type HourRow = { day: string; time: string };

export default async function LocationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("location");
  const hours = t.raw("hours") as HourRow[];

  return (
    <div className="relative bg-cream">
      <div
        className="fixed inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url(${assetPath("/images/location-bg.jpeg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center 70%",
          backgroundAttachment: "fixed",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-24">
        <h1 className="text-[2.7rem] font-bold text-center text-ink drop-shadow-[0_2px_6px_rgba(255,255,255,0.8)]">
          {t("title")}
        </h1>

        <div className="grid md:grid-cols-2 gap-10 mt-12 items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-[1.2rem] font-semibold text-ink drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
                {t("title")}
              </h2>
              <p className="mt-1 text-[1.2rem] text-ink drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
                {t("address")}
              </p>
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-[1.05rem] underline text-ink drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]"
              >
                {t("directions")}
              </a>
            </div>

            <div>
              <h2 className="text-[1.2rem] font-semibold text-ink drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
                {t("hoursTitle")}
              </h2>
              <ul className="mt-2 space-y-1">
                {hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex justify-between gap-4 text-[1.2rem] text-ink drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]"
                  >
                    <span>{h.day}</span>
                    <span className="font-medium text-ink">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <WoodFrame className="aspect-video">
            <iframe
              src={siteConfig.mapsEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              title="map"
            />
          </WoodFrame>
        </div>
      </div>
    </div>
  );
}
