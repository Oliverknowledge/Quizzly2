"use client"
import Dashboard from '@/components/Dashboard'
import { SidebarDemo } from '@/components/Sidebar'


import React from 'react'

const Page = () => {
 
  return (
    <div className = " w-full h-full flex flex-row">
      <SidebarDemo/>
      <div className = "">
        <Dashboard/>
      </div>
    </div>
  )
}
export default Page;
