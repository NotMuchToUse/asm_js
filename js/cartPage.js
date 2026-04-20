import { Navbar } from "./components/navbarMenu.js";
import {
  getCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  calculateTotal,
  formatPrice,
  getCartCount,
} from "./services/cart.js";

// ===========================
// NAVBAR
// ===========================
const navbar = document.getElementById("navbar");
navbar ? (navbar.innerHTML = Navbar()) : "";

// ===========================
// CART PAGE
// ===========================
const cartItemsContainer = document.getElementById("cartItems");
const emptyMessage = document.getElementById("emptyMessage");
const totalItemsEl = document.getElementById("totalItems");
const totalQuantityEl = document.getElementById("totalQuantity");
const totalPriceEl = document.getElementById("totalPrice");
const clearCartBtn = document.getElementById("clearCartBtn");
const checkoutBtn = document.getElementById("checkoutBtn");

// ✅ Parse giá tiền
const parsePrice = (price) => {
  if (typeof price === "number") return price;
  return Number(price.replace(/\./g, ""));
};

// ✅ Render giỏ hàng
const renderCart = () => {
  const cart = getCart();

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <i class="fa-solid fa-bag-shopping fa-4x text-muted mb-3"></i>
        <p class="text-muted fs-5">Giỏ hàng của bạn đang trống</p>
        <p class="text-muted">Hãy thêm một số sản phẩm để tiếp tục</p>
      </div>
    `;
    emptyMessage.style.display = "block";
    totalItemsEl.textContent = "0";
    totalQuantityEl.textContent = "0";
    totalPriceEl.textContent = "0 đ";
    checkoutBtn.disabled = true;
    clearCartBtn.disabled = true;
    return;
  }

  emptyMessage.style.display = "none";
  checkoutBtn.disabled = false;
  clearCartBtn.disabled = false;

  let cartHTML = '<div class="list-group">';

  cart.forEach((item) => {
    const itemTotal = parsePrice(item.price) * item.quantity;
    cartHTML += `
      <div class="list-group-item cart-item border-0 border-bottom py-3">
        <div class="row align-items-center">
          <!-- Product Image -->
          <div class="col-md-2 text-center">
            <img 
              src="${item.src}" 
              alt="${item.title}" 
              class="img-thumbnail" 
              style="width: 100px; height: 100px; object-fit: cover;"
            />
          </div>

          <!-- Product Info -->
          <div class="col-md-3">
            <h6 class="mb-1">${item.title}</h6>
            <p class="text-danger fw-bold mb-0">${item.price} đ</p>
          </div>

          <!-- Quantity Control -->
          <div class="col-md-3">
            <div class="quantity-control">
              <button 
                class="btn btn-sm btn-outline-secondary qty-decrease" 
                data-product-id="${item.id}"
              >
                <i class="fa-solid fa-minus"></i>
              </button>
              <input 
                type="number" 
                class="form-control qty-input" 
                value="${item.quantity}" 
                min="1" 
                max="100"
                data-product-id="${item.id}"
              />
              <button 
                class="btn btn-sm btn-outline-secondary qty-increase" 
                data-product-id="${item.id}"
              >
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>

          <!-- Subtotal -->
          <div class="col-md-2 text-end">
            <div class="text-primary fw-bold">${formatPrice(itemTotal)} đ</div>
            <small class="text-muted">x${item.quantity}</small>
          </div>

          <!-- Delete Button -->
          <div class="col-md-2 text-center">
            <button 
              class="btn btn-sm btn-outline-danger remove-btn" 
              data-product-id="${item.id}"
            >
              <i class="fa-solid fa-trash"></i> Xóa
            </button>
          </div>
        </div>
      </div>
    `;
  });

  cartHTML += "</div>";
  cartItemsContainer.innerHTML = cartHTML;

  // ✅ Cập nhật tóm tắt
  updateSummary();

  // ✅ Event listeners
  attachEventListeners();
};

// ✅ Cập nhật tóm tắt
const updateSummary = () => {
  const cart = getCart();
  const totalItems = cart.length;
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = calculateTotal();

  totalItemsEl.textContent = totalItems;
  totalQuantityEl.textContent = totalQuantity;
  totalPriceEl.textContent = formatPrice(total) + " đ";
};

// ✅ Gắn event listeners
const attachEventListeners = () => {
  // Xóa sản phẩm
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = btn.dataset.productId;
      if (confirm("Bạn chắc chắn muốn xóa sản phẩm này?")) {
        removeFromCart(productId);
        renderCart();
      }
    });
  });

  // Tăng số lượng
  document.querySelectorAll(".qty-increase").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.productId;
      const input = document.querySelector(
        `.qty-input[data-product-id="${productId}"]`,
      );
      const newQty = parseInt(input.value) + 1;
      updateCartQuantity(productId, newQty);
      renderCart();
    });
  });

  // Giảm số lượng
  document.querySelectorAll(".qty-decrease").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.productId;
      const input = document.querySelector(
        `.qty-input[data-product-id="${productId}"]`,
      );
      const newQty = parseInt(input.value) - 1;
      if (newQty > 0) {
        updateCartQuantity(productId, newQty);
        renderCart();
      }
    });
  });

  // Cập nhật từ input
  document.querySelectorAll(".qty-input").forEach((input) => {
    input.addEventListener("change", () => {
      const productId = input.dataset.productId;
      const newQty = parseInt(input.value);
      if (newQty > 0) {
        updateCartQuantity(productId, newQty);
        renderCart();
      }
    });
  });
};

// ✅ Xóa toàn bộ giỏ
clearCartBtn.addEventListener("click", () => {
  if (confirm("Bạn chắc chắn muốn xóa toàn bộ giỏ hàng?")) {
    clearCart();
    renderCart();
  }
});

// ✅ Thanh toán
checkoutBtn.addEventListener("click", () => {
  const total = calculateTotal();
  const cart = getCart();

  if (cart.length === 0) {
    alert("Giỏ hàng của bạn đang trống!");
    return;
  }

  const itemsList = cart
    .map((item) => `- ${item.title} x${item.quantity}`)
    .join("\n");
  const message = `📦 ĐƠN HÀNG CỦA BẠN:\n\n${itemsList}\n\n💰 Tổng tiền: ${formatPrice(total)} đ\n\nCảm ơn đã mua hàng tại BICHO Coffee!`;

  alert(message);

  // Có thể redirect sang trang thanh toán hoặc xóa giỏ
  clearCart();
  renderCart();
});

// ✅ Khởi tạo khi load trang
renderCart();
