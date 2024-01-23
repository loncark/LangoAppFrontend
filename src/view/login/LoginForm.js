import "./LoginForm.css";
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button'; 
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { authenticate, register } from '../../service/AuthenticationService';
import { useStore } from '../../state/Store';
import { isInputInvalid } from "../../service/Util";


export function LoginForm(props) {
    const { setUsername, setPassword, username, password, setLoginIsSuccessful, setAccessToken, i18n } = useStore();

    const onLogin = async () => {
        const loginSuccess = await authenticate(username, password, (e) => setLoginIsSuccessful(e), (e) => setAccessToken(e));
        if (!loginSuccess) {
            props.showToast();
        }
    }


    return(
        <div id="loginForm">
            <form>
                <div className="form-row">
                    <label htmlFor="username">{i18n.t("username")}</label>
                    <InputText type="text" id="username" 
                        onChange={(e) => setUsername(e.target.value)}></InputText>
                </div>
                <div className="form-row">
                    <label htmlFor="password">{i18n.t("password")}</label>
                    <Password type="text" id="password" toggleMask
                        onChange={(e) => setPassword(e.target.value)} feedback={false}></Password>
                </div>
            </form>
            <div id="btn-row">
                <Button className="btn" id="loginBtn" icon="pi pi-sign-in" label={i18n.t("log-in")} onClick={onLogin} disabled={isInputInvalid(username, password)}/>
                <Button className="btn" icon="pi pi-user-plus" label={i18n.t("register")} disabled={isInputInvalid(username, password)}
                    onClick={() => register(username, password, (e) => setLoginIsSuccessful(e), (e) => setAccessToken(e))}/>
            </div>
        </div>
    )
}
