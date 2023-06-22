import { authTokenVerification } from "./common/requestHandler.js";

authTokenVerification();

const burgerButton = document.querySelector("#burger-icon");
const closeButton = document.querySelector(".sidebar-close");

burgerButton.addEventListener("click", toggleMenu);
closeButton.addEventListener("click", toggleMenu);

function toggleMenu() {
  console.log("clicked");
  const navMenu = document.querySelector("#sidebar-element");
  navMenu.classList.toggle("sidebar-active");
}
