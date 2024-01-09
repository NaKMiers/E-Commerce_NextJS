import { CartProductType } from '@/app/product/[id]/ProductDetails'

interface SetQuantityProps {
  cartCounter?: boolean
  cartProduct: CartProductType
  handleQuantityChange: (value: number) => void
}

const btnStyles = 'border-[1.2px] border-slate-300 px-2 rounded'

const SetQuantity: React.FC<SetQuantityProps> = ({
  cartCounter,
  cartProduct,
  handleQuantityChange,
}) => {
  return (
    <div className='flex gap-8 items-center'>
      {cartCounter && <div className='font-semibold'>QUANTITY:</div>}
      <div className='flex gap-4 items-center text-base'>
        <button className={btnStyles} onClick={() => handleQuantityChange(-1)}>
          -
        </button>
        <div>{cartProduct.quantity}</div>
        <button className={btnStyles} onClick={() => handleQuantityChange(1)}>
          +
        </button>
      </div>
    </div>
  )
}

export default SetQuantity
