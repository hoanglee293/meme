"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Smile, Send, Image as ImageIcon, X } from "lucide-react"
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import Image from "next/image"
import token from "@/assets/svgs/token.svg"

type Message = {
  id: string
  sender: {
    name: string
    avatar: string
    isCurrentUser: boolean
  }
  text: string
  timestamp: Date
}

const ChatTrading = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
          id: "1",
          sender: {
            name: "POPCAT",
            avatar: token,
            isCurrentUser: false,
          },
          text: "Anyone is up for illustrations. I think there are less relatable images according to our brand.",
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
        },
        {
          id: "2",
          sender: {
            name: "POPCAT",
            avatar: token,
            isCurrentUser: false,
          },
          text: "Anyone is up for illustrations. I think there are less relatable images according to our brand.",
          timestamp: new Date(Date.now() - 1000 * 60 * 4),
        },
        {
          id: "3",
          sender: {
            name: "You",
            avatar: "/user-avatar.png",
            isCurrentUser: true,
          },
          text: "Yes, It will decrease the loading",
          timestamp: new Date(Date.now() - 1000 * 60 * 3),
        },
      ])
      const [newMessage, setNewMessage] = useState("")
      const messagesEndRef = useRef<HTMLDivElement>(null)
      const [showEmojiPicker, setShowEmojiPicker] = useState(false)
      const [showIconPicker, setShowIconPicker] = useState(false)
      const emojiPickerRef = useRef<HTMLDivElement>(null)
      const iconPickerRef = useRef<HTMLDivElement>(null)
    
      // Auto-scroll to bottom when messages change
      useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, [messages])
    
      // Close pickers when clicking outside
      useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
            setShowEmojiPicker(false)
          }
          if (iconPickerRef.current && !iconPickerRef.current.contains(event.target as Node)) {
            setShowIconPicker(false)
          }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
      }, [])
    
      const handleSendMessage = () => {
        if (newMessage.trim() === "") return
    
        const message: Message = {
          id: Date.now().toString(),
          sender: {
            name: "You",
            avatar: "/user-avatar.png",
            isCurrentUser: true,
          },
          text: newMessage,
          timestamp: new Date(),
        }
    
        setMessages([...messages, message])
        setNewMessage("")
      }
    
      const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault()
          handleSendMessage()
        }
      }

      const onEmojiClick = (emojiData: EmojiClickData) => {
        setNewMessage(prev => prev + emojiData.emoji)
        setShowEmojiPicker(false)
      }

      const onIconClick = (icon: string) => {
        setNewMessage(prev => prev + icon)
        setShowIconPicker(false)
      }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender.isCurrentUser ? "justify-end" : "items-start"}`}>
                        {!message.sender.isCurrentUser && (
                            <div className="flex-shrink-0 mr-3">
                                <Image
                                    src={message.sender.avatar || token}
                                    alt={message.sender.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                            </div>
                        )}
                        <div
                            className={`max-w-[80%] rounded-lg p-3 ${message.sender.isCurrentUser
                                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                                    : "bg-[#1a1a1a] text-white border border-purple-600"
                                }`}
                        >
                            {!message.sender.isCurrentUser && <div className="font-medium text-sm mb-1">{message.sender.name}</div>}
                            <p className="text-sm">{message.text}</p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-neutral-800">
                <div className="relative">
                    {/* Emoji Picker */}
                    {showEmojiPicker && (
                        <div ref={emojiPickerRef} className="absolute bottom-full right-0 mb-2 z-50">
                            <EmojiPicker onEmojiClick={onEmojiClick} />
                        </div>
                    )}


                    <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full bg-neutral-800 text-white rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-theme-primary-400"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                <button 
                                    onClick={() => {
                                        setShowEmojiPicker(!showEmojiPicker)
                                        setShowIconPicker(false)
                                    }}
                                    className="text-gray-400 hover:text-theme-primary-400 transition-colors"
                                >
                                    <Smile className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={handleSendMessage}
                            className="bg-theme-primary-400 text-white rounded-full p-2 hover:bg-theme-primary-400/90 transition-colors"
                        >
                            <Send className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatTrading