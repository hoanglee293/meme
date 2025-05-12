'use client';

import React from 'react'
import Image from 'next/image';
import logo from '@/assets/svgs/logo.svg';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useLang } from '@/lang/useLang';
import Display from '@/app/components/Display';

const Header = () => {
    const { t } = useLang();
    const listSidebar = [
        {
            name: t('overview'),
            href: '/overview'
        },
        {
            name: t('trade'),
            href: '/trade'
        },
        {
            name: t('createCoin'),
            href: '/create-coin'
        },
        {
            name: t('masterTrade'),
            href: '/master-trade'
        },
        {
            name: t('wallet'),
            href: '/wallet'
        },
    ]
    return (
        <div className='flex items-center justify-between px-10 py-[14px] bg-[#000]'>
            <div className='flex items-center gap-15'>
                <Link href="/"><Image src={logo} alt="logo" height={32} /></Link>
                <div className='flex items-center gap-15 '>
                    {listSidebar.map((item, index) => (
                        <Link href={item.href} key={index} className='hover-gradient text-neutral-300 '>{item.name}</Link>
                    ))}
                </div>
            </div>
            <div className='flex items-center gap-6'>
                <div className="relative">
                    <input
                        type="text"
                        placeholder={t('searchPlaceholder')}
                        className="bg-[#1e1e1e] border border-gray-700 rounded-full py-2 pl-10 pr-4 w-64 text-sm focus:outline-none focus:ring-1 focus:ring-[#63f9fe] placeholder:text-neutral-300 max-h-[30px]"
                    />
                    <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
                </div>
                <Display />
                <button className="linear-gradient-connect font-medium px-6 py-[6px] rounded-full ">{t('connect')}</button>
            </div>
        </div>
    )
}

export default Header