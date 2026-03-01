import { Button } from "@heroui/react";

export default function AppButton({
  children,
  variant = "primary", // primary | secondary | danger | ghost
  size = "md",
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "chip-button bg-[linear-gradient(135deg,#2563eb_0%,#60a5fa_100%)] text-white border-0 shadow-[0_10px_24px_rgba(37,99,235,0.35)] hover:brightness-110",
    secondary:
      "chip-button border border-[#cfdcfb] bg-[rgba(255,255,255,0.58)] text-[#1e3560] hover:bg-[rgba(255,255,255,0.78)]",
    danger:
      "chip-button border border-[#fecaca] bg-[#fff0f0] text-[#b91c1c] hover:bg-[#fee2e2]",
    ghost: "chip-button border border-[#d8e5fb] bg-transparent text-[#1f3968] hover:bg-[#eaf2ff]",
  };

  return (
    <Button size={size} variant="light" className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </Button>
  );
}
