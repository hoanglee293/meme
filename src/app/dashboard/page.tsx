"use client"
import React from 'react'
import OverView from './over-view'
import Check from './check';
import Trading from './table-dashboard';
import VideoBackground from '../components/VideoBackground';

const Dashboard = () => {
  return (
    <>
      {/* <VideoBackground /> */}
      <div className='container-body mx-[80px] flex flex-col gap-6 mt-[30px] relative z-10'>
        <OverView />
        <Trading />
        {/* <Check /> */}
      </div>
    </>
  )
}

export default Dashboard;