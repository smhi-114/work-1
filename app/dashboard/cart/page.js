"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function DashboardCartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [removing, setRemoving] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch("/api/user/cart");
      const data = await response.json();
      if (data.success) {
        setCart(data.items || []);
      }
    } catch (error) {
      console.error("خطا در دریافت سبد خرید:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    setUpdating(productId);
    try {
      const response = await fetch("/api/user/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await response.json();
      if (data.success) {
        fetchCart();
      } else {
        alert(data.error || "خطا در به‌روزرسانی");
      }
    } catch (error) {
      alert("خطا در ارتباط با سرور");
    } finally {
      setUpdating(null);
    }
  };

  const removeItem = async (productId) => {
    setRemoving(productId);
    try {
      const response = await fetch("/api/user/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();
      if (data.success) {
        fetchCart();
      } else {
        alert(data.error || "خطا در حذف");
      }
    } catch (error) {
      alert("خطا در ارتباط با سرور");
    } finally {
      setRemoving(null);
    }
  };

  const clearCart = async () => {
    if (!confirm("آیا از خالی کردن سبد خرید مطمئن هستید؟")) return;

    try {
      const response = await fetch("/api/user/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success) {
        fetchCart();
      } else {
        alert(data.error || "خطا");
      }
    } catch (error) {
      alert("خطا در ارتباط با سرور");
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
            <h1 className="text-2xl font-bold text-gray-900">سبد خرید</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {cart.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              سبد خرید خالی است
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              محصولاتی به سبد خرید خود اضافه کنید.
            </p>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                مشاهده محصولات
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="bg-white shadow rounded-lg p-4 flex items-center"
                >
                  <div className="flex-shrink-0">
                    <div className="h-20 w-20 bg-gray-200 rounded-lg flex items-center justify-center">
                      <svg
                        className="h-10 w-10 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.price.toLocaleString()} تومان
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      disabled={updating === item.productId}
                      className="p-1 rounded border hover:bg-gray-100 disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      disabled={updating === item.productId}
                      className="p-1 rounded border hover:bg-gray-100 disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      {(item.price * item.quantity).toLocaleString()} تومان
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    disabled={removing === item.productId}
                    className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg p-6 sticky top-4">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  خلاصه سفارش
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">تعداد آیتم‌ها</span>
                    <span className="font-medium">{cartCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">جمع کل</span>
                    <span className="font-medium">
                      {cartTotal.toLocaleString()} تومان
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold text-gray-900">
                        مبلغ قابل پرداخت
                      </span>
                      <span className="font-bold text-indigo-600">
                        {cartTotal.toLocaleString()} تومان
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <Link
                    href="/checkout"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    تکمیل سفارش
                  </Link>
                  <button
                    onClick={clearCart}
                    className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    خالی کردن سبد خرید
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
