"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronDown, Edit, Check } from "lucide-react"
import pencil from "@/assets/svgs/pencil.svg"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select"
import LanguageSelector from "@/app/components/select"
const styleTextBase = "text-gray-600 dark:text-neutral-200 text-sm font-normal"
type TradingMode = "buy" | "sell"

interface CryptoCurrency {
    symbol: string
    balance: number
    name: string
}

interface TradingPanelProps {
    defaultMode: TradingMode
    currency: CryptoCurrency
    isConnected: boolean
    onConnect: () => void
}

export default function TradingPanel({ defaultMode = "buy", currency, isConnected, onConnect }: TradingPanelProps) {
    const [mode, setMode] = useState<TradingMode>(defaultMode)
    const [amount, setAmount] = useState("0.00")
    const [percentage, setPercentage] = useState(0)
    const [amountUSD, setAmountUSD] = useState("0.00")
    const [percentageValues, setPercentageValues] = useState<number[]>([])
    const [amountValues, setAmountValues] = useState<number[]>([])
    const [isInitialized, setIsInitialized] = useState(false)
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [editValue, setEditValue] = useState<string>("")
    const [editingAmountIndex, setEditingAmountIndex] = useState<number | null>(null)
    const [editAmountValue, setEditAmountValue] = useState<string>("")
    const [isDirectAmountInput, setIsDirectAmountInput] = useState(false)
    const [isMounted, setIsMounted] = useState(false);
    const [windowHeight, setWindowHeight] = useState(800); // Default height

    // Giả lập tỷ giá đổi từ crypto sang USD
    const exchangeRate = 20 // Giả sử 1 crypto = 20 USD

    // Load values from Local Storage on component mount
    useEffect(() => {
        try {
            if (typeof window !== 'undefined') {
                const savedPercentages = localStorage.getItem('tradingPercentageValues')
                const savedAmounts = localStorage.getItem('tradingAmountValues')
                
                console.log('Loading from localStorage:', { savedPercentages, savedAmounts })
                
                if (savedPercentages) {
                    const parsedPercentages = JSON.parse(savedPercentages)
                    if (Array.isArray(parsedPercentages) && parsedPercentages.every(n => typeof n === 'number')) {
                        setPercentageValues(parsedPercentages)
                    }
                } else {
                    // Only set default values if no saved values exist
                    setPercentageValues([25, 50, 75, 100])
                }

                if (savedAmounts) {
                    const parsedAmounts = JSON.parse(savedAmounts)
                    if (Array.isArray(parsedAmounts) && parsedAmounts.every(n => typeof n === 'number')) {
                        setAmountValues(parsedAmounts)
                    }
                } else {
                    // Only set default values if no saved values exist
                    setAmountValues([0.1, 0.5, 1, 2])
                }

                setIsInitialized(true)
            }
        } catch (error) {
            console.error('Error loading from localStorage:', error)
            // Set default values in case of error
            setPercentageValues([25, 50, 75, 100])
            setAmountValues([0.1, 0.5, 1, 2])
            setIsInitialized(true)
        }
    }, [])

    // Save values to Local Storage whenever they change
    useEffect(() => {
        if (!isInitialized) return; // Don't save during initial load

        try {
            if (typeof window !== 'undefined') {
                console.log('Saving percentage values to localStorage:', percentageValues)
                localStorage.setItem('tradingPercentageValues', JSON.stringify(percentageValues))
            }
        } catch (error) {
            console.error('Error saving percentage values to localStorage:', error)
        }
    }, [percentageValues, isInitialized])

    useEffect(() => {
        if (!isInitialized) return; // Don't save during initial load

        try {
            if (typeof window !== 'undefined') {
                console.log('Saving amount values to localStorage:', amountValues)
                localStorage.setItem('tradingAmountValues', JSON.stringify(amountValues))
            }
        } catch (error) {
            console.error('Error saving amount values to localStorage:', error)
        }
    }, [amountValues, isInitialized])

    useEffect(() => {
        // Cập nhật giá trị USD khi amount thay đổi
        const numericAmount = Number.parseFloat(amount) || 0
        setAmountUSD((numericAmount * exchangeRate).toFixed(2))
    }, [amount, exchangeRate])

    useEffect(() => {
        setIsMounted(true);
        setWindowHeight(window.innerHeight);
        
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Use default height during SSR
    const height = isMounted ? windowHeight : 800;

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = e.target.value
        setAmount(newAmount)
        setIsDirectAmountInput(true)
        setPercentage(0) // Reset percentage when directly inputting amount

        // Update USD value
        const numericAmount = Number.parseFloat(newAmount) || 0
        setAmountUSD((numericAmount * exchangeRate).toFixed(2))
    }

    const handleSetAmount = (value: number) => {
        setAmount(value.toString())
        setIsDirectAmountInput(true)
        setPercentage(0) // Reset percentage when using quick amount buttons

        // Update USD value
        setAmountUSD((value * exchangeRate).toFixed(2))
    }

    const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPercentage = Number.parseInt(e.target.value)
        setPercentage(newPercentage)
        setIsDirectAmountInput(false)

        // Update amount based on percentage of balance
        if (isConnected) {
            const newAmount = ((currency.balance * newPercentage) / 100).toFixed(2)
            setAmount(newAmount)
        }
    }

    const handleSetPercentage = (percent: number) => {
        setPercentage(percent)
        setIsDirectAmountInput(false)

        // Update amount based on percentage of balance
        if (isConnected) {
            const newAmount = ((currency.balance * percent) / 100).toFixed(2)
            setAmount(newAmount)
        }
    }

    const handleEditClick = (index: number) => {
        setEditingIndex(index)
        setEditValue(percentageValues[index].toString())
    }

    const handleEditSave = (index: number) => {
        const newValue = Number(editValue)
        if (!isNaN(newValue) && newValue > 0 && newValue <= 100) {
            const newValues = [...percentageValues]
            newValues[index] = newValue
            // Sort values in ascending order
            newValues.sort((a, b) => a - b)
            console.log('Saving new percentage values:', newValues)
            setPercentageValues(newValues)
        }
        setEditingIndex(null)
    }

    const handleEditKeyPress = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'Enter') {
            handleEditSave(index)
        } else if (e.key === 'Escape') {
            setEditingIndex(null)
        }
    }

    const handleAmountEditClick = (index: number) => {
        setEditingAmountIndex(index)
        setEditAmountValue(amountValues[index].toString())
    }

    const handleAmountEditSave = (index: number) => {
        const newValue = Number(editAmountValue)
        if (!isNaN(newValue) && newValue > 0) {
            const newValues = [...amountValues]
            newValues[index] = newValue
            // Sort values in ascending order
            newValues.sort((a, b) => a - b)
            console.log('Saving new amount values:', newValues)
            setAmountValues(newValues)
        }
        setEditingAmountIndex(null)
    }

    const handleAmountEditKeyPress = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'Enter') {
            handleAmountEditSave(index)
        } else if (e.key === 'Escape') {
            setEditingAmountIndex(null)
        }
    }

    return (
        <div className="rounded-lg flex flex-col 2xl:justify-between gap-3 h-full overflow-y-auto">
            {/* BUY/SELL Toggle */}
            <div className="flex  bg-gray-100 dark:bg-theme-neutral-1000 rounded-xl">
                <button
                    className={`flex-1 rounded-3xl text-sm cursor-pointer uppercase text-center ${mode === "buy" ? "border-green-500 text-green-600 dark:text-theme-green-200 border-1 bg-green-50 dark:bg-theme-green-100 font-semibold" : "text-gray-500 dark:text-neutral-400"}`}
                    onClick={() => setMode("buy")}
                >
                    Buy
                </button>
                <button
                    className={`flex-1 rounded-3xl cursor-pointer text-sm uppercase text-center ${mode === "sell" ? "border-red-500 text-red-600 dark:text-theme-red-100 border-1 bg-red-50 dark:bg-theme-red-300 font-semibold" : "text-gray-500 dark:text-neutral-400"}`}
                    onClick={() => setMode("sell")}
                >
                    Sell
                </button>
            </div>

            {/* Amount Input */}
            <div className="relative mt-2">
                <div className={`bg-gray-50 dark:bg-neutral-900 rounded-full border border-blue-200 dark:border-blue-500 px-3 py-2 flex justify-between items-center ${height > 700 ? 'py-2' : 'h-[30px]'}`}>
                    <input
                        type="number"
                        value={amount}
                        onChange={handleAmountChange}
                        className="bg-transparent w-full text-gray-900 dark:text-neutral-200 font-medium text-base focus:outline-none"
                    />
                    {!isDirectAmountInput && (
                        <span className={`${styleTextBase} text-blue-600 dark:text-theme-primary-300`}>{percentage.toFixed(2)}%</span>
                    )}
                </div>
            </div>

            {/* USD Value and Balance */}
            <div className="flex justify-between text-sm mb-3">
                <div className={styleTextBase}>~ ${amountUSD}</div>
                <div className={styleTextBase}>
                    Balance: {currency.balance.toFixed(6)} {currency.symbol}
                </div>
            </div>

            {/* Percentage Controls - Only show when not in direct amount input mode */}
            {(!isDirectAmountInput || mode != "buy") && (
                <>
                    {/* Percentage Slider */}
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className={styleTextBase}>Percentage</span>
                            <span className={`${styleTextBase} text-blue-600 dark:text-theme-primary-300`}>{percentage.toFixed(2)}%</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={percentage}
                            className="slider w-full accent-blue-500 dark:accent-theme-primary-400"
                            onChange={handlePercentageChange}
                            id="myRange"
                        />
                    </div>
                </>
            )}
            {/* Percentage Buttons */}
            <div className="flex items-center justify-between gap-3">
                {percentageValues.map((percent, index) => (
                    <div key={index} className="relative w-full">
                        {editingIndex === index ? (
                            <div className="flex items-center gap-1 bg-gray-100 dark:bg-neutral-700 rounded-md">
                                <input
                                    type="number"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    onKeyDown={(e) => handleEditKeyPress(e, index)}
                                    className="w-full bg-transparent text-gray-900 dark:text-neutral-200 px-2 py-2 rounded-md focus:outline-none"
                                    min="1"
                                    max="100"
                                    autoFocus
                                />
                                <button
                                    onClick={() => handleEditSave(index)}
                                    className="p-1 text-blue-600 hover:text-blue-700 dark:text-theme-primary-300 dark:hover:text-theme-primary-400"
                                >
                                    <Check className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => handleSetPercentage(percent)}
                                className={`w-full px-2 py-1 h-[30px] font-semibold rounded-md flex items-center justify-between gap-1 border border-solid text-xs transition-colors ${
                                    percentage === percent
                                        ? "border-blue-500 text-blue-600 dark:border-linear-start bg-blue-50 dark:bg-theme-primary-400/10"
                                        : "border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800"
                                }`}
                            >
                                {percent}%
                                <Image 
                                    src={pencil} 
                                    alt="pencil" 
                                    className="cursor-pointer hover:opacity-80 dark:invert"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleEditClick(index)
                                    }}
                                />
                            </button>
                        )}
                    </div>
                ))}
            </div>
            {/* Quick Amount Buttons */}
            {mode == "buy" && (
                <>
                    <span className={styleTextBase}>{currency.symbol}</span>
                    <div className="flex items-center justify-between gap-3">
                        {amountValues.map((value, index) => (
                            <div key={index} className="relative w-full">
                                {editingAmountIndex === index ? (
                                    <div className="flex items-center gap-1 bg-gray-100 dark:bg-neutral-700 rounded-md">
                                        <input
                                            type="number"
                                            value={editAmountValue}
                                            onChange={(e) => setEditAmountValue(e.target.value)}
                                            onKeyDown={(e) => handleAmountEditKeyPress(e, index)}
                                            className="w-full bg-transparent text-gray-900 dark:text-neutral-200 px-2 py-1 rounded-md focus:outline-none text-xs"
                                            min="0.000001"
                                            step="0.000001"
                                            autoFocus
                                        />
                                        <button
                                            onClick={() => handleAmountEditSave(index)}
                                            className="p-1 text-blue-600 hover:text-blue-700 dark:text-theme-primary-300 dark:hover:text-theme-primary-400"
                                        >
                                            <Check className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleSetAmount(value)}
                                        className="px-1 w-full h-[30px] rounded-md flex items-center justify-between gap-1 border border-solid border-gray-200 dark:border-neutral-700 text-xs font-semibold text-gray-700 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
                                    >
                                        {value}
                                        <Image
                                            src={pencil}
                                            alt="pencil"
                                            className="cursor-pointer hover:opacity-80 dark:invert"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleAmountEditClick(index)
                                            }}
                                        />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
            {/* Select Groups Dropdown */}
            <div className="relative mt-3">
                <Select>
                    <SelectTrigger className="bg-gray-50 dark:bg-neutral-900 w-full py-2 px-4 rounded-full flex items-center justify-between text-gray-500 dark:text-neutral-400 border border-gray-200 dark:border-theme-neutral-900">
                        <SelectValue placeholder="Select groups..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-neutral-900 box-shadow-info rounded-xl z-10">
                        <SelectItem className="text-gray-700 dark:text-neutral-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800" value="apple">axeinfinity</SelectItem>
                        <SelectItem className="text-gray-700 dark:text-neutral-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800" value="banana">Liquidity</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Action Button */}
            <div className="mt-3">
                <button
                    className={`w-full py-2 rounded-full text-white font-semibold text-sm transition-colors ${
                        mode === "buy" 
                            ? "bg-green-500 hover:bg-green-600 dark:bg-theme-green-200 dark:hover:bg-theme-green-200/90" 
                            : "bg-red-500 hover:bg-red-600 dark:bg-theme-red-100 dark:hover:bg-theme-red-100/90"
                    }`}
                >
                    {mode === "buy" ? "BUY" : "SELL"}
                </button>
            </div>
        </div>
    )
}
