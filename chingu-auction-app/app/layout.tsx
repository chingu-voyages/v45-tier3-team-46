'use client'

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthProvider from '@/context/AuthProvider'
import { getServerSession } from "next-auth"
import { options } from './api/auth/[...nextauth]/options'
import Nav from '../components/Nav'
import { Providers } from './providers'
import { Provider } from "react-redux"
import store from './store/store'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chingu Auction Website',
  description: 'worlds greatest auction site - hopefully',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const session = await getServerSession(options)
  // console.log(session?.user, 'session log')
  // const displayName = session?.user?.name ? session?.user?.name.split(' ')[0]
  //                                         : session?.user?.username

  return (

    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider>
          <Provider store={store}>
            <Providers>
              <Nav />
              {children}
            </Providers>
          </Provider>
        </AuthProvider>
      </body>
    </html>
  )
}
