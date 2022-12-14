import React from 'react';
import { Divider } from 'primereact';
function Notifications(){
    return(
        <div>
        <span className="text-900 font-medium text-3xl">Powiadomienia</span>
        <Divider />
        <div className="grid justify-content-between mt-3">
            <div className="col-12 md:col-6 lg:col-3 flex-grow-1">
                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round-xl">
                    Tabela
                </div>
            </div>
        </div>
    </div>
    );
}

export default Notifications;