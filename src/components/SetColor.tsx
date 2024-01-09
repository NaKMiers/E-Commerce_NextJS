'use client'

import { CartProductType, SelectedType } from '@/app/product/[id]/ProductDetails'

interface SetColorProps {
  images: SelectedType[]
  cartProduct: CartProductType
  handleColorSelect: (value: SelectedType) => void
}

const SetColor: React.FC<SetColorProps> = ({ images, cartProduct, handleColorSelect }) => {
  return (
    <div>
      <div className='flex gap-4 items-center'>
        <span className='font-semibold'>COLOR</span>
        <div className='flex gap-1'>
          {images.map(image => (
            <div
              className={`h-7 w-7 rounded-full border-teal-300 flex items-center justify-center cursor-pointer ${
                cartProduct.selectedType.color === image.color ? 'border-[1.5px]' : 'border-none'
              }`}
              onClick={() => handleColorSelect(image)}
              key={image.color}
            >
              <div
                className='h-5 w-5 rounded-full border-[1.2px] border-slate-300'
                style={{ background: image.colorCode }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SetColor
