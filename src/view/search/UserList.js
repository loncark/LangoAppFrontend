import { UserCard } from './UserCard';
import './UserList.css';

export function UserList() {


    const userData = [
        { id: 1, title: 'Appointment 1' },
        { id: 2, title: 'Appointment 2' },
        { id: 3, title: 'Appointment 3' },
        { id: 4, title: 'Appointment 1' },
        { id: 5, title: 'Appointment 2' },
        { id: 6, title: 'Appointment 3' },
        { id: 7, title: 'Appointment 1' },
      ];

      let i=0;

    return (
        <div id="userList">
            {userData.map(() => (<UserCard key={i++}/>))}
        </div>
    )
}