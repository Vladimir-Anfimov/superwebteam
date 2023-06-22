import { currentCharts } from "./filter_data.js";
import { coreRequestHandler } from "./requestHandler.js";
import { pin_download } from "./chart_download.js";

const deleteCurrentDiagrams = (main_id) => {
  const main = document.getElementById(main_id);
  const chartsToDelete = Array.from(main.querySelectorAll(".chart-container"));

  currentCharts.splice(0, currentCharts.length);

  chartsToDelete.forEach((chart) => chart.remove());
};

const drawNewDiagrams = (response) => {
  const data = response.data.getFavouriteCharts;
  let i = 1;

  for (let chart of data) {
    constructChart(chart, "chart" + i);
    i = i + 1;
  }
};

const constructChart = (chart, id) => {
  const main = document.getElementById("index-main");

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
  pinImg.src = "../static/images/unpin.png";
  pinImg.alt = "unpin";
  pinImg.classList.add("unpin-img");

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

  container.setAttribute("data-id", chart.id);

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
    // responsive: false,
    // animation: false,
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

const loadFavorites = async () => {
  deleteCurrentDiagrams("index-main");

  const body = {
    query: `
        query Query {
            getFavouriteCharts {
                id
                chartType
                labels
                datasets {
                  label
                  data
                }
            }
          }
        `,
    variables: {},
  };

  const response = await coreRequestHandler(body);

  drawNewDiagrams(response);

  //console.log(response);
};

loadFavorites();
