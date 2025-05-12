import React from 'react'
import OverView from './over-view'
import Check from './check';


const Dashboard = () => {
  return (
    <div className='container-body mx-[80px] flex flex-col gap-6 mt-[30px]'>
      <OverView />
      <Check />
    </div>
  )
}

export default Dashboard;