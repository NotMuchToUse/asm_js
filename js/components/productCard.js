export const ProductCard = (product) => {
  return /*html*/ `
            <div class="card col-2" style="width: 18rem">
              <img
                src="${product.src}"
                class="card-img-top"
                alt="${product.alt}"
              />
              <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">
                  ${product.desc}
                </p>
                <p class="card-text fw-bold text-danger">${product.price} đ</p>
                <a href="./productDetail.html" class="btn btn-primary"
                  >Xem chi tiết</a
                >
              </div>
            </div>
        `;
};
