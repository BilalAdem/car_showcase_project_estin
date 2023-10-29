import { Metadata } from "next"
import {ClerkProvider } from "@clerk/nextjs"
import '../globals.css'

export const metadata: Metadata = {
    title: 'CarHub',
    description: 'Discover the best cars in the world.',

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
                    <div className="w-full flex justify-center items-center min-h-screen">
                        {children}
                    </div>
                </body>
            </html>

        </ClerkProvider>
    )
}
