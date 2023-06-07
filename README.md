# Fleet monitor
>Front-end

Part of the system that was the subject of my engineering thesis. 

The system is designed to present current and historical data regarding vehicle trips in a clear manner. It enables profit optimization and ensures the safety of employees through real-time monitoring of vehicle locations.
 - The dashboard view displays the number of registered devices, drivers, and vehicles.
 - The location view presents a map with markers indicating the latest positions of vehicles. Clicking on a marker displays details about the vehicle, locator, and driver.
 - The route view allows the display of a route on the map based on the selected vehicle and time frame.
 - The views for drivers, devices, and vehicles present a table with data, enabling search, sorting, editing, and deletion of records.
 - The application is secured by adding user registration, login, and logout functions. 

The application was deployed in an Azure environment using a virtual machine, IIS server, and Azure SQL.

**Technologies used in project:**
- TypeScript
- React
- PrimeReact
- PrimeFlex
- Axios

**Below are recordings showing the most relevant features of the system**

- The video shows vehicles marked on the map with pins. The pins can be clicked to show details of the vehicles and the driver at that location.

https://github.com/bialowasdominik/fleet-monitor-gui/assets/106835786/9c2b3728-2176-4308-a5b8-cc914e80ef60


- The recording shows the function of visualizing completed routes.  After selecting the vehicle and the time period, the route completed by the selected vehicle is displayed on the map.

https://github.com/bialowasdominik/fleet-monitor-gui/assets/106835786/f324c572-2554-4723-bd0f-a28a2b9fca7e


