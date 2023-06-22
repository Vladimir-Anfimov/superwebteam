import { checkTokenForAdmin } from "../admin/onLoadCheck.js";

const navAdminItem = () => {
  if (!checkTokenForAdmin()) {
    return "";
  }

  return `<li onclick="location.href = './admin.html'">
    <img src="../static/images/admin.png" alt="house" />
    Admin
  </li>`;
};

const sidebar = `<img class="sidebar-close" src="../static/images/close.png" alt="close" />
<img class="sidebar-logo" src="../static/images/logo.png" alt="logo" />
<ul>
  <li onclick="location.href = './index.html'">
    <img src="../static/images/house.png" alt="house" />
    Get Started
  </li>
  <li onclick="location.href = './discover.html'">
    <img src="../static/images/magnifying-glass.png" alt="house" />
    Discover
  </li>
  <li onclick="location.href = './profile.html'">
    <img src="../static/images/user.png" alt="house" />
    Profile
  </li>
  ${navAdminItem()}
  <li onclick="location.href = './login.html'">
    <img src="../static/images/logout.png" alt="house" />
    Logout
  </li>
</ul>`;

document.getElementById("sidebar-element").innerHTML = sidebar;
