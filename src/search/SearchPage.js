import { UserList } from "./UserList";
import { SearchBar } from "./SearchBar";
import './SearchPage.css';

export function SearchPage() {


    return (
        <div id="searchPage">
            <div id="topBar">
                <h1>Search for Users</h1>
                <SearchBar/>
            </div>
            <UserList/>
        </div>
    )
}