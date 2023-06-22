import "./tabsManager.js";
import "./resetEmail.js";
import "./resetPassword.js";
import "../common/jwtDecoder.js";

const displayName = () => {
  const token = localStorage.getItem("token");
  const email = jwt_decode(token).email;
  const name = email.split("@")[0];
  const nameUpperCase = name.charAt(0).toUpperCase() + name.slice(1);

  document.getElementById(
    "user-name-heading"
  ).innerHTML = `${nameUpperCase}'s Profile`;
};

displayName();
