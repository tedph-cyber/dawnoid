'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FaLock, FaEye, FaEyeSlash, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { signInWithEmail, signOut, checkAdminAccess } from '@/lib/auth'

interface AdminAuthProviderProps {
  children: React.ReactNode
}

export default function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSigningIn, setIsSigningIn] = useState(false)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const { isAdmin, user } = await checkAdminAccess()
      setIsAuthenticated(isAdmin)
      setUser(user)
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSigningIn(true)
    setError('')

    try {
      const { data, error } = await signInWithEmail(email, password)
      
      if (error) {
        setError(error.message)
        return
      }

      if (data.user) {
        const { isAdmin, user } = await checkAdminAccess()
        if (isAdmin) {
          setIsAuthenticated(true)
          setUser(user)
          setEmail('')
          setPassword('')
        } else {
          setError('Access denied. Admin privileges required.')
          await signOut()
        }
      }
    } catch (error: any) {
      setError(error.message || 'Sign in failed')
    } finally {
      setIsSigningIn(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      setIsAuthenticated(false)
      setUser(null)
    } catch (error: any) {
      console.error('Sign out failed:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md p-8 bg-card border border-border">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <FaLock className="text-primary text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Admin Access</h1>
            <p className="text-muted-foreground">
              Sign in with your admin credentials to access the management panel
            </p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="admin@dawnoid.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full py-3 text-lg"
              disabled={isSigningIn}
            >
              {isSigningIn ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Secure admin access powered by Supabase Auth
            </p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div>
      {/* Admin Header */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
              <FaLock className="text-primary-foreground text-xs sm:text-sm" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground text-sm sm:text-base">Admin Panel</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">DawnOID Product Management</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <FaUser className="text-xs" />
              <span className="truncate max-w-32">{user?.email}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSignOut}
              className="text-xs sm:text-sm flex items-center gap-1 sm:gap-2"
            >
              <FaSignOutAlt className="text-xs" />
              <span className="hidden xs:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Admin Content */}
      {children}
    </div>
  )
}