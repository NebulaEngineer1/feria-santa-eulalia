import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Feria Santa Eulalia · Mercado del agricultor",
  description:
    "Productos frescos de productores locales de Atenas, entregados el mismo día. Pedí en línea, recibí en tu casa.",
  openGraph: {
    title: "Feria Santa Eulalia",
    description:
      "Mercado del agricultor en Atenas, Costa Rica. Entrega el mismo día.",
    type: "website",
    locale: "es_CR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CR">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
