import TokenTicker from '@/app/components/trading/token-ticker'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Interface = () => {
  return (
    <div className="px-0 container-body  flex gap-2 mt-[13px] overflow-x-auto">
    <TokenTicker symbol="POP" price="$16.87" change="12.08%" /> 
    <TokenTicker symbol="POP" price="$16.87" change="12.08%" />
    <TokenTicker symbol="POP" price="$16.87" change="12.08%" />
  </div>
  )
}

export default Interface