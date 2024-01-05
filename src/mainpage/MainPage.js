import { Menu } from '../mainpage/Menu';
import { AppointmentPage } from '../appointments/AppointmentPage';
import { ProfilePage } from '../profile/ProfilePage';
import { SearchPage } from '../search/SearchPage';
import { useState } from 'react';
import './MainPage.css';

export function MainPage() {
    const [selectedPage, setSelectedPage] = useState('home');
  
    const renderSelectedPage = () => {
      switch (selectedPage) {
        case 'profile':
          return <ProfilePage />;
        case 'search':
          return <SearchPage />;
        case 'logout':
          return null;
        default:
          return <AppointmentPage/>; 
      }
    };
  
    return (
      <div id="mainPage">
        <Menu onSelect={(page) => setSelectedPage(page)} />
        {renderSelectedPage()}
      </div>
    );
  }