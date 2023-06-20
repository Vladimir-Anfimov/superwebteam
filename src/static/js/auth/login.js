import { authRequestHandler } from "../common/requestHandler.js";

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  login();
});

const login = async () => {
  var in_email = document.getElementById("email").value;
  var in_password = document.getElementById("password").value;

  const input = {
    email: in_email,
    password: in_password,
  };

  const body = {
    query: `
        mutation Mutation($input: UserLoginInput!) {
            login(input: $input) {
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
    document.getElementById("login-message").textContent = data.errors[0].message;
    console.error(data.errors[0].message);
  } else {
    const token = data.data.login.token;
    const refreshToken = data.data.login.refreshToken;

    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);

    document.getElementById("login-message").textContent = "";

    window.location.replace("/superwebteam/src/views/index.html");
  }
};
