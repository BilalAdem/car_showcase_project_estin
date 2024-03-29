import { Footer, Navbar } from '@/components'
import '../globals.css'
import type { Metadata } from 'next'
import { ClerkProvider} from '@clerk/nextjs'



export const metadata: Metadata = {
  title: 'CarHub',
  description: 'Discover your dream car today',
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body className="relative">
        <div className='gradient' />
        <Navbar/>
        {children}
        <Footer />
        </body>
    </html>
    </ClerkProvider>
  )
}
