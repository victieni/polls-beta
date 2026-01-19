import React from 'react'
import AuthProvider from '../providers/AuthProvider'
import './styles.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <main>{children}</main>
        </body>
      </html>
    </AuthProvider>
  )
}
