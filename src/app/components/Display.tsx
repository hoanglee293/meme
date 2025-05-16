"use client"
import * as React from 'react';
import Image from 'next/image';
import lightMode from '@/assets/svgs/light.svg';
import { useLang } from '@/lang/useLang';
import { LangToggle } from './LanguageSelect';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@/ui/dropdown-menu';
import { Button } from '@/ui/button';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from "next-themes"
import { useState, useEffect } from 'react';

export default function Display() {
    const { theme, setTheme } = useTheme();
    const [isDark, setIsDark] = useState(theme);
    useEffect(() => {
        setIsDark(theme);
    }, [theme]);
    console.log("isDark", isDark);
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-max dark:text-white hover:bg-white/10 px-2 flex items-center gap-2">
                        <Image src={lightMode} alt="light" height={24} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-max px-2 py-2 bg-theme-neutral-1000 border-none' align="end" style={{ width: '200px' }}>
                    <LangToggle />
                    <div className='flex items-center justify-evenly gap-4 mt-2'>
                        <Moon className="cursor-pointer" onClick={() => isDark === "light" && setTheme("dark")} style={isDark === "dark" ? { color: "white" } : { color: "dimgray" }}/>
                        <Sun className="cursor-pointer" onClick={() => isDark === "dark" && setTheme("light")} style={isDark === "light" ? { color: "white" } : { color: "dimgray" }}/>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}