import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import { OfflineNotificationBar } from './_components/OfflineNotificationBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TODO list',
  description: 'Manage your todos with ease',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OfflineNotificationBar />
        <Toaster position="bottom-left" />
        {children}
      </body>
    </html>
  )
}
