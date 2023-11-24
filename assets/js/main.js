let navbarIcon = document.querySelector(".navbar__dropdown__icon");
let dropDownMenu = document.querySelector(".navbar__dropdown-menu");
let navbar = document.querySelector(".navbar");

navbarIcon.addEventListener("click", function () {
  dropDownMenu.classList.toggle("display");
  navbar.classList.toggle("navbar-open");
});
