import { counties } from "../common/filter_data.js";
import { criteria, chosen } from "../common/filter_data.js";
import { compatibility, getCompatibilityMap } from "../common/filter_data.js";
import { coreRequestHandler } from "../common/requestHandler.js";
import { pin_download } from "../common/chart_download.js";
import { currentCharts } from "../common/filter_data.js";

const filterButton = document.getElementById("filter-button");

filterButton.addEventListener("click", function (event) {
  //event.preventDefault();
  const startDate = document.getElementById("start").value;
  const endDate = document.getElementById("end").value;
  const message = document.getElementById("filter-message");

  message.textContent = "";

  // console.log(counties);
  // console.log(startDate + "-01");
  // console.log(endDate + "-01");
  // console.log(chosen.map((x) => criteria[x]));

  if (counties.length == 0) {
    message.textContent = "Choose at least one county!";
    return;
  }

  if (chosen.length == 0) {
    message.textContent = "Choose at least one metric!";
    return;
  }

  if (startDate > endDate) {
    message.textContent = "The start date given is bigger than the end date!";
    return;
  }

  if (counties.length == 1 && endDate == startDate && chosen.length == 1) {
    message.textContent = "Can't be represented as a chart!";
    return;
  }

  if (counties.length > 1 && chosen.length > 1) {
    message.textContent = "Can't be represented as a chart!";
    return;
  }

  makeCharts(startDate + "-01", endDate + "-01");
});

const makeCharts = async (startDate, endDate) => {
  const input = {
    counties: counties.map((x) => parseInt(x)),
    startDate: startDate,
    endDate: endDate,
    criteria: chosen.map((x) => criteria[x]),
  };

  // console.log(input);

  const body = {
    query: `
      query GetCharts($input: ChartsInput) {
        getCharts(input: $input) {
          chartType,
          labels,
          datasets {
            label,
            data
          }
        }
      }
    `,
    variables: {
      input,
    },
  };

  const response = await coreRequestHandler(body);

  deleteCurrentDiagrams("main");
  drawNewDiagrams(response);
};

const deleteCurrentDiagrams = (main_id) => {
  const main = document.getElementById(main_id);
  const chartsToDelete = Array.from(main.querySelectorAll(".chart-container"));

  currentCharts.splice(0, currentCharts.length);

  chartsToDelete.forEach((chart) => chart.remove());
};

const drawNewDiagrams = (response) => {
  console.log(response);
  const data = response.data.getCharts;
  let i = 1;

  for (let chart of data) {
    constructChart(chart, "chart" + i);
    i = i + 1;
  }
};

const constructChart = (chart, id) => {
  const container = document.createElement("div");
  container.classList.add("chart-container", "content");

  const canvas_container = document.createElement("div");
  canvas_container.classList.add("canvas-container");

  const canvas = document.createElement("canvas");
  canvas.id = id;

  canvas_container.appendChild(canvas);

  container.appendChild(canvas_container);

  const pin_container = document.createElement("div");
  pin_container.classList.add("pin-container");
  pin_container.id = "p" + id;

  const pinImg = document.createElement("img");
  pinImg.src = "../static/images/pin.png";
  pinImg.alt = "pin";
  pinImg.classList.add("pin-img");

  const downloadPdfImg = document.createElement("img");
  downloadPdfImg.src = "../static/images/pdf.png";
  downloadPdfImg.alt = "download-pdf";
  downloadPdfImg.classList.add("down-pdf");

  const downloadCsvImg = document.createElement("img");
  downloadCsvImg.src = "../static/images/csv.png";
  downloadCsvImg.alt = "download-csv";
  downloadCsvImg.classList.add("down-csv");

  const downloadSvgImg = document.createElement("img");
  downloadSvgImg.src = "../static/images/svg.png";
  downloadSvgImg.alt = "download-svg";
  downloadSvgImg.classList.add("down-svg");

  pin_container.appendChild(pinImg);
  pin_container.appendChild(downloadPdfImg);
  pin_container.appendChild(downloadCsvImg);
  pin_container.appendChild(downloadSvgImg);

  container.appendChild(pin_container);

  main.appendChild(container);

  useChartJsToDraw(pin_container, chart, id);
};

const useChartJsToDraw = (pin_container, chart, id) => {
  const ctx = document.getElementById(id);

  //console.log(ctx);

  const bgColor = {
    id: "bgColor",
    beforeDraw: (chart, options) => {
      const { ctx, width, height } = chart;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    },
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "",
      },
    },
  };

  const chartInfo = {
    type: chart.chartType,
    data: {
      labels: chart.labels,
      datasets: chart.datasets,
    },
    options: options,
    plugins: [bgColor],
  };

  currentCharts.push(chartInfo);

  const drawnChart = new Chart(ctx, chartInfo);

  pin_container.addEventListener("click", function (event) {
    pin_download(event, { labels: chart.labels, datasets: chart.datasets });
  });
};
