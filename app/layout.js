import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
