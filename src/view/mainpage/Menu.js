import "./Menu.css";
import 'primeicons/primeicons.css';
import { Divider } from "primereact/divider";
import { useStore } from '../../state/Store';
import { Button } from "primereact/button";

export function Menu(props) {
  const { setUsername, setPassword, setLoginIsSuccessful, setAccessToken, currentUser} = useStore();

  const logout = () => {
    setUsername('');
    setPassword('');
    setLoginIsSuccessful(false);
    setAccessToken('');
  }
  

  return (
    <div id="menu">
      <div id="menuList">
        <h1>LanGo</h1>
        <Button label="Home" text icon="pi pi-home" onClick={() => props.onSelect('home')}/>
        <Button label="Search" text icon="pi pi-search" onClick={() => props.onSelect('search')} />
        <Button label="Profile" text icon="pi pi-cog" onClick={() => props.onSelect('profile')} />
        <Divider />
        <Button label="Log out" text icon="pi pi-sign-out" onClick={() => logout()} />
      </div>

      <div id="currentUser">
        <img src={process.env.PUBLIC_URL + "/assets/person.png"} alt="img" />
        <h2>{currentUser.name}</h2>
      </div>
    </div>
  );
}
