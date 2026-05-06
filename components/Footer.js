export default function Footer(){
	return (
		<footer className="bg-gray-900 text-white mt-10">
			<div className="container px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
				<div>
					<h4 className="font-bold text-lg">درباره ما</h4>
					<p className="mt-2 text-gray-300">فروشگاه نمونه برای نمایش رابط کاربری Digikala با Next.js</p>
				</div>
				<div>
					<h4 className="font-bold text-lg">راهنما</h4>
					<ul className="mt-2 space-y-1 text-gray-300">
						<li className="hover:text-white cursor-pointer">تماس با ما</li>
						<li className="hover:text-white cursor-pointer">قوانین و مقررات</li>
					</ul>
				</div>
				<div>
					<h4 className="font-bold text-lg">شبکه‌ها</h4>
					<div className="mt-2 text-gray-300">Twitter · Instagram</div>
				</div>
			</div>
			<div className="border-t border-gray-800 py-4 text-center text-sm">© {new Date().getFullYear()} Digikala Clone</div>
		</footer>
	)
}
