import { useStore } from '../../state/Store';
import { UserCard } from './UserCard';
import './UserList.css';
import { deleteAllTracesOfUserWithId } from "../../service/BackendService";
import { Toast } from 'primereact/toast';
import { useRef } from 'react';


export function UserList() {
    const { otherUsers, i18n, accessToken, setOtherUsers, setAppointments, appointments } = useStore();
    const userDeletedToast = useRef(null);

    async function onDelete(userId) {
        try {
            await deleteAllTracesOfUserWithId(userId, accessToken);
          
            setOtherUsers(otherUsers.filter(user => user.id !== userId)); 
            setAppointments(appointments.filter(apt => (apt.userId1 !== userId && apt.userId2 !== userId)))

            userDeletedToast.current.show({ severity: 'success', summary: i18n.t("confirmed"), detail: i18n.t("user-deletion-successful"), life: 3000 });
          
        } catch (error) {
          console.error("Caught error in onDelete(): ", error);
          return false;
        }
      }
    
    return (
        <div id="userList">
            {otherUsers.length? otherUsers.map((user) => (<UserCard key={user.id} user={user} onDelete={(id) => onDelete(id)}/>)) : <p>{i18n.t("no-users-found")}</p>}
            <Toast ref={userDeletedToast} position="bottom-right"/>
        </div>
    )
}