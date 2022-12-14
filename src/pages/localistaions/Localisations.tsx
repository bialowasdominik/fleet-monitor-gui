import { Divider } from 'primereact';
import Map from '../../components/Map/Map';
import { DevicePosition } from '../../models/DevicePosition';

function Localisations(){
    const items = [
        [
            52.22613999752999, 21.0066839158263
        ],
        [
            52.22572596521731, 21.006898492528766
        ],
        [
            52.22503918882038, 21.003760308255238
        ],
        [
            52.22758908024798, 21.00238165274663
        ],
        [
            52.228471884738624, 21.005652181542562
        ],
        [
            52.23172469063947, 21.003517143292186
        ],
        [
            52.23169512075072, 21.003431312611198
        ],
        [
            52.231632695365334, 21.003356210765336
        ],
        [
            52.23149141653747, 21.003431312611198
        ]
     ];

    const list: DevicePosition[] = [
        {
            deviceName: '8S6D5A096D',
            driverFullname: 'Bronisław Zając',
            vehicleRegisterNumber: 'SC52550',
            vehicleBrand: 'Ford',
            vehicleModel: 'Transit',
            vin: '6FPKFBRB8YMV81323',
            lat: 52.23150209678616,
            lon: 21.003418680863838
        }
      ];
    return(
        <div>
            <span className="text-color font-bold text-3xl">Lokalizacje</span>
            <Divider />
                <div className='w-full'>
                    <Map 
                        devicesLocations={list} 
                        mapCenter={[52.23150209678616, 21.003418680863838]} 
                        scrollWhellZoom={true} 
                        mapZoom={15} 
                        route={items}
                        routeColor={'red'}
                    />
                </div>
        </div>
    );
}

export default Localisations;