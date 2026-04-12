export const NavMenu = (nav, curr) => {
  return /*html*/ `
           <li class="nav-item">
              <a class="nav-link ${nav.link === curr ? "active" : ""}" aria-current="page" href="${nav.link}"
                >${nav.name}</a
              >
            </li>
        `;
};
