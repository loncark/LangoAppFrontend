import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import { LoginPage } from './login/LoginPage';
import { MainPage } from './mainpage/MainPage';
import { useState } from 'react';

export default function App() {
  const [loginIsSuccessful, setLoginIsSuccessful] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const authenticate = (username, password) => {
    console.log("authentication triggered");
    if(usernamePasswordChecksOut(username, password)) {
      setLoginIsSuccessful(true);
    }
  }

  function usernamePasswordChecksOut() {
    return true;
  }


  const register = (username, password) => {
    console.log("registration triggered");
    if(registerIsSuccessful(username, password)) {
      setLoginIsSuccessful(true);
    }
  }

  function registerIsSuccessful() {
    return true;
  }


  const renderPage = () => {
    
    return loginIsSuccessful? 
      <MainPage
        onLogout={() => {
          setLoginIsSuccessful(false);
          setUsername('');
          setPassword('');
        }}
      />:
      <LoginPage 
        setUsername={(e) => setUsername(e)} 
        setPassword={(e) => setPassword(e)}
        onAuthenticate={(u, p) => authenticate(u, p)}
        onRegister={(u, p) => register(u, p)}
        />;
  }


  return (
    <div id="App">
      {renderPage()}
    </div>
  );
}
