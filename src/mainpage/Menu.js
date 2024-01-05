import { Divider } from "primereact/divider";
import "./Menu.css";

export function Menu(props) {
  

  return (
    <div id="menu">
      <div id="menuList">
        <h1>LanGo</h1>
        <p onClick={() => props.onSelect('home')}>Home</p>
        <p onClick={() => props.onSelect('search')}>Search</p>
        <p onClick={() => props.onSelect('profile')}>Profile</p>
        <Divider />
        <p onClick={() => props.onLogout()}>Log out</p>
      </div>

      <div id="currentUser">
        <img src={process.env.PUBLIC_URL + "/assets/person.png"} alt="img" />
        <h2>Max</h2>
      </div>
    </div>
  );
}
