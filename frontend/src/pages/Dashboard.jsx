import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import Welcome from '../components/Welcome';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

import axios from 'axios';
import ApexCharts from 'react-apexcharts';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import BuildingMetricsTable from '../components/BuildingMetricsTable';
import {IconContext } from "react-icons";
import { GiBubbles } from "react-icons/gi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import '../dashboard.css';
import {getColorClass2,getLimitAnnotation} from '../components/HelperComponent';
import apiBaseUrl from '../apiConfig';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state=>state.auth));

  useEffect(()=>{
      dispatch(getMe());
  },[dispatch]);

  useEffect(()=>{
      if(isError){
          navigate("/");
      }
  },[isError,navigate]);

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const { isError } = useSelector((state) => state.auth);

  // State for building metrics
  const [buildingMetrics, setBuildingMetrics] = useState([]);

  const [uniqueMetricNames, setUniqueMetricNames] = useState(new Set());
  const [uniqueYears, setUniqueYears] = useState(new Set());
  const [buildingNames, setBuildingNames] = useState(new Set());


  const [firstBuildingData,setFirstBuildingMetrics]=useState([]);
  const [secondBuildingData,setSecondBuildingMetrics]=useState([]);
  
  const [filteredData,setFilteredData]=useState([]);
  const [average,setAverage]=useState(0.0);





  // State for LineChart
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'line',
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      categories: [],
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [5, 7, 5],
      curve: 'straight',
      dashArray: [0, 8, 5],
    },
    // title: {
    //   text: '',
    //   align: 'left',
    // },
    legend: {
      tooltipHoverFormatter: function (val, opts) {
        return val + ' - <strong>' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '</strong>';
      },
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6,
      },
    },
    grid: {
      borderColor: '#f1f1f1',
    },
    // annotations: {
    //   yaxis: [
    //     {
    //       y: 100,
    //       borderColor: '#00E396',
    //       label: {
    //         borderColor: '#00E396',
    //         style: {
    //           color: '#fff',
    //           background: '#00E396'
    //         },
    //         text: 'Y-axis annotation on 100'
    //       }
    //     }
    //   ]
    // }
  });

  const [chartSeries, setChartSeries] = useState([]);
  const [chartSeries3, setChartSeries3] = useState([]);

 // State for RadarChart
 const [chartOptions3, setChartOptions3] = useState({
  chart: {
    height: 350,
    type: 'radar',
    dropShadow: {
      enabled: true,
      blur: 1,
      left: 1,
      top: 1
    }
  },

  title: {
    text: 'Radar Chart - Multi Series'
  },
  stroke: {
    width: 2
  },
  fill: {
    opacity: 0.1
  },
  markers: {
    size: 0
  },
  xaxis: {
    categories: [],
  }


});




  // State for BarChart
  const [chartOptions2, setChartOptions2] = useState({
    chart: {
      type: 'bar',
      height: 350,
    },
    xaxis: {
      categories: [],
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: 'Ραβδόγραμμα Συγκέντρωσης Αερίου - Aνά Σημείο Μέτρησης και Aνά Περίοδο Μετρήσεων',
      align: 'left',
    },
  });

  const [chartSeries2, setChartSeries2] = useState([]);

  // State for selected metric and perio
  const [selectedMetric, setSelectedMetric] = useState('');
  const [selectedMetric2,setSelectedMetric2 ] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('');
  

  // const handleMetricChange = (event) => {
  //   setSelectedMetric(event.target.value);
  // };

  // const handlePeriodChange = (event) => {
  //   setSelectedPeriod(event.target.value);
  // };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/buildingmetrics`);
        const apiData = response.data;

        setBuildingMetrics(apiData);

        const uniqueNamesSet = new Set(apiData.map((item) => item.metric.name));
        setUniqueMetricNames(uniqueNamesSet);

        const uniqueBuildingNames = Array.from(new Set(apiData.map((item) => item.building.name)));
        setBuildingNames(uniqueBuildingNames);

        const uniqueYears = Array.from(new Set(apiData.map((item) => item.year)));
        setUniqueYears(uniqueYears);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   dispatch(getMe());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (isError) {
  //     navigate('/');
  //   }
  // }, [isError, navigate]);




  useEffect(() => {
    const fetchData = async () => {
      try {
        const chartData = [];

        buildingNames.forEach((buildingName) => {


          const buildingData = buildingMetrics.filter(
            (item) => item.building.name === buildingName && item.metric.name === selectedMetric
          );

          chartData.push({
            name: buildingName,
            data: buildingData.map((item) => item.value),
          });
        });

        setChartSeries(chartData);
        setChartSeries3(chartData);
        console.log(chartData);

        const limitAnnotation = getLimitAnnotation(selectedMetric);


        const uniqueYears = Array.from(new Set(buildingMetrics.map((item) => item.year)));


        const annotations = {
          yaxis: [
            {
              y: limitAnnotation.max,
              borderColor: '#ff0000',
              label: {
                borderColor: '#ff0000',
                style: {
                  color: '#fff',
                  background: '#ff0000'
                },
                text: `Max limit: ${limitAnnotation.max}`
              }
            }
          ]
        };
  
        // Add the min limit annotation only if it exists
        if (limitAnnotation.min !== undefined) {
          annotations.yaxis.push({
            y: limitAnnotation.min,
            borderColor: '#00ff00',
            label: {
              borderColor: '#00ff00',
              style: {
                color: '#fff',
                background: '#00ff00'
              },
              text: `Min limit: ${limitAnnotation.min}`
            }
          });
        }

        setChartOptions({
          ...chartOptions,
          xaxis: {
            categories: uniqueYears,
          },
          title: {
            text: 'Διαχρονικλη εξελιξη '+selectedMetric+' σε όλα τα σημεία μέτρησης',
            align: 'left',
          },
          annotations,

        });


        setChartOptions3({
          ...chartOptions3,
          xaxis: {
            categories: uniqueYears,
          },
       
         
        });

      } catch (error) {
        console.error('Error fetching data for LineChart:', error.message);
      }
    };

    fetchData();
  }, [selectedMetric, buildingNames]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filterCriteria = {
          metricname: selectedMetric2,
          year: selectedPeriod,
        };

        const firstBuildingData = buildingMetrics.filter(
          (item) => item.metric.name === filterCriteria.metricname && item.year === filterCriteria.year
        );
        const secondBuildingData = buildingMetrics.filter(
          (item) => item.metric.name === filterCriteria.metricname && item.year === filterCriteria.year
        );
        setFirstBuildingMetrics(firstBuildingData)
        setSecondBuildingMetrics(secondBuildingData)
        setChartSeries2([{ name: filterCriteria.metricname, data: firstBuildingData.map((item) => item.value) }]);

        setChartOptions2({
          ...chartOptions2,
          xaxis: {
            categories: Array.from(new Set(firstBuildingData.map((item) => item.building.name))),
          },
        });
      } catch (error) {
        console.error('Error fetching data for BarChart:', error.message);
      }
    };

    fetchData();
  }, [selectedPeriod, selectedMetric2]);

