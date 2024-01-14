import { Menu } from "./Menu";
import { AppointmentPage } from "../appointments/AppointmentPage";
import { ProfilePage } from "../profile/ProfilePage";
import { SearchPage } from "../search/SearchPage";
import { useEffect, useState } from "react";
import "./MainPage.css";
import { useStore } from "../../state/Store";
import { getAppointmentsByUserId, getUserByName, getUsersInAppointments, getAllUsers } from "../../service/BackendService";


export function MainPage() {
  const [selectedPage, setSelectedPage] = useState("home");
  const { username, appointments, setAppointments, setUsersInAppointments, currentUser, setCurrentUser, accessToken, loginIsSuccessful, setOtherUsers } = useStore();


  async function initCurrentUser() {
    try {
      let user = await getUserByName(username, accessToken);
      setCurrentUser(user);

    } catch (error) {
        console.error("Caught error in initCurrentUser(): ", error);
        return false;
    }
  }

  async function fetchAppointments(currentUserId, accessToken) {
    try {
      const apts = await getAppointmentsByUserId(currentUserId, accessToken);
      setAppointments(apts);

    } catch (error) {
        console.error("Caught error in fetchAppointments(): ", error);
        return false;
    }
  }

  async function fetchUsersinAppointments(accessToken) {
    const idList = appointments.map(apt => (apt.userId1 === currentUser.id? apt.userId2 : apt.userId1));
    
    try {
      const users = await getUsersInAppointments(idList, accessToken);
      setUsersInAppointments(users);
    
    } catch (error) {
      console.error("Caught error in fetchUsersInAppointments(): ", error);
      return false;
    }
  }

  async function fetchAllOtherUsers(accessToken) {
    try {
      const allUsers = await getAllUsers(accessToken);
      const otherUsers = allUsers.filter(user => user.id !== currentUser.id);
      
      setOtherUsers(otherUsers);

    } catch (error) {
        console.error("Caught error in fetchAllOtherUsers(): ", error);
        return false;
    }
  }


  useEffect(() => {
    initCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginIsSuccessful])

  useEffect(() => {
    if (currentUser.id !== 0) {
      fetchAppointments(currentUser.id, accessToken);
      fetchAllOtherUsers(accessToken)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.id]);

  useEffect(() => {
    if (appointments.length !== 0) {
      fetchUsersinAppointments(accessToken);
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointments])

  

  const renderSelectedPage = () => {
    switch (selectedPage) {
      case "profile":
        return <ProfilePage />;
      case "search":
        return <SearchPage />;
      default:
        return <AppointmentPage />;
    }
  };

  return (
    <div id="mainPage">
      <Menu onSelect={(page) => setSelectedPage(page)} />
      {renderSelectedPage()}
    </div>
  );
}
