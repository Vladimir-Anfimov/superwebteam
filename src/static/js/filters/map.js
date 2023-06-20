import { chosen, counties } from "../common/filter_data.js";
import { setAllEnabled, setDisabled } from "./criteria.js";
import { getCompatibilityMap } from "../common/filter_data.js";

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

      if (counties.length > 1 && chosen.length > 0) {
        if (chosen.length == 1) {
          setAllEnabled(true);
        } else {
          setAllEnabled(false);
          chosen.splice(0, chosen.length);

          const selectedCriterias = Array.from(
            document
              .getElementById("selected-criterias")
              .querySelectorAll(".item")
          );

          selectedCriterias.forEach((x) => {
            x.remove();
          });
        }
      }

      if (counties.length <= 1) {
        if (chosen.length > 0) {
          setAllEnabled(false);
          setDisabled(chosen[0], getCompatibilityMap());
        }
      }
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

    if (counties.length <= 1) {
      if (chosen.length > 0) {
        setAllEnabled(false);
        setDisabled(chosen[0], getCompatibilityMap());
      }
    }
  }
});
