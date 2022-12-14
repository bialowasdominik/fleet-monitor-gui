import { useState, useEffect} from "react";
import { ToggleButton } from 'primereact/togglebutton';
import { Button } from 'primereact/button';
import useAuth from "../../utils/hooks/useAuth";
import './Activity.css';

function Activity(){
    const { auth } = useAuth();
    const [theme, setTheme] = useState(true);
    const [name, setName] = useState('');

    useEffect(()=>{
        const name = Object.values(auth!);
        setName(name[1]);
    });

    return(
        <div className="activityContainer ml-4">
            <div className="flex align-items-center justify-content-between mr-5">
                <ToggleButton checked={theme} onChange={(e) => setTheme(e.value)} onLabel = '' offLabel = ''onIcon="pi pi-sun" offIcon="pi pi-moon" className="border-circle shadow-4"/>
                <div className = "flex align-items-center">
                    <div className="text-color-secondary mr-2">Cześć!,<br/><span className="text-color font-bold">{name}</span></div>
                    <Button icon="pi pi-user" className="p-button-rounded p-button-outlined h-full shadow-4"/>
                </div>
            </div>
            <div className="mt-6 text-color font-bold">Ostatnie powiadomienia</div>
            <div className="card mt-3 mr-5">
            </div>
        </div>
    );
}

export default Activity;