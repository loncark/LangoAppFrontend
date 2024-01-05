import { Divider } from "primereact/divider";
import "./Menu.css";

export function Menu({ onSelect }) {

  const handleMenuClick = (page) => {
    onSelect(page);
  };

  return (
    <div id="menu">
      <div id="menuList">
        <h1>LanGo</h1>
        <p onClick={() => handleMenuClick('home')}>Home</p>
        <p onClick={() => handleMenuClick('search')}>Search</p>
        <p onClick={() => handleMenuClick('profile')}>Profile</p>
        <Divider />
        <p onClick={() => handleMenuClick('logout')}>Log out</p>
      </div>

      <div id="currentUser">
        <img src={process.env.PUBLIC_URL + "/assets/person.png"} alt="img" />
        <h2>Max</h2>
      </div>
    </div>
  );
}
