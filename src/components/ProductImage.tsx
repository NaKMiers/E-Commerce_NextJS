import { CartProductType, SelectedType } from '@/app/product/[id]/ProductDetails'
import Image from 'next/image'

interface ProductImageProps {
  cartProduct: CartProductType
  product: any
  handleColorSelect(value: SelectedType): void
}

const ProductImage: React.FC<ProductImageProps> = ({ cartProduct, product, handleColorSelect }) => {
  return (
    <div className='grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]'>
      <div className='flex flex-col items-center justify-center gap-3 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]'>
        {product.images.map((image: SelectedType) => (
          <div
            className='relative w-[80%] aspect-square rounded border-teal-300'
            onClick={() => handleColorSelect(image)}
            key={image.color}>
            <Image src={image.image} alt={image.color} fill className='object-contain' />
          </div>
        ))}
      </div>

      <div className='col-span-5 relative aspect-square'>
        <Image
          src={cartProduct.selectedType.image}
          alt={cartProduct.selectedType.color}
          fill
          className='w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]'
        />
      </div>
    </div>
  )
}

export default ProductImage
