import { productCard } from "./components/productCard.js";
import { products } from "./data.js";

// product page
const pro = document.getElementById("pro");
pro.innerHTML = products.map(productCard).join("");
