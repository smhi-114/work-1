// User Cart API Route
// Get, add, update, remove items from cart

import {
  getCart,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart,
  getCartItemCount,
  getCartTotal,
} from "@/lib/models/Cart.js";
import { getUserFromToken } from "@/lib/session.js";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return Response.json({ error: "کاربر وارد نشده است" }, { status: 401 });
    }

    const cart = await getCart(user.userId);

    if (!cart) {
      return Response.json({
        success: true,
        items: [],
        count: 0,
        total: 0,
      });
    }

    return Response.json({
      success: true,
      items: cart.items,
      count: cart.items.reduce((total, item) => total + item.quantity, 0),
      total: cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    });
  } catch (error) {
    console.error("خطا در دریافت سبد خرید:", error);
    return Response.json({ error: "خطا در سیستم" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return Response.json({ error: "کاربر وارد نشده است" }, { status: 401 });
    }

    const { productId, name, price, quantity = 1 } = await req.json();

    if (!productId || !name || !price) {
      return Response.json(
        { error: "اطلاعات محصول الزامی است" },
        { status: 400 }
      );
    }

    if (quantity <= 0) {
      return Response.json(
        { error: "تعداد باید بیشتر از 0 باشد" },
        { status: 400 }
      );
    }

    await addItemToCart(user.userId, {
      productId,
      name,
      price,
      quantity,
    });

    return Response.json({
      success: true,
      message: "محصول به سبد خرید اضافه شد",
    });
  } catch (error) {
    console.error("خطا در افزودن به سبد خرید:", error);
    return Response.json({ error: "خطا در سیستم" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return Response.json({ error: "کاربر وارد نشده است" }, { status: 401 });
    }

    const { productId, quantity } = await req.json();

    if (!productId) {
      return Response.json(
        { error: "شناسه محصول الزامی است" },
        { status: 400 }
      );
    }

    if (quantity === undefined || quantity <= 0) {
      // Remove item if quantity is 0 or less
      await removeItemFromCart(user.userId, productId);
      return Response.json({
        success: true,
        message: "محصول از سبد خرید حذف شد",
      });
    }

    const success = await updateItemQuantity(user.userId, productId, quantity);

    if (success) {
      return Response.json({
        success: true,
        message: "تعداد محصول بروزرسانی شد",
      });
    } else {
      return Response.json(
        { error: "محصول در سبد خرید یافت نشد" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("خطا در بروزرسانی سبد خرید:", error);
    return Response.json({ error: "خطا در سیستم" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return Response.json({ error: "کاربر وارد نشده است" }, { status: 401 });
    }

    const { productId } = await req.json();

    if (!productId) {
      // Clear entire cart
      await clearCart(user.userId);
      return Response.json({
        success: true,
        message: "سبد خرید خالی شد",
      });
    }

    const success = await removeItemFromCart(user.userId, productId);

    if (success) {
      return Response.json({
        success: true,
        message: "محصول از سبد خرید حذف شد",
      });
    } else {
      return Response.json(
        { error: "محصول در سبد خرید یافت نشد" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("خطا در حذف از سبد خرید:", error);
    return Response.json({ error: "خطا در سیستم" }, { status: 500 });
  }
}
