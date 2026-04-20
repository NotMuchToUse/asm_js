import { parsePrice } from "../utils/parsePrice.js";

const CART_KEY = "khangnq_pc11152_cart";

// Lấy
export const getCart = () => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

// Lưu
export const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// Thêm
export const addToCart = (product, quantity = 1) => {
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === product.id);
  console.log(existingItem);

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

// Xóa 1
export const removeFromCart = (productId) => {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.id !== productId);
  saveCart(updatedCart);
  return updatedCart;
};

// Cập nhật
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

// Xóa hết
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  return [];
};

// Tính tổng giá trị giỏ hàng
export const calculateTotal = () => {
  const cart = getCart();
  return cart.reduce(
    (total, item) => total + parsePrice(item.price) * item.quantity,
    0,
  );
};

// Đếm tổng số sản phẩm trong giỏ
export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};

// Cập nhật số lượng hiển thị ở navbar
export const updateCartBadge = () => {
  const badgeElement = document.getElementById("cartBadge");
  if (badgeElement) {
    const count = getCartCount();
    badgeElement.textContent = count;
    badgeElement.style.display = count > 0 ? "block" : "none";
  }
};
