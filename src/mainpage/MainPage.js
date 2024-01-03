import { Divider } from 'primereact/divider';
import { Card } from 'primereact/card';
import './MainPage.css'

export function MainPage() {
      

    return (
        <div id="homePage">
            <Card>
                <div id="menu">
                    <div id="menuList">
                        <h1>LanGo</h1>
                        <p>Home</p>
                        <p>Search</p>
                        <p>Profile</p>
                        <Divider/>
                        <p>Log out</p>
                    </div>

                    <div id="currentUser">
                        <img src={process.env.PUBLIC_URL + '/assets/person.png'} alt="img"/>
                        <h2>Max</h2>
                    </div>
                </div>
                
            </Card>
        </div>
    )
}