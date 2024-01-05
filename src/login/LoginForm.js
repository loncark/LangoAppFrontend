import "./LoginForm.css";
import { Button } from 'primereact/button'; 
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

export function LoginForm(props) {

    return(
        <div id="loginForm">
            <form>
                <div className="form-row">
                    <label htmlFor="username">Username</label>
                    <InputText type="text" id="username" 
                        onChange={(e) => props.setUsername(e.target.value)}></InputText>
                </div>
                <div className="form-row">
                    <label htmlFor="password">Password</label>
                    <Password type="text" id="password" 
                        onChange={(e) => props.setPassword(e.target.value)}></Password>
                </div>
            </form>
            <div id="btn-row">
                <Button className="btn" id="loginBtn" onClick={() => props.onAuthenticate()}>Log In</Button>
                <Button className="btn" onClick={() => props.onRegister()}>Register</Button>
            </div>
        </div>
    )
}
