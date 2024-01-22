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

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError } = useSelector((state) => state.auth);

  // State for building metrics
  const [buildingMetrics, setBuildingMetrics] = useState([]);

  const [uniqueMetricNames, setUniqueMetricNames] = useState(new Set());

  const [buildingNames, setBuildingNames] = useState(new Set());
  const [uniqueYears, setUniqueYears] = useState(new Set());

  const [firstBuildingData,setFirstBuildingMetrics]=useState([]);
  const [secondBuildingData,setSecondBuildingMetrics]=useState([]);
  
  const [filteredData,setFilteredData]=useState([]);
  const [average,setAverage]=useState(0.0);

// Function to determine text color based on value show status
const getColorClass = (value) => {
  if (value < 50) {
    return 'red-text';
  } else if (value >= 50 && value < 80) {
    return 'yellow-text';
  } else {
    return 'green-text';
  }
};


const getColorClass2 = (value, metricname) => {
  // Define color cases based on metricname
  switch (metricname) {
    case 'PM10':
      return{
        label: value < 50 ?'Χαμηλή': 'Υψηλή',
        className: value < 50 ? 'green-text' : 'red-text' 
    };
    case 'PM2.5':
      return{
        label: value < 20 ?'Χαμηλή': 'Υψηλή',
        className: value < 20 ? 'green-text' : 'red-text' 
    };
    case 'SO2':
      return{
        label: value < 125 ?'Χαμηλή': 'Υψηλή',
        className: value < 50 ? 'green-text' : 'red-text' 
    };
    case 'CO':
      return{
        label: value < 10 ?'Χαμηλή': 'Υψηλή',
        className: value < 10 ? 'green-text' : 'red-text' 
    };
    case 'NO2':
      return{
        label: value < 40 ?'Χαμηλή': 'Υψηλή',
        className: value < 40 ? 'green-text' : 'red-text' 
    };

    case 'TSP':
      return {
        label:value < 50 ? 'Χαμηλή' : value >= 50 && value <= 80 ? 'Μέτρια' : 'Υψηλή',
        className: value < 50 ? 'green-text' : value >= 50 && value <= 80 ? 'yellow-text' : 'red-text'
    };
    case 'TEQ PCDD/Fs':
      return {
        label:value < 42 ? 'Χαμηλή' : value >= 42 && value <= 150 ? 'Μέτρια' : 'Υψηλή',
        className: value < 42 ? 'green-text' : value >= 42 && value <= 150 ? 'yellow-text' : 'red-text'
    };
    case 'TEQ PCBS':
      return {
        label:value < 10 ? 'Χαμηλή' : value >= 10 && value <= 40 ? 'Μέτρια' : 'Υψηλή',
        className: value < 10 ? 'green-text' : value >= 10 && value <= 40 ? 'yellow-text' : 'red-text'
    };
    case 'ind PCBs':
      return {
        label:value < 60 ? 'Χαμηλή' : value >= 60 && value <= 180 ? 'Μέτρια' : 'Υψηλή',
        className: value < 60 ? 'green-text' : value >= 60 && value <= 180 ? 'yellow-text' : 'red-text'
    };
    case 'NO':
      return {
        label:value < 10 ? 'Χαμηλή' : value >= 10 && value <= 50 ? 'Μέτρια' : 'Υψηλή',
        className: value < 10 ? 'green-text' : value >= 10 && value <= 50 ? 'yellow-text' : 'red-text'
    };
    case 'OC/EC':
      return {
        label:value < 50 ? 'Χαμηλή' : value >= 50 && value <= 80 ? 'Μέτρια' : 'Υψηλή',
        className: value < 50 ? 'green-text' : value >= 50 && value <= 80 ? 'yellow-text' : 'red-text'
    };
    // Add more cases as needed
    default:
      return { label: 'Άγνωστο', className: 'black-text' }; // Default label and class name
  }
};
const getLimitAnnotation =(metricname)=>{
  switch (metricname) {
    case 'PM10':
      return{
        max: 50 
        
    };
    case 'PM2.5':
      return{
        max:20
    };
    case 'SO2':
      return{
        max: 125
    };
    case 'CO':
      return{
        max:10
    };
    case 'NO2':
      return{
        max:40 
    };
    case 'TSP':
      return {
        min:50,
        
        max:80 
    };
    case 'TEQ PCDD/Fs':
      return {
        min:42,
        max:150 
    };
    case 'TEQ PCBS':
      return {
        min:10,
        max:40 
    };
    case 'ind PCBs':
      return {
        min:60,
        max:180 
    };
    case 'NO':
      return {
        min:10,
        max:50 
    };
    case 'OC/EC':
      return {
        min:5/0.5,
        max:20/2 
    };
    // Add more cases as needed
    default:
      return { max:0}; // Default label and class name
  }
}


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
    title: {
      text: 'Page Statistics',
      align: 'left',
    },
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
      text: 'Page bar',
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
        const response = await axios.get('http://localhost:5000/buildingmetrics');
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

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError, navigate]);

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
          annotations,
          // annotations: {
          //   yaxis: [
          //     {
          //       y: getLimitAnnotation(selectedMetric).max,
          //       borderColor: '#ff0000',
          //       label: {
          //         borderColor: '#ff0000',
          //         style: {
          //           color: '#fff',
          //           background: '#ff0000'
          //         },
          //         text: 'Max limit '+getLimitAnnotation(selectedMetric).max
          //       }
          //     },
          //     {
          //       y: getLimitAnnotation(selectedMetric).min,
          //       borderColor: '#ff0000',
          //       label: {
          //         borderColor: '#ff0000',
          //         style: {
          //           color: '#fff',
          //           background: '#ff0000'
          //         },
          //         text: 'Min limit '+getLimitAnnotation(selectedMetric).min
          //       }
          //     },



          //   ]
          // }
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


      {/* Table for displaying building metrics */}
      <div  className="box">
        <h1>Building Metrics:</h1>
        <table className='table is-stripped is-fullwidth'>
          <thead>
            <tr>
              <th>No</th>
              <th>Building Name</th>
              <th>Metric Name</th>
              <th>Metric Value</th>
              <th>concentration</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {buildingMetrics.map((buildingMetric, index) => (
              // <tr key={buildingMetric.id}>
              <tr key={uuidv4()}>
                <td>{index + 1}</td>
                <td>{buildingMetric.building.name}</td>
                <td>{buildingMetric.metric.name}</td>
                <td>{buildingMetric.value}</td>
                
                  <span className={getColorClass2(buildingMetric.value, buildingMetric.metric.name).className}>
                    <td>{getColorClass2(buildingMetric.value, buildingMetric.metric.name).label}</td>
                  </span>
                
                <td>{buildingMetric.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


        <div className="columns">
          <div className="column">
            <div className="box">
              <h3>Συνολικός αριθμός σημείων μέτρησης</h3>
              <p>{buildingNames.length}</p>
            </div> 
          </div>
          <div className="column">
            <div className="box">
              <h3>Συνολικός αριθμός Αερίων</h3>
              <p>{uniqueMetricNames.size}</p>
            </div> 
          </div>
        
        </div>


   


      <div className="box">

      <label>Select Building for kpis:</label>
          <Select
            value={{ label: selectedBuilding, value: selectedBuilding }}
            onChange={(selectedOption) => setSelectedBuilding(selectedOption.value)}
            options={[...buildingNames].map((buildingName) => ({ label: buildingName, value: buildingName,key:uuidv4()  }))}
          />



          <label>Select Metric for linechart and kpis:</label>
          <Select
            value={{ label: selectedMetric, value: selectedMetric }}
            onChange={(selectedOption) => setSelectedMetric(selectedOption.value)}
            options={[...uniqueMetricNames].map((metricName) => ({ label: metricName, value: metricName,key:uuidv4() }))}
          />

          
        </div>


        <div>
        <div className="box">
        <h1>Filtered data Metrics:</h1>
        <table className='table is-stripped is-fullwidth'>
          <thead>
            <tr>
              <th>No</th>
              <th>Building Name</th>
              <th>Metric Name</th>
              <th>Metric Value</th>
              <th>Year</th>
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



      
      {/* LineChart */}
      <div className="box">
        <h1>Data List:</h1>
        <ApexCharts options={chartOptions} series={chartSeries} type='line' height={350} />
      </div>

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
        <div className="box">

        <label>Select Metric for Bar:</label>
          <Select
            value={{ label: selectedMetric2, value: selectedMetric2 }}
            onChange={(selectedOption) => setSelectedMetric2(selectedOption.value)}
            options={[...uniqueMetricNames].map((metricName) => ({ label: metricName, value: metricName,key:uuidv4()}))}
          />

          <label>Select Period for Bar:</label>
          <Select
            value={{ label: selectedPeriod, value: selectedPeriod }}
            onChange={(selectedOption) => setSelectedPeriod(selectedOption.value)}
            options={[...uniqueYears].map((uniqueYear) => ({ label: uniqueYear, value: uniqueYear,key:uuidv4() }))}
          />
        </div>


      {/* Table for displaying building metrics for selected period */}
      <div className="box">
        <h1>Building Metrics:</h1>
        <table className='table is-stripped is-fullwidth'>
          <thead>
            <tr>
              <th>No</th>
              <th>Building Name</th>
              <th>Metric Name</th>
              <th>Metric Value</th>
              <th>Year</th>
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

      {/* BarChart */}
      <div className="box">
        <h1>Bar Plot </h1>
        <ApexCharts options={chartOptions2} series={chartSeries2} type='bar' height={350} />
      </div>

      </div>
    </Layout>
  );
};

export default Dashboard;
