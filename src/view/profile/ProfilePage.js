import { ProfileForm } from "./ProfileForm"
import './ProfilePage.css'
import { Card } from "primereact/card"
import { useSpring, animated } from '@react-spring/web'
import Animations from '../../state/Animations';


export function ProfilePage() {
    const springs = useSpring(Animations.profilePageAnimation);

    return (
        <animated.div id="profilePage" style={{ ...springs }}>
            <h1>Your Data</h1>
            <Card id="card">
                <ProfileForm/>
            </Card>
        </animated.div>
    )
}