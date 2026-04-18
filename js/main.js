import { AuthBtn, Navbar, ProfileUser } from "./components/navbarMenu.js";
import { ProductCard } from "./components/productCard.js";
import { getProducts, products, seedProducts } from "./data.js";
import {
  auth,
  db,
  doc,
  getDoc,
  onAuthStateChanged,
} from "./firebase/firebaseConfig.js";
import { loginUser, registerUser } from "./services/auth.js";
import { logout } from "./auth/logout.js";

// navbar
const navbar = document.getElementById("navbar");
navbar ? (navbar.innerHTML = Navbar()) : "";

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

// product page
const pro = document.getElementById("pro");
const loadMoreBtn = document.getElementById("loadMoreBtn");

if (pro) {
  const ITEMS_PER_PAGE = 8; // Số sản phẩm mỗi lần load
  let currentIndex = 0;
  let allProducts = [];

  // Hiển thị loading
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

  // Render thêm sản phẩm
  const renderProducts = () => {
    const nextProducts = allProducts.slice(
      currentIndex,
      currentIndex + ITEMS_PER_PAGE,
    );

    // Nếu lần đầu thì xóa loading, các lần sau thì append thêm
    if (currentIndex === 0) {
      pro.innerHTML = "";
    }

    nextProducts.forEach((product) => {
      pro.innerHTML += ProductCard(product);
    });

    currentIndex += ITEMS_PER_PAGE;

    // Ẩn nút nếu đã load hết
    if (currentIndex >= allProducts.length) {
      loadMoreBtn.style.display = "none";

      // Hiện thông báo đã hết sản phẩm
      const endMsg = document.createElement("p");
      endMsg.className = "text-center text-muted mt-3 w-100";
      endMsg.textContent = "✅ Đã hiển thị tất cả sản phẩm!";
      loadMoreBtn.parentElement.appendChild(endMsg);
    } else {
      loadMoreBtn.style.display = "block";
    }
  };

  // Lần đầu load
  showLoading();
  getProducts().then((data) => {
    if (data.length === 0) {
      pro.innerHTML = `
        <div class="text-center w-100 py-5">
          <p class="text-muted fs-5">Không có sản phẩm nào!</p>
        </div>
      `;
      loadMoreBtn.style.display = "none";
      return;
    }

    allProducts = data;
    renderProducts();
  });

  // Click Load More
  loadMoreBtn?.addEventListener("click", () => {
    // Hiệu ứng loading cho nút
    loadMoreBtn.disabled = true;
    loadMoreBtn.innerHTML = `
      <span class="spinner-border spinner-border-sm me-2" role="status"></span>
      Đang tải...
    `;

    setTimeout(() => {
      renderProducts();
      loadMoreBtn.disabled = false;
      loadMoreBtn.innerHTML = "Xem thêm sản phẩm";
    }, 500); // Delay 0.5s cho đẹp
  });
}

registerUser();
loginUser();
seedProducts();
