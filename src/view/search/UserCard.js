import { Divider } from 'primereact/divider';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import "./UserCard.css";

export function UserCard(props) {

    function generateLanguageSentence(languages) {
        if (!languages) {
          return "I haven't set up my languages yet.";
        }
      
        const languageList = languages.split(',');
        const lastLanguage = languageList.pop();
      
        if (languageList.length === 0) {
          return `I speak ${lastLanguage}.`;
        } else {
          const languagesString = languageList.join(', ') + ' and ' + lastLanguage;
          return `I speak ${languagesString}.`;
        }
      }

    return (
        <div id="userCard">
            <Card>
                <div id="titlePart">
                    <img src={process.env.PUBLIC_URL + '/assets/person.png'} alt="img" id="image"/>
                    <div id="texts">
                        <h2>{ props.user.name }</h2>
                        <p>Location: { props.user.country }</p>
                    </div>
                </div>
                <Divider/>
                <p>{ generateLanguageSentence(props.user.languages) }</p>
                <p>{ props.user.bio }</p>
                <Button>Book an appointment with me</Button>

            </Card>
        </div>
    )
}