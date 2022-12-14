import React from 'react';
import {Button} from "primereact";
import {useNavigate} from "react-router-dom";

function Welcome(){
    const navigate = useNavigate();
        return(
            <div className={"landingPage"} style={{paddingBottom: '100px',backgroundColor: 'white'}}>
            <div className="grid grid-nogutter surface-0 text-800" style={{height: '100%', marginBottom: '100px'}}>
                <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
                    <section>
                        <span className="block text-6xl font-bold mb-1">Fleet monitor</span>
                        <div className="text-6xl text-primary font-bold mb-3">zadbaj o swoją firmę</div>
                        <p className="mt-0 mb-4 text-700 line-height-3">Zwiększ bezpieczeństwo oraz zyski monitorując i rejestrując położenie swoich pojazdów!</p>
                        <Button onClick={()=>navigate('/register')} label="Zarejestruj się" type="button" className="mr-3 p-button-raised" />
                        <Button onClick={()=>navigate('/login')} label="Zaloguj" type="button" className="p-button-outlined" />
                    </section>
                </div>
                <div className="col-12 md:col-6 overflow-hidden">
                    <img src={require('../../assets/images/landing_page_image.jpg')} alt={'altLogo'} className="md:ml-auto block md:h-full" style={{width:'100%'}}/>
                </div>
            </div>
                <div className="surface-0 text-center" style={{width: '95%'}}>
                    <div className="mb-3 font-bold text-2xl">
                        <span className="text-900">Jeden produkt, </span>
                        <span className="text-blue-600">wiele możliwości</span>
                    </div>
                    <div className="text-700 text-sm mb-6">Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna.</div>
                    <div className="grid">
                        <div className="col-12 md:col-4 mb-4 px-5">
                            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                <i className="pi pi-check-circle text-4xl text-blue-500"></i>
                            </span>
                            <div className="text-900 mb-3 font-medium">Prosta obsługa</div>
                            <span className="text-700 text-sm line-height-3">Ornare suspendisse sed nisi lacus sed viverra tellus. Neque volutpat ac tincidunt vitae semper.</span>
                        </div>
                        <div className="col-12 md:col-4 mb-4 px-5">
                            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                <i className="pi pi-globe text-4xl text-blue-500"></i>
                            </span>
                            <div className="text-900 mb-3 font-medium">Szybkie i globalne rozwiązanie</div>
                            <span className="text-700 text-sm line-height-3">Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus.</span>
                        </div>
                        <div className="col-12 md:col-4 mb-4 px-5">
                            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                                <i className="pi pi-github text-4xl text-blue-500"></i>
                            </span>
                            <div className="text-900 mb-3 font-medium">Open Source</div>
                            <span className="text-700 text-sm line-height-3">Nec tincidunt praesent semper feugiat. Sed adipiscing diam donec adipiscing tristique risus nec feugiat. </span>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default Welcome;