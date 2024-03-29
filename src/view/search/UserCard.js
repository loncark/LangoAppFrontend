import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./UserCard.css";
import { useRef, useState } from "react";
import { createAppointment } from "../../service/BackendService";
import { useStore } from "../../state/Store";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Sidebar } from "primereact/sidebar";
import 'primeicons/primeicons.css';
import { Toast } from 'primereact/toast';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { isValidDateFormat, isInputInvalidSpaceAllowed } from "../../service/Util";


export function UserCard(props) {
  const { currentUser, appointments, setAppointments, accessToken, i18n } = useStore();

  const [visibleRight, setVisibleRight] = useState(false);
  const [dateInput, setDateInput] = useState("");
  const [aptDescription, setAptDescription] = useState("");
  const aptCreatedToast = useRef(null);
  const [visible, setVisible] = useState(false);

  function generateLanguageSentence(languages) {
    if (!languages) {
      return i18n.t("no-language-setup");
    }

    const languageArray = languages.split(",");
    const languageList = languageArray.map(language => i18n.t(language));
    const lastLanguage = languageList.pop();

    if (languageList.length === 0) {
      return `${i18n.t("i-speak")} ${lastLanguage}.`;
    } else {
      const languagesString = languageList.join(", ") + ` ${i18n.t("and")} ` + lastLanguage;
      return `${i18n.t("i-speak")} ${languagesString}.`;
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

      aptCreatedToast.current.show({ severity: 'success', summary: i18n.t("success"), detail: i18n.t("appointment-created"), life: 2000 });

    } catch (error) {
      console.error("Caught error in createAppointment(): ", error);
      return false;
    }
  }

  const accept = () => { props.onDelete(props.user.id); }
  const reject = () => {}


  return (
    <div id="userCard">
      <Card>
        <div id="titlePart">
          <img src={process.env.PUBLIC_URL + "/assets/person.png"} alt="img" id="image"/>
          <div id="texts">
            <h2>{props.user.name}</h2>
            <p>{i18n.t("location")}: {props.user.country? i18n.t(props.user.country) : '?'}</p>
          </div>
        </div>
        <Divider />
        <div id="description">
          <p>{generateLanguageSentence(props.user.languages)}</p>
          <p>{props.user.bio}</p>
        </div>

        <Button onClick={() => setVisibleRight(true)} icon="pi pi-pencil" label={i18n.t("lets-book-appointment")} id="apt-btn"/>

        {currentUser.roles === 'ROLE_ADMIN' && 
          <>
            <Button onClick={() => setVisible(true)} icon="pi pi-times" outlined severity="danger" id="danger-btn"/>
            <ConfirmDialog group="declarative"  visible={visible} onHide={() => setVisible(false)} icon="pi pi-exclamation-triangle"
                accept={accept} reject={reject} message={i18n.t("are-you-sure")} header={i18n.t("confirmation")}/>
          </>
        }

        <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
          <div id="aptSidebar">
            <h2>{i18n.t("book-appointment-with")} {props.user.name}</h2>
            <form>
              <div className="form-row">
                <label htmlFor="dateInput">{i18n.t("date-of-appointment")}</label>
                <InputText
                  type="text"
                  id="dateInput"
                  placeholder="YYYY-MM-DD"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                ></InputText>
              </div>
              <div className="form-row">
                <label htmlFor="aptDescription">{i18n.t("appointment-description")}</label>
                <InputTextarea
                  type="text"
                  id="aptDescription"
                  placeholder={i18n.t("what-go-through")}
                  value={aptDescription}
                  onChange={(e) => setAptDescription(e.target.value)}
                ></InputTextarea>
              </div>
            </form>
            <Button onClick={() => onCreate(props.user.id, dateInput, aptDescription)} icon="pi pi-check" 
              label={i18n.t("create")} disabled={!isValidDateFormat(dateInput) || isInputInvalidSpaceAllowed(dateInput, aptDescription)}/>
          </div>
        </Sidebar>
      </Card>
      <Toast ref={aptCreatedToast} position="bottom-right"/>
    </div>
  );
}
