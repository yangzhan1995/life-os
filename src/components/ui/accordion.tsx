"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AccordionContextValue {
  value: string[]
  onValueChange: (value: string) => void
  type: "single" | "multiple"
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)

function useAccordion() {
  const ctx = React.useContext(AccordionContext)
  if (!ctx) throw new Error("Accordion components must be used within <Accordion>")
  return ctx
}

interface AccordionProps {
  type: "single" | "multiple"
  defaultValue?: string[]
  value?: string[]
  onValueChange?: (value: string[]) => void
  collapsible?: boolean
  children: React.ReactNode
  className?: string
}

export function Accordion({
  type,
  defaultValue = [],
  value: controlledValue,
  onValueChange,
  collapsible,
  children,
  className,
}: AccordionProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string[]>(defaultValue)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue

  const onValueChangeHandler = React.useCallback(
    (itemValue: string) => {
      let newValue: string[]
      if (type === "single") {
        const isOpen = value.includes(itemValue)
        if (isOpen) {
          newValue = collapsible ? [] : value
        } else {
          newValue = [itemValue]
        }
      } else {
        newValue = value.includes(itemValue)
          ? value.filter((v) => v !== itemValue)
          : [...value, itemValue]
      }
      if (!isControlled) setUncontrolledValue(newValue)
      onValueChange?.(newValue)
    },
    [value, type, collapsible, isControlled, onValueChange]
  )

  return (
    <AccordionContext.Provider value={{ value, onValueChange: onValueChangeHandler, type }}>
      <div className={cn("", className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, ...props }, ref) => (
    <div ref={ref} className={cn("border-b", className)} data-value={value} {...props} />
  )
)
AccordionItem.displayName = "AccordionItem"

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }
>(({ className, value, children, ...props }, ref) => {
  const { value: accordionValue, onValueChange } = useAccordion()
  const isOpen = accordionValue.includes(value)

  return (
    <button
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left",
        className
      )}
      onClick={() => onValueChange(value)}
      data-state={isOpen ? "open" : "closed"}
      aria-expanded={isOpen}
      {...props}
    >
      {children}
      <svg
        className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  )
})
AccordionTrigger.displayName = "AccordionTrigger"

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, children, ...props }, ref) => {
  const { value: accordionValue } = useAccordion()
  const isOpen = accordionValue.includes(value)

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        className
      )}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      {isOpen && <div className="pb-4 pt-0">{children}</div>}
    </div>
  )
})
AccordionContent.displayName = "AccordionContent"
