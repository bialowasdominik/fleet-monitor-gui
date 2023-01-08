import L, { LatLngExpression } from "leaflet";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import icon from 'leaflet/dist/images/marker-icon.png';
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { Link } from "react-router-dom";

interface MapProps{
  devicesLocations?: any[];
  mapCenter: number[];
  mapZoom: number;
  scrollWhellZoom?: boolean;
}

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function Map(props:MapProps) {

  const position: LatLngExpression = [props.mapCenter[0], props.mapCenter[1]];

  return (
    <div className="shadow-2 border-round-xl">
        <MapContainer center={position} zoom={props.mapZoom} scrollWheelZoom={props.scrollWhellZoom}>
        <TileLayer
            attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
          {
            props.devicesLocations?.map((item, index) => (
              item.positions.map((coords:any)=>(
                <Marker
                key={index}
                position={[coords.latitude, coords.longitude]}
                title={`Pojazd: `}
                >
                    <Popup>
                      <h2>
                        {item.vehicleBrand} {item.vehicleModel}<br/>
                      </h2>
                        <strong>Numer rejestracyjny:</strong> {item.vehicleRegistrationNumber}<br/>
                        <strong>VIN:</strong> {item.vehicleVIN} <br/>
                        <hr/>
                        <strong>Kierowca:</strong> {item.driverFirstName} {item.driverLastName}<br/>
                        <hr/>
                        <strong>Urządzenie: </strong>{item.name}
                        <hr/>
                        <strong>Data położenia: </strong>{coords.time.replace('T',' ')}
                        <hr/>
                        <Link to={""}>Pokaż trase</Link>
                    </Popup>
                </Marker>
            ))))
          }
        </MapContainer>
    </div>
  );
}

export default Map;