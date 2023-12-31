import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthProvider from '@/context/AuthProvider'
import { getServerSession } from "next-auth"
import { options } from './api/auth/[...nextauth]/options'
import Nav from '../components/Nav'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chingu Auction Website',
  description: 'worlds greatest auction site - hopefully',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(options)
  console.log(session?.user, 'session log')
  // const displayName = session?.user?.name ? session?.user?.name.split(' ')[0]
  //                                         : session?.user?.username

  return (

    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider>
          <Providers>
            <Nav session={session} />
            {children}
          </Providers>
        </AuthProvider>
      </body>
    </html>
  )
}
