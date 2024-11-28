'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Card, Input, ScrollArea } from "@/components/ui"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, Send, Trash2, Heart } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function ChatPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now(),
      text: "Hello, I am Echo Heart. Your personal emotional companion. I'm here to listen, support, and chat with you. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '' || isLoading) return

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.concat(userMessage).map(msg => ({
            content: msg.text,
            sender: msg.sender
          }))
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to get response')
      }

      const aiMessage: Message = {
        id: Date.now(),
        text: data.content,
        sender: 'ai',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Chat Error:', error)
      setMessages(prev => prev.slice(0, -1))
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearChat = () => {
    setMessages([{
      id: Date.now(),
      text: "Hello, I am Echo Heart. Your personal emotional companion. I'm here to listen, support, and chat with you. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date()
    }])
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-purple-100 dark:border-purple-900">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.push('/')}
            className="hover:bg-purple-100 dark:hover:bg-purple-900"
          >
            <ArrowLeft className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </Button>
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              Echo Heart Chat
            </h1>
          </div>
        </div>
        <ThemeToggle />
      </div>

      {/* Chat Area */}
      <div className="flex-grow flex justify-center p-4 overflow-hidden">
        <Card className="w-full max-w-4xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
          <ScrollArea className="h-[calc(100vh-12rem)] p-6">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'bg-purple-100 dark:bg-purple-900 text-gray-800 dark:text-gray-200'
                    } shadow-md`}
                  >
                    <p className="text-[15px] leading-relaxed">{message.text}</p>
                    <span className="text-xs opacity-70 mt-2 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-2xl shadow-md">
                    <div className="flex gap-2 items-center">
                      <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-purple-100 dark:border-purple-900 bg-white/50 dark:bg-gray-800/50">
            <div className="flex gap-2 items-center">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-grow bg-white dark:bg-gray-900 border-purple-100 dark:border-purple-900 focus-visible:ring-purple-500"
              />
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleClearChat}
                disabled={isLoading}
                className="hover:bg-purple-100 dark:hover:bg-purple-900"
                title="Clear chat"
              >
                <Trash2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </Button>
              <Button 
                onClick={handleSendMessage} 
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
