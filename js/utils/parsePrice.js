export const parsePrice = (price) => {
  if (typeof price === "number") return price;
  return Number(price.replace(/\./g, ""));
};

// console.log(parsePrice("123123"));
