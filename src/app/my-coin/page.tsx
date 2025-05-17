"use client"

import { useState, useMemo } from "react"
import { Copy, ArrowUpDown, ExternalLink, Search } from "lucide-react"
import Image from "next/image"
import ethereum from "@/assets/svgs/ethereum-icon.svg"

type CoinData = {
    id: string
    time: string
    date: string
    name: string
    logo: string
    symbol: string
    address: string
    decimals: number
}

type SortField = "time" | "name" | "symbol" | "address" | "decimals"
type SortDirection = "asc" | "desc"

export default function MyCoinsTable() {
    const [searchQuery, setSearchQuery] = useState("")
    const [sortField, setSortField] = useState<SortField>("time")
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

    // Sample data
    const coins: CoinData[] = useMemo(
        () =>
            Array(18)
                .fill(null)
                .map((_, index) => ({
                    id: `coin-${index}`,
                    time: "22:00",
                    date: "12/05/2025",
                    name: "The Sandbox",
                    logo: "/sandbox-logo.png",
                    symbol: "SAND",
                    address: "T034JK....mnoqpr",
                    decimals: 9,
                })),
        [],
    )

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
    }

    const sortedAndFilteredCoins = useMemo(() => {
        let filtered = coins

        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            filtered = coins.filter(
                (coin) =>
                    coin.name.toLowerCase().includes(query) ||
                    coin.symbol.toLowerCase().includes(query) ||
                    coin.address.toLowerCase().includes(query),
            )
        }

        return [...filtered].sort((a, b) => {
            let comparison = 0

            switch (sortField) {
                case "time":
                    comparison = `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)
                    break
                case "name":
                    comparison = a.name.localeCompare(b.name)
                    break
                case "symbol":
                    comparison = a.symbol.localeCompare(b.symbol)
                    break
                case "address":
                    comparison = a.address.localeCompare(b.address)
                    break
                case "decimals":
                    comparison = a.decimals - b.decimals
                    break
            }

            return sortDirection === "asc" ? comparison : -comparison
        })
    }, [coins, searchQuery, sortField, sortDirection])

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        // You could add a toast notification here
    }

    return (
        <div className="container-body px-[40px] flex flex-col pt-[30px] relative mx-auto z-10">
             <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Image src={ethereum} alt="logo" width={24} height={24} />
                            MY COINS
                            <Image src={ethereum} alt="logo" width={24} height={24} />
                            <span className="ml-2 text-gray-400 text-sm">(40)</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Token Name/ Address"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-black bg-opacity-60 rounded-full pl-10 pr-4 py-2 text-sm w-64 border border-blue-500/30 focus:outline-none focus:border-blue-500 text-white"
                            />
                        </div>

                        <button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
                            CREATE COIN
                        </button>
                    </div>
                </div>
            <div className="w-full bg-black bg-opacity-30 backdrop-blur-sm rounded-xl border border-blue-500/30 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-white">
                        <thead>
                            <tr className="border-b border-blue-500/30 text-gray-400 text-sm">
                                <th className="px-4 py-3 text-left">
                                    <button
                                        onClick={() => handleSort("time")}
                                        className="flex items-center hover:text-white transition-colors"
                                    >
                                        Time
                                        <ArrowUpDown className="ml-1 h-4 w-4" />
                                    </button>
                                </th>
                                <th className="px-4 py-3 text-left">
                                    <button
                                        onClick={() => handleSort("name")}
                                        className="flex items-center hover:text-white transition-colors"
                                    >
                                        Meme coin
                                        <ArrowUpDown className="ml-1 h-4 w-4" />
                                    </button>
                                </th>
                                <th className="px-4 py-3 text-left">
                                    <button
                                        onClick={() => handleSort("symbol")}
                                        className="flex items-center hover:text-white transition-colors"
                                    >
                                        Symbol
                                        <ArrowUpDown className="ml-1 h-4 w-4" />
                                    </button>
                                </th>
                                <th className="px-4 py-3 text-left">Address</th>
                                <th className="px-4 py-3 text-left">
                                    <button
                                        onClick={() => handleSort("decimals")}
                                        className="flex items-center hover:text-white transition-colors"
                                    >
                                        Decimals
                                        <ArrowUpDown className="ml-1 h-4 w-4" />
                                    </button>
                                </th>
                                <th className="px-4 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedAndFilteredCoins.map((coin) => (
                                <tr key={coin.id} className="border-b border-blue-500/10 hover:bg-blue-900/10 transition-colors">
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <div>{coin.time}</div>
                                        <div className="text-gray-400 text-xs">{coin.date}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700 mr-3 flex-shrink-0">
                                                <Image
                                                    src={coin.logo || "/placeholder.svg"}
                                                    alt={coin.name}
                                                    width={32}
                                                    height={32}
                                                    className="object-cover"
                                                />
                                            </div>
                                            <span>{coin.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">{coin.symbol}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center">
                                            <span>{coin.address}</span>
                                            <button
                                                onClick={() => copyToClipboard(coin.address)}
                                                className="ml-2 text-gray-400 hover:text-white transition-colors"
                                            >
                                                <Copy className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">{coin.decimals}</td>
                                    <td className="px-4 py-3 text-center">
                                        <button className="text-gray-400 hover:text-white transition-colors">
                                            <ExternalLink className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
