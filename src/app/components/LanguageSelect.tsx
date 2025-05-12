"use client"

import { Button } from "@/app/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"
import { useLang } from "@/lang/useLang"
import { langConfig } from "@/lang";

export function LangToggle() {
  const { lang, setLang, t } = useLang();
  const currentLang = langConfig.listLangs.find(l => l.code === lang);
    console.log("langConfig", langConfig);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-max dark:text-white hover:bg-white/10 px-2 flex items-center gap-2">
          {currentLang && <img src={currentLang.flag} alt={t(currentLang.translationKey)} className="w-6 h-5 rounded" />}
          <span>{currentLang && t(currentLang.translationKey)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {langConfig.listLangs.map((language) => (
          <DropdownMenuItem key={language.id} onClick={() => setLang(language.code)} className="flex items-center gap-2">
            <img src={language.flag} alt={t(language.translationKey)} className="w-6 h-5 rounded" />
            <span>{t(language.translationKey)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
