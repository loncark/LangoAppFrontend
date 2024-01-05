import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Password } from 'primereact/password';
import './ProfileForm.css';

export function ProfileForm() {
    
    
    return (
        <div id="profileForm">
            <div id="imagePart">
                <img src={process.env.PUBLIC_URL + '/assets/person.png'} alt="img" id="image"/>
                <Button>Change profile picture</Button>
            </div>
            <form>
                <div className="form-row">
                    <label htmlFor="username">Username</label>
                    <InputText type="text" id="username"></InputText>
                </div>      
                <div className="form-row">
                    <label htmlFor="password">Password</label>
                    <Password type="text" id="password"></Password>
                </div>  
                <div className="form-row">
                    <label htmlFor="country">I live in</label>
                    <Dropdown id="country">Select country</Dropdown>
                </div>
                <div className="form-row">
                    <label>I am speaking</label>
                    <MultiSelect>Select languages</MultiSelect>
                </div>
                <div className="form-row">
                    <label htmlFor="bio">Bio</label>
                    <InputTextarea type="text" id="bio"></InputTextarea>
                </div>        
            </form>
            <div id="updateButton">
                    <Button>Update personal data</Button>
            </div>
        </div>
    )
}