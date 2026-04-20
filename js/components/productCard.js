export const ProductCard = (product) => {
  return /*html*/ `
            <div class="card h-100" style="width: 18rem">
              <img
                src="${product.src}"
                class="card-img-top object-fit-cover"
                alt="${product.alt}"
                style="height: 200px;"
              />
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text flex-grow-1">
                  ${product.desc}
                </p>
                <p class="card-text fw-bold text-danger fs-5">${product.price} đ</p>
                <div class="d-flex gap-2 mt-auto">
                  <button class="btn btn-success flex-grow-1 add-to-cart-btn" data-product-id="${product.id}" data-product='${JSON.stringify(product)}'>
                    <i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ
                  </button>
                  <a href="./productDetail.html" class="btn btn-primary flex-grow-1"
                    >Chi tiết</a
                  >
                </div>
              </div>
            </div>
        `;
};
