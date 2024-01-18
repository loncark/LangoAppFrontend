import { AppointmentList } from './AppointmentList';
import './AppointmentPage.css';
import { useSpring, animated } from '@react-spring/web';
import Animations from '../../state/Animations';


export function AppointmentPage() {
    const springs = useSpring(Animations.fadeInAnimation);

    return (
        <animated.div id="appointmentPage" style={{ ...springs }}>
            <h1>Your Appointments</h1>
            <AppointmentList/>
        </animated.div>
    )
}