//Filtering logic for mo metrisewn
  useEffect(() => {
    const fetchData = async () => {
      try {
        const filterCriteria = {
          metricname: selectedMetric,
          buildingname: selectedBuilding,
        };

        const filteredData = buildingMetrics.filter(
          (item) => item.metric.name === filterCriteria.metricname && item.building.name === filterCriteria.buildingname
        );

        setFilteredData(filteredData)

        const sum = filteredData.reduce((accumulator, filteredData) => accumulator + filteredData.value, 0);
        const average = sum / filteredData.length;
        setAverage(average)
        // setChartSeries2([{ name: filterCriteria.metricname, data: firstBuildingData.map((item) => item.value) }]);

        // setChartOptions2({
        //   ...chartOptions2,
        //   xaxis: {
        //     categories: Array.from(new Set(firstBuildingData.map((item) => item.building.name))),
        //   },
        // });
      } catch (error) {
        console.error('Error fetching data for BarChart:', error.message);
      }
    };

    fetchData();
  }, [selectedBuilding, selectedMetric]);



  return (
    <Layout>
      <Welcome />
      
      <div className="dashboard-container">
      <p style={{fontSize:'25px', fontWeight:'bold'}}>Συγκεντρωτικός Πίνακας Μετρήσεων</p><br/>
      {<BuildingMetricsTable buildingMetrics={buildingMetrics}></BuildingMetricsTable>}
      <div className="jumbotron" >

        <div className="columns">
          <div className="column">
            <div className="box">
              <IconContext.Provider value={{ color: "white", size:'0.6em', className: "global-class-name" }}>

              <div className="icon-div">
              <HiOutlineLocationMarker />
              </div>
              </IconContext.Provider>
              <div className="layout-kpis">

              <h3  className="totals-text">Συνολικός αριθμός σημείων μέτρησης</h3>
              <p class="kpis-number">{buildingNames.length}</p>
              </div>
            </div> 
          </div>
          <div className="column">
            <div className="box">
            <IconContext.Provider value={{ color: "white", size:'0.6em', className: "global-class-name" }}>

              <div className="icon-div">
              <GiBubbles/>
              </div>
            </IconContext.Provider>
              <div className="layout-kpis">
              <h3 className="totals-text">Συνολικός αριθμός καταχωρημένων ρύπων</h3>
              <p class="kpis-number">{uniqueMetricNames.size}</p>
              </div>
            </div> 
          </div>
        
        </div>
        </div>


   
<div className="jumbotron" >
<p style={{fontSize:'25px', fontWeight:'bold'}}>Σειμιακή Αποτύπωση Ρύπου</p>
<br></br>
      <div className="box">

      <label>Επιλέξτε Σημείο Μέτρησης</label>
          <Select
            value={{ label: selectedBuilding, value: selectedBuilding }}
            onChange={(selectedOption) => setSelectedBuilding(selectedOption.value)}
            options={[...buildingNames].map((buildingName) => ({ label: buildingName, value: buildingName,key:uuidv4()  }))}
          />


          
          <label>Επιλέξτε ρύπο</label>
          <Select
            value={{ label: selectedMetric, value: selectedMetric }}
            onChange={(selectedOption) => setSelectedMetric(selectedOption.value)}
            options={[...uniqueMetricNames].map((metricName) => ({ label: metricName, value: metricName,key:uuidv4() }))}
          />

          
        </div>


        <div>
        {/* <div className="box">
        <h1>Filtered data Metrics:</h1>
        <div class="table-responsive-md">

        <table className='table is-stripped is-fullwidth'>
          <thead>
            <tr>
              <th>#</th>
              <th>Όνομα Σημείου</th>
              <th>Όνομα Ρύπου</th>
              <th>Τιμή</th>
              <th>Περίοδος Μέτρησης</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((filterBuilding, index) => (
              // <tr key={filterBuilding.id}>
              <tr key={uuidv4()}>
                <td>{index + 1}</td>
                <td>{filterBuilding.building.name}</td>
                <td>{filterBuilding.metric.name}</td>
                <td>{filterBuilding.value}</td>
                <td>{filterBuilding.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div> */}
        </div>

  <div className="columns">
    <div className="column">
      <div className="box">
          <h3>Τιμή τελευταίας Μέτρησης</h3>
          {filteredData.length > 0 && (
          <p>{filteredData[filteredData.length - 1].value}</p>
          )}

          <h3>Συγκέντρωση</h3>
          {filteredData.length > 0 && (

          <p>
          <span className={getColorClass2(filteredData[filteredData.length - 1].value,selectedMetric).className}>
        
      
          {getColorClass2(filteredData[filteredData.length - 1].value, selectedMetric).label}
          </span>
          </p>
            )}

      </div> 
    </div>


    <div className="column">
      <div className="box">
          <h3>Μ.Ο. Μετρήσεων</h3>
          <p>{average}</p>
        </div> 
    </div>
  </div>

  </div>
  
<div className="jumbotron" >
<p style={{fontSize:'25px', fontWeight:'bold'}}>Διαχρονική Εξέλιξη Ρύπου</p>
<br></br>
<div className="box">

<label>Επιλέξτε ρύπο</label>
<Select
            value={{ label: selectedMetric, value: selectedMetric }}
            onChange={(selectedOption) => setSelectedMetric(selectedOption.value)}
            options={[...uniqueMetricNames].map((metricName) => ({ label: metricName, value: metricName,key:uuidv4() }))}
          />


</div>

      
      {/* LineChart */}
      <div className="box">
        {/* <h1>Data List:</h1> */}
        <ApexCharts options={chartOptions} series={chartSeries} type='line' height={350} />
      </div>

      {/* <div className="box">
        <h1>Radar Chart:</h1>
        <ApexCharts options={chartOptions3} series={chartSeries3} type='radar' height={350} />
      </div> */}

      {/* Dropdown for selecting period */}
      {/* <div className="box">
        <label>Select Period for Bar:</label>
        <select value={selectedPeriod} onChange={handlePeriodChange}>
          {[...uniqueYears].map((uniqueYear) => (
            <option key={uniqueYear} value={uniqueYear}>
              {uniqueYear}
            </option>
          ))}
        </select>
      </div> */}

      {/* <div className="box">
          <label>Select Period:</label>
          <Select
            value={{ label: selectedPeriod, value: selectedPeriod }}
            onChange={(selectedOption) => setSelectedMetric(selectedOption.value)}
            options={[...uniqueYears].map((uniqueYear) => ({ label: uniqueYear, value: uniqueYear }))}
          />
        </div> */}

        </div>

        <div className="jumbotron" >
        <p style={{fontSize:'25px', fontWeight:'bold'}}>Σύγκριση συγκέντρωσης ρύπου στα σημεία μέτρησης </p><br/>
        <div className="box">

        <label>Επιλέξτε ρύπο</label>
          <Select
            value={{ label: selectedMetric2, value: selectedMetric2 }}
            onChange={(selectedOption) => setSelectedMetric2(selectedOption.value)}
            options={[...uniqueMetricNames].map((metricName) => ({ label: metricName, value: metricName,key:uuidv4()}))}
          />

          <label>Επιλέξτε περίοδο μετρήσεων</label>
          <Select
            value={{ label: selectedPeriod, value: selectedPeriod }}
            onChange={(selectedOption) => setSelectedPeriod(selectedOption.value)}
            options={[...uniqueYears].map((uniqueYear) => ({ label: uniqueYear, value: uniqueYear,key:uuidv4() }))}
          />
        </div>


      {/* Table for displaying building metrics for selected period */}
      {/* <div className="box">
        <h1>Building Metrics:</h1>
        <div class="table-responsive-md">
        <table className='table is-stripped is-fullwidth'>
          <thead>
            <tr>
              <th>#</th>
              <th>Όνομα Σημείου</th>
              <th>Όνομα Ρύπου</th>
              <th>Τιμή</th>
              <th>Περίοδος Μέτρησης</th>
            </tr>
          </thead>
          <tbody>
            {secondBuildingData.map((secondBuildingData, index) => (
              // <tr key={firstBuilding.id}>
              <tr key={uuidv4()}>
                <td>{index + 1}</td>
                <td>{secondBuildingData.building.name}</td>
                <td>{secondBuildingData.metric.name}</td>
                <td>{secondBuildingData.value}</td>
                <td>{secondBuildingData.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div> */}
      <p style={{fontSize:"25px", fontWeight:"bold"}}>Ραβδόγραμμα συγκέντρωση {selectedMetric2}</p><br/>
      {/* BarChart */}
      <div className="box">
        
        <ApexCharts options={chartOptions2} series={chartSeries2} type='bar' height={350} />
      </div>
    </div>
    
      </div>
    </Layout>
  );
};

export default Dashboard;
