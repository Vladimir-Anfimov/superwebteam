import { authRequestHandler } from "../common/requestHandler.js";
import "../common/jwtDecoder.js";

const emailField = document.getElementById("email-field");
const resetEmailErrors = document.getElementById("reset-email-errors");

emailField.value = jwt_decode(localStorage.getItem("token")).email;

const resetEmail = async (e) => {
  e.preventDefault();

  if (!window.confirm("Are you sure you want to update your email?")) {
    return;
  }

  const newEmail = emailField.value;

  const body = {
    query: `mutation UpdateEmail($input: UpdateEmailInput!) {
        updateEmail(input: $input) 
      }`,
    variables: {
      input: {
        newEmail,
      },
    },
  };

  const data = await authRequestHandler(body, true);

  if (data.errors) {
    resetEmailErrors.innerHTML = data.errors[0].message;
    console.log(data.errors);
  } else {
    resetEmailErrors.innerHTML = "";
    alert("Email updated successfully! Please login again.");
    window.location.replace("/src/views/login.html");
  }
};

const resetEmailForm = document.getElementById("reset-email-form");

resetEmailForm.addEventListener("submit", resetEmail);
