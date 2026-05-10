// User Order Detail API Route
// Get specific order details or cancel order

import { getOrderById, cancelOrder } from "@/lib/models/Order.js";
import { getUserFromToken } from "@/lib/session.js";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return Response.json({ error: "کاربر وارد نشده است" }, { status: 401 });
    }

    const { id } = params;
    const order = await getOrderById(id);

    if (!order) {
      return Response.json({ error: "سفارش یافت نشد" }, { status: 404 });
    }

    // Check if order belongs to user
    if (order.userId.toString() !== user.userId.toString()) {
      return Response.json({ error: "دسترسی غیرمجاز" }, { status: 403 });
    }

    return Response.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("خطا در دریافت سفارش:", error);
    return Response.json({ error: "خطا در سیستم" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return Response.json({ error: "کاربر وارد نشده است" }, { status: 401 });
    }

    const { id } = params;
    const { status } = await req.json();

    const order = await getOrderById(id);

    if (!order) {
      return Response.json({ error: "سفارش یافت نشد" }, { status: 404 });
    }

    // Check if order belongs to user
    if (order.userId.toString() !== user.userId.toString()) {
      return Response.json({ error: "دسترسی غیرمجاز" }, { status: 403 });
    }

    // Only allow cancelling pending orders
    if (order.status !== "pending") {
      return Response.json(
        { error: "فقط سفارشات در انتظار می‌توانند لغو شوند" },
        { status: 400 }
      );
    }

    const success = await cancelOrder(id);

    if (success) {
      return Response.json({
        success: true,
        message: "سفارش با موفقیت لغو شد",
      });
    } else {
      return Response.json({ error: "خطا در لغو سفارش" }, { status: 500 });
    }
  } catch (error) {
    console.error("خطا در لغو سفارش:", error);
    return Response.json({ error: "خطا در سیستم" }, { status: 500 });
  }
}
