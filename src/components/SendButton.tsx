"use client";

import { Send, Loader2 } from "lucide-react";

type Props = {
  loading?: boolean;
};

export default function SendButton({ loading = false }: Props) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="
      group
      relative
      w-full
      overflow-hidden
      rounded-2xl
      py-4
      px-6
      font-semibold
      text-zinc-950
      bg-gradient-to-r
      from-yellow-400
      via-yellow-500
      to-yellow-600
      shadow-[0_4px_25px_rgba(234,179,8,0.25)]
      transition-all
      duration-300
      hover:scale-[1.01]
      hover:shadow-[0_0_35px_rgba(234,179,8,0.45)]
      active:scale-[0.98]
      disabled:opacity-60
      disabled:cursor-not-allowed
      disabled:hover:scale-100
      disabled:hover:shadow-none
      "
    >
      {/* Shine Effect */}
      <span
        className="
        absolute
        inset-0
        -translate-x-full
        skew-x-12
        bg-white/35
        transition-transform
        duration-700
        group-hover:translate-x-[250%]
        pointer-events-none
        "
      />

      {/* Content */}
      <span className="relative flex items-center justify-center gap-2.5 text-sm sm:text-base font-bold">
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin text-zinc-950" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <Send
              size={18}
              className="
              transition-transform
              duration-300
              group-hover:translate-x-1
              group-hover:-translate-y-1
              "
            />
          </>
        )}
      </span>
    </button>
  );
}