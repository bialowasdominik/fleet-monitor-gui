import { Accordion, AccordionTab, Button, Calendar, Divider, Dropdown, Toast} from 'primereact';
import { useEffect, useRef, useState } from 'react';
import RouteMap from '../../components/Map/RouteMap';
import AppSettings from '../../utils/AppSettings';
import axios from '../../utils/axios';
import useAuth from '../../utils/hooks/useAuth';

function Routes(){
    const {auth} = useAuth();
    const toast = useRef<any>(null);
    const [options, setOptions] = useState<any>();
    const [dateFrom, setDateFrom] = useState<any>();
    const [dateTo, setDateTo] = useState<any>();
    const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
    const [route, setRoute] = useState<any>([[0,0]]);

    const params = {
        dateFrom: dateFrom?.toISOString().replace('Z',''),
        dateTo: dateTo?.toISOString().replace('Z','')
    }

    const getRoute = () =>{
        axios.get(
            AppSettings.DEVICE_URL+"/"+selectedVehicle?.deviceId+"/position/route",
            {
                headers:{
                    'Content-Type':'application/json',
                    'Authorization' : `Bearer ${auth?.token}`
                },
                params
            }
            ).then((response)=>{
                if(response.data.length === 0){
                    toast.current.show({severity:'warn', summary: 'Brak tras', detail:'Nie znaleziono tras dla zadanych kryteriów wyszukiwania', life: 6000});
                }
                else{
                    setRoute(Array.from(response.data.map((item:any)=>(Array.from([item.latitude,item.longitude])))));
                }
            });
    }

    const getVehicles = () => {
        axios.get(
            AppSettings.VEHICLE_URL+"/list",
            {
                headers:{
                    'Content-Type':'application/json',
                    'Authorization' : `Bearer ${auth?.token}`
                }
            }
            ).then((response)=>{
                setOptions(response.data);
            });
    };

    useEffect(()=>{
        getVehicles();
    })

    const selectedVehicleTemplate = (option: any, props: any) => {
        if (option) {
            return (
                <div>{option.brand} {option.model} - <strong>{option.registrationNumber}</strong></div>
            );
        }

        return (
            <span>
                {props.placeholder}
            </span>
        );
    }

    const vehicleOptionTemplate = (option: any) => {
        return (
            <div>{option.brand} {option.model} <br/><strong>{option.registrationNumber}</strong></div>
        );
    }

    const searchRoute = () =>{
        getRoute();
    }

    return(
        <div>
            <Toast ref={toast}/>
            <span className="text-color font-bold text-3xl">Trasy</span>
            <Divider />
            <Accordion activeIndex={0}>
                <AccordionTab header="Ustaw dane przejazdu">
                <div>
                    <Dropdown
                        value={selectedVehicle} 
                        options={options} 
                        onChange={e=>setSelectedVehicle(e.value)} 
                        optionLabel="brand" 
                        filter 
                        showClear 
                        resetFilterOnHide
                        filterPlaceholder="Wyszukaj po numerze rejestracyjnym" 
                        filterBy="registrationNumber" 
                        placeholder="Wybierz pojazd"
                        valueTemplate={selectedVehicleTemplate} 
                        itemTemplate={vehicleOptionTemplate} 
                        className="w-full"
                    />
                    <div className='flex justify-content-between mt-3 mb-3'>
                        <span className='p-float-label mt-3 w-full'>
                            <Calendar id="timeFrom" value={dateFrom} onChange={(e) => setDateFrom(e.value)} showTime showSeconds className='w-full'/>
                            <label htmlFor="timeFrom">Czas od</label>
                        </span>
                        <span className='p-float-label mt-3 ml-3 w-full'>
                            <Calendar id="timeTo" value={dateTo} onChange={(e) => setDateTo(e.value)} showTime showSeconds className='w-full'/>
                            <label htmlFor="timeTo">Czas do</label>
                        </span>
                    </div>
                    <Button onClick={searchRoute} label='Pokaż' className='w-full mt-2 shadow-2 p-button-rounded'/>
                </div>
                </AccordionTab>
            </Accordion>
            <div className='w-full mt-3'>
                <RouteMap 
                    route={route}
                    mapCenter={[52.23150209678616, 21.003418680863838]} 
                    scrollWhellZoom={true} 
                    mapZoom={10}
                />
            </div>
        </div>
    );
}

export default Routes;