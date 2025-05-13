import * as React from 'react';
import Image from 'next/image';
import lightMode from '@/assets/svgs/light.svg';
import { useLang } from '@/lang/useLang';
import { LangToggle } from './LanguageSelect';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@/ui/dropdown-menu';
import { Button } from '@/ui/button';

export default function Display() {
    const { langConfig } = useLang();
    
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-max dark:text-white hover:bg-white/10 px-2 flex items-center gap-2">
                        <Image src={lightMode} alt="light" height={24} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" style={{ width: '200px' }}>
                    <LangToggle />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}