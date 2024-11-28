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
          className="min-h-screen bg-background text-foreground flex flex-col items-center px-4 py-16 relative w-full max-w-5xl space-y-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="absolute right-4 top-4">
            <ThemeToggle />
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.h1 
                className="text-4xl font-bold sm:text-5xl md:text-6xl text-[#8B5CF6]"
                variants={itemVariants}
              >
                Echo Heart
              </motion.h1>
              <motion.p 
                className="text-lg text-muted-foreground sm:text-xl"
                variants={itemVariants}
              >
                Your personal AI companion for meaningful conversations and emotional support, available whenever you need someone to talk to.
              </motion.p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <Card className="bg-card border-border rounded-lg p-6 space-y-4 h-full hover:shadow-lg transition-all">
                  <MessageCircle className="w-12 h-12 text-[#8B5CF6] mb-4" />
                  <h2 className="text-2xl font-semibold">Text Chat</h2>
                  <p className="text-muted-foreground">
                    Express yourself through text conversations with a compassionate AI companion
                  </p>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <Card className="bg-card border-border rounded-lg p-6 space-y-4 h-full hover:shadow-lg transition-all">
                  <Heart className="w-12 h-12 text-red-500 mb-4" />
                  <h2 className="text-2xl font-semibold">Emotional Support</h2>
                  <p className="text-muted-foreground">
                    Get understanding and encouragement when you need it most
                  </p>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <Card className="bg-card border-border rounded-lg p-6 space-y-4 h-full hover:shadow-lg transition-all">
                  <Users className="w-12 h-12 text-[#8B5CF6] mb-4" />
                  <h2 className="text-2xl font-semibold">Start Your Journey</h2>
                  <p className="text-muted-foreground">
                    Join thousands of others who have found comfort and support through meaningful AI companionship
                  </p>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex justify-center"
            >
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
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  )
}
