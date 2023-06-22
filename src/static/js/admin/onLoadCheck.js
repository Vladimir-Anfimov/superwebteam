import "../common/jwtDecoder.js";

const checkTokenForAdmin = () => {
  const token = localStorage.getItem("token");
  const roles = jwt_decode(token).roles;
  console.log(roles);
  return roles.includes("ADMIN");
};

export { checkTokenForAdmin };
