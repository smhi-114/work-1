import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartContext";

export const metadata = {
  title: "Work-1 App",
  description: "Production ready application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
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
