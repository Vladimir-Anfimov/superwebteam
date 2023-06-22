import { requestUsers } from "./requestUsers.js";
import { dateFormatConvert } from "./dateFormatConvert.js";

const currentPageElement = document.getElementById("current-page");
const previousPageButton = document.getElementById("previous-page-btn");
const nextPageButton = document.getElementById("next-page-btn");

const pageSizeSelect = document.getElementById("page-size-select");

const usersTableBody = document.getElementById("users-table-body");

const insertUsersInDom = async (pageNumber, pageSize) => {
  const response = await requestUsers(pageNumber - 1, pageSize);
  console.log(response);
  const data = response.data.getUsers;

  currentPageElement.innerText = data.pageNumber + 1;
  previousPageButton.disabled = !data.hasPreviousPage;
  nextPageButton.disabled = !data.hasNextPage;

  pageSizeSelect.value = data.pageSize;

  usersTableBody.innerHTML = "";

  data.users.forEach((user) => {
    const trElement = document.createElement("tr");

    const emailTdElement = document.createElement("td");
    emailTdElement.innerText = user.email;

    const lastTimeActiveTdElement = document.createElement("td");
    lastTimeActiveTdElement.innerText = dateFormatConvert(
      user.last_time_active
    );

    const createdAtTdElement = document.createElement("td");
    createdAtTdElement.innerText = dateFormatConvert(user.created_at);

    trElement.appendChild(emailTdElement);
    trElement.appendChild(lastTimeActiveTdElement);
    trElement.appendChild(createdAtTdElement);

    usersTableBody.appendChild(trElement);
  });

  console.log("insertUsersInDom");
};

insertUsersInDom(
  parseInt(currentPageElement.innerText),
  parseInt(pageSizeSelect.value)
);

pageSizeSelect.addEventListener("change", (e) => {
  insertUsersInDom(1, parseInt(e.target.value));
});

previousPageButton.addEventListener("click", () => {
  if (previousPageButton.disabled) return;
  insertUsersInDom(
    parseInt(currentPageElement.innerText) - 1,
    parseInt(pageSizeSelect.value)
  );
});

nextPageButton.addEventListener("click", () => {
  if (nextPageButton.disabled) return;
  insertUsersInDom(
    parseInt(currentPageElement.innerText) + 1,
    parseInt(pageSizeSelect.value)
  );
});
