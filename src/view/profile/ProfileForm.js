import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Password } from 'primereact/password';
import { useStore } from '../../state/Store';
import { useState, useEffect, useRef } from 'react';
import { updateUserData } from '../../service/BackendService';
import { authenticate } from '../../service/AuthenticationService';
import './ProfileForm.css';
import 'primeicons/primeicons.css';
import { Toast } from 'primereact/toast';


export function ProfileForm() { 
    const { currentUser, accessToken, username, password, setUsername, setPassword, setAccessToken, setLoginIsSuccessful, countries, languages, i18n, setCurrentUser } = useStore();
   
    const countryObjects = countries.map(countryName => ({ name: countryName }));
    // mapping has to exist due to the nature of primereact Dropdown

    const languageObjects = languages.map(language => ({ name: language }));

    const [newUsername, setNewUsername] = useState(currentUser.name);
    const [newPassword, setNewPassword] = useState(password);
    const [newCountry, setNewCountry] = useState(currentUser.country? { name: currentUser.country } : { name: '' });
    const [newLanguages, setNewLanguages] = useState(currentUser.languages? currentUser.languages.split(',').map(language => ({name: language.trim()})) : '');
    const [newBio, setNewBio] = useState(currentUser.bio);
    const userUpdatedToast = useRef(null);

    useEffect(() => {
        authenticate(username, password, (e) => setLoginIsSuccessful(e), (e) => setAccessToken(e));
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [username]);

    useEffect(() => {
        authenticate(username, password, (e) => setLoginIsSuccessful(e), (e) => setAccessToken(e));
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [password]);


    async function updateUserInfo(newUsername, newPassword, newCountry, newBio, newLanguages) {
        const langString = newLanguages.map(languageObject => languageObject.name).join(',');

        let updatedUser = {
            id: currentUser.id,
            name: newUsername,
            password: newPassword,
            country: newCountry.name,
            bio: (newBio === ''? currentUser.bio : newBio),
            languages: langString
        };

        try {        
            const newUser = await updateUserData(updatedUser, accessToken);

            setUsername(updatedUser.name);
            setPassword(updatedUser.password);
            
            newUser.password = updatedUser.password;
            setCurrentUser(newUser);

            userUpdatedToast.current.show({ severity: 'success', summary: 'Success', detail: 'Your data has been successfully updated.', life: 3000 });

        } catch (error) {
            console.error("Caught error in updateUserInfo(): ", error);
            return false;
        }
    }

    return (
        <div id="profileForm">
            <div id="imagePart">
                <img src={process.env.PUBLIC_URL + '/assets/person.png'} alt="img" id="image"/>
                <Button label={i18n.t("change-profile-picture")}/>
            </div>
            <form>
                <div className="form-row">
                    <label htmlFor="username">{i18n.t("username")}</label>
                    <InputText type="text" id="username"
                        value={newUsername} onChange={(e) => setNewUsername(e.target.value)}></InputText>
                </div>      
                <div className="form-row">
                    <label htmlFor="password">{i18n.t("password")}</label>
                    <Password type="text" id="password" 
                        value={newPassword} placeholder={i18n.t("new-password")}
                        onChange={(e) => setNewPassword(e.target.value)}></Password>
                </div>  
                <div className="form-row">
                    <label htmlFor="country">{i18n.t("i-live-in")}</label>
                    <Dropdown id="country" value={newCountry} 
                        options={countryObjects} optionLabel='name' placeholder={i18n.t("select-country")}
                        onChange={(e) => setNewCountry(e.value)}></Dropdown>
                </div>
                <div className="form-row">
                    <label>{i18n.t("i-am-speaking")}</label>
                    <MultiSelect value={newLanguages} 
                        onChange={(e) => setNewLanguages(e.value)} 
                        options={languageObjects} optionLabel="name" 
                        placeholder={i18n.t("select-languages")}></MultiSelect>
                </div>
                <div className="form-row">
                    <label htmlFor="bio">{i18n.t("short-bio")}</label>
                    <InputTextarea type="text" id="bio" placeholder={i18n.t("insert-new-description")}
                        value={newBio} onChange={(e) => setNewBio(e.target.value)}></InputTextarea>
                </div>       
            </form>
            <div id="updateButton">
                    <Button onClick={() => updateUserInfo(newUsername, newPassword, newCountry, newBio, newLanguages)} icon="pi pi-user-edit" label={i18n.t("update-personal-data")}/>
            </div>
            <Toast ref={userUpdatedToast} position="center"/>
        </div>
    )
}