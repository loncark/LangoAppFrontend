import { useStore } from '../../state/Store';
import { UserCard } from './UserCard';
import './UserList.css';

export function UserList() {
    const { otherUsers, i18n } = useStore();
    
    return (
        <div id="userList">
            {otherUsers.length? otherUsers.map((user) => (<UserCard key={user.id} user={user}/>)) : <p>{i18n.t("no-users-found")}</p>}
        </div>
    )
}