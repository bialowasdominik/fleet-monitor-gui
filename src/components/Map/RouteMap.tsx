import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

interface MapProps{
  devicesLocations?: any[];
  mapCenter: number[];
  mapZoom: number;
  scrollWhellZoom?: boolean;
  route: number[][];
}

function Map(props:MapProps) {

  const position: LatLngExpression = [props.mapCenter[0], props.mapCenter[1]];
  const limeOptions = { color: 'red' }
  let polyline = props.route as [number, number][];
  
  return (
    <div className="shadow-2 border-round-xl">
        <MapContainer center={position} zoom={props.mapZoom} scrollWheelZoom={props.scrollWhellZoom}>
        <TileLayer
            attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline pathOptions={limeOptions} positions={polyline}/>
        </MapContainer>
    </div>
  );
}

export default Map;