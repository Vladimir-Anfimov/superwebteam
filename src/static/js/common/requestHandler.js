import { URLs } from "./urls.js";
import "./jwtDecoder.js";

export async function authTokenVerification() {
  let token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!token || !refreshToken) {
    window.location.replace("/src/views/login.html");
  }

  if (jwt_decode(token).exp < Date.parse(new Date())) {
    const query = {
      query: `
            mutation Mutation($input: RefreshInput!) {
              refresh(input: $input) {
                token
              }
            }
          `,
      variables: {
        input: { refreshToken },
      },
    };

    try {
      const response = await authRequestHandler(query);
      token = response.data.refresh.token;
    } catch (error) {
      console.log(error);
      window.location.replace("/src/views/login.html");
    }

    localStorage.setItem("token", token);

    return token;
  }
}

const requestHandler = async (body, url, token = "") => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return data;
};

const authRequestHandler = async (query, requiredToken = false) => {
  let token = "";

  if (requiredToken) {
    token = await authTokenVerification();
  }
  return await requestHandler(query, URLs.auth, token);
};

const coreRequestHandler = async (body) => {
  const token = await authTokenVerification();
  return await requestHandler(body, URLs.core, token);
};

export { authRequestHandler, coreRequestHandler };
