import { Divider } from "primereact/divider";
import "./Menu.css";

export function Menu() {
  return (
    <div id="menu">
      <div id="menuList">
        <h1>LanGo</h1>
        <p>Home</p>
        <p>Search</p>
        <p>Profile</p>
        <Divider />
        <p>Log out</p>
      </div>

      <div id="currentUser">
        <img src={process.env.PUBLIC_URL + "/assets/person.png"} alt="img" />
        <h2>Max</h2>
      </div>
    </div>
  );
}
