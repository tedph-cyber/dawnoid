"use client";
import Image from "next/image";
import { FaWhatsapp } from 'react-icons/fa6';
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // prevent background scroll when mobile menu is open
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/testimonials", label: "Testimonials" },
  ];

  return (
    <nav className="w-full bg-background/95 backdrop-blur-sm shadow-md border-b border-border text-foreground">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* left: logo + title */}
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-linear-to-r from-red-500 to-purple-500 w-10 h-10 flex items-center justify-center">
            <h2 className="font-bold text-white">D</h2>
          </div>
          <div className="flex flex-col text-sm">
            <h1 className="font-semibold text-foreground">DawnOID enterprise</h1>
            <p className="text-xs text-muted-foreground">
              Where Faith meets excellence.
            </p>
          </div>
        </div>

        {/* center (desktop nav) */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex w-full max-w-md justify-evenly items-center text-lg font-medium">
            {links.map((l) => (
              <li key={l.href}>
                <a className="hover:text-primary transition-colors" href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* right: whatsapp (desktop) + theme toggle + hamburger (mobile) */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <button className="hidden md:inline-flex bg-green-500 rounded-full text-white px-4 py-2 items-center text-lg hover:bg-green-600 transition">
            <FaWhatsapp className="w-5 h-5" />
            <span className="ml-2">
              Chat Now
            </span>
          </button>

          {/* Hamburger for mobile */}
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {open ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu - Full screen overlay approach */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Completely opaque background */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ 
              backgroundColor: 'hsl(var(--background))',
            }}
            onClick={() => setOpen(false)}
          />
          
          {/* Menu content panel */}
          <div 
            className="relative z-10 h-full w-full md:max-w-sm ml-auto"
            style={{ 
              backgroundColor: 'hsl(var(--card))',
              borderLeft: '1px solid hsl(var(--border))',
              boxShadow: '-10px 0 25px -5px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Header with complete opacity */}
            <div 
              className="p-4 flex items-center justify-between border-b"
              style={{ 
                backgroundColor: 'hsl(var(--background))',
                borderBottomColor: 'hsl(var(--border))'
              }}
            >
              <div className="flex items-center gap-2">
                <div 
                  className="rounded-full w-8 h-8 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #a855f7 100%)'
                  }}
                >
                  <h2 className="font-bold text-white text-sm">D</h2>
                </div>
                <div className="flex flex-col">
                  <h1 className="font-semibold text-xs text-foreground">DawnOID enterprise</h1>
                  <p className="text-[10px] text-muted-foreground">
                    Where Faith meets excellence.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary hover:bg-muted transition-colors"
                  style={{ backgroundColor: 'hsl(var(--muted) / 0.5)' }}
                >
                  <FaTimes className="text-foreground" />
                </button>
              </div>
            </div>

            {/* Navigation with complete opacity */}
            <nav 
              className="p-6 py-2 h-screen w-screen overflow-y-auto"
              style={{ 
                backgroundColor: 'hsl(var(--card))',
              }}
            >
              <ul className="flex flex-col gap-4 space-y-1 pt-2 lg:space-x-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block px-6 py-4 rounded-xl text-lg font-semibold text-foreground transition-all duration-200 border-2 border-transparent"
                      style={{
                        backgroundColor: 'hsl(var(--muted) / 0.3)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'hsl(var(--primary) / 0.1)';
                        e.currentTarget.style.borderColor = 'hsl(var(--primary) / 0.3)';
                        e.currentTarget.style.color = 'hsl(var(--primary))';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'hsl(var(--muted) / 0.3)';
                        e.currentTarget.style.borderColor = 'transparent';
                        e.currentTarget.style.color = 'hsl(var(--foreground))';
                      }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* WhatsApp section with enhanced visibility */}
              <div 
                className="mt-8 p-4 rounded-xl border-2"
                style={{ 
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))'
                }}
              >
                <a
                  href="https://wa.me/c/2347080982579"
                  className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl w-full transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
                  style={{
                    backgroundColor: '#25D366',
                    color: 'white'
                  }}
                  onClick={() => setOpen(false)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#20B954';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#25D366';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <FaWhatsapp className="w-6 h-6" />
                  <span>Chat Now</span>
                </a>
              </div>

              <div 
                className="mt-6 text-center p-3 rounded-lg"
                style={{ backgroundColor: 'hsl(var(--muted) / 0.2)' }}
              >
                <p className="text-sm text-muted-foreground font-medium">
                  Fast, friendly support. Available 9am–6pm.
                </p>
              </div>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}