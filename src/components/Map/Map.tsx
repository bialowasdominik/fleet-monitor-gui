import L, { LatLngExpression } from "leaflet";
import { MapContainer, Marker, TileLayer, Popup, Polyline } from "react-leaflet";
import { useEffect } from "react";
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import icon from 'leaflet/dist/images/marker-icon.png';
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { DevicePosition } from "../../models/DevicePosition";


interface MapProps{
  devicesLocations?: DevicePosition[];
  mapCenter: number[];
  mapZoom: number;
  scrollWhellZoom?: boolean;
  route: number[][];
  routeColor: string;
}
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function Map(props:MapProps) {
  const position: LatLngExpression = [props.mapCenter[0], props.mapCenter[1]];

  const limeOptions = { color: props.routeColor }

  let polyline = props.route as [number, number][];

  useEffect(()=>{
    if(props.route?.length>1){
      polyline = props.route as [number, number][];
    }
    else{
      console.log("Route not found!");
    }
  },[props.route]);

  return (
    <div className="shadow-2 border-round-xl">
        <MapContainer center={position} zoom={props.mapZoom} scrollWheelZoom={props.scrollWhellZoom}>
        <TileLayer
            attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
          {
            props.devicesLocations?.map((item, index) => (
                <Marker
                key={index}
                position={[item.lat!, item.lon!]}
                title={`Pojazd: ${item.vehicleBrand} ${item.vehicleModel}`}
                >
                    <Popup>
                      <h2>
                        {item.vehicleBrand} {item.vehicleModel}<br/>
                      </h2>
                        <strong>Numer rejestracyjny:</strong> {item.vehicleRegisterNumber}<br/>
                        <strong>VIN:</strong> {item.vin}<br/>
                        <hr/>
                        <strong>Kierowca:</strong> {item.driverFullname}<br/>
                        <hr/>
                        <strong>Urządzenie:</strong> {item.deviceName}
                    </Popup>
                </Marker>
            ))
          }
          <Polyline pathOptions={limeOptions} positions={polyline}/>
        </MapContainer>
    </div>
  );
}

export default Map;