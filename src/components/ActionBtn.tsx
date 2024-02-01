import React from 'react'
import { IconType } from 'react-icons'

interface ActionBtnProps {
  icon: IconType
  disabled?: boolean
  isToggling?: boolean
  onClick(e: React.MouseEvent<HTMLButtonElement>): void
}

function ActionBtn({ icon: Icon, isToggling, disabled, onClick }: ActionBtnProps) {
  return (
    <button
      className={`flex items-center justify-center rounded cursor-pointer w-[40px] h-[30px] text-slate-700 border border-slate-400 ${
        disabled && 'opacity-50 cursor-not-allowed'
      }`}
      disabled={disabled || isToggling}
      onClick={onClick}>
      <Icon size={20} className={isToggling ? 'animate-spin' : ''} />
    </button>
  )
}

export default ActionBtn
