// Database Models Export

export {
  createUser,
  findUserByPhone,
  findUserByEmail,
  findUserById,
  updateUser,
  deleteUser,
  getAllUsers,
} from "./User.js";
export {
  createOtp,
  findOtpByPhone,
  verifyOtp,
  deleteOtp,
  cleanupExpiredOtps,
} from "./Otp.js";
export {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getUserOrderCount,
  getAllOrders,
} from "./Order.js";
export {
  getCart,
  createCart,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart,
  getCartItemCount,
  getCartTotal,
} from "./Cart.js";
