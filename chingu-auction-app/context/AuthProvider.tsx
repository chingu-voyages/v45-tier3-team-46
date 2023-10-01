'use client'
/* The purpose of separating this out from layout.tsx is to keep the layout as a 
server component. Otherwise we would need to put 'use client' at the top of layout */

import { SessionProvider } from 'next-auth/react'

export default function AuthProvider({ children, session }: {
  children: React.ReactNode, session: any
}) {
  console.log(session)
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}