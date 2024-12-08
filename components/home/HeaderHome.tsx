import React from 'react'


const HeaderHome = () => {
  return (
    <div className='w-screen h-16 bg-[#479BA1] flex'>
      <div className='w-16 h-full flex justify-center items-center pl-6'>
        <img src='home/recargaslogo.png' alt='logo' />
      </div>
      <h1 className='flex font-montserrat font-bold justify-center items-center px-4 text-3xl text-white'>Recargas</h1>
    </div>
  )
}

export default HeaderHome