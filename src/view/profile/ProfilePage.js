import { ProfileForm } from "./ProfileForm"
import './ProfilePage.css'
import { Card } from "primereact/card"

export function ProfilePage() {
    return (
        <div id="profilePage">
            <h1>Your Data</h1>
            <Card id="card">
                <ProfileForm/>
            </Card>
        </div>
    )
}