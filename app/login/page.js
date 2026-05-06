"use client"

import { useState } from 'react'

export default function LoginPage(){
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	function handleSubmit(e){
		e.preventDefault()
		// Demo-only: no backend. Replace with real auth later.
		alert(`درخواست ورود ارسال شد برای: ${email}`)
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
			<div className="w-full max-w-md bg-white rounded-lg shadow px-8 py-10">
				<h1 className="text-2xl font-semibold mb-4 text-right">ورود به حساب کاربری</h1>
				<form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
					<div>
						<label className="block text-sm text-gray-700 mb-1">ایمیل یا شماره تلفن</label>
						<input
							value={email}
							onChange={(e)=>setEmail(e.target.value)}
							type="text"
							placeholder="example@mail.com"
							className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
						/>
					</div>

					<div>
						<label className="block text-sm text-gray-700 mb-1">رمز عبور</label>
						<input
							value={password}
							onChange={(e)=>setPassword(e.target.value)}
							type="password"
							placeholder="••••••••"
							className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
						/>
					</div>

					<div className="flex items-center justify-between">
						<label className="flex items-center text-sm">
							<input type="checkbox" className="ml-2" />
							مرا به خاطر بسپار
						</label>
						<a className="text-sm text-indigo-600 hover:underline" href="#">فراموشی رمز؟</a>
					</div>

					<button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
						ورود به حساب
					</button>
				</form>
			</div>
		</div>
	)
}

