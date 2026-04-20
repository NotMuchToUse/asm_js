import { parsePrice } from "./parsePrice.js";

export const formatPrice = (price) => {
  const num = parsePrice(price);
  return num.toLocaleString("vi-VN");
};

// console.log(formatPrice("1231312312"));
