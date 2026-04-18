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
                <a href="./productDetail.html" class="btn btn-primary mt-auto"
                  >Xem chi tiết</a
                >
              </div>
            </div>
        `;
};
