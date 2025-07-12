'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

interface DropdownContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DropdownContext = React.createContext<DropdownContextValue>({
  open: false,
  onOpenChange: () => {},
})

interface DropdownProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function Dropdown({ open = false, onOpenChange = () => {}, children }: DropdownProps) {
  const [internalOpen, setInternalOpen] = React.useState(open)
  
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen
  const setOpen = isControlled ? onOpenChange : setInternalOpen
  
  return (
    <DropdownContext.Provider value={{ open: isOpen, onOpenChange: setOpen }}>
      <div className="relative inline-block">
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

export function DropdownTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
  const { open, onOpenChange } = React.useContext(DropdownContext)
  
  const handleClick = () => {
    onOpenChange(!open)
  }
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
      onClick: handleClick,
      'aria-expanded': open,
      'aria-haspopup': true,
    })
  }
  
  return (
    <button
      onClick={handleClick}
      aria-expanded={open}
      aria-haspopup={true}
    >
      {children}
    </button>
  )
}

const dropdownContentVariants = cva(
  'absolute z-50 min-w-[8rem] overflow-hidden rounded-xl border bg-background p-1 text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95',
  {
    variants: {
      align: {
        start: 'left-0',
        center: 'left-1/2 -translate-x-1/2',
        end: 'right-0',
      },
      side: {
        top: 'bottom-full mb-2',
        bottom: 'top-full mt-2',
      },
    },
    defaultVariants: {
      align: 'start',
      side: 'bottom',
    },
  }
)

interface DropdownContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownContentVariants> {}

export const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ className, align, side, ...props }) => {
    const { open, onOpenChange } = React.useContext(DropdownContext)
    const contentRef = React.useRef<HTMLDivElement>(null)
    
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          contentRef.current &&
          !contentRef.current.contains(event.target as Node) &&
          !(event.target as Element).closest('[aria-haspopup="true"]')
        ) {
          onOpenChange(false)
        }
      }
      
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onOpenChange(false)
        }
      }
      
      if (open) {
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEscape)
      }
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleEscape)
      }
    }, [open, onOpenChange])
    
    if (!open) return null
    
    return (
      <div
        ref={contentRef}
        className={cn(dropdownContentVariants({ align, side }), className)}
        {...props}
      />
    )
  }
)
DropdownContent.displayName = 'DropdownContent'

const dropdownItemVariants = cva(
  'relative flex cursor-pointer select-none items-center rounded-lg px-2 py-1.5 text-sm outline-none transition-colors',
  {
    variants: {
      variant: {
        default: 'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
        destructive: 'text-destructive hover:bg-destructive/10 focus:bg-destructive/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface DropdownItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownItemVariants> {
  disabled?: boolean
}

export const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ className, variant, disabled, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          dropdownItemVariants({ variant }),
          disabled && 'pointer-events-none opacity-50',
          className
        )}
        {...props}
      />
    )
  }
)
DropdownItem.displayName = 'DropdownItem'

export function DropdownSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  )
}