import React from 'react';
import './SidebarMenu.css';
import {
    MdDashboard,
    MdMap,
    MdGroup,
    MdDevices,
    MdNotifications,
    MdPinDrop,
    MdSettings,
    MdNearMe,
    MdDirectionsCar} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export function SidebarMenu(){
    const navigate = useNavigate();
    return(
        <div className='navContainer ml-3'>
            <div className="upMenu top-0">
                <div className='vertical-align-middle'>
                    <button className="logoButton text-color">
                        <MdNearMe className="text-4xl"/>
                        <span className="font-bold text-2xl">Fleet <span className='text-primary'>monitor</span></span>
                    </button>
                </div>                
                <ul>
                    <li>
                        <button onClick={()=>{navigate('dashboard')}} className="menuButton text-sm text-color-secondary hover:text-primary-400  focus:text-primary-400">
                            <MdDashboard className={'buttonIcon'}/>
                            <span>Pulpit</span>
                        </button>
                    </li>
                    <li>
                        <button onClick={()=>{navigate('localisations')}} className="menuButton text-color-secondary text-sm hover:text-primary-400 focus:text-primary-400">
                            <MdPinDrop className={'buttonIcon'}/>
                            <span>Lokalizacje</span>
                        </button>
                    </li>
                    <li>
                        <button onClick={()=>{navigate('routes')}} className="menuButton text-sm text-color-secondary hover:text-primary-400 focus:text-primary-400">
                            <MdMap className={'buttonIcon'}/>
                            <span>Trasy</span>
                        </button>
                    </li>
                    <li >
                        <button onClick={()=>{navigate('drivers')}} className="menuButton text-color-secondary text-sm hover:text-primary-400 focus:text-primary-400">
                            <MdGroup className={'buttonIcon'}/>
                            <span>Kierowcy</span>
                        </button>
                    </li>
                    <li >
                        <button onClick={()=>{navigate('devices')}} className="menuButton text-color-secondary text-sm hover:text-primary-400 focus:text-primary-400">
                            <MdDevices className={'buttonIcon'}/>
                            <span>Urządzenia</span>
                        </button>
                    </li>
                    <li>
                        <button onClick={()=>{navigate('vehicles')}} className="menuButton text-color-secondary text-sm hover:text-primary-400 focus:text-primary-400">
                            <MdDirectionsCar className={'buttonIcon'}/>
                            <span>Pojazdy</span>
                        </button>
                    </li>
                    {/* <li>
                        <button className="menuButton text-color-secondary text-sm hover:text-primary-400 focus:text-primary-400">
                            <MdSettings className={'buttonIcon'}/>
                            <span>Ustawienia</span>
                        </button>
                    </li> */}
                </ul>
            </div>
        </div>
    );
}

export default SidebarMenu;