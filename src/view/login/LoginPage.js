import { LoginForm } from "./LoginForm";
import { AppTitle } from "./AppTitle";
import "./LoginPage.css"
import { useSpring, animated } from '@react-spring/web'
import Animations from '../../state/Animations';
import { useStore } from "../../state/Store";
import { useState, useRef } from "react";
import { Toast } from 'primereact/toast';
 
export function LoginPage() {
  const springs = useSpring(Animations.appTitleAnimation); 
  const springs2 = useSpring(Animations.loginFormAnimation);
  const { setLocale, i18n } = useStore();
  // eslint-disable-next-line
  const [lang, setLang] = useState('en');
  const toast = useRef(null);

  const countries = [
    { name: "croatia", code: "hr" },
    { name: "france", code: "fr" },
    { name: "germany", code: "de" },
    { name: "italy", code: "it" },
    { name: "japan", code: "jp" },
    { name: "usa", code: "en" },
    { name: "india", code: "in" },
    { name: "great-britain", code: "en" },
    { name: "russian-federation", code: "ru" },
    { name: "china", code: "chn" },
  ];

  const showToast = () => {
    toast.current.show({ severity: 'error', summary: 'Authentication failed.', detail: 'Wrong credentials.', life: 30000 });
  }

  return (
    <div id="loginPage">
      <animated.div id="loginTexts" style={{ ...springs }}>
        <AppTitle />
        <LoginForm showToast={showToast}/>
      </animated.div>

      <animated.div id="flags" style={{ ...springs2 }}>
        {countries.map((country, index) => (
          <img
            key={index}
            src={process.env.PUBLIC_URL + `/assets/flags/icons8-${country.name}-96.png`}
            alt={country.name}
            style={{ animationDelay: `${index * 0.1 + 1}s` }}
            onClick={() => {setLocale(country.code); setLang(country.code);}}
            title={i18n.t("set-language")}
          />
        ))}
      </animated.div>
      <Toast ref={toast} position="bottom-center"/>
    </div>
  );
}