'use client'

import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Bookmark = {
  id: string
  title: string
  url: string
  user_id: string
}

export default function Dashboard() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const router = useRouter()

  useEffect(() => {
    getBookmarks()
  }, [])

  const getBookmarks = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push('/')
      return
    }

    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    setBookmarks(data || [])
  }

  //  FIXED ADD
  const addBookmark = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || !title || !url) return

    const { data, error } = await supabase
      .from('bookmarks')
      .insert({
        title,
        url,
        user_id: user.id
      })
      .select()   // important

    if (data) {
      // new bookmark immediately show hoga
      setBookmarks((prev) => [...data, ...prev])
    }

    setTitle('')
    setUrl('')
  }

  //  FIXED DELETE
  const deleteBookmark = async (id: string) => {
    await supabase.from('bookmarks').delete().eq('id', id)

    
    setBookmarks((prev) => prev.filter((b) => b.id !== id))
  }

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="max-w-xl mx-auto mt-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-3 rounded-xl text-xl">
              📑
            </div>
            <div>
              <h1 className="text-2xl font-bold">BookmarkHub</h1>
              <p className="text-gray-500 text-sm">
                {bookmarks.length} bookmarks saved
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
          >
            Sign Out
          </button>
        </div>

        {/* Add Bookmark Card */}
        <div className="bg-purple-50 p-6 rounded-2xl shadow-md mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Bookmark title"
            className="w-full mb-4 px-4 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full mb-4 px-4 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button
            onClick={addBookmark}
            className="w-full py-3 rounded-full text-white font-semibold 
            bg-gradient-to-r from-purple-500 to-purple-700 
            hover:opacity-90 transition"
          >
            + Add Bookmark
          </button>
        </div>

        {/* Bookmark List */}
        <div className="space-y-4">
          {bookmarks.map((b) => (
            <div
              key={b.id}
              className="bg-white p-5 rounded-2xl shadow-md flex justify-between items-start"
            >
              <div>
                <h2 className="font-semibold text-lg">{b.title}</h2>

                <a
                  href={b.url}
                  target="_blank"
                  className="text-gray-500 text-sm"
                >
                  {b.url}
                </a>
              </div>

              <button
                onClick={() => deleteBookmark(b.id)}
                className="text-gray-400 hover:text-red-500 transition"
              >
                🗑 Delete
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}