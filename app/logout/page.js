"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear the auth token cookie
    document.cookie = "auth_token=; path=/; max-age=0";

    // Redirect to login page after 1 second
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <h1 className="text-xl font-medium text-gray-900">در حال خروج...</h1>
      </div>
    </div>
  );
}
