import { ProfileForm } from "./ProfileForm"
import './ProfilePage.css'
import { Card } from "primereact/card"
import { useSpring, animated } from '@react-spring/web'
import Animations from '../../state/Animations';
import { useStore } from "../../state/Store";


export function ProfilePage() {
    const springs = useSpring(Animations.profilePageAnimation);
    const { i18n } = useStore();

    return (
        <animated.div id="profilePage" style={{ ...springs }}>
            <h1>{i18n.t("your-data")}</h1>
            <Card id="card">
                <ProfileForm/>
            </Card>
        </animated.div>
    )
}