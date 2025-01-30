// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from '@/context/AuthContext';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
 
});

export const metadata: Metadata = {
  title: "SIRIUS REGENERATIVE",
  description: "Portal de Proveedores SIRIUS REGENERATIVE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased`}>
      <AuthProvider>
        {children}
        </AuthProvider>  
        </body>
    </html>
  );
}