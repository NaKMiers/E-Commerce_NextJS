interface MenuItemProps {
  children: React.ReactNode
  onClick(): void
}

function MenuItem({ children, onClick }: MenuItemProps) {
  return (
    <div className='px-4 py-3 hover:bg-neutral-100 transition' onClick={onClick}>
      {children}
    </div>
  )
}

export default MenuItem
