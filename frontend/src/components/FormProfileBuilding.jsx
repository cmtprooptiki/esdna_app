import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import '../custom.css';
import ApexCharts from 'react-apexcharts';

import 'bootstrap/dist/css/bootstrap.min.css';

import ProfileMap from './ProfileMap';
import WeatherComponent from './WeatherComponent';
import apiBaseUrl from '../apiConfig';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';


const FormProfileBuilding = () => {
    const[name,setName]=useState("");
    const[lat,setLat]=useState("");
    const[lon,setLon]=useState("");
    const[category,setCategory]=useState("");
    const[msg,setMsg]=useState("");

    const navigate = useNavigate();

    const{id} = useParams();

    const [selectedPeriod, setSelectedPeriod] = useState('');

    const [uniqueYears, setUniqueYears] = useState(new Set());
    const [filteredData,setFilteredData]=useState([]);


    useEffect(()=>{
        const getBuildingById = async()=>{
            try {
                const response=await axios.get(`${apiBaseUrl}/buildings/${id}`);
                setName(response.data.name);
                setLat(response.data.lat);
                setLon(response.data.lon);
                setCategory(response.data.category);
                
                console.log(response.data)


                //make another call on building metrics table
                const response2 = await axios.get(`${apiBaseUrl}/buildingmetrics`);
                const apiData=response2.data

                const filterCriteria = {
                  // metricname: selectedMetric2,
                  year: selectedPeriod,
                };
                console.log("Print second response");

                const filterData =apiData.filter(
                  (item) => item.building.name === response.data.name && item.year === filterCriteria.year
                );
                setFilteredData(filterData);
                console.log(filterData);

                const uniqueYears = Array.from(new Set(apiData.map((item) => item.year)));
                setUniqueYears(uniqueYears);
                

            } catch (error) {
                if(error.response){
                    setMsg(error.response.data.msg);
                }
            }
        };
        getBuildingById();
    },[id,selectedPeriod]);


// Define data for the pie chart
const pieChartData = {
    series: [parseFloat(lat)],
    options: {
      chart: {
        type: 'pie',
      },
      labels: ['Latitude'],
    },
  };



    // return (
    //     <div>
    //         <h1 className='title'>Building</h1>
    //         <h2 className='subtitle'>{name}</h2>
    //         <p>{id}</p>
    //         <p>{lat}</p>
    //         <p>{lon}</p>
           
  
    //     </div>
    //   )


    return (
		<div>
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css" integrity="sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk=" crossorigin="anonymous" />
<div className="container">
    <div className="row">
      <div className="col-lg-5 col-md-6">
        <div className="mb-2">
          {/* <img className="w-25" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt=""/> */}
          {<ProfileMap name={name} lat={lat} lon={lon}></ProfileMap>}
        </div>
        <div className="mb-2">
          {/* <img className="w-25" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt=""/> */}
          {<WeatherComponent lat={lat} lon={lon}></WeatherComponent>}
        </div>

        <div className="mb-2 d-flex">
          <h4 className="font-weight-normal">{name}</h4>
          <div className="social d-flex ml-auto">
            <p className="pr-2 font-weight-normal">Follow on:</p>
            <a href="#/" className="text-muted mr-1">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#/" className="text-muted mr-1">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#/" className="text-muted mr-1">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#/" className="text-muted">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
        <div className="mb-2">
          <ul className="list-unstyled">
            <li className="media">
              <span className="w-25 text-black font-weight-normal">Latitude:</span>
              <label className="media-body">{lat}</label>
            </li>
            <li className="media">
              <span className="w-25 text-black font-weight-normal">Longitude: </span>
              <label className="media-body">{lon}</label>
            </li>
            <li className="media">
              <span className="w-25 text-black font-weight-normal">Κατηγορία Σημείου Μέτρησης: </span>
              <label className="media-body">{category}</label>
            </li>
           
          </ul>
        </div>
      </div>
      <div className="col-lg-7 col-md-6 pl-xl-3">
        <h5 className="font-weight-normal">Place Description</h5>
        <p>Along with your plans, you should consider developing an action orientation that will keep you motivated to move forward at all times. This requires a little self-discipline, but is a crucial component to achievement of any kind. Before starting any new activity, ask yourself if that activity will move you closer to your goals. If the answer is no, you may want to reconsider doing it at that time.</p>
        <div className="my-2 bg-light p-2">
          <p className="font-italic mb-0">The price is something not necessarily defined as financial. It could be time, effort, sacrifice, money or perhaps, something else.</p>
        </div>

        <h5 className="font-weight-normal">Personal Experience</h5>
        <div className="mb-2 mt-2 pt-1">
          <h5 className="font-weight-normal">Skill</h5>
        </div>

        <label>Επιλέξτε περίοδο μετρήσεων</label>
          <Select
            value={{ label: selectedPeriod, value: selectedPeriod }}
            onChange={(selectedOption) => setSelectedPeriod(selectedOption.value)}
            options={[...uniqueYears].map((uniqueYear) => ({ label: uniqueYear, value: uniqueYear,key:uuidv4() }))}
          />
          

        <div className="py-1">
        {filteredData.map((filterData, index) => (
          <div  className="progress">
            <div className="progress-bar-title"><p>{filterData.metric.name}</p></div>

            <div className="progress-bar" role="progressbar" style={{ width: '85%' }}  aria-valuenow="54" aria-valuemin="0" aria-valuemax="100">
              <span className="progress-bar-number">{filterData.value}</span>
            </div>
          </div>
        ))}
        </div>

        
    
      </div>




      <div className="mt-3">
        <ApexCharts
          options={pieChartData.options}
          series={pieChartData.series}
          type="pie"
          width="300"
        />
      </div>
      <div>
        
      </div>
    </div>
  </div>
		</div>
	);

  
}

export default FormProfileBuilding;