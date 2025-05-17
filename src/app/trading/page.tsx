"use client"
import Interface from './inter-face/page'
import TokenInfo from './token-info'
import ListToken from './list-token/page'
import TransactionHistory from './transaction-history/page'
import Control from './control/page'
import MasterTradeChat from './control/master-trade'
import Slider from './slider/page'

const TradingPage = () => {
 
  return (
    <div className={`h-[93.5vh] flex flex-col gap-4 container-trading py-4 relative z-10 ${window.innerHeight > 700 ? 'px-[40px]' : 'px-[10px]'}`}>
      <Interface />
      <div className='flex-1 flex gap-4 w-full relative z-10 overflow-hidden'>
        {/* Left Column */}
        <div className={`flex flex-col gap-4 w-1/5 overflow-hidde ${window.innerHeight > 700 ? 'w-1/6' : 'w-1/5'}`}>
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
        <div className={`w-1/5 flex flex-col gap-4 ${window.innerHeight > 700 ? 'w-1/6' : 'w-1/5'}`}>
          <Control />
          <MasterTradeChat />
        </div>
      </div>
      <Slider />
    </div>
  )
}

export default TradingPage