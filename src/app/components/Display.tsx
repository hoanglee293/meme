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
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-max text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 px-2 flex items-center gap-2 transition-colors"
                    >
                        <Image src={lightMode} alt="light" height={24} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                    className='w-max px-4 py-3 bg-white dark:bg-theme-neutral-1000 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg transition-colors' 
                    align="end" 
                    style={{ width: '200px' }}
                >
                    <LangToggle />
                    <div className='flex items-center justify-evenly gap-4 mt-3'>
                        <Moon 
                            className="cursor-pointer transition-colors" 
                            onClick={() => isDark === "light" && setTheme("dark")} 
                            style={isDark === "dark" ? { color: "#fff" } : { color: "#6b7280" }}
                        />
                        <Sun 
                            className="cursor-pointer transition-colors" 
                            onClick={() => isDark === "dark" && setTheme("light")} 
                            style={isDark === "light" ? { color: "#f59e0b" } : { color: "#6b7280" }}
                        />
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}