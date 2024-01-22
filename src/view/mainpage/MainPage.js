import { Menu } from "./Menu";
import { AppointmentPage } from "../appointments/AppointmentPage";
import { ProfilePage } from "../profile/ProfilePage";
import { SearchPage } from "../search/SearchPage";
import { useEffect, useState } from "react";
import "./MainPage.css";
import { useStore } from "../../state/Store";
import { initCurrentUser, fetchAppointments, fetchAllOtherUsers, fetchUsersinAppointments } from "../../service/InitializationService";


export function MainPage() {
  const [selectedPage, setSelectedPage] = useState("home");
  const { username, appointments, setAppointments, setUsersInAppointments, currentUser, setCurrentUser, accessToken, loginIsSuccessful, setOtherUsers } = useStore();


  useEffect(() => {
    initCurrentUser(username, accessToken, setCurrentUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginIsSuccessful])

  useEffect(() => {
    if (currentUser.id !== 0) {
      fetchAppointments(currentUser.id, accessToken, setAppointments);
      fetchAllOtherUsers(accessToken, setOtherUsers, currentUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.id]);

  useEffect(() => {
    if (appointments.length !== 0) {
      fetchUsersinAppointments(accessToken, appointments, currentUser, setUsersInAppointments);
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
