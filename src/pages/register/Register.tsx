import React, { useState, useRef, useEffect} from 'react';
import { Button, InputText, Checkbox, Toast } from "primereact";
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Calendar } from 'primereact/calendar';
import { Link } from "react-router-dom";
import axios from '../../utils/axios';
import './Register.css';
import { MdNearMe } from 'react-icons/md';

function Register(){
    const toast = useRef<any>(null);

    const [firstName, setFirstName] = useState('');

    const [lastName, setLastName] = useState('');

    const [email, setEmail] = useState('');
    const [validEmail,setValidEmail] = useState(false);

    const [dateOfBirth, setDateOfBirth] = useState<Date | Date[] | undefined>(undefined);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    const [confirmPassword, setconfirmPassword] = useState('');
    const [validconfirmPassword, setValidconfirmPassword] = useState(false);

    const [terms,setTerms] = useState(false);

    useEffect(()=>{
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    },[email]);

    useEffect(()=>{
        const result = PWD_REGEX.test(password);
        setValidPassword(result);
        const match = password === confirmPassword;
        setValidconfirmPassword(match);
    },[password,confirmPassword]);

    const showToast = (severity:string, title:string, message:string) => {
        toast.current.show({severity: severity, summary: title, detail:message, life: 10000});
    }

    const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%]).{10,50}$/;

    const REGISTER_URL = '/account/register';

    const header = <h6>Proszę wprowadzić hasło:</h6>;
    const footer = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Hasło musi zawierać: </p>
            <ul className="pl-2 ml-2 mt-0" style={{lineHeight: '1.5'}}>
                <li>Mała litera</li>
                <li>Wielka litera</li>
                <li>Cyfra</li>
                <li>Znak specjalny</li>
                <li>Minimum 10 znaków</li>
            </ul>
        </React.Fragment>
    );
    
    const convertDate=()=>{
        let year = dateOfBirth?.toLocaleString("default", { year: "numeric" });
        let month = dateOfBirth?.toLocaleString("default", { month: "2-digit" });
        let day = dateOfBirth?.toLocaleString("default", { day: "2-digit" });
        let formattedDate = year + "-" + month + "-" + day;
        return(formattedDate.toString());
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        let dateOfBirth = convertDate();
        
        try{
            await axios.post(
            REGISTER_URL,
            JSON.stringify({email,firstName,lastName,password,confirmPassword,dateOfBirth}),
            {
                headers:{'Content-Type':'application/json'}
            }
            ).then(()=>{
                showToast('success','Pomyślnie utowrzono konto','Przejdź na stronę logowania i wejdź na swoje konto!');
            }).catch((error)=>{
                if(error.response.status == 400){
                    showToast('warn', 'Konto istnieje!', 'Zaloguj się lub użyj opcji \'Zapomniałem hasła\'');
                }
            });
        }
        catch(err){
            showToast('error','Błąd!','Upss.. Coś poszło nie tak. Spróbuj ponownie później lub skontaktuj się z nami: fleetmonitor@help.com');
        }
    };

    return(
        <div className="flex align-items-center justify-content-center" style={{height: '100vh'}}>
            <Toast ref={toast}/>
        <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6"style={{marginTop:'auto',marginBottom: 'auto', maxWidth: '600px', marginLeft: '10px', marginRight:'10px'}}>
            <div className="text-center mb-5">
                    <button className="logoButton text-color mx-auto">
                        <MdNearMe className="text-7xl"/>
                        <span className="font-bold text-6xl">Fleet <span className='text-primary'>monitor</span></span>
                    </button>
                <div className="text-900 text-3xl font-medium mb-3">Witaj!</div>
                <span className="text-600 font-medium line-height-3">Masz już konto?</span>
                <Link to={'/login'} style={{textDecoration:'none'}}><a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Zaloguj się!</a></Link>
            </div>
            <form onSubmit={handleSubmit} style={{marginTop: '40px'}}>
                <div className="grid">
                    <span className={'p-float-label mb-4 col'}>
                        <InputText 
                        id="firstName" 
                        type="text" 
                        className="w-full"
                        autoComplete='off'
                        onChange={(e)=>setFirstName(e.target.value)}
                        required/>
                        <label 
                         id='firstNameLabel'
                         htmlFor="firstName" 
                         className="ml-2">
                            Imię *
                        </label>
                    </span>

                    <span className={'p-float-label mb-4 col'}>
                        <InputText 
                        id="lastName" 
                        type="text" 
                        className="w-full"
                        autoComplete='off'
                        onChange={(e)=>setLastName(e.target.value)}
                        required/>
                        <label 
                        id='lastNameLabel'
                        htmlFor="lastName" 
                        className="ml-2">
                            Naziwsko *
                        </label>
                    </span>
                </div>

                <span className={'p-float-label mb-4'}>
                    <InputText 
                    id="email" 
                    type="text" 
                    className="w-full"
                    onChange={(e)=>setEmail(e.target.value)}/>
                    <label htmlFor="email">E-mail *</label>
                </span>

                <span className="p-float-label mb-4">
                    <Calendar 
                    id="dateOfBirth" 
                    className="w-full" 
                    value={dateOfBirth} 
                    dateFormat="yy-mm-dd"
                    onChange={(e) => setDateOfBirth(e.value)} />
                    <label htmlFor="dateOfBirth">Data urodzenia</label>
                </span>

                <span className={'p-float-label mb-4'}>
                    <Password
                        id='password'
                        className="w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        header={header}
                        footer={footer}
                        toggleMask
                        promptLabel={'Hasło musi być mocne'}
                        weakLabel={'Słabe'}
                        mediumLabel={'Średnie'}
                        strongLabel={'Mocne'}
                        strongRegex={'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%]).{10,50}$'}
                        />
                    <label htmlFor="password" className="">Hasło *</label>
                </span>

                <span className={'p-float-label mb-4'}>
                    <Password 
                    id='confirmPassword'
                    className="w-full" 
                    feedback={false}
                    onChange={(e)=> setconfirmPassword(e.target.value)}
                    toggleMask/>
                    <label htmlFor="confirmPassword" className="mb-2">Powtórz hasło *</label>
                </span>

                <div className='text-gray-600 right-0'>* Pola wymagane</div>
                <div className="flex align-items-center justify-content-between mb-6 mt-4">
                    <div className="flex align-items-center">
                        <Checkbox id="terms" className="mr-2" checked={terms} onChange={e => setTerms(e.checked)}/>
                        <label htmlFor="terms">Akceptuję <a className="font-medium no-underline text-blue-500 cursor-pointer">warunki</a> korzystania z serwisu</label>
                    </div>
                </div>

                <Button disabled={!validEmail|| !validPassword || !validconfirmPassword || !firstName||!lastName||!dateOfBirth||!terms ? true : false} label="Zarejestruj się!" className="w-full" />

            </form>
        </div>
    </div>
    );
}
export default Register;