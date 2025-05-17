import TokenTicker from '@/app/components/trading/token-ticker'
import React from 'react'
import Image from 'next/image'
import overViewIcon from '@/assets/svgs/over-view-icon.svg'


const Interface = () => {
  return (
    <div className="px-0 flex gap-2 ">
      <Image src={overViewIcon} alt="logo" width={22} height={22} />
      <TokenTicker symbol="POP" price="$16.87" change="12.08%" /> 
      <TokenTicker symbol="POP" price="$16.87" change="12.08%" />
      <TokenTicker symbol="POP" price="$16.87" change="12.08%" />
  </div>
  )
}

export default Interface