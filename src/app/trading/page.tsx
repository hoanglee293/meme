import React from 'react'
import Interface from './inter-face/page'
import TokenInfo from './token-info'
import ListToken from './list-token/page'
import TransactionHistory from './transaction-history/page'
import Control from './control/page'
import MasterTradeChat from './control/master-trade'
const page = () => {
  return (
    <div className='h-[calc(100vh-120px)] container-trading mx-[80px] flex flex-col gap-[15px] relative z-10 pb-5'>
      <Interface />
      <div className='flex gap-4 w-full h-full z-10'>
        <div className='flex flex-col gap-4 h-full w-1/5'>
          <TokenInfo />
          <ListToken />
        </div>
        <div className='flex flex-col w-full gap-4'>
          <div className='h-2/3 bg-neutral-800 rounded-xl p-4'>Chart Trading View</div>
          <TransactionHistory />
        </div>
        <div className='w-3/12 flex flex-col gap-4'>
          <Control />
          <MasterTradeChat />
        </div>
      </div>
    </div>
  )
}

export default page