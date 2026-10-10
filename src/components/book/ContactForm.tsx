"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

type Form = { name: string; email: string; subject: string; message: string };
const empty: Form = { name: "", email: "", subject: "", message: "" };

/** The correspondence card: a letter written straight onto the page. */
export default function ContactForm() {
  const [form, setForm] = useState<Form>(empty);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", message: "Please add your name, email and a message." });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: "" });

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn("EmailJS environment variables (NEXT_PUBLIC_EMAILJS_...) are missing.");
      setStatus({ type: "error", message: `The form is offline — write to ${profile.email}.` });
      setLoading(false);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: form.name,
          email: form.email,
          from_name: form.name,
          from_email: form.email,
          subject: form.subject || "Portfolio Contact Form",
          message: form.message,
        },
        publicKey
      );
      setStatus({ type: "success", message: "Sent — I'll write back soon." });
      setForm(empty);
    } catch (error: unknown) {
      console.error("EmailJS Error:", error);
      setStatus({ type: "error", message: "Couldn't send. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const field =
    "w-full border-0 border-b border-dashed border-line-strong bg-transparent py-[1.4cqw] font-book t-body text-ink outline-none transition-colors placeholder:text-dim focus:border-solid focus:border-accent disabled:opacity-50";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex min-h-0 flex-1 flex-col gap-[2.6cqw]">
      <label className="block">
        <span className="t-cap text-dim">Your name *</span>
        <input name="name" value={form.name} onChange={handleChange} disabled={loading} autoComplete="name" placeholder="Ada Lovelace" className={field} />
      </label>
      <label className="block">
        <span className="t-cap text-dim">Email *</span>
        <input name="email" type="email" value={form.email} onChange={handleChange} disabled={loading} autoComplete="email" placeholder="you@company.com" className={field} />
      </label>
      <label className="block">
        <span className="t-cap text-dim">Subject</span>
        <input name="subject" value={form.subject} onChange={handleChange} disabled={loading} placeholder="An AI role, a project, a hello" className={field} />
      </label>
      <label className="flex min-h-0 flex-1 flex-col">
        <span className="t-cap text-dim">Message *</span>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          disabled={loading}
          placeholder="Dear Mit,"
          className={cn(field, "min-h-[14cqw] flex-1 resize-none bg-[repeating-linear-gradient(transparent,transparent_calc(4.3cqw*var(--k,1)-1px),var(--line)_calc(4.3cqw*var(--k,1)))] leading-[calc(4.3cqw*var(--k,1))]")}
        />
      </label>

      <div className="flex items-center justify-between gap-[3cqw]">
        <p
          role="status"
          className={cn("t-sm italic", status.type === "error" ? "text-accent" : "text-sage")}
        >
          {status.message}
        </p>
        <button
          type="submit"
          disabled={loading}
          className="group inline-flex shrink-0 items-center gap-[1.6cqw] rounded-full bg-ink px-[4.5cqw] py-[2cqw] font-sans t-sm font-medium text-paper transition-colors hover:bg-accent disabled:opacity-60"
        >
          {loading ? "Sealing…" : "Send letter"}
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
        </button>
      </div>
    </form>
  );
}
