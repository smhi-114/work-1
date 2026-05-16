"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [mode, setMode] = useState("otp");

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-black text-center mb-2">
          ورود | ثبت‌نام
        </h1>

        <p className="text-sm text-slate-500 text-center mb-8">
          برای ادامه وارد حساب کاربری خود شوید
        </p>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode("otp")}
            className={`flex-1 py-3 rounded-xl font-bold transition ${
              mode === "otp"
                ? "bg-red-600 text-white"
                : "bg-slate-100"
            }`}
          >
            ورود با موبایل
          </button>

          <button
            onClick={() => setMode("password")}
            className={`flex-1 py-3 rounded-xl font-bold transition ${
              mode === "password"
                ? "bg-red-600 text-white"
                : "bg-slate-100"
            }`}
          >
            رمز عبور
          </button>
        </div>

        {mode === "otp" ? (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="شماره موبایل"
              className="w-full rounded-xl border p-4 outline-none focus:border-red-500"
            />

            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition">
              ارسال کد تایید
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="ایمیل یا شماره موبایل"
              className="w-full rounded-xl border p-4 outline-none focus:border-red-500"
            />

            <input
              type="password"
              placeholder="رمز عبور"
              className="w-full rounded-xl border p-4 outline-none focus:border-red-500"
            />

            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition">
              ورود
            </button>

            <Link
              href="/forgot-password"
              className="block text-center text-red-600 font-bold"
            >
              فراموشی رمز عبور
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}