"use client";

import { useState } from "react";

export default function Page() {
  const [mode, setMode] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">ورود به حساب</h1>

        {/* LOGIN FORM */}
        <form className="space-y-4" dir="rtl">
          <input
            type="text"
            placeholder="شماره موبایل"
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="password"
            placeholder="رمز عبور"
            className="w-full border rounded-lg px-4 py-3"
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg"
          >
            ارسال کد تایید
          </button>

          <button
            type="button"
            onClick={() => setMode("forgot")}
            className="text-sm text-gray-500 w-full"
          >
            فراموشی رمز عبور
          </button>

          <button
            type="button"
            onClick={() => setMode("login")}
            className="text-sm text-gray-500 w-full"
          >
            بازگشت به ورود
          </button>
        </form>

        {/* FORGOT PASSWORD */}
        {mode === "forgot" && (
          <form className="space-y-4" dir="rtl">
            <input
              type="text"
              placeholder="شماره موبایل"
              className="w-full border rounded-lg px-4 py-3"
            />

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg"
            >
              ارسال کد بازیابی
            </button>

            <button
              type="button"
              onClick={() => setMode("login")}
              className="text-sm text-gray-500 w-full"
            >
              بازگشت به ورود
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
