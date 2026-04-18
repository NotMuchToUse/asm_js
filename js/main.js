import { AuthBtn, Navbar, ProfileUser } from "./components/navbarMenu.js";
import { ProductCard } from "./components/productCard.js";
import { products, seedProducts } from "./data.js";
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
pro ? (pro.innerHTML = products.map(ProductCard).join("")) : "";

registerUser();
loginUser();
seedProducts();
