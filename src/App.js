import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import { LoginPage } from './view/login/LoginPage';
import { MainPage } from './view/mainpage/MainPage';
import { useStore } from './state/Store';


export default function App() {
  const { loginIsSuccessful } = useStore();

  const renderPage = () => {
    return loginIsSuccessful? <MainPage/> : <LoginPage/>;
  }

  return (
    <div id="App">
      {renderPage()}
    </div>
  );
}
