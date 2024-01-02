import { Button } from 'primereact/button'; 
import { InputText } from 'primereact/inputtext';
import "./LoginForm.css";

export function LoginForm() {


    return(
        <div id="loginForm">
            <form className="login-form">
                <div className="form-row">
                    <label htmlFor="username">Username</label>
                    <InputText type="text" id="username"></InputText>
                </div>
                <div className="form-row">
                    <label htmlFor="password">Password</label>
                    <InputText type="text" id="password"></InputText>
                </div>
                <div className="form-row" id="btn-row">
                    <Button className="btn" id="loginBtn">Log In</Button>
                    <Button className="btn">Register</Button>
                </div>
            </form>
        </div>
    )
}
