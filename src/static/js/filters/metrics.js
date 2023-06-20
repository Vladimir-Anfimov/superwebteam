import { counties } from "../common/filter_data.js";
import { criteria, chosen } from "../common/filter_data.js";
import { compatibility, getCompatibilityMap } from "../common/filter_data.js";
import { coreRequestHandler } from "../common/requestHandler.js";

const filterButton = document.getElementById("filter-button");

filterButton.addEventListener("click", function (event) {
  //event.preventDefault();
  const startDate = document.getElementById("start").value;
  const endDate = document.getElementById("end").value;
  const message = document.getElementById("filter-message");

  message.textContent = "";

  console.log(counties);
  console.log(startDate + "-01");
  console.log(endDate + "-01");
  console.log(chosen.map((x) => criteria[x]));

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
    counties: counties.map(x => parseInt(x)),
    startDate: startDate,
    endDate: endDate,
    criteria: chosen.map((x) => criteria[x]),
  };

  console.log(input);

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

  if (response.errors) {
    document.getElementById("filter-message").textContent =
      response.errors[0].message;
    return;
  } else {
    console.log(response);
  }
};
