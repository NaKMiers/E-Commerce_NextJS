import { IconType } from 'react-icons'

interface StatusProps {
  text: string
  icon: IconType
  background: string
  color: string
}
function Status({ text, icon: Icon, background, color }: StatusProps) {
  return (
    <div className={`${background} ${color} px-2 py-1 rounded flex items-center gap-1`}>
      {text} <Icon size={15} />
    </div>
  )
}

export default Status
