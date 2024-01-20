import Image from 'next/image'
import { FaUserCircle } from 'react-icons/fa'

interface AvatarProps {
  src?: string | null | undefined
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return src ? (
    <Image src={src} alt='avatar' className='rounded-full' height={30} width={30} />
  ) : (
    <FaUserCircle size={24} />
  )
}

export default Avatar
