'use client'

import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.push('/dashboard')
    })
  }, [])

  // const login = async () => {
  //   await supabase.auth.signInWithOAuth({
  //     provider: 'google',
  //     options: {
  //       redirectTo: 'http://localhost:3000/dashboard'
  //     }
  //   })
  // }

  const login = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/dashboard`
    }
  })
}


  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4">
    
    <div className="text-center max-w-md w-full">

      {/* Icon Circle */}
      <div className="flex justify-center mb-6">
        <div className="bg-purple-100 p-8 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 3v18l7-5 7 5V3z"
            />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">
        BookmarkHub
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-lg mb-8 leading-relaxed">
        Save and organize your favorite links in one beautiful place
      </p>

      {/* Google Button */}
      <button
        onClick={login}
        className="w-full py-4 rounded-full text-white font-semibold text-lg
        bg-gradient-to-r from-purple-500 to-purple-700
        hover:opacity-90 transition duration-200 shadow-lg"
      >
        → Sign in with Google
      </button>

    </div>
  </div>
)
}
