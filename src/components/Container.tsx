import React from 'react'

interface Container {
  children: React.ReactNode
}

const Container: React.FC<Container> = ({ children }: { children: React.ReactNode }) => {
  return <div className='max-w-[1920p] mx-auto xl:px-20 md:px-2'>{children}</div>
}

export default Container
