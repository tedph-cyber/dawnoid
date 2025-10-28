"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaCartShopping } from "react-icons/fa6";
import { MdEventAvailable } from "react-icons/md";

export default function Banner() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen min-w-full flex items-center justify-center py-20"
      style={{
        background: 'linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--card)) 100%)'
      }}
    >
      <motion.div
        className="max-w-2xl mx-auto text-center px-4"
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <motion.h1
          className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-foreground mb-2"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 50%, hsl(var(--primary)) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          initial={{ opacity: 0, y: 8, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          Where Excellence <br className="hidden sm:block" /> meets Grace
        </motion.h1>

        <motion.p
          className="mt-4 text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed px-4 sm:px-0"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Discover premium footwear, exquisite perfumes, professional event
          planning and hosting, and handcrafted artistry that celebrates your
          unique style and faith.
        </motion.p>

        <motion.div
          className="mt-6 flex flex-col gap-3 justify-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button className="rounded-full h-12 text-xl font-bold">
            <FaCartShopping className="mr-2" />
            <a href="/shop">Shop now</a>
          </Button>
          <Button className="rounded-full h-12 text-xl font-bold border border-border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground">
            <MdEventAvailable className="mr-2 text-2xl" />
            <a href="/book">Book us</a>
          </Button>
        </motion.div>
      </motion.div>
    </motion.main>
  );
}
