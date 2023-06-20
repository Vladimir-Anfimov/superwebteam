import "./jwtDecoder.js";
import { URLs } from "./urls.js";


const requestHandler = async (body, url, token = "") => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                 "Content-Type": "application/json",
                 "Authorization": `Bearer ${token}`
                },
            body: JSON.stringify(body),
        });
    
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        alert(`Something went wrong. Please try again later.`);
    }
}

const authRequestHandler = async (query) => {
    return await requestHandler(query, URLs.auth);
}

const coreRequestHandler = async (body) => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    
    if(!token || !refreshToken) {
        window.location.replace("/src/views/login.html");
    }

    if(jwt_decode(token).exp < Date.parse(new Date())) {
        const query = {
            query: `
              mutation Mutation($input: RefreshInput!) {
                refresh(input: $input) {
                  token
                }
              }
            `,
            variables: {
              input: {refreshToken}
            },
          };

       const response = await authRequestHandler(query);
       const token = response.data.refresh.token;
        
       localStorage.setItem("token", token);
    }

    return await requestHandler(body, URLs.core, token);
}

export { authRequestHandler, coreRequestHandler }

// const input = {
//     counties: [2],
//     criteria: ["females", "males"],
//     endDate: "2022-10-01",
//     startDate: "2022-02-01"
//   };

// const body = {
//     query: `
//       query Query($input: ChartsInput) {
//         getCharts(input: $input) {
//           chartType,
//           labels,
//           datasets {
//             label,
//             data
//           }
//         }
//       }
//     `,
//     variables: {
//       input,
//     },
//   };

//   console.log(await coreRequestHandler(body));