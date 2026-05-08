import "./globals.css";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Work-1 App",
  description: "Production ready application",
  keywords: ["nextjs", "react", "ecommerce"],
  openGraph: {
    title: "Work-1 App",
    description: "Modern optimized application",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body>
        <CartProvider>
          <Navbar />

          <main>{children}</main>

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
