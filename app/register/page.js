"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.phone) {
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
        body: JSON.stringify({ phone: formData.phone }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
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

  const register = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !formData.name ||
      !formData.phone ||
      !formData.password ||
      !formData.otp
    ) {
      setError("لطفاً تمام فیلدها را پر کنید");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          password: formData.password,
          otp: formData.otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("ثبت‌نام با موفقیت انجام شد");
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setError(data.error || "خطا در ثبت‌نام");
      }
    } catch (err) {
      setError("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            ثبت‌نام در سایت
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            یا{" "}
            {otpSent
              ? "کد تایید خود را وارد کنید"
              : "یک حساب کاربری جدید بسازید"}
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        <form
          className="mt-8 space-y-6"
          onSubmit={otpSent ? register : sendOtp}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                نام
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="نام کامل"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="phone" className="sr-only">
                شماره موبایل
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="شماره موبایل"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {otpSent && (
              <div>
                <label htmlFor="otp" className="sr-only">
                  کد تایید (OTP)
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  maxLength="6"
                  className="appearance-none rounded-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="کد تایید ۶ رقمی"
                  value={formData.otp}
                  onChange={handleChange}
                />
              </div>
            )}

            <div>
              <label htmlFor="password" className="sr-only">
                رمز عبور
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="رمز عبور"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "در حال پردازش..."
                : otpSent
                  ? "ثبت‌نام"
                  : "ارسال کد تایید"}
            </button>
          </div>

          <div className="text-center">
            <a
              href="/login"
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              قبلاً ثبت‌نام کرده‌اید؟ وارد شوید
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
