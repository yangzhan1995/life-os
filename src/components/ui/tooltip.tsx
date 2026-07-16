"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const TooltipContext = React.createContext<TooltipContextValue | null>(null)

function useTooltip() {
  const ctx = React.useContext(TooltipContext)
  if (!ctx) throw new Error("Tooltip components must be used within <Tooltip>")
  return ctx
}

export function Tooltip({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  return (
    <TooltipContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-flex">{children}</div>
    </TooltipContext.Provider>
  )
}

export const TooltipTrigger = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => {
    const { setOpen } = useTooltip()
    return (
      <div
        ref={ref}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TooltipTrigger.displayName = "TooltipTrigger"

export const TooltipContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { open } = useTooltip()
    if (!open) return null

    return (
      <div
        ref={ref}
        className={cn(
          "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 rounded-md bg-card border px-3 py-1.5 text-xs shadow-md animate-in fade-in-0 zoom-in-95",
          className
        )}
        {...props}
      >
        {children}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-card" />
      </div>
    )
  }
)
TooltipContent.displayName = "TooltipContent"
