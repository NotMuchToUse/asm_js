// ===========================
// CART SERVICE
// ===========================

const CART_KEY = "khangnq_cart";

// ✅ Lấy giỏ hàng từ localStorage
export const getCart = () => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

// ✅ Lưu giỏ hàng vào localStorage
const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// ✅ Thêm sản phẩm vào giỏ
export const addToCart = (product, quantity = 1) => {
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      src: product.src,
      quantity: quantity,
    });
  }

  saveCart(cart);
  return cart;
};

// ✅ Xóa sản phẩm khỏi giỏ
export const removeFromCart = (productId) => {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.id !== productId);
  saveCart(updatedCart);
  return updatedCart;
};

// ✅ Cập nhật số lượng sản phẩm
export const updateCartQuantity = (productId, quantity) => {
  const cart = getCart();
  const item = cart.find((item) => item.id === productId);

  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    item.quantity = quantity;
  }

  saveCart(cart);
  return cart;
};

// ✅ Xóa toàn bộ giỏ hàng
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  return [];
};

// ✅ Tính tổng tiền (chuyển price string thành number)
const parsePrice = (price) => {
  if (typeof price === "number") return price;
  return Number(price.replace(/\./g, ""));
};

// ✅ Tính tổng giá trị giỏ hàng
export const calculateTotal = () => {
  const cart = getCart();
  return cart.reduce(
    (total, item) => total + parsePrice(item.price) * item.quantity,
    0,
  );
};

// ✅ Format giá tiền (85000 → 85.000)
export const formatPrice = (price) => {
  const num = parsePrice(price);
  return num.toLocaleString("vi-VN");
};

// ✅ Đếm tổng số sản phẩm trong giỏ
export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};

// ✅ Cập nhật số lượng hiển thị ở navbar
export const updateCartBadge = () => {
  const badgeElement = document.getElementById("cartBadge");
  if (badgeElement) {
    const count = getCartCount();
    badgeElement.textContent = count;
    badgeElement.style.display = count > 0 ? "block" : "none";
  }
};
