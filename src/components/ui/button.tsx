import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
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
      ? "border border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50"
      : "bg-blue-600 text-white hover:bg-blue-500";
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
