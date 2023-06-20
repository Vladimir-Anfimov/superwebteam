/** @format */

const burgerButton = document.querySelector("#burger-icon");
const closeButton = document.querySelector(".sidebar-close");

burgerButton.addEventListener("click", toggleMenu);
closeButton.addEventListener("click", toggleMenu);

function toggleMenu() {
  console.log("clicked");
  const navMenu = document.querySelector("#sidebar-element");
  navMenu.classList.toggle("sidebar-active");
}

// const ctx2 = document.getElementById("barChart");

// new Chart(ctx2, {
//   type: "bar",
//   data: {
//     labels: [
//       "Ianuarie",
//       "Februarie",
//       "Martie",
//       "Aprilie",
//       "Mai",
//       "Iunie",
//       "Iulie",
//       "August",
//       "Septembrie",
//       "Noiembrie",
//       "Octombrie",
//       "Decembrie",
//     ],
//     datasets: [
//       {
//         label: "Barbati",
//         data: [
//           126965, 126623, 124382, 119481, 121095, 118697, 118164, 118116,
//           118915, 122141, 125715, 127122,
//         ],
//         borderWidth: 1,
//         backgroundColor: "rgb(60,174,230,1)",
//       },
//       {
//         label: "Femei",
//         data: [
//           107107, 106252, 105906, 103167, 103725, 104015, 105316, 105928,
//           106509, 109727, 112797, 111942,
//         ],
//         borderWidth: 1,
//         backgroundColor: "pink",
//       },
//     ],
//   },
//   options: {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       title: {
//         display: true,
//         text: "Grafic pentru compararea numarului total de someri femei vs barbati pe fiecare luna a anului 2022",
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   },
// });
