"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsContextValue { value: string; onChange: (value: string) => void }
const TabsContext = React.createContext<TabsContextValue | null>(null)
function useTabs() { const ctx = React.useContext(TabsContext); if (!ctx) throw new Error("Tabs components must be used within <Tabs>"); return ctx }

interface TabsProps { defaultValue: string; value?: string; onValueChange?: (value: string) => void; children: React.ReactNode; className?: string }

export function Tabs({ defaultValue, value: controlledValue, onValueChange, children, className }: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue
  const onChange = React.useCallback((newValue: string) => {
    if (!isControlled) setUncontrolledValue(newValue); onValueChange?.(newValue)
  }, [isControlled, onValueChange])
  return <TabsContext.Provider value={{ value, onChange }}><div className={cn("", className)}>{children}</div></TabsContext.Provider>
}

export const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("inline-flex items-center gap-1", className)} {...props} />
  )
)
TabsList.displayName = "TabsList"

export const TabsTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }>(
  ({ className, value, ...props }, ref) => {
    const { value: selectedValue, onChange } = useTabs()
    const isActive = selectedValue === value
    return (
      <button ref={ref} className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-[50px] px-4 py-2 text-sm font-medium transition-all",
        isActive ? "bg-[#000] text-white" : "text-[#000] hover:bg-[#f7f7f5]",
        className
      )} onClick={() => onChange(value)} data-state={isActive ? "active" : "inactive"} {...props} />
    )
  }
)
TabsTrigger.displayName = "TabsTrigger"

export const TabsContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string }>(
  ({ className, value, ...props }, ref) => {
    const { value: selectedValue } = useTabs()
    if (selectedValue !== value) return null
    return <div ref={ref} className={cn("mt-6", className)} data-state="active" {...props} />
  }
)
TabsContent.displayName = "TabsContent"
