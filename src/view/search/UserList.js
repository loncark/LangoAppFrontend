import { useStore } from '../../state/Store';
import { UserCard } from './UserCard';
import { createAppointment } from '../../service/BackendService';
import './UserList.css';

export function UserList() {
    const { otherUsers, currentUser, appointments, setAppointments, accessToken } = useStore();

    async function onCreate(userId, accessToken) {
        const apt = {
            userId1: currentUser.id,
            userId2: userId,
            aptDate: "2023-10-05",
            description: "Tester appointment description.",
        }

        try {
            const newApt = await createAppointment(apt, accessToken);
            setAppointments([...appointments, newApt]); 
      
          } catch (error) {
              console.error("Caught error in createAppointment(): ", error);
              return false;
          }
     }

    return (
        <div id="userList">
            {otherUsers.length? otherUsers.map((user) => (<UserCard key={user.id} user={user} onCreate={() => onCreate(user.id, accessToken)}/>)) : <p>No users found.</p>}
        </div>
    )
}