import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import "./AppointmentCard.css"
import { useStore } from '../../state/Store';

export function AppointmentCard(props) {
    const { currentUser } = useStore();

    return (
        <div id="appointmentCard">
            <Card>
                <div id="info">
                    <h3>{ props.aptInfo.userId1 === currentUser.id? props.aptInfo.userId2 : props.aptInfo.userId1 }</h3>
                    <div id="dateTime">
                        <p>{ props.aptInfo.aptDate }</p>
                        <p>10:30</p>
                    </div>
                </div>
                <Divider/>
                <p id="desc">{ props.aptInfo.description }</p>
                <div id="buttons">
                    <Button>Edit</Button>
                    <Button >Delete</Button>
                </div>
            </Card>
        </div>
    )
}