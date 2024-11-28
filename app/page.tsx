'use client'

import { MessageCircle, Mic, Heart, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { ThemeProvider } from "@/components/theme-provider"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from 'next/navigation'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
}

export default function EchoHeart() {
  const router = useRouter()

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <AnimatePresence>
        <motion.div 
          className="min-h-screen bg-background text-foreground flex flex-col items-center px-4 py-16 relative"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <ThemeToggle />
          </motion.div>
          
          {/* Header Section */}
          <motion.h1 
            className="text-5xl font-bold mb-6 text-[#8B5CF6]"
            variants={itemVariants}
          >
            Echo Heart
          </motion.h1>
          <motion.p 
            className="text-center max-w-2xl text-lg mb-16"
            variants={itemVariants}
          >
            Your personal AI companion for meaningful conversations and emotional support, available whenever you need someone to talk to.
          </motion.p>

          {/* Features Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mb-16"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
              <Card className="bg-card border-border rounded-lg p-6 h-full hover:shadow-lg transition-all">
                <MessageCircle className="w-12 h-12 text-[#8B5CF6] mb-4" />
                <h2 className="text-xl font-semibold mb-3">Text Chat</h2>
                <p>
                  Express yourself through text conversations with a compassionate AI companion
                </p>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
              <Card className="bg-card border-border rounded-lg p-6 h-full hover:shadow-lg transition-all">
                <Heart className="w-12 h-12 text-red-500 mb-4" />
                <h2 className="text-xl font-semibold mb-3">Emotional Support</h2>
                <p>
                  Get understanding and encouragement when you need it most
                </p>
              </Card>
            </motion.div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            variants={itemVariants}
            className="w-full max-w-3xl"
          >
            <Card className="bg-card border-border rounded-lg p-8 w-full text-center hover:shadow-lg transition-all">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.5
                }}
              >
                <Users className="w-16 h-16 text-[#8B5CF6] mx-auto mb-6" />
              </motion.div>
              <motion.h2 
                className="text-2xl font-bold mb-4"
                variants={itemVariants}
              >
                Start Your Journey with Echo Heart
              </motion.h2>
              <motion.p 
                className="mb-8"
                variants={itemVariants}
              >
                Join thousands of others who have found comfort and support through meaningful AI companionship
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-8 py-2 rounded-full text-lg"
                  onClick={() => router.push('/chat')}
                >
                  Begin Conversation
                </Button>
              </motion.div>
            </Card>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  )
}
