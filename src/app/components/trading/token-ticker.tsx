import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function TokenTicker({
    symbol,
    price,
    change,
  }: {
    symbol: string
    price: string
    change: string
  }) {
    const isPositive = !change.startsWith("-")
  
    return (
      <div className="flex items-center gap-2 bg-neutral-800 rounded-xl px-3 py-1.5  max-h-[22px] text-xs">
        <span className="font-medium">{symbol}</span>
        <span>{price}</span>
        <span className={isPositive ? "text-green-400" : "text-red-400"}>{change}</span>
        <FontAwesomeIcon icon={faXmark} width={12}/>
      </div>
    )
  }
  