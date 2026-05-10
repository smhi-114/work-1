"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function DashboardProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/user/profile");
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
      } else {
        setError(data.error || "خطا در دریافت اطلاعات");
      }
    } catch (error) {
      setError("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: e.target.name.value,
          email: e.target.email.value,
          phone: e.target.phone.value,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        alert("اطلاعات با موفقیت بروزرسانی شد");
      } else {
        setError(data.error || "خطا در بروزرسانی");
      }
    } catch (error) {
      setError("خطا در ارتباط با سرور");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Link
              href="/dashboard"
              className="text-indigo-600 hover:text-indigo-700 mr-4"
            >
              ← بازگشت
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">پروفایل کاربری</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                نام
              </label>
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={user?.name || ""}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                ایمیل
              </label>
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={user?.email || ""}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                شماره موبایل
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                defaultValue={user?.phone || ""}
                dir="ltr"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={saving}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            اطلاعات حساب
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">نام کاربری</span>
              <span className="font-medium">{user?.name || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ایمیل</span>
              <span className="font-medium">{user?.email || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">شماره موبایل</span>
              <span className="font-medium">{user?.phone || "-"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
