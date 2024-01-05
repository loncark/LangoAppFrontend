import { Divider } from "primereact/divider";
import "./Menu.css";

export function Menu({ onSelect }) {
  

  return (
    <div id="menu">
      <div id="menuList">
        <h1>LanGo</h1>
        <p onClick={() => onSelect('home')}>Home</p>
        <p onClick={() => onSelect('search')}>Search</p>
        <p onClick={() => onSelect('profile')}>Profile</p>
        <Divider />
        <p onClick={() => onSelect('logout')}>Log out</p>
      </div>

      <div id="currentUser">
        <img src={process.env.PUBLIC_URL + "/assets/person.png"} alt="img" />
        <h2>Max</h2>
      </div>
    </div>
  );
}
