/** @format */

const containerMap = document.querySelector("#container-map");
const containerDate = document.querySelector("#container-date");
const containerMetrics = document.querySelector("#container-metrics");

const buttonMap = document.querySelector("#show-map");
const buttonDate = document.querySelector("#show-date");
const buttonMetrics = document.querySelector("#show-metrics");

containerDate.classList.add("hidden");
containerMetrics.classList.add("hidden");

buttonMap.addEventListener("click", () => {
  containerMap.classList.remove("hidden");
  containerDate.classList.add("hidden");
  containerMetrics.classList.add("hidden");
});

buttonDate.addEventListener("click", () => {
  containerMap.classList.add("hidden");
  containerDate.classList.remove("hidden");
  containerMetrics.classList.add("hidden");
});

buttonMetrics.addEventListener("click", () => {
  containerMap.classList.add("hidden");
  containerDate.classList.add("hidden");
  containerMetrics.classList.remove("hidden");
});
