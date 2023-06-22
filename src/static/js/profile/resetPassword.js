import { authRequestHandler } from "../common/requestHandler.js";
import "../common/jwtDecoder.js";

const currentPasswordField = document.getElementById("current-password-field");
const newPasswordField = document.getElementById("new-password-field");
const confirmNewPasswordField = document.getElementById(
  "confirm-new-password-field"
);

const passwordErrors = document.getElementById("new-password-errors");

const resetPassword = async (e) => {
  e.preventDefault();

  if (!window.confirm("Are you sure you want to update your password?")) {
    return;
  }

  const currentPassword = currentPasswordField.value;
  const newPassword = newPasswordField.value;
  const confirmNewPassword = confirmNewPasswordField.value;

  if (newPassword !== confirmNewPassword) {
    resetPasswordErrors.innerHTML = "Passwords do not match!";
    return;
  }

  const body = {
    query: `mutation UpdatePassword($input: UpdatePasswordInput!) {
            updatePassword(input: $input) 
          }`,
    variables: {
      input: {
        currentPassword,
        newPassword,
      },
    },
  };

  const data = await authRequestHandler(body, true);

  if (data.errors) {
    passwordErrors.innerHTML = data.errors[0].message;
    console.log(data.errors);
  } else {
    passwordErrors.innerHTML = "";
    alert("Password updated successfully! Please login again.");
    window.location.replace("/src/views/login.html");
  }
};

const resetPasswordForm = document.getElementById("reset-password-form");

resetPasswordForm.addEventListener("submit", resetPassword);
