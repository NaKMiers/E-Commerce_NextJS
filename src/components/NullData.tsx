interface NullDataProps {
  title: String
}

function NullData({ title }: NullDataProps) {
  return (
    <div className='w-full h-[50vh] flex items-center justify-center text-xl md:text-2xl'>
      <p>{title}</p>
    </div>
  )
}

export default NullData
