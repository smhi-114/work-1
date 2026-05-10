// Database Models Export

export {
  createUser,
  findUserByPhone,
  findUserByEmail,
  findUserById,
  updateUser,
  deleteUser,
  getAllUsers,
} from "@/lib/models/User.js";
export {
  createOtp,
  findOtpByPhone,
  verifyOtp,
  deleteOtp,
  cleanupExpiredOtps,
} from "@/lib/models/Otp.js";
export {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getUserOrderCount,
  getAllOrders,
} from "@/lib/models/Order.js";
export {
  getCart,
  createCart,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart,
  getCartItemCount,
  getCartTotal,
} from "@/lib/models/Cart.js";
