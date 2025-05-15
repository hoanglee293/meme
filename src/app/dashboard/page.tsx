"use client"
import React from 'react'
import OverView from './over-view'
import ListToken from './table-dashboard';

const Dashboard = () => {
  return (
    <>
      <div className='container-body mx-[80px] flex flex-col gap-6 pt-[30px] relative z-10'>
        <OverView />
        <ListToken />
      </div>
    </>
  )
}

export default Dashboard;