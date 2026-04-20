import { AuthBtn, Navbar, ProfileUser } from "./components/navbarMenu.js";
import { ProductCard } from "./components/productCard.js";
import { products } from "./data.js";
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

// pro ? (pro.innerHTML = products.map(ProductCard).join("")) : "";
const pro = document.getElementById("pro");
const loadMore = document.getElementById("loadMoreBtn");

let currIndex = 0;
const step = 3;

const renderProducts = () => {
  const slicePro = products.slice(currIndex, currIndex + step);

  console.log(slicePro);
  pro.innerHTML += slicePro.map(ProductCard).join(" ");

  currIndex += step;
  // console.log(currIndex);
  // console.log(step);

  if (currIndex >= products.length) {
    loadMore.style.display = "none";
  }
};

renderProducts();
loadMore.addEventListener("click", renderProducts);

registerUser();
loginUser();
// seedProducts();
