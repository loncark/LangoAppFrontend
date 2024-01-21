import { AppointmentList } from './AppointmentList';
import './AppointmentPage.css';
import { useSpring, animated } from '@react-spring/web';
import Animations from '../../state/Animations';
import { useStore } from '../../state/Store';


export function AppointmentPage() {
    const springs = useSpring(Animations.fadeInAnimation);
    const { i18n } = useStore();

    return (
        <animated.div id="appointmentPage" style={{ ...springs }}>
            <h1>{i18n.t("your-appointments")}</h1>
            <AppointmentList/>
        </animated.div>
    )
}