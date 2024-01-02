import { LoginForm } from "./login/LoginForm";
import { AppTitle } from "./login/AppTitle";
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';

export default function App() {
  return (
    <div id="App">
      <div id="loginDiv">
        <AppTitle/>
        <LoginForm/>
      </div>
    </div>
  );
}
