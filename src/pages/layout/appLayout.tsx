import React from 'react';
import AppBar from '../../components/AppBar/appBar';
import SidebarMenu from '../../components/sidebarMenu/SidebarMenu';
import Content from '../../components/Content';
import Activity from '../../components/Activity/Activity';
import './appLayout.css';

function appLayout(){
    return(
        <div className='grid'>
            <div className='col-2 desktopMenu menuMock mt-6'>
                <div className='fixed'>
                    <SidebarMenu/>
                </div>
            </div>
            <div className='col mt-6'>
                <Content/>
            </div>
            <div className='col-2 desktopMenu menuMock mt-6'>
                <div className='fixed'>
                    <Activity/>
                </div>
            </div>
        </div>
    );

}

export default appLayout;