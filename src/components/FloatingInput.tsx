"use client";

type FloatingInputProps = {
  label: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
};

export default function FloatingInput({
  label,
  name,
  value,
  onChange,
  disabled = false,
  type = "text",
}: FloatingInputProps) {
  return (
    <div className="relative w-full">
      <input
        id={name}
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        placeholder=" "
        className="
        peer
        w-full
        px-5
        pt-7
        pb-3
        rounded-2xl
        bg-zinc-950/70
        backdrop-blur-xl
        border
        border-zinc-800
        text-zinc-100
        outline-none
        transition-all
        duration-300
        focus:border-yellow-500/80
        focus:shadow-[0_0_20px_rgba(234,179,8,0.15)]
        disabled:opacity-50
        disabled:cursor-not-allowed
        "
      />

      <label
        htmlFor={name}
        className="
        absolute
        left-5
        top-5
        text-zinc-500
        text-sm sm:text-base
        transition-all
        duration-300
        pointer-events-none
        peer-placeholder-shown:text-base
        peer-placeholder-shown:top-5
        peer-placeholder-shown:text-zinc-500
        peer-focus:text-xs
        peer-focus:top-2
        peer-focus:text-yellow-400
        peer-not-placeholder-shown:text-xs
        peer-not-placeholder-shown:top-2
        peer-not-placeholder-shown:text-yellow-400
        "
      >
        {label}
      </label>
    </div>
  );
}