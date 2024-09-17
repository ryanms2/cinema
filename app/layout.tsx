import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from './_components/navbar'
import { Toaster } from '@/components/ui/toaster'
import { Footer } from './_components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cine Vault',
  description: 'Catálogo de filmes e séries para assistir online',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <head>
        <meta
          name="google-site-verification"
          content="EmwnJetFAd5wamDtxABFbVs3kuPxLHFOLD2WWIeO_dE"
        />
        <link
          rel="icon"
          href="https://img.icons8.com/?size=100&id=59842&format=png&color=000000"
          sizes="any"
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  )
}
