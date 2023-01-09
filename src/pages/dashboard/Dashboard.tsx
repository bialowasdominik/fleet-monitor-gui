import { Divider } from "primereact";
import { useEffect, useState } from "react";
import { MdDevices, MdDirectionsCar, MdGroup } from "react-icons/md";
import AppSettings from "../../utils/AppSettings";
import axios from "../../utils/axios";
import useAuth from "../../utils/hooks/useAuth";

function Dashboard(){
    const {auth} = useAuth();
    const [deviceAmount,setDeviceAmount] = useState<any>();
    const [driverAmount,setDriverAmount] = useState<any>();
    const [vehicleAmount,setVehicleAmount] = useState<any>();

    const getDeviceAmount = () =>{
        axios.get(
            AppSettings.DEVICE_URL+"/amount",
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${auth?.token}`
                }
            }
            ).then((response)=>{
                setDeviceAmount(response.data);
            }
        );
    }

    const getDriverAmout = () =>{
        axios.get(
            AppSettings.DRIVER_URL+"/amount",
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${auth?.token}`
                }
            }
            ).then((response)=>{
                setDriverAmount(response.data);
            }
        );
    }

    const getVehiclesAmount = () =>{
        axios.get(
            AppSettings.VEHICLE_URL+"/amount",
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${auth?.token}`
                }
            }
            ).then((response)=>{
                setVehicleAmount(response.data);
            }
        );
    }

    useEffect(()=>{
        getDeviceAmount();
        getDriverAmout();
        getVehiclesAmount();
    },[])
    
    return(
    <div>
        <span className="text-color font-bold text-3xl">Pulpit</span>
        <Divider />
        <div className="grid justify-content-between mt-3">
            <div className="col-12 md:col-6 lg:col-3 flex-grow-1">
                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round-xl">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Urządzenia</span>
                            <div className="text-900 font-medium text-xl">{deviceAmount}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round-xl" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <MdDevices className="pi pi-calculator text-blue-500 text-xl"/>
                        </div>
                    </div>
                    <span className="text-500">zarejestrowanych w systemie</span>
                </div>             
            </div>
            <div className="col-12 md:col-6 lg:col-3 flex-grow-1">
                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round-xl">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Kierowcy</span>
                            <div className="text-900 font-medium text-xl">{driverAmount}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-green-100 border-round-xl" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <MdGroup className="pi pi-dollar text-green-500 text-xl"/>
                        </div>
                    </div>
                    <span className="text-500">zarejestrowanych w systemie</span>
                </div>
            </div>
            <div className="col-12 md:col-6 lg:col-3 flex-grow-1">
                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round-xl">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Pojazdy</span>
                            <div className="text-900 font-medium text-xl">{vehicleAmount}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-red-100 border-round-xl" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <MdDirectionsCar className="pi pi-bell text-red-500 text-xl"/>
                        </div>
                    </div>
                    <span className="text-500">zarejestrowanych w systemie</span>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Dashboard;