import { useStore } from '../../state/Store';
import { UserCard } from './UserCard';
import './UserList.css';
import { deleteAllTracesOfUserWithId } from "../../service/BackendService";


export function UserList() {
    const { otherUsers, i18n, accessToken, setOtherUsers, setAppointments, appointments } = useStore();

    async function onDelete(userId) {
        try {
            await deleteAllTracesOfUserWithId(userId, accessToken);
          
            setOtherUsers(otherUsers.filter(user => user.id !== userId)); 
            setAppointments(appointments.filter(apt => (apt.userId1 !== userId && apt.userId2 !== userId)))
          
        } catch (error) {
          console.error("Caught error in onDelete(): ", error);
          return false;
        }
      }
    
    return (
        <div id="userList">
            {otherUsers.length? otherUsers.map((user) => (<UserCard key={user.id} user={user} onDelete={(id) => onDelete(id)}/>)) : <p>{i18n.t("no-users-found")}</p>}
        </div>
    )
}