import {
  getAppointmentsByUserId,
  getUserByName,
  getUsersInAppointments,
  getAllUsers,
} from "./BackendService";

export async function initCurrentUser(username, accessToken, setCurrentUser) {
  try {
    let user = await getUserByName(username, accessToken);
    setCurrentUser(user);
  } catch (error) {
    console.error("Caught error in initCurrentUser(): ", error);
    return false;
  }
}

export async function fetchAppointments(currentUserId, accessToken, setAppointments) {
  try {
    const apts = await getAppointmentsByUserId(currentUserId, accessToken);
    setAppointments(apts);
  } catch (error) {
    console.error("Caught error in fetchAppointments(): ", error);
    return false;
  }
}

export async function fetchUsersinAppointments(accessToken, appointments, currentUser, setUsersInAppointments) {
  const idList = appointments.map((apt) =>
    apt.userId1 === currentUser.id ? apt.userId2 : apt.userId1
  );

  try {
    const users = await getUsersInAppointments(idList, accessToken);
    setUsersInAppointments(users);
    
  } catch (error) {
    console.error("Caught error in fetchUsersInAppointments(): ", error);
    return false;
  }
}

export async function fetchAllOtherUsers(accessToken, setOtherUsers, currentUser) {
  try {
    const allUsers = await getAllUsers(accessToken);
    const otherUsers = allUsers.filter((user) => user.id !== currentUser.id);

    setOtherUsers(otherUsers);
  } catch (error) {
    console.error("Caught error in fetchAllOtherUsers(): ", error);
    return false;
  }
}
