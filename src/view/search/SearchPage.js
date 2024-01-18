import { UserList } from "./UserList";
import { SearchBar } from "./SearchBar";
import './SearchPage.css';
import { useSpring, animated } from '@react-spring/web';
import Animations from '../../state/Animations';


export function SearchPage() {
    const springs = useSpring(Animations.fadeInAnimation);

    return (
        <animated.div id="searchPage" style={{ ...springs }}>
            <div id="topBar">
                <h1>Search for Users</h1>
                <SearchBar/>
            </div>
            <UserList/>
        </animated.div>
    )
}