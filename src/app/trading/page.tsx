import React from 'react'
import Interface from './inter-face/page'
import TokenInfo from './token-info'
import ListToken from './list-token/page'
import TransactionHistory from './transaction-history/page'
const page = () => {
  return (
    <div className='h-[calc(100vh-120px)] mx-[80px] flex flex-col gap-[15px] relative z-10'>
      <Interface />
      <div className='flex gap-4 w-full h-full'>
        <div className='flex flex-col gap-4 h-full'>
          <TokenInfo />
          <ListToken />
        </div>
        <div className='flex flex-col w-full gap-4'>
          <div className='h-2/3 bg-neutral-800 rounded-xl p-4'>Chart Trading View</div>
          <TransactionHistory />
        </div>
        <div className=' bg-neutral-800 rounded-xl p-4'>
          <TokenInfo />
        </div>
      </div>
    </div>
  )
}

export default page