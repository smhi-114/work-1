import './globals.css'
import { CartProvider } from '../context/CartContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = { title: 'دیجی‌کالا - شبیه‌ساز' }

export default function RootLayout({ children }){
	return (
		<html lang="fa" dir="rtl">
			<body className="min-h-screen flex flex-col bg-gray-100">
				<CartProvider>
					<Navbar />
					<main className="flex-1">{children}</main>
					<Footer />
				</CartProvider>
			</body>
		</html>
	)
}
