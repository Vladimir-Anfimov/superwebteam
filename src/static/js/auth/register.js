import { authRequestHandler } from "../common/requestHandler.js";

const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  register();
});

const register = async () => {
  var in_email = document.getElementById("email").value;
  var in_password = document.getElementById("password").value;
  var in_confirm_password = document.getElementById("confirm-password").value;

  const input = {
    email: in_email,
    password: in_password,
    confirmPassword: in_confirm_password,
  };

  const body = {
    query: `
    mutation Register($input: UserRegisterInput!) {
        register(input: $input) {
          token,
          refreshToken
        }
      }
    `,
    variables: {
      input,
    },
  };

  const data = await authRequestHandler(body);

  if (data.errors) {
    document.getElementById("register-message").textContent =
      data.errors[0].message;
    console.error(data.errors[0].message);
  } else {
    document.getElementById("register-message").textContent = "";

    const token = data.data.register.token;
    const refreshToken = data.data.register.refreshToken;

    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);

    window.location.replace("/src/views/index.html");
  }
};
