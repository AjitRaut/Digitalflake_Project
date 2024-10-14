import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <>
       <Navbar />
        <Sidebar />
        <div className="mt-[68px] flex-grow lg:ml-52 md:ml-0">
          <Outlet />
        </div>
    </>
  )
}

export default AppLayout
