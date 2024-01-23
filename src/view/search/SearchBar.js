import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import './SearchBar.css';
import { useEffect, useState } from 'react';
import { useStore } from '../../state/Store';
import { getUserByName, getUsersSpeakingLanguage } from '../../service/BackendService';
import 'primeicons/primeicons.css';
import { isInputInvalid } from '../../service/Util';

export function SearchBar() {
    const { languages, accessToken, setOtherUsers, i18n } = useStore();
    const [searchBarInput, setSearchBarInput] = useState('');
    const [language, setLanguage] = useState('');

    const langObjects = languages.map(language => ({ name: language }));
    const languageObjects = [...langObjects, { name: '' }];

    async function fetchUsersByLanguage(language) {
        try {        
            const newUsers = await getUsersSpeakingLanguage(language, accessToken);
            setOtherUsers(newUsers);

        } catch (error) {
            console.error("Caught error in fetchUsersByLanguage(): ", error);
            return false;
        }
    } 

    async function fetchUsersByName(name) {
        try {        
            const newUsers = await getUserByName(name, accessToken);
            setOtherUsers(newUsers);

        } catch (error) {
            console.error("Caught error in fetchUsersByName(): ", error);
            return false;
        }
    } 


    useEffect(() => {
        fetchUsersByLanguage(language.name);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language])


    return (
        <div id="searchBar">
            <Dropdown placeholder={i18n.t("choose-a-language")} value={language} 
                options={languageObjects} optionLabel='name' 
                onChange={(e) => {setLanguage(e.value)}}/>
            <InputText id="inputField" value={searchBarInput}
                onChange={(e) => setSearchBarInput(e.target.value)}/>
            <Button id="searchBtn" onClick={() => fetchUsersByName(searchBarInput)} icon="pi pi-search" 
                label={i18n.t("search")} disabled={isInputInvalid(searchBarInput)}/>
        </div>
    )
}