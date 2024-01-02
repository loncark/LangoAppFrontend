import { ProfileForm } from "./ProfileForm"
import './ProfilePage.css'
import { Card } from "primereact/card"

export function ProfilePage() {
    return (
        <div id="profilePage">
            <Card id="card">
                <ProfileForm/>
            </Card>
        </div>
    )
}