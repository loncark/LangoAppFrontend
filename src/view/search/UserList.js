import { useStore } from '../../state/Store';
import { UserCard } from './UserCard';
import './UserList.css';

export function UserList() {
    const { otherUsers } = useStore();

    return (
        <div id="userList">
            {otherUsers.map((user) => (<UserCard key={user.id} user={user}/>))}
        </div>
    )
}