/** @format */

const buttonTabs = {
  email: document.querySelector("#btn-tab-email"),
  password: document.querySelector("#btn-tab-password"),
};

const tabs = {
  email: document.querySelector(".tab-email"),
  password: document.querySelector(".tab-password"),
};

tabs.password.classList.add("hidden");

Object.keys(buttonTabs).forEach((key) => {
  buttonTabs[key].addEventListener("click", () => {
    Object.values(tabs).forEach((tab) => tab.classList.add("hidden"));

    tabs[key].classList.remove("hidden");
  });
});
