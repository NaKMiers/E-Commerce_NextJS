import React from 'react'
import { IconType } from 'react-icons'

interface ButtonProps {
  label: string
  disabled?: boolean
  outline?: boolean
  small?: boolean
  custom?: string
  icon?: IconType
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  outline,
  small,
  custom,
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center ${
        outline ? 'bg-light border-sky-700 border-2' : 'bg-sky-700'
      } ${outline ? 'text-slate-700' : 'text-white'} ${small ? 'text-xs py-1 px-2' : 'py-3 px-4'} ${
        custom && custom
      } gap-2 disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full border-slate-700`}
      disabled={disabled}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  )
}

export default Button
