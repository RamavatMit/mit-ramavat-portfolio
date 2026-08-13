"use client";

import FloatingInput from "@/components/FloatingInput";
import FloatingTextarea from "@/components/FloatingTextarea";
import SendButton from "@/components/SendButton";

import {
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import Reveal from "@/components/Reveal";

export default function Contact() {
  const [form, setForm] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
  }>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus({
        type: "error",
        message: "Please fill in all required fields (Name, Email, Message).",
      });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: "" });

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn(
        "EmailJS environment variables (NEXT_PUBLIC_EMAILJS_...) are missing."
      );
      setStatus({
        type: "error",
        message:
          "Email service is not configured with public keys. Please check environment configuration.",
      });
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

      setStatus({
        type: "success",
        message: "Message sent successfully.",
      });

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error: unknown) {
      console.error("EmailJS Error:", error);
      setStatus({
        type: "error",
        message:
          "Failed to send message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Reveal>
      <section
        id="contact"
        className="relative py-24 md:py-32 px-4 sm:px-6 overflow-hidden bg-tech-grid"
      >
        {/* Subtle Ambient Glow Spots */}
        <div
          className="
          absolute
          top-1/3
          right-10
          w-[400px]
          h-[400px]
          bg-yellow-500/[0.04]
          blur-[140px]
          rounded-full
          pointer-events-none
          "
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
              <Sparkles size={13} className="text-yellow-400" />
              <span>Get In Touch</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-zinc-100 tracking-tight">
              Let&apos;s Work Together
            </h2>

            <p className="mt-4 text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed">
              I&apos;m always interested in AI, Machine Learning, Full Stack Development
              and exciting new opportunities. Let&apos;s build something amazing together.
            </p>
          </div>

          {/* Grid */}
          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 mt-14 md:mt-20 items-start">
            {/* LEFT CONTACT INFO CARDS */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-5">
              <ContactCard
                icon={<Mail size={22} />}
                title="Email"
                value="mitramavat8@gmail.com"
                href="mailto:mitramavat8@gmail.com"
              />

              <ContactCard
                icon={<MapPin size={22} />}
                title="Location"
                value="Ahmedabad, Gujarat, India"
                href="https://maps.google.com/?q=Ahmedabad"
              />
            </div>

            {/* RIGHT FORM CONTAINER */}
            <div className="lg:col-span-7">
              <div
                className="
                relative
                rounded-[32px]
                border
                border-zinc-800/90
                bg-zinc-950/60
                backdrop-blur-2xl
                p-5
                sm:p-10
                shadow-[0_15px_40px_rgba(0,0,0,0.5)]
                "
              >
                {/* Subtle Ambient Gold Glow inside form container */}
                <div className="absolute inset-0 bg-yellow-500/[0.02] blur-3xl pointer-events-none rounded-[32px]" />

                <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                  {status.type === "success" && (
                    <div className="p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs sm:text-sm flex items-center gap-3 transition-all">
                      <CheckCircle2 size={18} className="shrink-0 text-yellow-400" />
                      <span>{status.message}</span>
                    </div>
                  )}

                  {status.type === "error" && (
                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm flex items-center gap-3 transition-all">
                      <AlertCircle size={18} className="shrink-0 text-red-400" />
                      <span>{status.message}</span>
                    </div>
                  )}

                  <FloatingInput
                    label="Your Name *"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={loading}
                  />

                  <FloatingInput
                    label="Your Email *"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={loading}
                  />

                  <FloatingInput
                    label="Subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    disabled={loading}
                  />

                  <FloatingTextarea
                    label="Your Message *"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    disabled={loading}
                  />

                  <SendButton loading={loading} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

function ContactCard({
  icon,
  title,
  value,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div
      className="
      group
      flex
      items-center
      gap-4
      p-5
      sm:p-6
      rounded-3xl
      border
      border-zinc-800/80
      bg-zinc-950/60
      backdrop-blur-xl
      hover:border-yellow-500/50
      hover:bg-zinc-900/80
      hover:-translate-y-1
      hover:shadow-[0_4px_25px_rgba(234,179,8,0.12)]
      transition-all
      duration-300
      ease-out
      "
    >
      <div
        className="
        w-12
        h-12
        sm:w-14
        sm:h-14
        rounded-2xl
        bg-yellow-500/10
        border
        border-yellow-500/20
        flex
        items-center
        justify-center
        text-yellow-400
        group-hover:scale-110
        group-hover:border-yellow-500/40
        group-hover:shadow-[0_0_15px_rgba(234,179,8,0.3)]
        transition-all
        duration-300
        shrink-0
        "
      >
        {icon}
      </div>

      <div className="overflow-hidden min-w-0">
        <p className="text-xs sm:text-sm text-zinc-500 font-medium">
          {title}
        </p>

        <h3 className="text-sm sm:text-base font-semibold text-zinc-100 group-hover:text-yellow-400 transition-colors truncate mt-0.5">
          {value}
        </h3>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        {content}
      </a>
    );
  }

  return content;
}
