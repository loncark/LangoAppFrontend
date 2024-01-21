import { UserList } from "./UserList";
import { SearchBar } from "./SearchBar";
import './SearchPage.css';
import { useSpring, animated } from '@react-spring/web';
import Animations from '../../state/Animations';
import { useStore } from "../../state/Store";


export function SearchPage() {
    const springs = useSpring(Animations.fadeInAnimation);
    const { i18n } = useStore();

    return (
        <animated.div id="searchPage" style={{ ...springs }}>
            <div id="topBar">
                <h1>{i18n.t("search-for-users")}</h1>
                <SearchBar/>
            </div>
            <UserList/>
        </animated.div>
    )
}