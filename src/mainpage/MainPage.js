import { Menu } from '../mainpage/Menu';
import { AppointmentPage } from '../appointments/AppointmentPage';
import { ProfilePage } from '../profile/ProfilePage';
import { SearchPage } from '../search/SearchPage';
import { useState } from 'react';
import './MainPage.css';

export function MainPage(props) {
    const [selectedPage, setSelectedPage] = useState('home');
  
    const renderSelectedPage = () => {
      switch (selectedPage) {
        case 'profile':
          return <ProfilePage />;
        case 'search':
          return <SearchPage />;
        default:
          return <AppointmentPage/>; 
      }
    };
  
    return (
      <div id="mainPage">
        <Menu 
          onSelect={(page) => setSelectedPage(page)} 
          onLogout={() => props.onLogout()}
          />
        {renderSelectedPage()}
      </div>
    );
  }