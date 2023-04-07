/** @format */

const buttonTabOne = document.querySelector("#btn-tab-one");
const buttonTabTwo = document.querySelector("#btn-tab-two");
const buttonTabThree = document.querySelector("#btn-tab-three");

const tabOne = document.querySelector(".tab-one");
const tabTwo = document.querySelector(".tab-two");
const tabThree = document.querySelector(".tab-three");

tabTwo.classList.add("hidden");
tabThree.classList.add("hidden");

buttonTabOne.addEventListener("click", () => {
  tabOne.classList.remove("hidden");
  tabTwo.classList.add("hidden");
  tabThree.classList.add("hidden");
});

buttonTabTwo.addEventListener("click", () => {
  tabOne.classList.add("hidden");
  tabTwo.classList.remove("hidden");
  tabThree.classList.add("hidden");
});

buttonTabThree.addEventListener("click", () => {
  tabOne.classList.add("hidden");
  tabTwo.classList.add("hidden");
  tabThree.classList.remove("hidden");
});
