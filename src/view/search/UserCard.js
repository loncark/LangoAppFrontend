import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./UserCard.css";
import { useEffect, useState } from "react";
import { createAppointment } from "../../service/BackendService";
import { useStore } from "../../state/Store";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Sidebar } from "primereact/sidebar";
import 'primeicons/primeicons.css';


export function UserCard(props) {
  const { currentUser, appointments, setAppointments, accessToken } = useStore();

  const [visibleRight, setVisibleRight] = useState(false);
  const [dateInput, setDateInput] = useState("");
  const [aptDescription, setAptDescription] = useState("");
  const [messageIsVisible, setMessageIsVisible] = useState(false);

  function generateLanguageSentence(languages) {
    if (!languages) {
      return "I haven't set up my languages yet.";
    }

    const languageList = languages.split(",");
    const lastLanguage = languageList.pop();

    if (languageList.length === 0) {
      return `I speak ${lastLanguage}.`;
    } else {
      const languagesString = languageList.join(", ") + " and " + lastLanguage;
      return `I speak ${languagesString}.`;
    }
  }

  async function onCreate(userId, newDate, newDescription) {
    const apt = {
      userId1: currentUser.id,
      userId2: userId,
      aptDate: newDate,
      description: newDescription,
    };

    try {
      const newApt = await createAppointment(apt, accessToken);
      setAppointments([...appointments, newApt]);
      setMessageIsVisible(true);

    } catch (error) {
      console.error("Caught error in createAppointment(): ", error);
      return false;
    }
  }

  useEffect(() => {
    setMessageIsVisible(false);
  }, [visibleRight])

  return (
    <div id="userCard">
      <Card>
        <div id="titlePart">
          <img src={process.env.PUBLIC_URL + "/assets/person.png"} alt="img" id="image"/>
          <div id="texts">
            <h2>{props.user.name}</h2>
            <p>Location: {props.user.country}</p>
          </div>
        </div>
        <Divider />
        <div id="description">
          <p>{generateLanguageSentence(props.user.languages)}</p>
          <p>{props.user.bio}</p>
        </div>

        <Button onClick={() => setVisibleRight(true)} icon="pi pi-pencil" label="Let's book an appointment"/>

        <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
          <div id="aptSidebar">
            <h2>Book an appointment with {props.user.name}</h2>
            <form>
              <div className="form-row">
                <label htmlFor="dateInput">Date of appointment</label>
                <InputText
                  type="text"
                  id="dateInput"
                  placeholder="YYYY-MM-DD"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                ></InputText>
              </div>
              <div className="form-row">
                <label htmlFor="aptDescription">Appointment description</label>
                <InputTextarea
                  type="text"
                  id="aptDescription"
                  placeholder="What are you going to go through?"
                  value={aptDescription}
                  onChange={(e) => setAptDescription(e.target.value)}
                ></InputTextarea>
              </div>
            </form>
            <Button onClick={() => onCreate(props.user.id, dateInput, aptDescription)} icon="pi pi-check" label="Create"/>
            {messageIsVisible && <p id="msg">Appointment created.</p>}
          </div>
        </Sidebar>
      </Card>
    </div>
  );
}
