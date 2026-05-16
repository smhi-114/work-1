"use client";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-black text-center mb-2">
          بازیابی رمز عبور
        </h1>

        <p className="text-sm text-slate-500 text-center mb-8">
          شماره موبایل یا ایمیل خود را وارد کنید
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="شماره موبایل یا ایمیل"
            className="w-full rounded-xl border p-4 outline-none focus:border-red-500"
          />

          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition">
            ارسال لینک بازیابی
          </button>
        </div>
      </div>
    </div>
  );
}