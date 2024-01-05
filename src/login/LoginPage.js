import { LoginForm } from "./LoginForm";
import { AppTitle } from "./AppTitle";
import "./LoginPage.css"

export function LoginPage(props) {
    return (
        <div id="loginPage">
          <AppTitle/>
          <LoginForm 
            setUsername={(e) => props.setUsername(e)} 
            setPassword={(e) => props.setPassword(e)}
            onAuthenticate={(u, p) => props.onAuthenticate(u, p)}
            onRegister={(u, p) => props.onRegister(u, p)}
            />
        </div>
    )
}