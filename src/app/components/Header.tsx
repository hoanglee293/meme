'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import logo from '@/assets/svgs/logo.svg';
import Link from 'next/link';
import { ChevronDown, LogOut, Search, Wallet2 } from 'lucide-react';
import { useLang } from '@/lang/useLang';
import Display from '@/app/components/Display';
import { ThemeToggle } from '@/app/components/ThemeToggle';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getInforWallet, getMyWallets, useWallet } from '@/services/api/TelegramWalletService';
import { Button } from '@/ui/button';
import { formatNumberWithSuffix3, truncateString } from '@/utils/format';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Badge } from '@/ui/badge';
import { CheckCircle } from 'lucide-react';

const Header = () => {
    const { t } = useLang();
    const router = useRouter();
    const pathname = usePathname();
    const { data: walletInfor, refetch } = useQuery({
        queryKey: ["wallet-infor"],
        queryFn: getInforWallet,
        refetchInterval: 30000,
        staleTime: 30000,
    });
    const { data: myWallets } = useQuery({
        queryKey: ["my-wallets"],
        queryFn: getMyWallets,
        staleTime: 30000,
    });
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, logout, updateToken } = useAuth();
    const [mounted, setMounted] = useState(false);
    const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false);

    const handleChangeWallet = async (walletId: string) => {
        try {
            const res = await useWallet({ wallet_id: walletId });
            updateToken(res.token);
            await refetch();
            router.refresh();
        } catch (error) {
            console.error('Error changing wallet:', error);
        }
    };

    useEffect(() => {
        setMounted(true);
        return () => {
            setMounted(false);
        };
    }, []);

    useEffect(() => {
        if (walletInfor?.status === 403) {
            router.push("/complete-profile");
        }
        if (walletInfor?.status === 401) {
            logout();
        }
    }, [walletInfor, router, logout]);

    const listSidebar = [
        {
            name: t('overview'),
            href: '/dashboard'
        },
        {
            name: t('trade'),
            href: '/trading'
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
    console.log(pathname)
    return (
        <header className="sticky top-0 z-50 w-full  bg-black">
            <div className='flex items-center justify-between px-10 py-[14px]'>
                <div className='flex items-center gap-15'>
                    <Link href="/"><Image src={logo} alt="logo" height={32} /></Link>
                    <nav className='flex items-center gap-15'>
                        {listSidebar.map((item, index) => (
                            <Link
                                href={item.href}
                                key={index}
                                className={`hover:gradient-hover text-neutral-200 clip-text text-muted-foreground transition-colors ${pathname === item.href ? 'gradient-hover' : ''}`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className='flex items-center gap-6'>
                    {isAuthenticated && walletInfor && (
                        <button className='linear-gradient-connect text-sm text-neutral-100 font-medium px-4 py-[6px] rounded-full'>
                            {walletInfor.solana_balance} SOL &ensp; {'$' + formatNumberWithSuffix3(walletInfor.solana_balance)}
                        </button>
                    )}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            className="rounded-full py-2 pl-10 pr-4 w-64 text-sm focus:outline-none bg-black focus:ring-1 focus:ring-[hsl(var(--ring))] max-h-[30px] border-1 border-solid border-theme-neutral-900"
                        />
                        <Search className=" absolute left-3 top-2 h-4 w-4 text-muted-foreground " />
                    </div>

                    <Display />

                    {mounted ? (
                        <>
                            {!isAuthenticated && (
                                <button
                                    onClick={() => window.open(process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL, "_blank")}
                                    className="linear-gradient-connect font-medium px-6 py-[6px] rounded-full"
                                >
                                    {t('connect')}
                                </button>
                            )}
                            {isAuthenticated && walletInfor && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="linear-gradient-connect font-medium px-2 py-[6px] rounded-full flex items-center">
                                            <Wallet2 className="sm:hidden h-4 w-4 mr-1" />
                                            <span className="hidden sm:inline text-sm">{truncateString(walletInfor.solana_address, 12)}</span>
                                            <ChevronDown size={16} className="ml-1" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuItem className="dropdown-item cursor-pointer" onClick={() => setIsWalletDialogOpen(true)}>
                                            <Wallet2 className="mr-2 h-4 w-4" />
                                            <span>Select Wallet</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="dropdown-item cursor-pointer text-destructive" onClick={logout}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Logout</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </>
                    ) :
                        <button
                            className="linear-gradient-connect font-medium px-6 py-[6px] rounded-full"
                        >
                            Connecting...
                        </button>
                    }
                    <Dialog open={isWalletDialogOpen} onOpenChange={setIsWalletDialogOpen}>
                        <DialogContent className="sm:max-w-[425px] bg-card">
                            <DialogHeader>
                                <DialogTitle className="text-base font-bold">
                                    <input
                                        type="text"
                                        placeholder={'Wallet Name / Address'}
                                        className="rounded-full py-2 pl-10 pr-4 w-64 text-neutral-200 text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))] max-h-[30px] border-1 border-solid border-linear-tm placeholder:text-xs placeholder:font-normal"
                                    />
                                    <Search className=" absolute left-6 top-4.5 h-4 w-4 text-muted-foreground " />
                                </DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600">
                                {myWallets?.map((wallet: { wallet_id: string; wallet_name: string; solana_address: string; wallet_type: string; wallet_auth: string }) => (
                                    <div
                                        key={wallet.wallet_id}
                                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer"
                                        onClick={() => {
                                            handleChangeWallet(wallet.wallet_id);
                                            setIsWalletDialogOpen(false);
                                        }}
                                    >
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <Wallet2 className="h-4 w-4" />
                                                <span className="font-semibold">{wallet.wallet_name}</span>
                                                <Badge variant="outline" className="ml-2">
                                                    {wallet.wallet_type?.toLowerCase()}
                                                </Badge>
                                                <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                                                    {wallet.wallet_auth?.toLowerCase()}
                                                </Badge>
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {truncateString(wallet.solana_address, 20)}
                                            </div>
                                        </div>
                                        {walletInfor?.solana_address === wallet.solana_address && (
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </header>
    )
}

export default Header