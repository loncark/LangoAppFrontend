import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import "./AppointmentCard.css"
import { useStore } from '../../state/Store';
import { useEffect, useState } from 'react';

export function AppointmentCard(props) {
    const { currentUser, usersInAppointments } = useStore();
    const [otherUser, setOtherUser] = useState(undefined);

    useEffect(() => {
        const otherUserId = (props.aptInfo.userId1 === currentUser.id? props.aptInfo.userId2 : props.aptInfo.userId1);
        setOtherUser(usersInAppointments.find(user => user.id === otherUserId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usersInAppointments])


    return (
        <div id="appointmentCard">
            <Card>
                <div id="info">
                    <h3>{ otherUser !== undefined? otherUser.name : 'Not Found' }</h3>
                    <div id="dateTime">
                        <p>{ props.aptInfo.aptDate }</p>
                        <p>10:30</p>
                    </div>
                </div>
                <Divider/>
                <p id="desc">{ props.aptInfo.description }</p>
                <div id="buttons">
                    <Button>Edit</Button>
                    <Button onClick={ props.onDelete }>Delete</Button>
                </div>
            </Card>
        </div>
    )
}