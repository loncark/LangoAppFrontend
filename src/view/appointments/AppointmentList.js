import { useStore } from '../../state/Store';
import { AppointmentCard } from './AppointmentCard';
import './AppointmentList.css';
import { deleteAppointment } from '../../service/BackendService';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';


export function AppointmentList() {
    const { appointments, setAppointments, accessToken, i18n } = useStore();
    const aptDeletedToast = useRef(null);

    async function onDelete(aptId, accessToken) {
        try {
            await deleteAppointment(aptId, accessToken);
            setAppointments(appointments.filter(apt => apt.id !== aptId)); 

            aptDeletedToast.current.show({ severity: 'success', summary: i18n.t("success"), detail: i18n.t("appointment-deleted"), life: 1500 });
      
          } catch (error) {
              console.error("Caught error in onDelete(): ", error);
              return false;
          }
     }

    return (
        <div id="appointmentList">
            {appointments.length? appointments.map((apt) => (<AppointmentCard key={apt.id} aptInfo={apt} onDelete={() => onDelete(apt.id, accessToken)}/>)) : <p>{i18n.t("no-appointments-sheduled")}</p>}
            <Toast ref={aptDeletedToast} position="bottom-center"/>
        </div>
    )
}