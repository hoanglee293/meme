"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, Copy, Check } from "lucide-react"
import { useQuery } from '@tanstack/react-query'
import { getMyWallets } from '@/services/api/TelegramWalletService'

export interface Wallet {
  wallet_id: string
  wallet_name: string
  solana_address: string
  wallet_type: string
  wallet_auth: string
}

interface WalletSelectorModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectWallet: (wallet: Wallet) => void
  selectedWalletId: string | null
}

export default function WalletSelectorModal({
  isOpen,
  onClose,
  onSelectWallet,
  selectedWalletId,
}: WalletSelectorModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const { data: myWallets } = useQuery({
    queryKey: ["my-wallets"],
    queryFn: getMyWallets,
    staleTime: 30000,
  })

  const filteredWallets = myWallets?.filter((wallet: Wallet) => {
    if (!searchQuery) return true
    return (
      wallet.wallet_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wallet.solana_address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wallet.wallet_type.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }) || []

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address)
    setCopiedAddress(address)
    setTimeout(() => setCopiedAddress(null), 2000)
  }

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 w-[700px]">
      <div
        ref={modalRef}
        className="w-full max-w-md bg-[#111111] rounded-xl overflow-hidden border border-cyan-500/30 shadow-lg"
        style={{
          boxShadow: "0 0 20px rgba(0, 200, 255, 0.1)",
          background: "linear-gradient(to bottom, #111111, #0a0a0a)",
        }}
      >
        {/* Search Bar */}
        <div className="p-4 border-b border-purple-500/20">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-[14px] w-[14px] text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Wallet Name/ Address"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-full w-[90%] py-2 pl-10 pr-4 text-sm focus:outline-none bg-gray-100 dark:bg-black text-gray-900 dark:text-neutral-200 focus:ring-1 focus:ring-blue-500 dark:focus:ring-[hsl(var(--ring))] max-h-[30px] border border-gray-200 dark:border-t-theme-primary-300 dark:border-l-theme-primary-300 dark:border-b-theme-secondary-400 dark:border-r-theme-secondary-400 placeholder:text-gray-500 dark:placeholder:text-neutral-400"
            />
            <button
              onClick={onClose}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-neutral-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Selected Wallet */}
        <div className="p-4">
          {filteredWallets
            .filter((wallet: Wallet) => wallet.solana_address === selectedWalletId)
            .map((wallet: Wallet) => (
              <div key={wallet.wallet_id} className="flex items-center justify-between bg-[#1a1a1a] rounded-lg p-3 mb-4">
                <div className="flex items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium mr-3 ${
                      wallet.wallet_type === "Master"
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                        : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    }`}
                  >
                    {wallet.wallet_type}
                  </span>
                  <span className="text-neutral-100 text-xs">{wallet.solana_address.slice(0, 4)}...{wallet.solana_address.slice(-4)}</span>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => copyToClipboard(wallet.solana_address)}
                    className="text-gray-400 hover:text-neutral-100 mr-3"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <div className="w-[14px] h-[14px] rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="h-2 w-2 text-neutral-100" />
                  </div>
                </div>
              </div>
            ))}

          {/* Change Wallet Section */}
          <h3 className="text-theme-primary-400 text-sm font-semibold mb-4">CHANGE WALLET</h3>

          <div className="max-h-64 overflow-y-auto pr-1 space-y-2 border border-purple-500/30 rounded-lg">
            {filteredWallets.map((wallet: Wallet) => (
              <div
                key={wallet.wallet_id}
                className="flex items-center justify-between p-3 hover:bg-[#1a1a1a] cursor-pointer border-b border-purple-500/10 last:border-b-0"
                onClick={() => onSelectWallet(wallet)}
              >
                <div className="flex items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium mr-3 ${
                      wallet.wallet_type === "Master"
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                        : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    }`}
                  >
                    {wallet.wallet_type}
                  </span>
                  <span className="text-neutral-100 text-xs">{wallet.solana_address.slice(0, 4)}...{wallet.solana_address.slice(-4)}</span>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(wallet.solana_address);
                    }}
                    className="text-gray-400 hover:text-neutral-100 mr-3"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <div
                    className={`w-[14px] h-[14px] rounded-full ${
                      selectedWalletId === wallet.solana_address ? "bg-green-500" : "border border-green-500 bg-transparent"
                    } flex items-center justify-center`}
                  >
                    {selectedWalletId === wallet.solana_address && <Check className="h-2 w-2 text-neutral-100" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
