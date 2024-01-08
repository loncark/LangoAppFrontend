import "./LoginForm.css";
import { Button } from 'primereact/button'; 
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { authenticate, register } from '../../service/AuthenticationService';
import { useStore } from '../../state/Store';

export function LoginForm() {
    const { setUsername, setPassword, username, password, setLoginIsSuccessful, setAccessToken, setCurrentUser } = useStore();

    return(
        <div id="loginForm">
            <form>
                <div className="form-row">
                    <label htmlFor="username">Username</label>
                    <InputText type="text" id="username" 
                        onChange={(e) => setUsername(e.target.value)}></InputText>
                </div>
                <div className="form-row">
                    <label htmlFor="password">Password</label>
                    <Password type="text" id="password" 
                        onChange={(e) => setPassword(e.target.value)}></Password>
                </div>
            </form>
            <div id="btn-row">
                <Button className="btn" id="loginBtn" 
                    onClick={() => authenticate(username, password, (e) => setLoginIsSuccessful(e), (e) => setAccessToken(e), (e) => setCurrentUser(e))}>Log In</Button>
                <Button className="btn" 
                    onClick={() => register(username, password, (e) => setLoginIsSuccessful(e))}>Register</Button>
            </div>
        </div>
    )
}
