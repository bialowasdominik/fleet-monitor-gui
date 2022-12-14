import {useRef, useState} from 'react';
import useAuth from '../../utils/hooks/useAuth';
import {Button,InputText,Checkbox, Toast} from "primereact";
import { Link, useNavigate, useLocation} from "react-router-dom";
import { MdNearMe } from 'react-icons/md';
import axios from '../../utils/axios';
import './login.css';
const LOGIN_URL = '/account/login';

function Login(){
    const toast = useRef<any>(null);
    const { setAuth } = useAuth();
    const [checked,setChecked] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/app/dashboard";
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const showToast = (severity:string, title:string, message:string) => {
        toast.current.show({severity: severity, summary: title, detail:message, life: 10000});
    }

    const handleSubmit = async(e:any) =>{
        e.preventDefault();
        console.log(email, password);
        try{
            await axios.post(
            LOGIN_URL,
            JSON.stringify({email,password}),
            {
                headers:{'Content-Type':'application/json'}
            }
            ).then((response)=>{
                setAuth(response.data);
                showToast('success','Pomyślnie zalogowano','');
                console.log(response.data);
                navigate(from, {replace: true});
            }).catch((error)=>{
                showToast('warn', 'Logowanie nieudane', 'Podano błędny login lub hasło');
            });
        }
        catch(err){
            showToast('error','Błąd!','Upss.. Coś poszło nie tak. Spróbuj ponownie później lub skontaktuj się z nami: fleetmonitor@help.com');
        }
    };

    return(
        <div className="flex align-items-center justify-content-center" style={{height: '100vh'}}>
            <Toast ref={toast}/>
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6" style={{marginTop:'auto',marginBottom: 'auto', maxWidth: '600px', marginLeft: '10px', marginRight:'10px'}}>
                <div className="text-center mb-5">
                    <button className="logoButton text-color mx-auto">
                        <MdNearMe className="text-7xl"/>
                        <span className="font-bold text-6xl">Fleet <span className='text-primary'>monitor</span></span>
                    </button>
                    <div className="text-color text-3xl font-medium mb-3">Witaj, ponownie!</div>
                    <span className="text-500 font-medium line-height-3">Nie masz konta?</span>
                    <Link to={'/register'} style={{textDecoration:'none'}}><span className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Zarejestruj się!</span></Link>
                </div>

                <form onSubmit={handleSubmit}>
                    <span className={'p-float-label p-input-icon-left mb-5 w-full'}>
                        <i className="pi pi-user"/>
                        <InputText 
                            id="email" 
                            type="text"
                            autoComplete='off'
                            onChange={(e)=>setEmail(e.target.value)}
                            value={email}
                            required
                        />
                        <label htmlFor="email">E-mail</label>
                    </span>

                    <span className={'p-float-label p-input-icon-left mb-5 w-full'}>
                        <i className="pi pi-key"/>
                        <InputText 
                            id="password" 
                            type="password"
                            autoComplete='off'
                            onChange={(e)=>setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <label htmlFor="password">Hasło</label>
                    </span>

                    <div className="flex align-items-center justify-content-between mb-6">
                        <div className="flex align-items-center">
                            <Checkbox id="rememberme" onChange={e => setChecked(e.checked)} checked={checked} className="mr-2" />
                            <label htmlFor="rememberme">Zapamiętaj mnie</label>
                        </div>
                        <Link to=""><span className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Zapomniałeś hasła?</span></Link>
                    </div>

                    <Button 
                        label="Zaloguj się" 
                        className="w-full"
                        disabled={!email || !password}
                    />
                </form>
            </div>
        </div>
    );
}

export default Login;