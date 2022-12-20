import { Divider } from 'primereact';
import { useEffect, useState } from 'react';
import Map from '../../components/Map/Map';
import AppSettings from '../../utils/AppSettings';
import axios from '../../utils/axios';
import useAuth from '../../utils/hooks/useAuth';

function Localisations(){
    const {auth} = useAuth();
    const [devices, setDevices] = useState();

    const getDevices = () => {
        axios.get(
            AppSettings.DEVICE_URL+"/actual-positions",
            {
                headers:{
                    'Content-Type':'application/json',
                    'Authorization' : `Bearer ${auth?.token}`
                }
            }
            ).then((response)=>{
              setDevices(response.data);
            });
    };

    useEffect(() => {
        const interval = setInterval(() => {
          getDevices();
        }, 1000);
        return () => clearInterval(interval);
      }, []);

    return(
        <div>
            <span className="text-color font-bold text-3xl">Lokalizacje</span>
            <Divider />
                <div className='w-full'>
                    <Map 
                        devicesLocations={devices} 
                        mapCenter={[52.23150209678616, 21.003418680863838]} 
                        scrollWhellZoom={true} 
                        mapZoom={10}
                    />
                </div>
        </div>
    );
}

export default Localisations;