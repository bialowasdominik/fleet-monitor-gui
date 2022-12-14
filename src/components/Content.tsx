import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Dashboard from '../pages/dashboard/Dashboard';
import Notifications from '../pages/notifications/notifications';
import Localisations from '../pages/localistaions/Localisations';
import Devices from '../pages/devices/Devices';

function Content(){
    return(
        <Routes>
            <Route path={'dashboard'} element={<Dashboard/>}/>
            <Route path={'notifications'} element={<Notifications/>}/>
            <Route path={'localisations'} element={<Localisations/>}/>
            <Route path={'devices'} element={<Devices/>}/>
        </Routes>
    );
    
}

export default Content;