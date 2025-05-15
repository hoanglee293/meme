"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronDown, Edit, Check } from "lucide-react"
import pencil from "@/assets/svgs/pencil.svg"
import Image from "next/image"

const styleTextBase = "text-neutral-200 text-sm font-normal"
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
    const [percentageValues, setPercentageValues] = useState<number[]>([25, 50, 75, 100])
    const [amountValues, setAmountValues] = useState<number[]>([0.1, 0.5, 1, 2])
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [editValue, setEditValue] = useState<string>("")
    const [editingAmountIndex, setEditingAmountIndex] = useState<number | null>(null)
    const [editAmountValue, setEditAmountValue] = useState<string>("")
    const [isDirectAmountInput, setIsDirectAmountInput] = useState(false)

    // Giả lập tỷ giá đổi từ crypto sang USD
    const exchangeRate = 20 // Giả sử 1 crypto = 20 USD

    // Load values from Local Storage on component mount
    useEffect(() => {
        const savedPercentages = localStorage.getItem('tradingPercentageValues')
        const savedAmounts = localStorage.getItem('tradingAmountValues')
        if (savedPercentages) {
            setPercentageValues(JSON.parse(savedPercentages))
        }
        if (savedAmounts) {
            setAmountValues(JSON.parse(savedAmounts))
        }
    }, [])

    // Save values to Local Storage whenever they change
    useEffect(() => {
        localStorage.setItem('tradingPercentageValues', JSON.stringify(percentageValues))
    }, [percentageValues])

    useEffect(() => {
        localStorage.setItem('tradingAmountValues', JSON.stringify(amountValues))
    }, [amountValues])

    useEffect(() => {
        // Cập nhật giá trị USD khi amount thay đổi
        const numericAmount = Number.parseFloat(amount) || 0
        setAmountUSD((numericAmount * exchangeRate).toFixed(2))
    }, [amount, exchangeRate])

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
        <div className="rounded-lg flex flex-col gap-3 h-full overflow-y-auto">
            {/* BUY/SELL Toggle */}
            <div className="flex h-[30px] bg-neutral-1000 rounded-xl">
                <button
                    className={`flex-1 rounded-3xl text-sm cursor-pointer font-normal uppercase text-center ${mode === "buy" ? "border-green-default text-theme-green-200 border-1" : "text-neutral-400"}`}
                    onClick={() => setMode("buy")}
                >
                    Buy
                </button>
                <button
                    className={`flex-1 rounded-3xl cursor-pointer text-sm font-normal uppercase text-center ${mode === "sell" ? "border-green-default text-theme-red-100 border-1" : "text-neutral-400"}`}
                    onClick={() => setMode("sell")}
                >
                    Sell
                </button>
            </div>

            {/* Amount Input */}
            <div className="relative mt-2">
                <div className="bg-neutral-900 rounded-full border border-blue-500 px-3 py-2 flex justify-between items-center">
                    <input
                        type="number"
                        value={amount}
                        onChange={handleAmountChange}
                        className="bg-transparent w-full text-neutral-200 font-medium text-base focus:outline-none"
                    />
                    {!isDirectAmountInput && (
                        <span className="text-neutral-200 text-sm font-normal">{percentage.toFixed(2)}%</span>
                    )}
                </div>
            </div>

            {/* USD Value and Balance */}
            <div className="flex justify-between text-sm mb-4">
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
                            <span className={styleTextBase + " text-theme-primary-300"}>{percentage.toFixed(2)}%</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={percentage}
                            className="slider w-full"
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
                            <div className="flex items-center gap-1 bg-neutral-700 rounded-md">
                                <input
                                    type="number"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    onKeyDown={(e) => handleEditKeyPress(e, index)}
                                    className="w-full bg-transparent text-neutral-200 px-2 py-2 rounded-md focus:outline-none"
                                    min="1"
                                    max="100"
                                    autoFocus
                                />
                                <button
                                    onClick={() => handleEditSave(index)}
                                    className="p-1 hover:text-theme-primary-300"
                                >
                                    <Check className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => handleSetPercentage(percent)}
                                className={`w-full px-2 py-1 h-[30px] font-semibold rounded-md flex items-center justify-between gap-1 border border-solid text-xs ${percentage === percent
                                    ? "border-linear-start text-linear-200"
                                    : "border-neutral-200 text-neutral-100"
                                    }`}
                            >
                                {percent}%
                                <Image src={pencil} alt="pencil" />
                            </button>
                        )}
                    </div>
                ))}
            </div>
            {/* Quick Amount Buttons */}
            {mode == "buy" && (
                <>
                    <span className="text-neutral-200 text-sm font-normal">{currency.symbol}</span>
            <div className="flex items-center justify-between gap-3">
                {amountValues.map((value, index) => (
                    <div key={index} className="relative w-full">
                        {editingAmountIndex === index ? (
                            <div className="flex items-center gap-1 bg-neutral-700 rounded-md">
                                <input
                                    type="number"
                                    value={editAmountValue}
                                    onChange={(e) => setEditAmountValue(e.target.value)}
                                    onKeyDown={(e) => handleAmountEditKeyPress(e, index)}
                                    className="w-full bg-transparent text-neutral-200 px-2 py-1 rounded-md focus:outline-none text-xs"
                                    min="0.000001"
                                    step="0.000001"
                                    autoFocus
                                />
                                <button
                                    onClick={() => handleAmountEditSave(index)}
                                    className="p-1 hover:text-theme-primary-300"
                                >
                                    <Check className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => handleSetAmount(value)}
                                className="px-1 w-full h-[30px] rounded-md flex items-center justify-between gap-1 border border-solid border-neutral-200 text-xs font-semibold text-neutral-100"
                            >
                                {value}
                                <Image
                                    src={pencil}
                                    alt="pencil"
                                    className="cursor-pointer hover:opacity-80"
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
                <button className="bg-neutral-900 w-full py-2 px-4 rounded-full flex items-center justify-between text-neutral-400">
                    <span>Select groups...</span>
                    <ChevronDown className="w-5 h-5" />
                </button>
            </div>

            {/* Action Button */}
            <div className="mt-auto">
                <button
                    className={`w-full py-2 rounded-full text-white font-medium ${mode === "buy" ? "bg-theme-green-200 hover:bg-theme-green-200/90" : "bg-theme-red-100 hover:bg-theme-red-100/90"
                        }`}
                >
                    {mode === "buy" ? "BUY" : "SELL"}
                </button>
            </div>
        </div>
    )
}
