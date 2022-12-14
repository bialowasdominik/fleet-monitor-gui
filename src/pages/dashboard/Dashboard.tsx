import { Divider } from "primereact";
import { Link } from "react-router-dom";

function Dashboard(){
    return(
    <div>
        <span className="text-color font-bold text-3xl">Pulpit</span>
        <Divider />
        <div className="grid justify-content-between mt-3">
            <div className="col-12 md:col-6 lg:col-3 flex-grow-1">
                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round-xl">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Urządzenia</span>
                            <div className="text-900 font-medium text-xl">7</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round-xl" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-calculator text-blue-500 text-xl"></i>
                        </div>
                    </div>
                    <span className="text-red-500 font-medium">2 </span>
                    <span className="text-500">niski stan baterii</span>
                </div>
            </div>
            <div className="col-12 md:col-6 lg:col-3 flex-grow-1">
                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round-xl">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Oszczędności</span>
                            <div className="text-900 font-medium text-xl">25,100 zł</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-green-100 border-round-xl" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-dollar text-green-500 text-xl"></i>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">+12% </span>
                    <span className="text-500">w tym miesiącu</span>
                </div>
            </div>
            <div className="col-12 md:col-6 lg:col-3 flex-grow-1">
                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round-xl">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Powiadomienia</span>
                            <div className="text-900 font-medium text-xl">23</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-red-100 border-round-xl" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-bell text-red-500 text-xl"></i>
                        </div>
                    </div>
                    <Link to='notifications' className="no-underline"><span className="text-500">Przejdź do wszystkich</span></Link>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Dashboard;