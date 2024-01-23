import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import "./AppointmentCard.css"
import 'primeicons/primeicons.css';
import { useStore } from '../../state/Store';
import { useEffect, useState, useRef } from 'react';
import { updateAppointment } from '../../service/BackendService';
import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';

export function AppointmentCard(props) {
    const { currentUser, usersInAppointments, setAppointments, appointments, accessToken, i18n } = useStore();
    const [otherUser, setOtherUser] = useState(undefined);

    const [visibleRight, setVisibleRight] = useState(false);
    const [dateInput, setDateInput] = useState(props.aptInfo.aptDate);
    const [aptDescription, setAptDescription] = useState(props.aptInfo.description);
    const aptUpdatedToast = useRef(null);

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

          aptUpdatedToast.current.show({ severity: 'success', summary: 'Success', detail: 'Appointment updated.', life: 3000 });
    
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


    return (
        <div id="appointmentCard">
            <Card>
                <div id="info">
                    <h3>{ otherUser !== undefined? otherUser.name : i18n.t("not-found") }</h3>
                    <div id="dateTime">
                        <p>{ props.aptInfo.aptDate }</p>
                        <p>10:30</p>
                    </div>
                </div>
                <Divider/>
                <p id="desc">{ props.aptInfo.description }</p>
                <div id="buttons">
                    <Button onClick={() => setVisibleRight(true)} icon="pi pi-file-edit" label={i18n.t("edit")}/>
                    <Button onClick={ props.onDelete } icon="pi pi-trash" label={i18n.t("delete")} outlined/>
                </div>

                <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                    <div id="updateAptSidebar">
                        <h2>{i18n.t("update-appointment-with")} { otherUser !== undefined? otherUser.name : i18n.t("not-found") }</h2>
                        <form>
                        <div className="form-row">
                            <label htmlFor="updatedDateInput">{i18n.t("date-of-appointment")}</label>
                            <InputText
                            type="text"
                            id="updatedDateInput"
                            placeholder="YYYY-MM-DD"
                            value={dateInput}
                            onChange={(e) => setDateInput(e.target.value)}
                            ></InputText>
                        </div>
                        <div className="form-row">
                            <label htmlFor="updatedAptDescription">{i18n.t("appointment-description")}</label>
                            <InputTextarea
                            type="text"
                            id="updatedAptDescription"
                            placeholder={i18n.t("what-go-through")}
                            value={aptDescription}
                            onChange={(e) => setAptDescription(e.target.value)}
                            ></InputTextarea>
                        </div>
                        </form>
                        <Button onClick={() => onUpdate(props.aptInfo.id, props.aptInfo.userId1, props.aptInfo.userId2, dateInput, aptDescription)} icon="pi pi-check" label={i18n.t("update")}/>
                    </div>
                </Sidebar>
            </Card>
            <Toast ref={aptUpdatedToast} position="bottom-right"/>
        </div>
    )
}