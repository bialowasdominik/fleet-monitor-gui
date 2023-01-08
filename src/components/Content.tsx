import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Dashboard from '../pages/dashboard/Dashboard';
import Notifications from '../pages/notifications/notifications';
import Localisations from '../pages/localistaions/Localisations';
import Devices from '../pages/devices/Devices';
import RoutesPage from '../pages/routes/Routes';
import Vehicles from '../pages/vehicles/Vehicles';
import Drivers from '../pages/drivers/Drivers';

function Content(){
    return(
        <Routes>
            <Route path={'dashboard'} element={<Dashboard/>}/>
            <Route path={'notifications'} element={<Notifications/>}/>
            <Route path={'localisations'} element={<Localisations/>}/>
            <Route path={'devices'} element={<Devices/>}/>
            <Route path={'routes'} element={<RoutesPage/>}/>
            <Route path={'vehicles'} element={<Vehicles/>}/>
            <Route path={'drivers'} element={<Drivers/>}/>
        </Routes>
    );
    
}

export default Content;