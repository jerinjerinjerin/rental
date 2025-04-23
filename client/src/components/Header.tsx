import React from 'react'

const Header: React.FC<HeaderProps> = ({title, subtitle}) => {
  return (
    <div className='mb-5'>
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
    </div>
  )
}

export default Header
