export type ButtonVariant = 'primary' | 'ghost' | 'danger'

export function buttonClass(variant: ButtonVariant = 'primary') {
  const map: Record<ButtonVariant, string> = {
    primary: 'bg-cyan-400 text-slate-950',
    ghost: 'bg-white/10',
    danger: 'bg-rose-500 text-white'
  }

  return map[variant]
}
