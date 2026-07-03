import { getTranslations, setRequestLocale } from "next-intl/server";
import { EnquiryForm } from "@/components/enquiry-form";

export default async function EnquirePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("enquiry");

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h1 className="text-4xl font-bold text-center">{t("title")}</h1>
      <p className="mt-3 text-ink/70 text-center">{t("subtitle")}</p>

      <div className="wood-frame rounded-sm overflow-hidden bg-pastel-brown mt-10 p-6 md:p-10">
        <EnquiryForm />
      </div>
    </div>
  );
}
