interface BackDropProps {
  onClick(): void
}

function BackDrop({ onClick }: BackDropProps) {
  return (
    <div
      className='z-20 bg-slate-200 opacity-50 w-screen h-screen fixed top-0 left-0'
      onClick={onClick}
    />
  )
}

export default BackDrop
