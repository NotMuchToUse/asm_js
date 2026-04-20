import { AuthBtn, Navbar, ProfileUser } from "./components/navbarMenu.js";
import { ProductCard } from "./components/productCard.js";
import { getProducts, seedProducts } from "./data.js";
import {
  auth,
  db,
  doc,
  getDoc,
  onAuthStateChanged,
} from "./firebase/firebaseConfig.js";
import { loginUser, registerUser } from "./services/auth.js";
import { logout } from "./auth/logout.js";
import { addToCart, updateCartBadge } from "./services/cart.js";

// ===========================
// NAVBAR
// ===========================
const navbar = document.getElementById("navbar");
navbar ? (navbar.innerHTML = Navbar()) : "";

// ===========================
// AUTH
// ===========================
const authArea = document.getElementById("authArea");
if (authArea) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const snap = await getDoc(doc(db, "users", user.uid));

      let profile = {};
      if (snap.exists()) profile = snap.data();
      authArea.innerHTML = ProfileUser(user, profile);

      const logoutBtn = document.getElementById("logoutBtn");
      logoutBtn?.addEventListener("click", logout);
    } else {
      authArea.innerHTML = AuthBtn();
    }
  });
}

// ===========================
// PRODUCT PAGE
// ===========================
const pro = document.getElementById("pro");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const loadMoreArea = document.getElementById("loadMoreArea");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const applyFilter = document.getElementById("applyFilter");
const resetFilter = document.getElementById("resetFilter");

if (pro) {
  const ITEMS_PER_PAGE = 8;
  let currentIndex = 0;
  let originalProducts = [];
  let filteredProducts = [];

  // ✅ Convert "85.000" → 85000
  const parsePrice = (price) => Number(price.replace(/\./g, ""));

  // ✅ Hiển thị loading
  const showLoading = () => {
    pro.innerHTML = `
      <div class="text-center w-100 py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Đang tải...</span>
        </div>
        <p class="mt-2 text-muted">Đang tải sản phẩm...</p>
      </div>
    `;
  };

  // ✅ Render sản phẩm
  const renderProducts = () => {
    const source = filteredProducts;
    const nextItems = source.slice(currentIndex, currentIndex + ITEMS_PER_PAGE);

    // Lần đầu xóa loading
    if (currentIndex === 0) {
      pro.innerHTML = "";
    }

    // Không có sản phẩm
    if (source.length === 0) {
      pro.innerHTML = `
        <div class="text-center w-100 py-5">
          <i class="fa-solid fa-box-open fa-3x text-muted mb-3"></i>
          <p class="text-muted fs-5">Không tìm thấy sản phẩm nào!</p>
        </div>
      `;
      if (loadMoreArea) loadMoreArea.style.display = "none";
      return;
    }

    // Render từng product
    nextItems.forEach((product) => {
      pro.innerHTML += ProductCard(product);
    });

    currentIndex += ITEMS_PER_PAGE;

    // Ẩn/hiện nút Load More
    if (loadMoreArea) loadMoreArea.style.display = "flex";

    if (currentIndex >= source.length) {
      loadMoreBtn.style.display = "none";

      // Thông báo hết sản phẩm
      const existed = document.getElementById("endMsg");
      if (!existed) {
        const endMsg = document.createElement("p");
        endMsg.id = "endMsg";
        endMsg.className = "text-muted mt-2";
        endMsg.textContent = "✅ Đã hiển thị tất cả sản phẩm!";
        loadMoreArea.appendChild(endMsg);
      }
    } else {
      loadMoreBtn.style.display = "block";
      const endMsg = document.getElementById("endMsg");
      if (endMsg) endMsg.remove();
    }

    // ✅ Gắn event listener cho nút "Thêm vào giỏ"
    attachCartEventListeners();
  };

  // ✅ Gắn event listener cho nút "Thêm vào giỏ"
  const attachCartEventListeners = () => {
    document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const productData = btn.dataset.product;
        if (productData) {
          const product = JSON.parse(productData);
          addToCart(product, 1);
          updateCartBadge();

          // Hiệu ứng feedback
          const originalText = btn.innerHTML;
          btn.innerHTML = '<i class="fa-solid fa-check"></i> Đã thêm!';
          btn.disabled = true;
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
          }, 1500);
        }
      });
    });
  };

  // ✅ Xử lý Search + Sort + Filter
  const processProducts = () => {
    let result = [...originalProducts];

    // 🔎 Search
    const keyword = searchInput?.value.trim().toLowerCase();
    if (keyword) {
      result = result.filter((p) => p.title.toLowerCase().includes(keyword));
    }

    // 🎯 Filter giá
    const priceValue = document.querySelector(
      "input[name='price']:checked",
    )?.value;

    if (priceValue === "low") {
      result = result.filter((p) => parsePrice(p.price) < 50000);
    } else if (priceValue === "mid") {
      result = result.filter((p) => {
        const price = parsePrice(p.price);
        return price >= 50000 && price <= 80000;
      });
    } else if (priceValue === "high") {
      result = result.filter((p) => parsePrice(p.price) > 80000);
    }

    // ⬆⬇ Sort
    if (sortSelect?.value === "asc") {
      result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortSelect?.value === "desc") {
      result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }

    filteredProducts = result;
    currentIndex = 0;
    renderProducts();
  };

  // ✅ Load data từ Firestore lần đầu
  showLoading();
  getProducts().then((data) => {
    if (data.length === 0) {
      pro.innerHTML = `
        <div class="text-center w-100 py-5">
          <i class="fa-solid fa-box-open fa-3x text-muted mb-3"></i>
          <p class="text-muted fs-5">Không có sản phẩm nào!</p>
        </div>
      `;
      if (loadMoreArea) loadMoreArea.style.display = "none";
      return;
    }

    originalProducts = data;
    filteredProducts = data;
    renderProducts();
  });

  // ✅ Load More
  loadMoreBtn?.addEventListener("click", () => {
    loadMoreBtn.disabled = true;
    loadMoreBtn.innerHTML = `
      <span class="spinner-border spinner-border-sm me-2" role="status"></span>
      Đang tải...
    `;
    setTimeout(() => {
      renderProducts();
      loadMoreBtn.disabled = false;
      loadMoreBtn.innerHTML = "Xem thêm sản phẩm";
    }, 500);
  });

  // ✅ Search realtime
  searchInput?.addEventListener("input", processProducts);

  // ✅ Sort
  sortSelect?.addEventListener("change", processProducts);

  // ✅ Áp dụng Filter
  applyFilter?.addEventListener("click", processProducts);

  // ✅ Reset Filter
  resetFilter?.addEventListener("click", () => {
    const priceAll = document.getElementById("priceAll");
    if (priceAll) priceAll.checked = true;
    if (sortSelect) sortSelect.value = "all";
    if (searchInput) searchInput.value = "";
    processProducts();
  });
}

// ===========================
// AUTH SERVICES
// ===========================
registerUser();
loginUser();

// ✅ Cập nhật cart badge khi page load
updateCartBadge();

// ⚠️ Chỉ chạy 1 lần để seed data, sau đó comment lại!
// seedProducts();
