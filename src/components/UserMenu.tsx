'use client'

import { SafeUser } from '@/types'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
import Avatar from './Avatar'
import BackDrop from './BackDrop'
import MenuItem from './MenuItem'

interface UserMenuProps {
  currentUser: SafeUser | null
}

function UserMenu({ currentUser }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  return (
    <>
      <div className='relative z-30'>
        <div
          className='p-2 border-[1px] border-slate-400 flex items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700'
          onClick={toggleOpen}>
          <Avatar src={currentUser?.image} />
          {currentUser && <span className='mx-1'>{currentUser.name}</span>}
          <AiFillCaretDown />
        </div>

        {isOpen && (
          <div className='absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer'>
            {currentUser ? (
              <div>
                <Link href='/orders'>
                  <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                </Link>
                {currentUser.role === 'admin' && (
                  <Link href='/admin'>
                    <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                  </Link>
                )}
                <hr />
                <MenuItem
                  onClick={() => {
                    toggleOpen()
                    signOut()
                  }}>
                  Logout
                </MenuItem>
              </div>
            ) : (
              <div>
                <Link href='/login'>
                  <MenuItem onClick={toggleOpen}>Login</MenuItem>
                </Link>
                <Link href='/register'>
                  <MenuItem onClick={toggleOpen}>Register</MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen && <BackDrop onClick={toggleOpen} />}
    </>
  )
}

export default UserMenu
