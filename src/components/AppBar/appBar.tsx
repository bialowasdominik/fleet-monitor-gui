import React, { useState, useRef } from 'react';
import {MdMenu,MdAccountCircle,MdNotifications} from 'react-icons/md';
import { Sidebar } from 'primereact/sidebar';
import { Menu } from 'primereact/menu';
import SidebarMenu from '../sidebarMenu/SidebarMenu';
import { useNavigate } from 'react-router-dom';
import "./appBar.css";
import "primeflex/primeflex.css";

function AppBar(){
    const menu = useRef<any>(null);
    const items = [
        {
            label: 'Ustawienia',
            icon: 'pi pi-cog'
        },
        {
            label: 'Wyloguj',
            icon: 'pi pi-power-off'
        }
    ];
    const [visibleLeft, setVisibleLeft] = useState(false);
    const navigate = useNavigate();
    return(<div>
        <div className='flex justify-content-between flex-wrap container purple-container'>
            <div className="flex align-items-center h-3rem justify-content-center font-bold text-white border-round m-2">
                <button className="roundButton menuVisbilityButton" onClick={() => setVisibleLeft(true)}><MdMenu className='text-color-secondary'/></button>
            </div>
            <div className="flex align-items-center justify-content-center w-11rem h-3rem font-bold text-white border-round m-2">
                <img src={require('../../../images/logo2.png')} alt="Logo"/>
            </div>
            <div className="flex justify-content-center font-bold text-white mr-2">
                <div className='flex h-3rem'>
                    <button onClick={(event) => {menu?.current?.toggle(event)}} className='roundButton'>
                        <MdAccountCircle className='text-color-secondary'/>
                    </button>
                </div>
            </div>
        </div>
        <Sidebar visible={visibleLeft} onHide={() => setVisibleLeft(false)}>
            <SidebarMenu/>
        </Sidebar>
        <Menu model={items} popup ref={menu} className="absolute right-0 mt-3 mr-1"/>
        </div>
    );
}

export default AppBar;