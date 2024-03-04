// Libaries
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Modules
import Home from 'pages/Home';
import Map from 'pages/Map';
import axios from 'axios';
import { useState } from 'react';

function App() {
    const [api, setApi] = useState({});
    const [dataYear, setDataYear] = useState({});
    // const currentDate = new Date();
    // const year = currentDate.getFullYear();
    // const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    // const day = String(currentDate.getDate()).padStart(2, '0');


    const fecthAPi = (dataType, timeLine) => {
        if (dataType === '') {
            setApi({})
            return;
        }
        if (dataType === 'weatherApi') {
            // axios.get(`https://environment-admin.onrender.com/api/v1/open-api/openweathermap/airs/filter?fromdate=${formattedDate}&todate=${formattedDate}`)
                axios
                  .get(
                    `http://localhost:8080/api/v1/open-api/openweathermap/airs/filter?fromdate=2023-03-04&todate=2024-05-22`
                  )
                  .then((response) => {
                    console.log(1);
                    setApi(response.data);
                  })
                  .catch((error) => console.error(error));
            return;

        }
        if (dataType === 'year') {

            axios.get(`http://localhost:8080/api/v1/stations/airs/filter?fromdate=${timeLine}-1&todate=${parseInt(timeLine)+1}-1`)
                .then((response) => {
                    setDataYear(response.data);

                })
                .catch(error => console.error(error))
            return;

        }
        if (dataType === 'excel') {
            if (timeLine.length !== 0) {
                axios.get(`http://localhost:8080/api/v1/stations/airs/filter?fromdate=${(timeLine[0].split('/'))[1]}-${(timeLine[0].split('/'))[0]}&todate=${(timeLine[1].split('/'))[1]}-${(timeLine[1].split('/'))[0]}`)
                    .then((response) => {
                        setApi(response.data);
                    })
                    .catch(error => console.error(error))
                return;
            }
            else {
                axios.get(`http://localhost:8080/api/v1/stations/airs/filter?fromdate=2020-12&todate=2021-1`)
                    .then((response) => {
                        setApi(response.data);
                    })
                    .catch(error => console.error(error))
                return;
            }
        }

    }
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home callApi={fecthAPi} />} />
                <Route exact path="/map" element={<Map callApi={fecthAPi} data={api} dataYear={dataYear}/>} />
            </Routes>
        </Router>
    );
}

export default App;
