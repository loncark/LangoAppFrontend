import { Button } from 'primereact/button'; 
import { InputText } from 'primereact/inputtext';
import "./LoginForm.css";
import { Password } from 'primereact/password';

export function LoginForm() {


    return(
        <div id="loginForm">
            <form>
                <div className="form-row">
                    <label htmlFor="username">Username</label>
                    <InputText type="text" id="username"></InputText>
                </div>
                <div className="form-row">
                    <label htmlFor="password">Password</label>
                    <Password type="text" id="password"></Password>
                </div>
                <div id="btn-row">
                    <Button className="btn" id="loginBtn">Log In</Button>
                    <Button className="btn">Register</Button>
                </div>
            </form>
        </div>
    )
}
