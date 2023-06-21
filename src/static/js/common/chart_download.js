//import { createPngLink, createSvgLink, tweakLib } from "../common/export.js";

const pin_download = (event, data) => {
  const button = event.target;
  const id = button.parentNode.id.substring(1);
  if (button.classList.contains("down-img")) {
    downloadCSV(data);
  } else {
    console.log("pinned");
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

  URL.revokeObjectURL(svgBlobURL);
};

const downloadCSV = (data) => {
    console.log(data.datasets);
    let content = "label," + data.labels.join(',') + ",";
    let i = 0;

    while(i < data.datasets.length)
    {
        content = content + "\n" + data.datasets[i].label + ",";
        for (let j = 0; j < data.datasets[i].data.length; j++)
        {
            content = content + data.datasets[i].data[j] + ",";
        }
        i++;
    }

  const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${content}`);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", 'chart.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export { pin_download };
