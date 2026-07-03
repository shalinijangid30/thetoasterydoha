import { getTranslations, setRequestLocale } from "next-intl/server";
import { WoodFrame } from "@/components/wood-frame";
import { assetPath } from "@/lib/asset-path";

type MenuItem = { name: string; desc: string; price: string };

const categoryKeys = [
  "coffee",
  "milkBased",
  "coldDrinks",
  "flatbread",
  "sandwiches",
  "pastries",
  "dessert",
  "drinks",
  "teaPots",
  "iceCream",
] as const;

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("menu");

  const categories = categoryKeys.map((key) => ({ key }));

  return (
    <div className="relative bg-cream">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${assetPath("/images/menu-bg.jpeg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold">{t("title")}</h1>
          <p className="mt-3 text-ink/70">{t("subtitle")}</p>
        </div>

        <div className="space-y-14">
        {categories.map(({ key }) => {
          const items = t.raw(`items.${key}`) as MenuItem[];
          return (
            <div key={key}>
              <h2 className="text-2xl font-semibold text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] mb-6 pb-2 border-b-2 border-butter inline-block">
                {t(`categories.${key}`)}
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {items.map((item) => (
                  <WoodFrame key={item.name} className="p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-semibold">{item.name}</h3>
                      <span className="text-wood-dark font-medium whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-sm text-ink/60 mt-1">{item.desc}</p>
                  </WoodFrame>
                ))}
              </div>
            </div>
          );
          })}
        </div>

        <p className="text-center text-sm text-ink/50 mt-14">{t("note")}</p>
      </div>
    </div>
  );
}
