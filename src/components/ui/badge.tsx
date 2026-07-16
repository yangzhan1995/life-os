import * as React from "react"
import { cn } from "@/lib/utils"

const variants = {
  default: "bg-[#000] text-white",
  secondary: "bg-[#f7f7f5] text-[#000]",
  outline: "border border-[#e6e6e6] text-[#000]",
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variants
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-[50px] px-3 py-1 text-xs font-medium transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
