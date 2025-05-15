import React from 'react'
import Image from 'next/image'
import star from '@/assets/svgs/star.svg'
import token from '@/assets/svgs/token.svg'
import dolaLogo from '@/assets/svgs/dolar-logo.svg'
import hourTradingVolume from '@/assets/svgs/hour-trading-volume.svg'
import monthTradingVolume from '@/assets/svgs/month-trading-volume.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
const OverView = () => {
    const dataFavorite = [
        {
            name: 'PopCat',
            price: '$1.1234',
            fluctuation: '+12%'
        },
        {
            name: 'PopCat',
            price: '$1.1234',
            fluctuation: '+12%'
        },
        {
            name: 'PopCat',
            price: '$1.1234',
            fluctuation: '+12%'
        }
    ]
    const dataMarket = {
        name: 'Universe account',
        price: '$1.1234',
        priceChange: '0',
        fluctuation: '(0.00%)'
    }
    return (
        <>
            <h1 className='text-gradient uppercase text-[14px] font-medium flex items-center gap-2'>
                Favorite
                <Image src={star} alt="star" />
            </h1>
            <div className='flex gap-6'>
                <div className='w-full rounded-lg bg-[#0F0F0FD9] z-1'>

                    {dataFavorite.map((item, index) => (
                        <div key={index} className={`w-full flex px-6 justify-between max-h-[45px] py-[6px] ${index !== dataFavorite.length - 1 ? 'border-b border-neutral-900' : ''}`}>
                            <div className='flex items-center gap-[14px]'>
                                <Image src={token} alt="logo" />
                                <span className='uppercase text-xs font-medium'>PopCat</span>
                            </div>
                            <div className='flex items-center gap-3'>
                                <div className="flex flex-col font-normal">
                                    <span className='text-xs font-semibold'>$1.1234</span>
                                    <span className='fluctuation text-green-200 text-[10px] leading-[15px]'>+12%</span>
                                </div>
                                <div className='flex items-center justify-center'>
                                    <FontAwesomeIcon icon={faChevronRight} width={12} height={12} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='w-full rounded-lg box-gradient pl-[50px] pr-[40px] flex  justify-between'>
                    <div className='flex flex-col justify-center gap-[10px]'>
                        <h3 className='text-neutral-100 text-base font-semibold flex items-center gap-2'>{dataMarket.name} &ensp; <FontAwesomeIcon icon={faChevronRight} width={12} height={12} /></h3>
                        <div className='flex items-center gap-[41px]'>
                            <span className='text-white text-sm text-[22px] font-bold leading-[33px]'>{dataMarket.price}</span>
                            <div className='text-[#15DFFD] text-base font-medium flex items-center gap-[6px]'>${dataMarket.priceChange} {dataMarket.fluctuation}<span className='text-white'>24H</span></div>
                        </div>
                        <div className='flex items-center gap-[48px]'>
                            <span className='text-white text-sm font-medium'>Receive &nbsp; {dataMarket.price}</span>
                            <span className='text-white text-sm font-medium'>Send &nbsp; ${dataMarket.priceChange}</span>
                        </div>
                    </div>
                    <Image src={dolaLogo} alt='dola-logo' className='xl:mr-12'/>

                </div>
                <div className='w-full rounded-lg box-gradient flex justify-between items-center px-[60px] z-1'>
                    <div className='flex flex-col items-center gap-2'>
                        <Image src={hourTradingVolume} alt='hour-trading-volume' />
                        <span className='text-neutral-100 text-sm font-semibold capitalize'>Total 24h trading volume</span>
                        <span className='text-neutral-100 text-[22px] font-bold leading-[33px]'>$1.30M</span>
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                        <Image src={monthTradingVolume} alt='hour-trading-volume' />
                        <span className='text-neutral-100 text-sm font-semibold capitalize'>Total 30d trading volume</span>
                        <span className='text-neutral-100 text-[22px] font-bold leading-[33px]'>$1.30M</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OverView;