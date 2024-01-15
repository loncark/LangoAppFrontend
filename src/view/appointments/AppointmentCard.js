import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import "./AppointmentCard.css"
import 'primeicons/primeicons.css';
import { useStore } from '../../state/Store';
import { useEffect, useState } from 'react';
import { updateAppointment } from '../../service/BackendService';
import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

export function AppointmentCard(props) {
    const { currentUser, usersInAppointments, setAppointments, appointments, accessToken } = useStore();
    const [otherUser, setOtherUser] = useState(undefined);

    const [visibleRight, setVisibleRight] = useState(false);
    const [dateInput, setDateInput] = useState(props.aptInfo.aptDate);
    const [aptDescription, setAptDescription] = useState(props.aptInfo.description);
    const [messageIsVisible, setMessageIsVisible] = useState(false);

    async function onUpdate(aptId, userId1, userId2, newDate, newDescription) {
        const apt = {
          id: aptId,
          userId1: userId1,
          userId2: userId2,
          aptDate: newDate,
          description: newDescription,
        };
    
        try {
          const newApt = await updateAppointment(apt, accessToken);
          setAppointments([...appointments.filter(apt => apt.id !== newApt.id), newApt]);
          setMessageIsVisible(true);
    
        } catch (error) {
          console.error("Caught error in updateAppointment(): ", error);
          return false;
        }
      }

    useEffect(() => {
        const otherUserId = (props.aptInfo.userId1 === currentUser.id? props.aptInfo.userId2 : props.aptInfo.userId1);
        setOtherUser(usersInAppointments.find(user => user.id === otherUserId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usersInAppointments])

    useEffect(() => {
        setMessageIsVisible(false);
      }, [visibleRight])


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
                    <Button onClick={() => setVisibleRight(true)} icon="pi pi-file-edit" label='Edit'/>
                    <Button onClick={ props.onDelete } icon="pi pi-trash" label='Delete'/>
                </div>

                <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                    <div id="updateAptSidebar">
                        <h2>Update appointment with { otherUser !== undefined? otherUser.name : 'Not Found' }</h2>
                        <form>
                        <div className="form-row">
                            <label htmlFor="updatedDateInput">Date of appointment</label>
                            <InputText
                            type="text"
                            id="updatedDateInput"
                            placeholder="YYYY-MM-DD"
                            value={dateInput}
                            onChange={(e) => setDateInput(e.target.value)}
                            ></InputText>
                        </div>
                        <div className="form-row">
                            <label htmlFor="updatedAptDescription">Appointment description</label>
                            <InputTextarea
                            type="text"
                            id="updatedAptDescription"
                            placeholder="What are you going to go through?"
                            value={aptDescription}
                            onChange={(e) => setAptDescription(e.target.value)}
                            ></InputTextarea>
                        </div>
                        </form>
                        <Button onClick={() => onUpdate(props.aptInfo.id, props.aptInfo.userId1, props.aptInfo.userId2, dateInput, aptDescription)} icon="pi pi-check" label='Update'/>
                        {messageIsVisible && <p id="updateMsg">Appointment updated.</p>}
                    </div>
                </Sidebar>
            </Card>
        </div>
    )
}