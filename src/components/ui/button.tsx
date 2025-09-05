import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "default" | "outline";
  size?: "default" | "icon";
}

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  const variants =
    variant === "outline"
      ? "border border-amber-500 text-amber-500 bg-transparent hover:bg-amber-50"
      : "bg-[#eda820] text-black hover:bg-[#bf8719]";
  const sizes = size === "icon" ? "w-9 h-9 p-0" : "px-4 py-2";
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded text-sm font-medium focus:outline-none",
        variants,
        sizes,
        className
      )}
      {...props}
    />
  );
}
export default Button;
