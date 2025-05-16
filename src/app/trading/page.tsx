import React from 'react'
import Interface from './inter-face/page'
import TokenInfo from './token-info'
import ListToken from './list-token/page'
import TransactionHistory from './transaction-history/page'
import Control from './control/page'
import MasterTradeChat from './control/master-trade'
import Slider from './slider/page'

const TradingPage = () => {
  return (
    <div className='h-[93vh] flex flex-col gap-4 container-trading px-[40px] py-4 relative z-10 overflow-hidden'>
      <Interface />
      <div className='flex-1 flex gap-4 w-full relative z-10 overflow-hidden'>
        {/* Left Column */}
        <div className='flex flex-col gap-4 w-1/6 overflow-hidden'>
          <TokenInfo />
          <ListToken />
        </div>

        {/* Center Column */}
        <div className='flex flex-col gap-4 flex-1 overflow-hidden'>
          <div className='flex-[2] bg-neutral-800 rounded-xl p-4 overflow-auto'>
            Chart Trading View
          </div>
          <div className='flex-1 '>
            <TransactionHistory />
          </div>
        </div>

        {/* Right Column */}
        <div className='w-1/6 flex flex-col gap-4 overflow-hidden'>
          <Control />
          <MasterTradeChat />
        </div>
      </div>
      <Slider />
    </div>
  )
}

export default TradingPage