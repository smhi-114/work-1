// User Orders API Route
// Get user's orders

import {
  createOrder,
  getUserOrders,
} from "@/lib/models/Order.js";
import { getUserFromToken } from "@/lib/session.js";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return Response.json({ error: "کاربر وارد نشده است" }, { status: 401 });
    }

    const orders = await getUserOrders(user.userId);

    return Response.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("خطا در دریافت سفارش‌ها:", error);
    return Response.json({ error: "خطا در سیستم" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return Response.json({ error: "کاربر وارد نشده است" }, { status: 401 });
    }

    const { items, totalAmount } = await req.json();

    if (!items || items.length === 0) {
      return Response.json(
        { error: "آیتم‌های سفارش الزامی است" },
        { status: 400 }
      );
    }

    if (!totalAmount || totalAmount <= 0) {
      return Response.json({ error: "مبلغ کل نامعتبر است" }, { status: 400 });
    }

    const orderId = await createOrder(user.userId, items, totalAmount);

    return Response.json(
      {
        success: true,
        message: "سفارش با موفقیت ثبت شد",
        orderId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("خطا در ثبت سفارش:", error);
    return Response.json(
      { error: "خطا در سیستم، لطفاً دوباره تلاش کنید" },
      { status: 500 }
    );
  }
}
