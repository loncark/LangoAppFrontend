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
            onAuthenticate={() => props.onAuthenticate()}
            onRegister={() => props.onRegister()}
            />
        </div>
    )
}