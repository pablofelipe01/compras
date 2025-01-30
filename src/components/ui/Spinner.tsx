// src/components/ui/Spinner.tsx
'use client'

export const Spinner = ({ className }: { className?: string }) => (
  <div
    className={`animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
    role="status"
  />
)