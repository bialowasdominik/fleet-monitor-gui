import axios from '../../utils/axios';
import { Button, Column, ConfirmDialog, confirmDialog, DataTable, Dialog, Divider, Dropdown, InputText, Paginator, Toast } from "primereact";
import { useEffect, useRef, useState } from "react";
import useAuth from '../../utils/hooks/useAuth';
import AppSettings from '../../utils/AppSettings';
import { DeviceDetails } from '../../models/DeviceDetails';

function Devices(){
    const { auth } = useAuth();
    const toast = useRef<any>(null);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [deviceDetailModal, setDeviceDetailModal] = useState(false);
    const [phrase, setPhrase] = useState('');
    const [pageNumber, setPageNumber] = useState('1');
    const [pageSize, setpageSize] = useState(5);
    const [sortBy, setSortBy] = useState("Id");
    const [sortDirection, setSortDirection] = useState("ASC");
    const [totalItems, setTotalItems] = useState(0);
    const [devices,setDevices] = useState();
    const [createdDeviceName,setCreatedDeviceName] = useState<any>();
    const [deviceDetails, setDeviceDetails] = useState<any>(new DeviceDetails());
    const [headerName,setHeaderName] = useState<any>();
    const [selectedDriver, setSelectedDriver] = useState<any>();
    const [selectedDriverId, setSelectedDriverId] = useState<any>();
    const [driverOptions, setDriverOptions] = useState<any>();
    const [updateDeviceId, setUpdateDeviceId] = useState<any>();

    const confirmDeleteDevice = (rowData:any) => {
        confirmDialog({
            message: `Jesteś pewien że chcesz usunąć urządzenie "${rowData.name}" o ID: ${rowData.id} ?`,
            header: 'Usuwanie urządzenia',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Tak',
            rejectLabel: 'Nie',
            accept: () => deleteDevice(rowData.id)
        });
    }
    
    const showDeviceDetailModal = (rowData:any) => {
        getDeviceDetails(rowData.id);
        setDeviceDetailModal(true);
    } 

    const renderFooter = () => {
        return (
            <div>
                <Button label="Anuluj" icon="pi pi-times" onClick={() => onHide()} className="p-button-text" />
                <Button label="Zapisz" icon="pi pi-check" onClick={()=>{
                    if(headerName.includes("Dodaj")){
                        createDevice();
                    } 
                    else{
                        editDevice();
                    }
                    onHide()
                    }} />
            </div>
        );
    }

    const option = (rowData:any) =>{
        return(
            <div>
                <Button onClick = {()=>{showDeviceDetailModal(rowData)}}icon="pi pi-info-circle" className="mr-2 p-button-rounded p-button-outlined p-button-secondary" tooltip={"Szczegóły"}/>
                <Button onClick = {()=>
                    {
                        getDeviceDetails(rowData.id);
                        setUpdateDeviceId(rowData.id);
                        showModal(); 
                        setHeaderName("Edytuj urządzenie")
                    }
                }icon="pi pi-pencil" className="mr-2 p-button-rounded p-button-outlined p-button-secondary" tooltip={"Edytuj"}/>
                <Button onClick = {()=>{confirmDeleteDevice(rowData)}} icon="pi pi-times" className="p-button-danger p-button-outlined p-button-rounded" tooltip={"Usuń"}/>
            </div>
        );
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

    const showModal = () => {
        getDrivers();
        setDisplayBasic(true);
    }

    const onHide = () => {
        setDisplayBasic(false);
        setDeviceDetailModal(false);
        clearEditForm();
    }

    const clearEditForm = () => {
        setCreatedDeviceName(null);
        setSelectedDriver(null);
        setSelectedDriverId(null);
    }

    const selectedVehicleTemplate = (option: any, props: any) => {
        if (option) {
            return (
                <div>{option.id} - {option.firstName} {option.lastName}</div>
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
            <div>{option.id} - {option.firstName} {option.lastName}</div>
        );
    }

    const options = [
        {name: "Nazwa" , code: "Name"},
        {name: "ID" , code: "Id"},
    ]

    const onBasicPageChange = (event:any) => {
        const pageNumber = event.page;
        setPageNumber(pageNumber+1)
        setpageSize(event.rows);
    }

    const params = {
        phrase,
        pageSize,
        pageNumber,
        sortBy,
        sortDirection
    }
    
    const deleteDevice = (id:any) => {
        axios.delete(
            AppSettings.DEVICE_URL+"/"+id,
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${auth?.token}`
                }
            }
            ).then(()=>{
                setPageNumber('1');
                showToast('success','Sukces!','Pomyślnie usunięto urządzenie');
                getDevices();
            }).catch((error)=>{
                showToast('error','Błąd!','Nie udało się usunąć urządzenia');
            });
    }

    const createDevice = ()=>{
        axios.post(
            AppSettings.DEVICE_URL,
            JSON.stringify({
                name: createdDeviceName,
                driverId: selectedDriverId
            }),
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${auth?.token}`
                }
            }
            ).then(()=>{
                getDevices();
                onHide();
                showToast('success','Sukces!','Pomyślnie dodano urządzenie');
            }).catch((error)=>{
                onHide();
                showToast('error','Błąd!','Nie udało się dodać urządzenia');
            });
    }

    const getDevices = () =>{
        axios.get(
            AppSettings.DEVICE_URL,
            {
                headers:{
                    'Content-Type':'application/json',
                    'Authorization' : `Bearer ${auth?.token}`
                },
                params
            }
            ).then((response)=>{
                setDevices(response.data.items);
                setTotalItems(response.data.totalItem);
            }).catch((error)=>{
            });
    };

    const getDeviceDetails = (id:any) =>{
        axios.get(
            AppSettings.DEVICE_URL+"/details/"+id,
            {
                headers:{
                    'Content-Type':'application/json',
                    'Authorization' : `Bearer ${auth?.token}`
                }
            }
            ).then((response)=>{
                setDeviceDetails(response.data);
                setCreatedDeviceName(response.data.name);
                setSelectedDriver(driverOptions.find((d:any)=>d.id == response.data.driverId));
            }).catch((error)=>{
                onHide();
                showToast('error','Błąd!','Nie można odczytać szczegółów urządzenia');
            });
    };

    const getDrivers = () =>{
        axios.get(
            AppSettings.DRIVER_URL+"/list",
            {
                headers:{
                    'Content-Type':'application/json',
                    'Authorization' : `Bearer ${auth?.token}`
                }
            }
            ).then((response)=>{
                setDriverOptions(response.data);
            });
    };

    const editDevice = () => {
        axios.put(
            AppSettings.DEVICE_URL+"/"+updateDeviceId,
            JSON.stringify({
                name: createdDeviceName,
                driverId: selectedDriverId
            }),
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${auth?.token}`
                }
            }
            ).then(()=>{
                getDrivers();
                showToast('success','Sukces!','Pomyślnie zakutualizowano urządzenie');
            }).catch(()=>{
                showToast('error','Błąd!','Nie udało się zakutualizować urządzenia');
            });
    }

    useEffect(()=>{
        getDrivers();
    },[])

    useEffect(()=>{
        getDevices();
    },[phrase,pageSize,pageNumber,sortBy,sortDirection]);
    
    return(
        <div>
            <ConfirmDialog />
            <Toast ref={toast}/>
            <div className="flex justify-content-between">
                <span className="text-color font-bold text-3xl">Urządzenia</span>
                <Button label="Dodaj" icon="pi pi-plus" className="p-button-rounded shadow-4" onClick={() => {setHeaderName("Dodaj urządzenie");showModal()}}/>
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
                        <DataTable value={devices} responsiveLayout="scroll"  
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" 
                        rows={pageSize} 
                        className="mt-3"
                        >
                            <Column field="id" header="ID"></Column>
                            <Column field="name" header="Nazwa urządzenia"></Column>
                            <Column header="Opcje" body={option} style={{width:'15%'}}></Column>
                        </DataTable>
                        <Paginator className="mt-3" first={1} rows={pageSize} totalRecords={totalItems} rowsPerPageOptions={[5, 10, 15]} onPageChange={onBasicPageChange}></Paginator>
                    </div>
                </div>
            </div>

            <Dialog header={headerName} visible={displayBasic} style={{ width: '22vw' }} footer={renderFooter} onHide={() => onHide()} closable={false}>
                <span className={'p-float-label mt-4'}>
                    <InputText 
                        id="deviceName" 
                        type="text" 
                        className="w-full"
                        value={createdDeviceName}
                        onChange={(e)=>setCreatedDeviceName(e.target.value)}
                        />
                    <label 
                        id='deviceName'
                        htmlFor="deviceName" 
                        className="ml-2">
                        Nazwa urządzenia
                    </label>
                </span>
                <Dropdown
                        value={selectedDriver} 
                        options={driverOptions} 
                        onChange={e=>{
                            setSelectedDriver(e.value);
                            setSelectedDriverId(e.value.id)
                        }}
                        optionLabel="brand" 
                        filter
                        showClear 
                        resetFilterOnHide
                        filterPlaceholder="Wyszukaj po ID kierowcy" 
                        filterBy="id" 
                        placeholder="Wybierz kierowcę"
                        valueTemplate={selectedVehicleTemplate} 
                        itemTemplate={vehicleOptionTemplate} 
                        className="w-full mt-3"/>
            </Dialog>

            <Dialog header="Szczegóły urządzenia" visible={deviceDetailModal} style={{ width: '22vw' }} onHide={() => onHide()}>
                <span><b>Identyfikator:</b> {deviceDetails?.id} <br/><b>Nazwa:</b> {deviceDetails?.name}</span>
                <Divider>Kierowca</Divider>
                <h4>{deviceDetails?.driverFirstName} {deviceDetails?.driverLastName}</h4>
                <Divider >Przypisany pojazd</Divider>
                <span><b>Marka:</b> {deviceDetails?.vehicleBrand}</span><br/>
                <span><b>Model:</b> {deviceDetails?.vehicleModel}</span><br/>
                <span><b>Model:</b> {deviceDetails?.vehicleRegistrationNumber}</span><br/>
                <span><b>VIN:</b> {deviceDetails?.vehicleVIN}</span><br/>
            </Dialog>
        </div>
    );
}

export default Devices;
