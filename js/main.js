import { NavMenu } from "./components/navbarMenu.js";
import { ProductCard } from "./components/productCard.js";
import { navbarMenu, products } from "./data.js";

// navbar
const curr = window.location.pathname;
// console.log(curr);
const navMenu = document.getElementById("navMenu");
navMenu.innerHTML = navbarMenu.map((nav) => NavMenu(nav, curr)).join("");

// product page
const pro = document.getElementById("pro");
pro.innerHTML = products.map(ProductCard).join("");
