import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import './SearchBar.css';

export function SearchBar() {


    return (
        <div id="searchBar">
            <Dropdown placeholder='Choose a language'/>
            <InputText id="inputField"></InputText>
            <Button id="searchBtn">Search</Button>
        </div>
    )
}