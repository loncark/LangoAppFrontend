import { useStore } from '../../state/Store';
import { AppointmentCard } from './AppointmentCard';
import './AppointmentList.css';
import { deleteAppointment } from '../../service/BackendService';


export function AppointmentList() {
    const { appointments, setAppointments, accessToken } = useStore();

    async function onDelete(aptId, accessToken) {
        try {
            await deleteAppointment(aptId, accessToken);
            setAppointments(appointments.filter(apt => apt.id !== aptId)); 
      
          } catch (error) {
              console.error("Caught error in onDelete(): ", error);
              return false;
          }
     }

    return (
        <div id="appointmentList">
            {appointments.length? appointments.map((apt) => (<AppointmentCard key={apt.id} aptInfo={apt} onDelete={() => onDelete(apt.id, accessToken)}/>)) : <p>You currently have no appointments scheduled.</p>}
        </div>
    )
}