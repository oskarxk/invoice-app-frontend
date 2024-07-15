import React from 'react'
import { Logo } from './Logo'
import avatar from '../../assets/image-avatar.jpg'
import { ThemeSwitcher } from './ThemeSwitcher'

export const DesktopNav = () => {
  return (
    <nav className='flex flex-col sticky left-0 top-0 w-full h-screen bg-dark-menuBackground rounded-tr-2xl rounded-br-2xl'>
      <div className='flex justify-center items-center h-1/10 bg-dark-buttonBackground rounded-r-2xl relative overflow-hidden'>
        <Logo/>
        <div className='w-full absolute bg-[#9277FF] bottom-0 h-1/2 rounded-tl-2xl'></div>
      </div>
      <div className='h-8/10 flex justify-center items-end py-8'>
        <ThemeSwitcher />
      </div>
      <div className='flex justify-center items-center h-1/10 border-t-1 border-[#494E6E]'>
        <img className='w-1/2 rounded-3xl' src={avatar} alt="Avatar" />
      </div>
    </nav>
  )
}
