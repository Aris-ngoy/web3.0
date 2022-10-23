import React, { FC } from 'react'
import Header from '../../components/header/header'
import { Outlet } from "react-router-dom";
const DashboardPage : FC = ()=> {
  return (
    <div>
    <Header />
    <Outlet />
    </div>
  )
}

export default DashboardPage