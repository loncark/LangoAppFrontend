import { useStore } from '../../state/Store';
import { AppointmentCard } from './AppointmentCard';
import './AppointmentList.css';

export function AppointmentList() {
    const { appointments } = useStore();

    return (
        <div id="appointmentList">
            {appointments.map((apt) => (<AppointmentCard key={apt.id} aptInfo={apt}/>))}
        </div>
    )
}