import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

const layout = () => {
  return (
    <div className="wrapper">
      <Navbar />
      <Sidebar />
      <Outlet />
      <Footer/>
    </div>
  )
}

export default layout