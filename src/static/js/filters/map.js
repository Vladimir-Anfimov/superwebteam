import { counties } from "../common/filter_data.js";

const romaniaMap = document.getElementById("container-map");

romaniaMap.addEventListener("click", function (event) {
  if (event.target.tagName === "path") {
    if (event.target.style.fill != "green" && counties.length < 10) {
      event.target.style.fill = "green";
      const selectedItems = document.getElementById("selected-items");

      const addedCounty = document.createElement("div");

      addedCounty.classList.add("item");

      const spanName = document.createElement("span");
      spanName.textContent = event.target.querySelector("title").textContent;

      const closeImg = document.createElement("img");
      closeImg.src = "../static/images/close.png";
      closeImg.alt = "close";

      addedCounty.id = "c" + event.target.id;

      addedCounty.appendChild(spanName);
      addedCounty.appendChild(closeImg);

      selectedItems.appendChild(addedCounty);

      counties.push(event.target.id);
    }
  }
});

const selectedItems = document.getElementById("selected-items");

selectedItems.addEventListener("click", function (event) {
  if (event.target.tagName == "IMG") {
    const parentDiv = event.target.parentNode;

    const county = document.getElementById(parentDiv.id.substring(1));
    county.style.fill = "rgb(60, 174, 230, 0.7)";

    counties.splice(counties.indexOf(parentDiv.id.substring(1)), 1);

    parentDiv.remove();
  }
});
