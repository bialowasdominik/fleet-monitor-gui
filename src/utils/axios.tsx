import axios from "axios";

export default axios.create({
    baseURL:'https://fleet-monitor-backend.azurewebsites.net/api'
});