import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Password } from 'primereact/password';
import { useStore } from '../../state/Store';
import { useState, useEffect } from 'react';
import { updateUserData } from '../../service/BackendService';
import { authenticate } from '../../service/AuthenticationService';
import './ProfileForm.css';


export function ProfileForm() { 
    const { currentUser, accessToken, username, password, setUsername, setPassword, setAccessToken, setLoginIsSuccessful } = useStore();
   
    const countries = ['UK', 'USA', 'CROATIA', 'GERMANY', 'RUSSIA', 'INDIA', 'SPAIN', 'ITALY', 'FRANCE', 'CANADA', 'JAPAN'];
    const countryObjects = countries.map(countryName => ({ name: countryName }));
    // mapping has to exist due to the nature of primereact Dropdown

    const languages = ['ENGLISH', 'GERMAN', 'ITALIAN', 'CROATIAN', 'SPANISH', 'HINDI', 'FRENCH', 'RUSSIAN', 'JAPANESE'];
    const languageObjects = languages.map(language => ({ name: language }));

    const [newUsername, setNewUsername] = useState(currentUser.name);
    const [newPassword, setNewPassword] = useState(password);
    const [newCountry, setNewCountry] = useState(currentUser.country? { name: currentUser.country } : { name: '' });
    const [newLanguages, setNewLanguages] = useState(currentUser.languages? currentUser.languages.split(',').map(language => ({name: language.trim()})) : '');
    const [newBio, setNewBio] = useState('');

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
            await updateUserData(updatedUser, accessToken);

            setUsername(updatedUser.name);
            setPassword(updatedUser.password);

        } catch (error) {
            console.error("Caught error in updateUserInfo(): ", error);
            return false;
        }
    }

    return (
        <div id="profileForm">
            <div id="imagePart">
                <img src={process.env.PUBLIC_URL + '/assets/person.png'} alt="img" id="image"/>
                <Button>Change profile picture</Button>
            </div>
            <form>
                <div className="form-row">
                    <label htmlFor="username">Username</label>
                    <InputText type="text" id="username"
                        value={newUsername} onChange={(e) => setNewUsername(e.target.value)}></InputText>
                </div>      
                <div className="form-row">
                    <label htmlFor="password">Password</label>
                    <Password type="text" id="password" 
                        value={newPassword} placeholder='New password'
                        onChange={(e) => setNewPassword(e.target.value)}></Password>
                </div>  
                <div className="form-row">
                    <label htmlFor="country">I live in</label>
                    <Dropdown id="country" value={newCountry} 
                        options={countryObjects} optionLabel='name' placeholder='Select Country'
                        onChange={(e) => setNewCountry(e.value)}></Dropdown>
                </div>
                <div className="form-row">
                    <label>I am speaking</label>
                    <MultiSelect value={newLanguages} 
                        onChange={(e) => setNewLanguages(e.value)} 
                        options={languageObjects} optionLabel="name" 
                        placeholder="Select Languages"></MultiSelect>
                </div>
                <div className="form-row">
                    <label htmlFor="bio">Bio</label>
                    <InputTextarea type="text" id="bio" placeholder='Insert new description'
                        value={newBio} onChange={(e) => setNewBio(e.target.value)}></InputTextarea>
                </div>       
            </form>
            <div id="updateButton">
                    <Button onClick={() => updateUserInfo(newUsername, newPassword, newCountry, newBio, newLanguages)}>Update personal data</Button>
            </div>
        </div>
    )
}