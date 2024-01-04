import { ProfilePage } from '../profile/ProfilePage';
import { Menu } from '../mainpage/Menu';
import './MainPage.css';

export function MainPage() {

    return (
        <div id="mainPage">
            <Menu/>
            <ProfilePage/>
        </div>
    )
}