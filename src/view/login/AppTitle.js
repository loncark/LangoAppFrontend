import "./AppTitle.css"
import { useSpring, animated } from '@react-spring/web'
import Animations from '../../state/Animations';

export function AppTitle() {
    const springs = useSpring(Animations.appTitleAnimation);    

    return (
        <animated.div id="appTitle" style={{ ...springs }}>
            <h1>LanGo</h1>
            <h2>Connect and learn languages on the go.</h2>
        </animated.div>
    )
}