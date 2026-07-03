"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { mailtoLink, whatsappLink } from "@/lib/site-config";

type Mode = "general" | "events";

export function EnquiryForm() {
  const t = useTranslations("enquiry");
  const [mode, setMode] = useState<Mode>("general");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [headcount, setHeadcount] = useState("");
  const [occasion, setOccasion] = useState("");

  function buildBody() {
    const lines = [
      `${t("name")}: ${name}`,
      `${t("email")}: ${email}`,
      `${t("phone")}: ${phone}`,
    ];
    if (mode === "events") {
      lines.push(`${t("date")}: ${date}`);
      lines.push(`${t("headcount")}: ${headcount}`);
      lines.push(`${t("occasion")}: ${occasion}`);
    }
    lines.push(`${t("message")}: ${message}`);
    return lines.join("\n");
  }

  const subject =
    mode === "events" ? "Events & Catering Enquiry" : "Shop Enquiry";

  return (
    <div>
      <div className="flex gap-2 mb-8">
        <button
          type="button"
          onClick={() => setMode("general")}
          className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
            mode === "general" ? "bg-ink text-cream" : "bg-white text-ink/70"
          }`}
        >
          {t("modeGeneral")}
        </button>
        <button
          type="button"
          onClick={() => setMode("events")}
          className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
            mode === "events" ? "bg-ink text-cream" : "bg-white text-ink/70"
          }`}
        >
          {t("modeEvents")}
        </button>
      </div>

      <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1 text-sm">
            {t("name")} <span className="text-wood-dark">*</span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-ink/15 rounded-sm px-3 py-2 bg-white"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            {t("email")} <span className="text-wood-dark">*</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-ink/15 rounded-sm px-3 py-2 bg-white"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1 text-sm">
          {t("phone")}
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-ink/15 rounded-sm px-3 py-2 bg-white"
          />
        </label>

        {mode === "events" && (
          <div className="grid sm:grid-cols-3 gap-4">
            <label className="flex flex-col gap-1 text-sm">
              {t("date")}
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border border-ink/15 rounded-sm px-3 py-2 bg-white"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              {t("headcount")}
              <input
                type="number"
                min={1}
                value={headcount}
                onChange={(e) => setHeadcount(e.target.value)}
                className="border border-ink/15 rounded-sm px-3 py-2 bg-white"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              {t("occasion")}
              <input
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="border border-ink/15 rounded-sm px-3 py-2 bg-white"
              />
            </label>
          </div>
        )}

        <label className="flex flex-col gap-1 text-sm">
          {t("message")}
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-ink/15 rounded-sm px-3 py-2 bg-white"
          />
        </label>

        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <a
            href={mailtoLink({ subject, body: buildBody() })}
            className="text-center bg-pale-brown text-ink hover:opacity-90 transition-opacity px-6 py-3 rounded-sm font-medium"
          >
            {t("submitEmail")}
          </a>
          <a
            href={whatsappLink(`${subject}\n\n${buildBody()}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center bg-pale-brown text-ink hover:opacity-90 transition-opacity px-6 py-3 rounded-sm font-medium"
          >
            {t("submitWhatsapp")}
          </a>
        </div>
      </form>
    </div>
  );
}
