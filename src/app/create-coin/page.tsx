"use client"

import { useState, useRef, type ChangeEvent, type FormEvent } from "react"
import { Upload, X, Undo2, ChevronDown, ChevronRight } from "lucide-react"
import Image from "next/image"

type CoinFormData = {
    name: string
    symbol: string
    amount: string
    category: string
    description: string
    telegram: string
    website: string
    twitter: string
    logo: File | null
    logoPreview: string | null
}

type FormErrors = {
    [key in keyof Omit<CoinFormData, "logoPreview">]?: string
}

const CATEGORIES = ["Meme", "DeFi", "NFT", "GameFi", "AI", "Layer 1", "Layer 2"]

export default function CreateCoinForm() {
    const [formData, setFormData] = useState<CoinFormData>({
        name: "",
        symbol: "",
        amount: "",
        category: "",
        description: "",
        telegram: "",
        website: "",
        twitter: "",
        logo: null,
        logoPreview: null,
    })

    const [errors, setErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        // Clear error when user types
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }))
        }
    }

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9.]/g, "")
        setFormData((prev) => ({ ...prev, amount: value }))

        if (errors.amount) {
            setErrors((prev) => ({ ...prev, amount: undefined }))
        }
    }

    const handleCategorySelect = (category: string) => {
        setFormData((prev) => ({ ...prev, category }))
        setShowCategoryDropdown(false)

        if (errors.category) {
            setErrors((prev) => ({ ...prev, category: undefined }))
        }
    }

    const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Check file type
        if (!file.type.startsWith("image/")) {
            setErrors((prev) => ({ ...prev, logo: "Please upload an image file" }))
            return
        }

        // Check file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            setErrors((prev) => ({ ...prev, logo: "Image size should be less than 2MB" }))
            return
        }

        const reader = new FileReader()
        reader.onload = () => {
            setFormData((prev) => ({
                ...prev,
                logo: file,
                logoPreview: reader.result as string,
            }))
        }
        reader.readAsDataURL(file)

        if (errors.logo) {
            setErrors((prev) => ({ ...prev, logo: undefined }))
        }
    }

    const handleRemoveLogo = () => {
        setFormData((prev) => ({
            ...prev,
            logo: null,
            logoPreview: null,
        }))
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = "Coin name is required"
        }

        if (!formData.symbol.trim()) {
            newErrors.symbol = "Coin symbol is required"
        } else if (formData.symbol.length > 10) {
            newErrors.symbol = "Symbol should be 10 characters or less"
        }

        if (!formData.amount.trim()) {
            newErrors.amount = "Initial liquidity amount is required"
        } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
            newErrors.amount = "Please enter a valid amount"
        }

        if (!formData.category) {
            newErrors.category = "Please select a category"
        }

        // if (!formData.description.trim()) {
        //   newErrors.description = "Coin description is required"
        // }

        if (!formData.logo) {
            newErrors.logo = "Coin logo is required"
        }

        // Optional fields validation
        if (formData.website && !formData.website.startsWith("http")) {
            newErrors.website = "Please enter a valid URL starting with http:// or https://"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)

        try {
            // Here you would normally send the data to your API
            // For demonstration, we'll just simulate a delay
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Success handling
            alert("Coin created successfully!")

            // Reset form
            setFormData({
                name: "",
                symbol: "",
                amount: "",
                category: "",
                description: "",
                telegram: "",
                website: "",
                twitter: "",
                logo: null,
                logoPreview: null,
            })
        } catch (error) {
            console.error("Error creating coin:", error)
            alert("Failed to create coin. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="h-[93vh] flex gap-6 container-trading px-[40px] py-4 relative z-10 overflow-hidden pt-[80px]">
            {/* Main Form */}
            <div className="w-2/3 bg-black bg-opacity-30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6 shadow-lg flex flex-col ">
                <h2 className="text-center text-xl font-bold text-white mb-8 flex items-center justify-center">
                    <span className="text-blue-400 mr-2">✦</span>
                    CREATE NEW COIN
                    <span className="text-blue-400 ml-2">✦</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col justify-between">
                   <div className="flex flex-col gap-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                                Name <span className="text-blue-400">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter coin name"
                                className={`w-full bg-black bg-opacity-60 border ${errors.name ? "border-red-500" : "border-blue-500/50"
                                    } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                        </div>

                        {/* Symbol */}
                        <div>
                            <label htmlFor="symbol" className="block text-sm font-medium text-gray-300 mb-1">
                                Symbol <span className="text-blue-400">*</span>
                            </label>
                            <input
                                type="text"
                                id="symbol"
                                name="symbol"
                                value={formData.symbol}
                                onChange={handleInputChange}
                                placeholder="Enter coin symbol"
                                className={`w-full bg-black bg-opacity-60 border ${errors.symbol ? "border-red-500" : "border-blue-500/50"
                                    } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            {errors.symbol && <p className="mt-1 text-sm text-red-500">{errors.symbol}</p>}
                        </div>

                        {/* Amount */}
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">
                                Amount <span className="text-blue-400">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="amount"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleAmountChange}
                                    placeholder="Enter initial liquidity amount in SOL"
                                    className={`w-full bg-black bg-opacity-60 border ${errors.amount ? "border-red-500" : "border-blue-500/50"
                                        } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-16`}
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <span className="text-gray-400">(SOL)</span>
                                </div>
                                {formData.amount && (
                                    <button
                                        type="button"
                                        onClick={() => setFormData((prev) => ({ ...prev, amount: "" }))}
                                        className="absolute inset-y-0 right-16 flex items-center pr-3 text-gray-400 hover:text-gray-200"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                            {errors.amount && <p className="mt-1 text-sm text-red-500">{errors.amount}</p>}
                        </div>

                        {/* Categories */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                                Categories <span className="text-blue-400">*</span>
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                                    className={`w-full bg-black bg-opacity-60 border ${errors.category ? "border-red-500" : "border-blue-500/50"
                                        } rounded-lg p-3 text-left text-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center`}
                                >
                                    {formData.category || "Categories"}
                                    <ChevronDown className="h-4 w-4 text-gray-400" />
                                </button>
                                {showCategoryDropdown && (
                                    <div className="absolute z-10 mt-1 w-full bg-black bg-opacity-90 border border-blue-500/50 rounded-lg shadow-lg">
                                        <ul className="py-1 max-h-48 overflow-y-auto">
                                            {CATEGORIES.map((category) => (
                                                <li key={category}>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleCategorySelect(category)}
                                                        className="w-full text-left px-4 py-2 text-white hover:bg-blue-900/30"
                                                    >
                                                        {category}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Enter coin description"
                            rows={4}
                            className={`w-full bg-black bg-opacity-60 border ${errors.description ? "border-red-500" : "border-blue-500/50"
                                } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Telegram */}
                        <div>
                            <label htmlFor="telegram" className="block text-sm font-medium text-gray-300 mb-1">
                                Telegram
                            </label>
                            <input
                                type="text"
                                id="telegram"
                                name="telegram"
                                value={formData.telegram}
                                onChange={handleInputChange}
                                placeholder="Enter telegram group link"
                                className="w-full bg-black bg-opacity-60 border border-blue-500/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Twitter */}
                        <div>
                            <label htmlFor="twitter" className="block text-sm font-medium text-gray-300 mb-1">
                                Twitter
                            </label>
                            <input
                                type="text"
                                id="twitter"
                                name="twitter"
                                value={formData.twitter}
                                onChange={handleInputChange}
                                placeholder="Enter twitter username"
                                className="w-full bg-black bg-opacity-60 border border-blue-500/50 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Website */}
                        <div>
                            <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-1">
                                Website
                            </label>
                            <input
                                type="text"
                                id="website"
                                name="website"
                                value={formData.website}
                                onChange={handleInputChange}
                                placeholder="Enter coin website"
                                className={`w-full bg-black bg-opacity-60 border ${errors.website ? "border-red-500" : "border-blue-500/50"
                                    } rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            {errors.website && <p className="mt-1 text-sm text-red-500">{errors.website}</p>}
                        </div>

                        {/* Logo */}

                    </div>
                    <div className="flex gap-4 w-full">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Logo <span className="text-blue-400">*</span>
                            </label>
                            <div
                                className={`border-2 border-dashed ${errors.logo ? "border-red-500" : "border-blue-500/50"
                                    } rounded-lg p-4 h-full flex items-center justify-center cursor-pointer relative overflow-hidden`}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />

                                {formData.logoPreview ? (
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={formData.logoPreview || "/placeholder.svg"}
                                            alt="Logo preview"
                                            fill
                                            className="object-contain"
                                        />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleRemoveLogo()
                                            }}
                                            className="absolute top-0 right-0 bg-red-500 rounded-full p-1 m-1"
                                        >
                                            <X className="h-4 w-4 text-white" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <Upload className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                                        <p className="text-sm text-gray-400">Click to upload</p>
                                    </div>
                                )}
                            </div>
                            {errors.logo && <p className="mt-1 text-sm text-red-500">{errors.logo}</p>}
                        </div>
                        {/* Preview */}
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-300 mb-1">Preview</label>
                            <div className="bg-black bg-opacity-60 border border-blue-500/50 rounded-lg p-6 relative h-full">
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 bg-purple-600 rounded-full overflow-hidden mb-2 flex items-center justify-center">
                                        {formData.logoPreview ? (
                                            <Image
                                                src={formData.logoPreview || "/placeholder.svg"}
                                                alt="Logo preview"
                                                width={64}
                                                height={64}
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="text-white text-2xl font-bold">
                                                {formData.symbol ? formData.symbol.charAt(0) : "?"}
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-white font-bold text-lg">{formData.name || "YOUR COIN NAME"}</h3>
                                    <p className="text-gray-400 text-sm">{formData.symbol || "SYMBOL"}</p>
                                    <p className="text-gray-400 text-sm text-center mt-2">
                                        {formData.description || "Your coin description will appear here"}
                                    </p>
                                </div>
                                <button type="button" className="absolute top-2 right-2 text-gray-400 hover:text-white">
                                    <Undo2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                   </div>

                    {/* Submit Button */}
                    <div className="pt-8 mt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "CREATING..." : "CREATE COIN"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Sidebar */}
            <div className="w-1/3 space-y-6">
                {/* My Coins */}
                <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6 shadow-lg">
                    <h2 className="text-center text-lg font-bold text-white mb-4 flex items-center justify-center">
                        <span className="text-blue-400 mr-2">✦</span>
                        MY COINS
                        <span className="text-blue-400 ml-2">✦</span>
                    </h2>

                    <div className="flex justify-center space-x-4 mb-6">
                        <button className="text-blue-400 text-sm border-b-2 border-blue-400 pb-1">Today</button>
                        <button className="text-gray-400 text-sm hover:text-gray-300">Last 8 days</button>
                        <button className="text-gray-400 text-sm hover:text-gray-300">Last month</button>
                    </div>

                    <div className="flex flex-col items-center justify-center py-8">
                        <div className="w-32 h-32 bg-gradient-to-b from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 relative">
                            <div className="absolute -top-4 bg-white rounded-full p-2">
                                <X className="h-6 w-6 text-orange-500" />
                            </div>
                            <div className="w-16 h-12 bg-purple-800 rounded-md flex items-center justify-center">
                                <div className="w-8 h-6 bg-purple-700 rounded-sm"></div>
                            </div>
                        </div>
                        <p className="text-white font-medium">No coins created recently</p>
                    </div>

                    <div className="mt-6 text-center">
                        <button className="text-white flex items-center justify-center mx-auto hover:text-blue-400 transition-colors">
                            <span>SEE ALL MY COINS</span>
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                    </div>
                </div>

                {/* Guide */}
                <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6 shadow-lg">
                    <h2 className="text-center text-lg font-bold text-white mb-6 flex items-center justify-center">
                        <span className="text-blue-400 mr-2">✦</span>
                        GUIDE
                        <span className="text-blue-400 ml-2">✦</span>
                    </h2>

                    <ul className="space-y-4">
                        <li className="text-white text-sm flex justify-center">Cannot be deleted or edited after creation</li>
                        <li className="text-white text-sm flex justify-center">Deployed on Solana</li>
                        <li className="text-white text-sm flex justify-center">Tradable if eligible</li>
                        <li className="text-white text-sm flex justify-center">
                            Each coin has a unique wallet and token - store securely
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
