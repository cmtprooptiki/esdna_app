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
import {getLimitAnnotation,getbarcolor,showcol} from './HelperComponent';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
        <div className="mb-2 d-flex" style={{zIndex:"10"}}>
          {/* <img className="w-25" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt=""/> */}
          {<ProfileMap  name={name} lat={lat} lon={lon}></ProfileMap>}
        </div>
        <div className="mb-2 d-flex">
          {/* <img className="w-25" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt=""/> */}

          {<WeatherComponent lat={lat} lon={lon}></WeatherComponent>}
        </div>

        
        
      </div>
      <div className="col-lg-7 col-md-6 pl-xl-3">
        
        <div className='box'>
          <div className="mb-2 d-flex">
            <h2 style={{fontWeight:'bolder', fontSize:'35px'}} >{name}</h2>
            
          </div>
        
        <div className="mb-2 d-flex">
          
          <ul className="list-unstyled">
            <li className="media">
              <span className="w-5 text-black font-weight-normal">Γεωγραφικό Πλάτος: &nbsp;</span><label className="media-body"> {lat}</label>
            </li>
            <li className="media">
              <span className="w-5 text-black font-weight-normal">Γεωγραφικό Μήκος: &nbsp; </span>
              <label className="media-body"> {lon}</label>
            </li>
            <li className="media">
              <span className="w-5 text-black font-weight-normal">Κατηγορία Σημείου Μέτρησης: &nbsp;</span>
              <label className="media-body"> {category}</label>
            </li>
           
          </ul>
        </div>
        
        <label>Επιλέξτε περίοδο μετρήσεων</label>
          <Select 
            value={{ label: selectedPeriod, value: selectedPeriod }}
            onChange={(selectedOption) => setSelectedPeriod(selectedOption.value)}
            options={[...uniqueYears].map((uniqueYear) => ({ label: uniqueYear, value: uniqueYear,key:uuidv4() }))}
          />
          

        {/* <div className="py-1">
        {filteredData.map((filterData, index) => (
          <div  className="progress">
            <div className="progress-bar-title"><p>{filterData.metric.name}</p></div>

            <div className="progress-bar" role="progressbar" style={{ width: '85%' }}  aria-valuenow={filterData.value} aria-valuemin="0" aria-valuemax={getLimitAnnotation(filterData.metric.name).max}>
              <span className="progress-bar-number">{filterData.value}</span>
            </div>
          </div>
        ))}
        </div>

        <div className="py-2">
        {filteredData.map((filterData, index) => (
          <div  className="progress">
              <label for={filterData.metric.name}>{filterData.metric.name}:</label>
              <progress  id={filterData.metric.name} value={filterData.value} max={getLimitAnnotation(filterData.metric.name).max} className={filterData.value >= getLimitAnnotation(filterData.metric.name).max ? 'reached-max' : 'reached-min'}/>
          </div>
        ))}
        </div> */}
        <br></br>
          <div  >
              
              <Container>
              {filteredData.map((filterData, index) => (
                <div className='box'>
                <Row style={{backgroundColor:'#f2f2f266'}}>
                
                  <Col md="auto"><label for={filterData.metric.name}>{filterData.metric.name}</label>
                  </Col>
                  <Col>
                  
                  <ProgressBar label={filterData.value}  id={filterData.metric.name} variant={getbarcolor(filterData.value,getLimitAnnotation(filterData.metric.name))} now={filterData.value} max={getLimitAnnotation(filterData.metric.name).max} />
                  {showcol(filterData.value,getLimitAnnotation(filterData.metric.name).max,filterData.metric.unit)}
                  </Col>
                  <Col xs lg="2">
                  {filterData.value} {filterData.metric.unit}
                  </Col>
                  
                </Row>
                </div>

                ))}
              </Container>
          </div>
          </div>
    
      </div>


      
    </div>
  </div>
		</div>
	);

  
}

export default FormProfileBuilding;