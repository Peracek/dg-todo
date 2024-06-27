'use client'

import { useEffect, useState } from 'react'

export const OfflineNotificationBar = () => {
  const [isOnline, setIsOnline] = useState(true)
  useEffect(() => {
    window.addEventListener('online', () => setIsOnline(true))
    window.addEventListener('offline', () => setIsOnline(false))
  }, [])

  if (isOnline) {
    return null
  }

  return <div className="bg-red-400 text-center p-1">Ooops. You're offline</div>
}
