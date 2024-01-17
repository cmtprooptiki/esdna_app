import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import Welcome from '../components/Welcome';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import axios from 'axios';
import ApexCharts from 'react-apexcharts';
import Select from 'react-select';

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

    case 'TSP':
      return {
        label:value < 50 ? 'Χαμηλή' : value >= 50 && value <= 80 ? 'Μέτρια' : 'Υψηλή',
        className: value < 50 ? 'green-text' : value >= 50 && value <= 80 ? 'yellow-text' : 'red-text'
    };
    // Add more cases as needed
    default:
      return { label: 'Άγνωστο', className: 'black-text' }; // Default label and class name
  }
};



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

  // State for selected metric and period
  const [selectedMetric, setSelectedMetric] = useState('PM10');
  const [selectedPeriod, setSelectedPeriod] = useState('2023-01-05');
  const [selectedBuilding, setSelectedBuilding] = useState('Είσοδος ΧΥΤΑ');
  

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

        const uniqueYears = Array.from(new Set(buildingMetrics.map((item) => item.year)));

        setChartOptions({
          ...chartOptions,
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
          metricname: selectedMetric,
          year: selectedPeriod,
        };

        const firstBuildingData = buildingMetrics.filter(
          (item) => item.metric.name === filterCriteria.metricname && item.year === filterCriteria.year
        );

        setFirstBuildingMetrics(firstBuildingData)
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
  }, [selectedPeriod, selectedMetric]);

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
    

<div class="columns">
  <div class="column">
    <div className="box">
                  <h3>Συνολικός αριθμός σημείων μέτρησης</h3>
                  <p>{buildingNames.length}</p>
                </div> 
        </div>
  <div class="column">
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
            options={[...buildingNames].map((buildingName) => ({ label: buildingName, value: buildingName }))}
          />



          <label>Select Metric for linechart and kpis:</label>
          <Select
            value={{ label: selectedMetric, value: selectedMetric }}
            onChange={(selectedOption) => setSelectedMetric(selectedOption.value)}
            options={[...uniqueMetricNames].map((metricName) => ({ label: metricName, value: metricName }))}
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
              <tr key={filterBuilding.id}>
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

        <div class="columns">
  <div class="column">
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


          <div class="column">
      <div className="box">
                  <h3>Μ.Ο. Μετρήσεων</h3>
                  <p>{average}</p>
                </div> 
          </div>
 
    </div>



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
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {buildingMetrics.map((buildingMetric, index) => (
              <tr key={buildingMetric.id}>
                <td>{index + 1}</td>
                <td>{buildingMetric.building.name}</td>
                <td>{buildingMetric.metric.name}</td>
                <td>{buildingMetric.value}</td>
                <td>{buildingMetric.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
            value={{ label: selectedMetric, value: selectedMetric }}
            onChange={(selectedOption) => setSelectedMetric(selectedOption.value)}
            options={[...uniqueMetricNames].map((metricName) => ({ label: metricName, value: metricName }))}
          />
          </div>


        <div className="box">
          <label>Select Period for Bar:</label>
          <Select
            value={{ label: selectedPeriod, value: selectedPeriod }}
            onChange={(selectedOption) => setSelectedPeriod(selectedOption.value)}
            options={[...uniqueYears].map((uniqueYear) => ({ label: uniqueYear, value: uniqueYear }))}
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
            {firstBuildingData.map((firstBuilding, index) => (
              <tr key={firstBuilding.id}>
                <td>{index + 1}</td>
                <td>{firstBuilding.building.name}</td>
                <td>{firstBuilding.metric.name}</td>
                <td>{firstBuilding.value}</td>
                <td>{firstBuilding.year}</td>
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
