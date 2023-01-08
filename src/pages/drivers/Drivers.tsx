import { Button, Column, confirmDialog, ConfirmDialog, DataTable, Dialog, Divider, Dropdown, InputText, Paginator, Toast } from "primereact";
import { useEffect, useRef, useState } from "react";
import AppSettings from "../../utils/AppSettings";
import axios from "../../utils/axios";
import useAuth from "../../utils/hooks/useAuth";

function Drivers(){
    
    const { auth } = useAuth();
    const toast = useRef<any>(null);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [drivers,setDrivers] = useState<any>();
    const [vehicleDetailModal, setVehicleDetailModal] = useState(false);
    const [phrase, setPhrase] = useState('');
    const [pageNumber, setPageNumber] = useState('1');
    const [pageSize, setpageSize] = useState(5);
    const [sortBy, setSortBy] = useState<any>("Id");
    const [sortDirection, setSortDirection] = useState("ASC");
    const [totalItems, setTotalItems] = useState(0);
    const [createDriverFristname,setCreateDriverFristname] = useState<any>();
    const [createDriverLastname,setCreateDriverLastname] = useState<any>();
    const [updateUserId,setUpdateUserId] = useState<any>();
    const [headerName, setHeaderName] = useState<any>();
    const [driverDetails, setDrverDetails] = useState<any>();

    const params = {
        phrase,
        pageSize,
        pageNumber,
        sortBy,
        sortDirection
    }

    const onHide = () => {
        setDisplayBasic(false);
        clearEditForm();
    }

    const clearEditForm = () => {
        setCreateDriverFristname("");
        setCreateDriverLastname("");
        setUpdateUserId(null);
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
                <Button icon="pi pi-info-circle" className="mr-2 p-button-rounded p-button-outlined p-button-secondary" onClick = {()=>{showDriverDetailsModal(rowData)}} tooltip={"Szczegóły"}/>
                <Button onClick = {()=>
                    {
                        prepareEditData(rowData);
                        showModal(); 
                        setHeaderName("Edytuj kierowcę")
                    }
                }icon="pi pi-pencil" className="mr-2 p-button-rounded p-button-outlined p-button-secondary" tooltip={"Edytuj"}/>
                <Button onClick = {()=>{confirmDeleteDriver(rowData)}} icon="pi pi-times" className="p-button-danger p-button-outlined p-button-rounded" tooltip={"Usuń"}/>
            </div>
        );
    }

    const prepareEditData = (rowData:any) =>{
        setUpdateUserId(rowData.id);
        setCreateDriverFristname(rowData.firstName);
        setCreateDriverLastname(rowData.lastName);
    }

    const showDriverDetailsModal = (rowData:any) =>{
        const data = drivers.find((d:any)=>d.id === rowData.id);
        setDrverDetails(data);
        setVehicleDetailModal(true);
    }

    const options = [
        {name: "ID" , code: "Id"},
        {name: "Imię" , code: "firstName"},
        {name: "Nazwisko" , code: "lastName"},
    ]

    const onBasicPageChange = (event:any) => {
        const pageNumber = event.page;
        setPageNumber(pageNumber+1)
        setpageSize(event.rows);
    }

    const confirmDeleteDriver = (rowData:any) => {
        confirmDialog({
            message: `Jesteś pewien że chcesz usunąć kierowcę: ${rowData.firstName} ${rowData.lastName} ?`,
            header: 'Usuwanie pojazdu',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Tak',
            rejectLabel: 'Nie',
            closable: false,
            accept: () => deleteDriver(rowData.id)
        });
    }

    const renderFooter = (header:any) => {
        return (
            <div>
                <Button label="Anuluj" icon="pi pi-times" onClick={() => { onHide(); }} className="p-button-text" />
                <Button label="Zapisz" icon="pi pi-check" onClick={()=>{
                    if(headerName.includes("Dodaj")){
                        createDriver();
                    } 
                    else{
                        editDriver();
                    }
                    onHide()
                    }}/>
            </div>
        );
    }
    useEffect(()=>{
        getDrivers();
    },[phrase,pageSize,pageNumber,sortBy,sortDirection]);

    const getDrivers = () =>{
        axios.get(
            AppSettings.DRIVER_URL,
            {
                headers:{
                    'Content-Type':'application/json',
                    'Authorization' : `Bearer ${auth?.token}`
                },
                params
            }
            ).then((response)=>{
                setDrivers(response.data.items);
                setTotalItems(response.data.totalItem);
            });
    };

    const createDriver = ()=>{
        axios.post(
            AppSettings.DRIVER_URL,
            JSON.stringify({
                firstName: createDriverFristname,
                lastName: createDriverLastname
            }),
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${auth?.token}`
                }
            }
            ).then(()=>{
                getDrivers();
                showToast('success','Sukces!','Pomyślnie dodano kierowcę');
            }).catch((error)=>{
                showToast('error','Błąd!','Nie udało się dodać kierowcy');
            });
    }

    const deleteDriver = (id:any) => {
        axios.delete(
            AppSettings.DRIVER_URL+"/"+id,
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${auth?.token}`
                }
            }
            ).then(()=>{
                setPageNumber('1');
                showToast('success','Sukces!','Pomyślnie usunięto kierowcę');
                getDrivers();
            }).catch((error)=>{
                showToast('error','Błąd!','Nie udało się usunąć kierowcy');
            });
    }

    const editDriver = () => {
        axios.put(
            AppSettings.DRIVER_URL+"/"+updateUserId,
            JSON.stringify({
                firstName: createDriverFristname,
                lastName: createDriverLastname
            }),
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${auth?.token}`
                }
            }
            ).then(()=>{
                getDrivers();
                showToast('success','Sukces!','Pomyślnie zakutualizowano kierowcę');
            }).catch(()=>{
                showToast('error','Błąd!','Nie udało się zakutualizować kierowcy');
            });
    }

    return(
        <div>
            <ConfirmDialog />
            <Toast ref={toast}/>
            <div className="flex justify-content-between">
                <span className="text-color font-bold text-3xl">Kierowcy</span>
                <Button label="Dodaj" icon="pi pi-plus" className="p-button-rounded shadow-4" onClick={()=>{setHeaderName("Dodaj kierowcę");setDisplayBasic(true)}}/>
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
                        
                        <DataTable value={drivers} responsiveLayout="scroll"  
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" 
                        rows={pageSize} 
                        className="mt-3">
                            <Column field="id" header="ID"></Column>
                            <Column field="firstName" header="Imię"></Column>
                            <Column field="lastName" header="Nazwisko"></Column>
                            <Column header="Opcje" body={option} style={{width:'15%'}}></Column>
                        </DataTable>
                        <Paginator className="mt-3" first={1} rows={pageSize} totalRecords={totalItems} rowsPerPageOptions={[5, 10, 15]} onPageChange={onBasicPageChange}></Paginator>
                    </div>
                </div>
            </div>

            <Dialog header={headerName} visible={displayBasic} style={{ width: '22vw' }} footer={renderFooter} onHide={() => onHide()} closable={false}>
            <span className={'p-float-label mt-4'}>
                <InputText 
                    id="driverFirstName" 
                    type="text" 
                    className="w-full"
                    value={createDriverFristname}
                    onChange={(e)=>setCreateDriverFristname(e.target.value)}
                    />
                <label 
                    id='driverFirstName'
                    htmlFor="driverFirstName" 
                    className="ml-2">
                    Imię
                </label>
            </span>
            <span className={'p-float-label mt-5'}>
                <InputText 
                    id="driverLastName" 
                    type="text" 
                    className="w-full"
                    value={createDriverLastname}
                    onChange={(e)=>setCreateDriverLastname(e.target.value)}
                    />
                <label 
                    id='driverLastName'
                    htmlFor="driverLastName" 
                    className="ml-2">
                    Naziwsko
                </label>
            </span>
            </Dialog>

            <Dialog header={"Szczegóły kierowcy"} visible={vehicleDetailModal} style={{ width: '20vw' }} onHide={() => setVehicleDetailModal(false)}>
                <h2>{driverDetails?.firstName} {driverDetails?.lastName}</h2>
                <h4 className="mb-4">Numer identyfikacyjny: {driverDetails?.id}</h4>
                <Divider>Przypisane urządzenia</Divider>
                <DataTable value={driverDetails?.devices} responsiveLayout="scroll" className="mt-3" emptyMessage="Brak urządzeń">
                    <Column field="id" header="ID"></Column>
                    <Column field="name" header="Nazwa"></Column>
                </DataTable>
            </Dialog>
        </div>
    );
}

export default Drivers;