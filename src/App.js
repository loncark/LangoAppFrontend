import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import { LoginPage } from './login/LoginPage';
import { MainPage } from './mainpage/MainPage';
import { useState } from 'react';

export default function App() {
  const [loginIsSuccessful, setLoginIsSuccessful] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const authenticate = async (username, password) => {

    try {
      const isAuthenticated = await usernamePasswordChecksOut(username, password);
  
      if (isAuthenticated) {
        setLoginIsSuccessful(true);
      }
    } catch (error) {
      console.error('Caught error in authenticate():', error);
    }
  }

  async function usernamePasswordChecksOut(uname, pword) {
    const apiUrl = 'http://localhost:7000/auth/login';
    const requestBody = {
      username: uname,
      password: pword
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        console.error(`Login Error: ${response.status} - ${response.statusText}`);
        return false;
      }
  
      const responseData = await response.json();  
      const accessToken = responseData.accessToken;
      console.log("accessToken: " + accessToken);

      return true;

    } catch (error) {
      console.error('Caught error in usernamePasswordChecksOut():', error);
      return false;
    }
  }
  
  const register = (username, password) => {
    if(registerIsSuccessful(username, password)) {
      setLoginIsSuccessful(true);
    }
  }

  async function registerIsSuccessful(uname, pword) {
    const apiUrl = 'http://localhost:7000/users';
    const requestBody = {
      name: uname,
      password: pword
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        console.error(`Register Error: ${response.status} - ${response.statusText}`);
        return false;
      }

      console.log("Register success");
      return true;

    } catch (error) {
      console.error('Caught error in registerIsSuccessful():', error);
      return false;
    }
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
        onAuthenticate={() => authenticate(username, password)}
        onRegister={() => register(username, password)}
        />;
  }


  return (
    <div id="App">
      {renderPage()}
    </div>
  );
}
