import { counties } from "../common/filter_data.js";
import { criteria, chosen } from "../common/filter_data.js";
import { compatibility, getCompatibilityMap } from "../common/filter_data.js";

const metrics = document.getElementById("metrics");

metrics.value = "";

metrics.addEventListener("change", function () {
  const compatibilityMap = getCompatibilityMap();

  const option = metrics[metrics.selectedIndex];

  if (!chosen.includes(option.id)) 
  {
    setDisabled(option.id, compatibilityMap);

    const addedCriteria = document.createElement("div");

    const selectedCriterias = document.getElementById("selected-criterias");

    addedCriteria.classList.add("item");

    const spanName = document.createElement("span");
    spanName.textContent = option.textContent;

    const closeImg = document.createElement("img");
    closeImg.src = "../static/images/close.png";
    closeImg.alt = "close";

    addedCriteria.id = "cr" + option.id;

    addedCriteria.appendChild(spanName);
    addedCriteria.appendChild(closeImg);

    selectedCriterias.appendChild(addedCriteria);

    chosen.push(option.id);

    option.disabled = true;

    metrics.value="";

    if (counties.length > 1 && chosen.length > 0) 
    {
        setAllEnabled(true);
    }
  }
});

const selectedCriterias = document.getElementById("selected-criterias");

selectedCriterias.addEventListener("click", function (event) {
  if (event.target.tagName == "IMG") {
    const parentDiv = event.target.parentNode;

    chosen.splice(chosen.indexOf(parentDiv.id.substring(2)), 1);

    parentDiv.remove();

    setAllEnabled(false);

    if (chosen.length)
    {
        setDisabled(chosen[0], getCompatibilityMap());
    }
  }
});

const setAllEnabled = async (value) => {
  const options = metrics.options;

  for (let i = 0; i < options.length; i++) {
    const option = options[i];

    option.disabled = value;
  }
};

const setDisabled = (optionId, compatibilityMap) => {
  const options = metrics.options;

  const compatibleOptions = compatibility[compatibilityMap.get(optionId)];

  for (let i = 0; i < options.length; i++) {
    const option = options[i];

    if (!compatibleOptions.includes(option.id) || chosen.includes(option.id)) {
      option.disabled = true;
    }
  }
};

export {setAllEnabled, setDisabled};
