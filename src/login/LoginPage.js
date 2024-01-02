import { LoginForm } from "./LoginForm";
import { AppTitle } from "./AppTitle";
import "./LoginPage.css"

export function LoginPage() {
    return (
        <div id="loginPage">
          <AppTitle/>
          <LoginForm/>
        </div>
    )
}