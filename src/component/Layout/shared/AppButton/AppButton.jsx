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
      "chip-button bg-[linear-gradient(135deg,#0f766e_0%,#14b8a6_100%)] text-white border-0 shadow-[0_8px_24px_rgba(15,118,110,0.35)] hover:brightness-110",
    secondary:
      "chip-button border border-[#cfe2dc] bg-[#f3fbf8] text-[#184138] hover:bg-[#e6f6f1]",
    danger:
      "chip-button border border-[#fecaca] bg-[#fff0f0] text-[#b91c1c] hover:bg-[#fee2e2]",
    ghost: "chip-button border border-[#dbece6] bg-transparent text-[#1a463d] hover:bg-[#eef7f3]",
  };

  return (
    <Button size={size} variant="light" className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </Button>
  );
}
