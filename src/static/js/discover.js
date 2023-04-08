const ctx1 = document.getElementById("lineChart");

new Chart(ctx1, {
  type: "line",
  data: {
    labels: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Noiembrie", "Octombrie", "Decembrie"],
    datasets: [
      {
        label: "Arad",
        data: [1666, 2669, 2623, 2356, 2642, 2301, 2311, 2378, 2354, 2348, 2357, 2178],
        borderColor: "red",
      },
      {
        label: "Botosani",
        data: [2896, 2855, 2826, 2965, 2833, 3084, 2226, 3361, 3323, 3305, 3376, 3384],
        borderColor: "rgb(60,174,230,0.7)",
      },
      {
        label: "Bacau",
        data: [6850, 6623, 6610, 6212, 6431, 6163, 5969, 5862, 5396, 5277, 5359, 5337],
        borderColor: "green",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Grafic pentru compararea numarului somerilor din anumite judete din Romania pe anul 2022",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const ctx2 = document.getElementById("barChart");

new Chart(ctx2, {
  type: "bar",
  data: {
    labels: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Noiembrie", "Octombrie", "Decembrie"],
    datasets: [
      {
        label: "Barbati",
        data: [126965, 126623, 124382, 119481, 121095, 118697, 118164, 118116, 118915, 122141, 125715, 127122],
        borderWidth: 1,
        backgroundColor: "rgb(60,174,230,1)",
      },
      {
        label: "Femei",
        data: [107107, 106252, 105906, 103167, 103725, 104015, 105316, 105928, 106509, 109727, 112797, 111942],
        borderWidth: 1,
        backgroundColor: "pink",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Grafic pentru compararea numarului total de someri femei vs barbati pe fiecare luna a anului 2022",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const ctx3 = document.getElementById("pieChart");

new Chart(ctx3, {
  type: "pie",
  data: {
    labels: ["sub 25", "25-29", "30-39", "40-49", "50-55", "peste 55"],
    datasets: [
      {
        label: "Numar total someri pe categorii de varsta",
        data: [32672,17658,37643,59293,47295,47502],
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Grafic pentru reprezentarea somerilor din Romania pe categoria de varsta, luna ianuarie, anul 2023",
      },
    },
  },
});
