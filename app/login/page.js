"use client";

import { useState } from "react";

export default function LoginPage() {
  const [mode, setMode] = useState("login");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!phone || !password) {
      setError("لطفاً شماره موبایل و رمز عبور را وارد کنید");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("ورود با موفقیت انجام شد");
        // Store token in cookies
        if (data.token) {
          document.cookie = `auth_token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}; HttpOnly; SameSite=Lax`;
        }
        // Redirect to home page after 1.5 seconds
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        setError(data.error || "خطا در ورود");
      }
    } catch (err) {
      setError("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!phone) {
      setError("لطفاً شماره موبایل را وارد کنید");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (response.ok) {
        setMode("otp");
        setSuccess("کد تایید ارسال شد");
      } else {
        setError(data.error || "خطا در ارسال کد تایید");
      }
    } catch (err) {
      setError("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp) {
      setError("لطفاً کد تایید را وارد کنید");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("کد تایید صحیح است");
        // Store token in cookies
        if (data.token) {
          document.cookie = `auth_token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}; HttpOnly; SameSite=Lax`;
        }
        // Redirect to home page after 1.5 seconds
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        setError(data.error || "کد تایید نامعتبر است");
      }
    } catch (err) {
      setError("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">ورود به حساب</h1>

        {/* LOGIN FORM */}
        {mode === "login" && (
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="tel"
              placeholder="شماره موبایل"
              className="w-full border rounded-lg px-4 py-3"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              dir="ltr"
            />

            <input
              type="password"
              placeholder="رمز عبور"
              className="w-full border rounded-lg px-4 py-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "در حال پردازش..." : "ورود"}
            </button>

            <button
              type="button"
              onClick={handleSendOtp}
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
              onClick={() => setMode("register")}
              className="text-sm text-gray-500 w-full"
            >
              ثبت‌نام نکرده‌اید؟ ثبت‌نام کنید
            </button>
          </form>
        )}

        {/* OTP FORM */}
        {mode === "otp" && (
          <form className="space-y-4" onSubmit={handleVerifyOtp}>
            <input
              type="tel"
              placeholder="شماره موبایل"
              className="w-full border rounded-lg px-4 py-3"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              dir="ltr"
            />

            <input
              type="text"
              placeholder="کد تایید ۶ رقمی"
              className="w-full border rounded-lg px-4 py-3"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
              dir="ltr"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "در حال پردازش..." : "تایید کد"}
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

        {/* FORGOT PASSWORD */}
        {mode === "forgot" && (
          <form className="space-y-4" onSubmit={handleSendOtp}>
            <input
              type="tel"
              placeholder="شماره موبایل"
              className="w-full border rounded-lg px-4 py-3"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              dir="ltr"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "در حال پردازش..." : "ارسال کد بازیابی"}
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

        {/* REGISTER */}
        {mode === "register" && (
          <form
            className="space-y-4"
            onSubmit={(e) => (window.location.href = "/register")}
          >
            <button
              type="button"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg"
            >
              ثبت‌نام کنید
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

        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}
      </div>
    </div>
  );
}
