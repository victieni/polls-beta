import React from 'react'
// import AuthProvider from '../providers/AuthProvider'
import './styles.css'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <ClerkProvider dynamic afterSignOutUrl="/">
      <html lang="en">
        <body>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}
