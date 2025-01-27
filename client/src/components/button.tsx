import { ComponentProps, ReactNode } from "react"
import { tv, VariantProps } from "tailwind-variants"

const buttonVariants = tv({
  base: 'text-base rounded-lg px-5 py-2 font-medium flex items-center justify-center gap-2',

  variants: {
    variant: {
      primary: 'bg-lime-300 text-lime-950 hover:bg-lime-400',
      secondary: 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700',
      danger: 'bg-red-700 text-zinc-200 hover:bg-red-800',
      disabled: 'bg-zinc-800 text-zinc-500'
    },
    size: {
      small: 'h-9',
      medium: 'h-[42px]',
    },
    width: {
      full: 'w-full',
      content: '',
    },
    state: {
      default: '',
      active_primary: '',
      active_secondary: 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border-2 border-zinc-700',
    }
  },

  defaultVariants: {
    variant: 'primary',
    size: 'medium',
    width: 'content',
    state: 'default',
  }

})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  children: ReactNode
}

export function Button({
  children,
  variant,
  size,
  width,
  state,
  ...props
}: ButtonProps) {


  return (
    <button {...props} className={buttonVariants({ variant, size, width, state })} >
      {children}
    </button>
  )
}