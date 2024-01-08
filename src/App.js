import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import { LoginPage } from './login/LoginPage';
import { MainPage } from './mainpage/MainPage';
import { useState } from 'react';
import { authenticate, register } from './service/AuthenticationService';

export default function App() {
  const [loginIsSuccessful, setLoginIsSuccessful] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


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
        onAuthenticate={() => authenticate(username, password, (e) => setLoginIsSuccessful(e))}
        onRegister={() => register(username, password, (e) => setLoginIsSuccessful(e))}
        />;
  }


  return (
    <div id="App">
      {renderPage()}
    </div>
  );
}
