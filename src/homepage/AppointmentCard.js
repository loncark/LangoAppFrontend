import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import "./AppointmentCard.css"

export function AppointmentCard() {


    return (
        <div id="appointmentCard">
            <Card>
                <div id="info">
                    <h3>Paul</h3>
                    <div id="dateTime">
                        <p>15/11/2025</p>
                        <p>10:30</p>
                    </div>
                </div>
                <Divider/>
                <p id="desc">This is a description of an appointment and what we are gonna do in it.</p>
                <div id="buttons">
                    <Button>Edit</Button>
                    <Button >Delete</Button>
                </div>
            </Card>
        </div>
    )
}