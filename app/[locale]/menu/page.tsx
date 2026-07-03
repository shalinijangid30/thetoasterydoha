import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { WoodFrame } from "@/components/wood-frame";
import { assetPath } from "@/lib/asset-path";

type MenuItem = { name: string; desc: string; price: string };

const itemImages: Record<string, string[]> = {
  coffee: ["/images/menu-item-1.jpeg", "/images/menu-item-2.jpeg"],
  iceCream: [
    "/images/menu-item-3.jpeg",
    "/images/menu-item-4.jpeg",
    "/images/menu-item-5.jpeg",
  ],
  dessert: ["/images/menu-item-6.jpeg"],
};

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
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold">{t("title")}</h1>
        <p className="mt-3 text-ink/70">{t("subtitle")}</p>
      </div>

      <div className="space-y-14">
        {categories.map(({ key }) => {
          const items = t.raw(`items.${key}`) as MenuItem[];
          return (
            <div key={key}>
              <h2 className="text-2xl font-semibold text-wood-dark mb-6 pb-2 border-b-2 border-butter inline-block">
                {t(`categories.${key}`)}
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {items.map((item, i) => {
                  const image = itemImages[key]?.[i];
                  return (
                    <WoodFrame key={item.name} className="overflow-hidden">
                      {image && (
                        <Image
                          src={assetPath(image)}
                          alt={item.name}
                          width={400}
                          height={260}
                          className="w-full h-40 object-cover"
                        />
                      )}
                      <div className="p-5">
                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className="font-semibold">{item.name}</h3>
                          <span className="text-wood-dark font-medium whitespace-nowrap">
                            {item.price}
                          </span>
                        </div>
                        <p className="text-sm text-ink/60 mt-1">{item.desc}</p>
                      </div>
                    </WoodFrame>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-sm text-ink/50 mt-14">{t("note")}</p>
    </div>
  );
}
