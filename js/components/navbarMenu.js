import { navbarMenu } from "../data.js";

const curr = window.location.pathname;

export const NavMenu = (nav, curr) => {
  return /*html*/ `
           <li class="nav-item">
              <a class="nav-link ${nav.link === curr ? "active" : ""}" aria-current="page" href="${nav.link}"
                >${nav.name}</a
              >
            </li>
        `;
};

export const AuthBtn = () => {
  return /*html*/ `
    <button class="nav-item btn btn-secondary">
      <a class="nav-link" href="./signup.html">Đăng ký</a>
    </button>
    <button class="nav-item btn btn-primary">
      <a class="nav-link" href="./login.html">Đăng nhập</a>
    </button>
  `;
};

export const ProfileUser = (user, profile) => {
  const avatar =
    user?.photoURL || profile?.avatar || "https://i.pravatar.cc/40";

  const name = profile?.name || user?.email?.split("@")[0];

  return /*html*/ `
    <div class="d-flex align-items-center gap-2">
      <img 
        src="${avatar}" 
        class="rounded-circle border"
        width="40" 
        height="40"
        style="object-fit:cover;"
      />
      <span>${name}</span>
      <button id="logoutBtn" class="btn btn-sm btn-outline-danger">
        Logout
      </button>
    </div>
  `;
};

export const Navbar = () => {
  return /*html*/ `
    <div class="container">
      <a class="navbar-brand d-flex align-items-center" href="./home.html">
        <img src="./asset/logo-main.png" width="40" height="40" />
        BICHO
      </a>

      <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          ${navbarMenu.map((nav) => NavMenu(nav, curr)).join("")}
        </ul>
        <div class="ms-auto" id="authArea"></div>
      </div>
    </div>
  `;
};
