import { AppointmentCard } from './AppointmentCard';
import './AppointmentList.css';

export function AppointmentList() {

    const appointmentsData = [
        { id: 1, title: 'Appointment 1' },
        { id: 2, title: 'Appointment 2' },
        { id: 3, title: 'Appointment 3' },
        { id: 4, title: 'Appointment 1' },
        { id: 5, title: 'Appointment 2' },
        { id: 6, title: 'Appointment 3' },
        { id: 7, title: 'Appointment 1' },
      ];

    return (
        <div id="appointmentList">
            {appointmentsData.map(() => (<AppointmentCard/>))}
        </div>
    )
}