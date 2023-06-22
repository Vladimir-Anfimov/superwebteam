//import { createPngLink, createSvgLink, tweakLib } from "../common/export.js";
import { currentCharts } from "./filter_data.js";
import { coreRequestHandler } from "./requestHandler.js";

const pin_download = async (event, data) => {
  const button = event.target;
  const id = button.parentNode.id.substring(1);

  if (button.classList.contains("down-pdf")) {
    downloadPDF(id);
  } else if (button.classList.contains("down-svg")) {
    downloadSVG(id);
  }
  if (button.classList.contains("down-csv")) {
    downloadCSV(data);
  } else if (button.classList.contains("pin-img")) {
    const index = id.substring(5);
    //console.log(index + " pinned");
    await pinChart(index - 1, button);
  } else if (button.classList.contains("unpin-img")) {
    const index = id.substring(5);
    console.log(index + " unpinned");
    await unpinChart(event.target.parentNode.parentNode, button);
  }
};

const unpinChart = async (chartToUnpin, button) => {
  await deleteFavoriteFromDb(parseInt(chartToUnpin.getAttribute("data-id")));
  button.src = "../static/images/pin.png";
  button.classList.remove("unpin-img");
  button.classList.add("pin-img");

  if (chartToUnpin.parentNode.id == "index-main") {
    chartToUnpin.remove();
  }
};

const pinChart = async (index, button) => {
  const chart = currentCharts[index];

  const iinput = {
    chartType: chart.type,
    labels: chart.data.labels,
    datasets: chart.data.datasets,
  };

  //console.log(JSON.stringify(iinput));

  const input = {
    content: JSON.stringify(iinput),
  };

  const body = {
    query: `
    mutation Mutation($input: FavouritesInput!) {
      insertFavourite(input: $input)
    }
    `,
    variables: {
      input,
    },
  };

  const response = await coreRequestHandler(body);

  if (response.errors) {
    console.log(response.errors[0].message);
  } else {
    console.log(response.data);
    document
      .getElementById("chart" + (index + 1).toString())
      .parentNode.parentNode.setAttribute(
        "data-id",
        response.data.insertFavourite
      );

    button.src = "../static/images/unpin.png";
    button.classList.remove("pin-img");
    button.classList.add("unpin-img");
  }
};

const deleteFavoriteFromDb = async (chartId) => {
  console.log(chartId);
  const input = chartId;

  const body = {
    query: `
    mutation Mutation($input: Int!) {
      deleteFavourite(input: $input)
    }
    `,
    variables: {
      input,
    },
  };

  const response = await coreRequestHandler(body);

  if (response.errors) {
    console.log(response.errors[0].message);
  }
};

const downloadPDF = (chart_id) => {
  const chart_canvas = document.getElementById(chart_id);

  const canvas_img = chart_canvas.toDataURL("image/jpeg", 1.0);

  let pdf = new jsPDF();

  pdf.setFontSize(20);
  pdf.addImage(canvas_img, "JPEG", 15, 15, 180, 150);
  pdf.save("test.pdf");
};

const downloadSVG = (chart_id) => {
  const canvas = document.getElementById(chart_id);

  const chartDataURL = canvas.toDataURL("image/png");

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("width", canvas.width);
  svg.setAttribute("height", canvas.height);

  const svgImage = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "image"
  );
  svgImage.setAttribute("x", "0");
  svgImage.setAttribute("y", "0");
  svgImage.setAttribute("width", canvas.width);
  svgImage.setAttribute("height", canvas.height);
  svgImage.setAttributeNS("http://www.w3.org/1999/xlink", "href", chartDataURL);

  svg.appendChild(svgImage);

  const serializer = new XMLSerializer();
  const svgXML = serializer.serializeToString(svg);

  const svgBlob = new Blob([svgXML], { type: "image/svg+xml" });

  const svgBlobURL = URL.createObjectURL(svgBlob);

  const downloadLink = document.createElement("a");
  downloadLink.href = svgBlobURL;
  downloadLink.download = "chart.svg";
  downloadLink.textContent = "Download Chart";

  document.body.appendChild(downloadLink);

  downloadLink.click();

  downloadLink.remove();

  URL.revokeObjectURL(svgBlobURL);
};

const downloadCSV = (data) => {
  console.log(data.datasets);
  let content = "label," + data.labels.join(",") + ",";
  let i = 0;

  while (i < data.datasets.length) {
    content = content + "\n" + data.datasets[i].label + ",";
    for (let j = 0; j < data.datasets[i].data.length; j++) {
      content = content + data.datasets[i].data[j] + ",";
    }
    i++;
  }

  const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${content}`);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "chart.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export { pin_download };
