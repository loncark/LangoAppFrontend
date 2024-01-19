import { LoginForm } from "./LoginForm";
import { AppTitle } from "./AppTitle";
import "./LoginPage.css"
import { useSpring, animated } from '@react-spring/web'
import Animations from '../../state/Animations';

export function LoginPage() {
  const springs = useSpring(Animations.appTitleAnimation); 
  const springs2 = useSpring(Animations.loginFormAnimation);

  const countries = ["croatia", "france", "germany", "italy", "japan", "usa", "india", "croatia", "great-britain", "russian-federation", "china"];

  return (
    <div id="loginPage">
      <animated.div id="loginTexts" style={{ ...springs }}>
        <AppTitle />
        <LoginForm />
      </animated.div>

      <animated.div id="flags" style={{ ...springs2 }}>
        {countries.map((country, index) => ( 
          <img src={process.env.PUBLIC_URL + `/assets/flags/icons8-${country}-96.png`} alt="img" style={{ animationDelay: `${index*0.1 + 1}s` }}/>
        ))}
      </animated.div>
    </div>
  );
}