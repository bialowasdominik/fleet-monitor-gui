import { Button, Column, confirmDialog, ConfirmDialog, DataTable, Dialog, Divider, Dropdown, InputText, Paginator, Toast } from "primereact";
import { useEffect, useRef, useState } from "react";
import { CreateVehicle } from "../../models/CreateVehicle";
import AppSettings from "../../utils/AppSettings";
import axios from "../../utils/axios";
import useAuth from "../../utils/hooks/useAuth";

function Vehicles(){
    const { auth } = useAuth();
    const toast = useRef<any>(null);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [vehicleDetailModal, setVehicleDetailModal] = useState(false);
    const [phrase, setPhrase] = useState('');
    const [pageNumber, setPageNumber] = useState('1');
    const [pageSize, setpageSize] = useState(5);
    const [sortBy, setSortBy] = useState("Id");
    const [sortDirection, setSortDirection] = useState("ASC");
    const [totalItems, setTotalItems] = useState(0);
    const [vehicles,setVehicles] = useState();
    const [deviceOptions, setDeviceOptions] = useState<any>();
    const [headerName, setHeaderName] = useState<any>();
    const [vehicleDetails, setVehicleDetails] = useState<any>(new CreateVehicle());
    const [selectedDevice,setSelectedDevice] = useState<any>();
    const [seletedDeviceId, setSelectedDeviceId] = useState<any>();
    const [brand,setBrand] = useState<any>();
    const [model, setModel] = useState<any>();
    const [registrationNumber, setRegistrationNumber] = useState<any>();
    const [vin,setVin] = useState<any>();

    
    const params = {
        phrase,
        pageSize,
        pageNumber,
        sortBy,
        sortDirection
    }

    const onHide = () => {
        setDisplayBasic(false);
        setVehicleDetailModal(false);
        clearEditForm();
    }

    const clearEditForm = () => {
        setBrand(null);
        setModel(null);
        setRegistrationNumber(null);
        setVin(null);
        setSelectedDevice(null);
    }

    const showModal = () => {
        setDisplayBasic(true);
    }

    const sort = () =>{
        if(sortDirection === "ASC"){
            setSortDirection("DESC");
        }
        else{
            setSortDirection("ASC");
        }
    }

    const showToast = (severity:string, title:string, message:string) => {
        toast.current.show({severity: severity, summary: title, detail:message, life: 2000});
    }

    const option = (rowData:any) =>{
        return(
            <div>
                <Button onClick = {()=>{showVehicleDetailModal(rowData)}}icon="pi pi-info-circle" className="mr-2 p-button-rounded p-button-outlined p-button-secondary" tooltip={"Szczegóły"}/>
                <Button onClick = {()=>
                    {
                        getVehicleDetails(rowData.id);
                        setSelectedDeviceId(rowData.id);
                        showModal();
                        setHeaderName("Edytuj pojazd")
                    }
                }icon="pi pi-pencil" className="mr-2 p-button-rounded p-button-outlined p-button-secondary" tooltip={"Edytuj"}/>
                <Button onClick = {()=>{confirmDeleteVehicle(rowData)}} icon="pi pi-times" className="p-button-danger p-button-outlined p-button-rounded" tooltip={"Usuń"}/>
            </div>
        );
    }

    const selectedVehicleTemplate = (option: any, props: any) => {
        if (option) {
            return (
                <div><strong>ID:</strong> {option.id} <strong>Nazwa:</strong> {option.name}</div>
            );
        }

        return (
            <span>
                {props.placeholder}
            </span>
        );
    }

    const vehicleOptionTemplate = (option: any) => {
        return (
            <div><strong>ID:</strong> {option.id} <strong>Nazwa:</strong> {option.name}</div>
        );
    }

    const options = [
        {name: "ID" , code: "Id"},
        {name: "Marka" , code: "brand"},
        {name: "Model" , code: "model"},
        {name: "Nr rejestracyjny" , code: "registrationNumber"},
        {name: "VIN" , code: "vin"},
    ]

    const onBasicPageChange = (event:any) => {
        const pageNumber = event.page;
        setPageNumber(pageNumber+1)
        setpageSize(event.rows);
    }

    const renderFooter = () => {
        return (
            <div>
                <Button label="Anuluj" icon="pi pi-times" onClick={() => { onHide(); }} className="p-button-text" />
                <Button label="Zapisz" icon="pi pi-check" onClick={
                    () => {
                        if(headerName.includes("Edytuj")){
                            editVehicle();
                        }
                        else{
                            createVehicle();
                        }
                        onHide();
                    }
                }/>
            </div>
        );
    }

    const confirmDeleteVehicle = (rowData:any) => {
        confirmDialog({
            message: `Jesteś pewien że chcesz usunąć pojazd ${rowData.brand} ${rowData.model} o nr rejestracyjnym: ${rowData.registrationNumber} ?`,
            header: 'Usuwanie pojazdu',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Tak',
            rejectLabel: 'Nie',
            closable: false,
            accept: () => deleteVehicle(rowData.id)
        });
    }

    const showVehicleDetailModal = (rowData:any) => {
        getVehicleDetails(rowData.id);
        setVehicleDetailModal(true);
    } 

    const getVehciles = () =>{
        axios.get(
            AppSettings.VEHICLE_URL,
            {
                headers:{
                    'Content-Type':'application/json',
                    'Authorization' : `Bearer ${auth?.token}`
                },
                params
            }
            ).then((response)=>{
                setVehicles(response.data.items);
                setTotalItems(response.data.totalItem);
            });
    };
    
    const createVehicle = ()=>{
        axios.post(
            AppSettings.VEHICLE_URL,
            JSON.stringify(
                {
                    brand,
                    model,
                    registrationNumber,
                    vin,
                    deviceId: selectedDevice.id
                }),
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${auth?.token}`
                }
            }
            ).then(()=>{
                getVehciles();
                onHide();
                showToast('success','Sukces!','Pomyślnie dodano pojazd');
            }).catch(()=>{
                onHide();
                showToast('error','Błąd!','Nie udało się dodać pojazd');
            });
    }

    const getVehicleDetails = (id:any) =>{
        axios.get(
            AppSettings.VEHICLE_URL+"/details/"+id,
            {
                headers:{
                    'Content-Type':'application/json',
                    'Authorization' : `Bearer ${auth?.token}`
                }
            }
            ).then((response)=>{
                setBrand(response.data.brand);
                setModel(response.data.model);
                setRegistrationNumber(response.data.registrationNumber);
                setVin(response.data.vin);
                setSelectedDevice(deviceOptions.find((d:any)=>d.id == response.data.deviceId));
            }).catch(()=>{
                onHide();
                showToast('error','Błąd!','Nie można odczytać szczegółów pojazdu');
            });
    };

    const deleteVehicle = (id:any) => {
        axios.delete(
            AppSettings.VEHICLE_URL+"/"+id,
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${auth?.token}`
                }
            }
            ).then(()=>{
                setPageNumber('1');
                showToast('success','Sukces!','Pomyślnie usunięto pojazd');
                getVehciles();
            }).catch(()=>{
                showToast('error','Błąd!','Nie udało się usunąć pojazdu');
            });
    }

    const getDevices = async() => {
        await axios.get(
            AppSettings.DEVICE_URL+"/list",
            {
                headers:{
                    'Content-Type':'application/json',
                    'Authorization' : `Bearer ${auth?.token}`
                }
            }
            ).then((response)=>{
                setDeviceOptions(response.data);
            });
    };

    const editVehicle = () =>{
        axios.put(
            AppSettings.VEHICLE_URL+"/"+seletedDeviceId,
            JSON.stringify({
                brand,
                    model,
                    registrationNumber,
                    vin,
                    deviceId: selectedDevice.id
            }),
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${auth?.token}`
                }
            }
            ).then(()=>{
                getVehciles();
                showToast('success','Sukces!','Pomyślnie zakutualizowano pojazd');
            }).catch(()=>{
                showToast('error','Błąd!','Nie udało się zakutualizować pojazdu');
            });
    }

    useEffect(()=>{
        getDevices();
    },[])

    useEffect(()=>{
        getVehciles();
    },[phrase,pageSize,pageNumber,sortBy,sortDirection]);

    return(
        <div>
            <ConfirmDialog />
            <Toast ref={toast}/>
            <div className="flex justify-content-between">
                <span className="text-color font-bold text-3xl">Pojazdy</span>
                <Button label="Dodaj" icon="pi pi-plus" className="p-button-rounded shadow-4" onClick={() => {setVehicleDetails(new CreateVehicle()); showModal(); setHeaderName("Dodaj pojazd")}}/>
            </div>
            <Divider />
            <div className="grid justify-content-between mt-3">
                <div className="col-12 md:col-6 lg:col-3 flex-grow-1">
                    <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round-xl">
                        <div className="flex justify-content-between mt-3">
                            <span className="p-float-label p-input-icon-left w-full mr-3">
                                <i className="pi pi-search"/>
                                <InputText 
                                    id="searchPhrase" 
                                    type="text"
                                    onChange={(e)=>setPhrase(e.target.value)}
                                />
                                <label htmlFor="searchPhrase">Wyszukaj</label>
                            </span>
                            <Dropdown value={sortBy} optionLabel="name" options={options} onChange={(e)=> setSortBy(e.target.value.code)} className="mr-3"/>
                            <Button  icon="pi pi-sort-alt" className="p-button-text" onClick={()=>sort()}/>
                        </div>
                        <DataTable value={vehicles} responsiveLayout="scroll"  
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" 
                        rows={pageSize} 
                        className="mt-3">
                            <Column field="id" header="ID"></Column>
                            <Column field="brand" header="Marka"></Column>
                            <Column field="model" header="Model"></Column>
                            <Column field="registrationNumber" header="Nr rejestracyjny"></Column>
                            <Column header="Opcje" body={option} style={{width:'15%'}}></Column>
                        </DataTable>
                        <Paginator className="mt-3" first={1} rows={pageSize} totalRecords={totalItems} rowsPerPageOptions={[5, 10, 15]} onPageChange={onBasicPageChange}></Paginator>
                    </div>
                </div>
            </div>

            <Dialog header={headerName} visible={displayBasic} style={{ width: '22vw' }} footer={renderFooter} onHide={() => onHide()} closable={false}>
                    <span className='p-float-label mt-5'>
                    <InputText 
                        id="vehicleBrand" 
                        type="text" 
                        className="w-full"
                        value={brand}
                        onChange={(e)=>{setBrand(e.target.value)}}/>
                    <label 
                        id='vehcileBrand'
                        htmlFor="vehcileBrand" 
                        className="ml-2">
                        Marka
                    </label>
                    </span>        
                    <span className='p-float-label mt-5'>
                    <InputText 
                        id="vehcileModel" 
                        type="text" 
                        className="w-full"
                        value={model}
                        onChange={(e)=>{setModel(e.target.value)}}/>
                    <label 
                        id='vehcileModel'
                        htmlFor="vehcileModel" 
                        className="ml-2">
                        Model
                    </label>
                    </span>        
                    <span className='p-float-label mt-5'>
                    <InputText 
                        id="vehicleRegistrationNumber" 
                        type="text" 
                        className="w-full"
                        value={registrationNumber}
                        onChange={(e)=>{setRegistrationNumber(e.target.value)}}/>
                    <label 
                        id='vehicleRegistrationNumber'
                        htmlFor="vehicleRegistrationNumber" 
                        className="ml-2">
                        Nr rejestracyjny
                    </label>
                    </span>        
                    <span className='p-float-label mt-5'>
                    <InputText 
                        id="vehcileVin" 
                        type="text" 
                        className="w-full"
                        value={vin}
                        onChange={(e)=>{setVin(e.target.value)}}/>
                    <label 
                        id='vehcileVin'
                        htmlFor="vehcileVin" 
                        className="ml-2">
                        VIN
                    </label>
                    </span>
                    <div className="mt-3 text-justify">Z poniższej listy rozwijanej wybierz urządzenie, które bedzie znajdować się w pojeździe w celu rejestrowania jego przejazdów: </div>
                    <Dropdown
                        value={selectedDevice} 
                        options={deviceOptions} 
                        onChange={e=>{setSelectedDevice(e.value)}}
                        optionLabel="brand" 
                        filter
                        showClear 
                        resetFilterOnHide
                        filterPlaceholder="Wyszukaj po ID urządzenia" 
                        filterBy="id" 
                        placeholder="Wybierz urządzenie"
                        valueTemplate={selectedVehicleTemplate} 
                        itemTemplate={vehicleOptionTemplate} 
                        className="w-full mt-3"/>
                    </Dialog>

            <Dialog header="Szczegóły pojazdu" visible={vehicleDetailModal} style={{ width: '20vw' }} onHide={() => onHide()}>
                <span><b>Id:</b> {seletedDeviceId} <br/></span>
                <span className="mt-3"><b>Marka:</b> {brand}</span><br/>
                <span className="mt-3"><b>Model:</b> {model}</span><br/>
                <span className="mt-3"><b>Nr rejestracyjny:</b> {registrationNumber}</span><br/>
                <span className="mt-3"><b>VIN:</b> {vin}</span><br/>
                <Divider >Zainstalowane urządzenie</Divider>
                {/* <span className="mt-3"><b>Numer id:</b> {deviceId}</span><br/>
                <span className="mt-3"><b>Nazwa:</b> {deviceName}</span><br/> */}
            </Dialog>
        </div>
    );
}

export default Vehicles;