import { Divider } from 'primereact/divider';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import "./UserCard.css";

export function UserCard() {


    return (
        <div id="userCard">
            <Card>
                <div id="titlePart">
                    <img src={process.env.PUBLIC_URL + '/assets/person.png'} alt="img" id="image"/>
                    <div id="texts">
                        <h2>Max</h2>
                        <p>Location: Croatia</p>
                    </div>
                </div>
                <Divider/>
                <p>I speak English and German.</p>
                <p>This is a description for Max. This is a description for Max. This is a description for Max. </p>
                <Button>Book an appointment with me</Button>

            </Card>
        </div>
    )
}