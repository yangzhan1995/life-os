import * as React from "react"
import { cn } from "@/lib/utils"

const variants = {
  default: "bg-[#000] text-white hover:opacity-85",
  secondary: "bg-white text-[#000] hover:bg-[#f7f7f5]",
  outline: "border border-[#e6e6e6] bg-white text-[#000] hover:bg-[#f7f7f5]",
  ghost: "text-[#000] hover:bg-[#f7f7f5]",
  link: "text-[#000] underline-offset-4 hover:underline",
}

const sizes = {
  default: "h-11 rounded-[50px] px-5 text-[20px] font-[480] tracking-[-0.1px]",
  sm: "h-9 rounded-[50px] px-4 text-sm",
  lg: "h-12 rounded-[50px] px-6 text-[20px] font-[480]",
  icon: "h-10 w-10 rounded-full",
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", loading, disabled, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#000] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"
