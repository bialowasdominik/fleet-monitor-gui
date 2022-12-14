import React from 'react';
import PrimeReact from 'primereact/api';
import 'primereact/resources/themes/saga-orange/theme.css'
//import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/landingpage/LandingPage';
import Register from "./pages/register/Register";
import LoginPage from './pages/login/Login';
import AppLayout from './pages/layout/appLayout';
import RequireAuth from './components/RequireAuth';
PrimeReact.ripple = true;

// eslint-disable-next-line
const lightTheme = 'primereact/resources/themes/saga-green/theme.css';
// eslint-disable-next-line
const darkTheme = 'primereact/resources/themes/arya-green/theme.css';


function App() {
  return(
    <Routes>
      <Route path={'/'} element={<Welcome/>}/>
      <Route path={'/register'} element={<Register/>}/>
      <Route path={'/login'} element={<LoginPage/>}/>
      <Route element={<RequireAuth />}>
        <Route path={'/app/*'} element={<AppLayout/>}/>
      </Route>
    </Routes>
  );
}

export default App;
