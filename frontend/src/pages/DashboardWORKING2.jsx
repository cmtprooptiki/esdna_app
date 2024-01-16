import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import Welcome from '../components/Welcome';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import axios from 'axios';
import ApexCharts from 'react-apexcharts';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError } = useSelector((state) => state.auth);

  const [buildingmetrics, setBuildingMetrics] = useState([]);

  const [firstBuildingData, setFirstBuildingData] = useState([]);
  // const [dataList, setDataList] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('PM10');

  const [selectedPeriod, setSelectedPeriod] = useState('2023-05-01');

  const [uniqueMetricNames, setUniqueMetricNames] = useState(new Set());

  const [uniqueYears, setUniqueYears] = useState(new Set());

  const [buildingNames, setBuildingNames] = useState(new Set());

  //Handle Dropdown menu clicks
  const handleMetricChange = (event) => {
    setSelectedMetric(event.target.value);
  };


  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };


//ChartOptions for LineChart
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
  //Extra Chart Graphics
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: [5, 7, 5],
    curve: 'straight',
    dashArray: [0, 8, 5]
  },
  title: {
    text: 'Page Statistics',
    align: 'left'
  },
  legend: {
    tooltipHoverFormatter: function(val, opts) {
      return val + ' - <strong>' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '</strong>'
    }
  },
  markers: {
    size: 0,
    hover: {
      sizeOffset: 6
    }
  },

  grid: {
    borderColor: '#f1f1f1',
  }
  //End extra here
});

//Chart Series for LineChart
const [chartSeries, setChartSeries] = useState([]);

const [chartOptions2, setChartOptions2] = useState({
  chart: {
    type: 'bar',
    height: 350
  },
  xaxis: {
    categories: [],
  },
  
  //Extra Chart Graphics
  dataLabels: {
    enabled: false
  },
  
  title: {
    text: 'Page bar',
    align: 'left'
  }

});

const [chartSeries2, setChartSeries2] = useState([]);
  
  //Use Effect for data table
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


        const uniqueYears= Array.from(new Set(apiData.map((item) => item.year)));
        setUniqueYears(uniqueYears);

      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);


//Use Effect for LineChart
useEffect(() => {

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/buildingmetrics');
      const apiData = response.data;

      const chartData = [];

      buildingNames.forEach((buildingName) => {
        const buildingData = apiData.filter(
          (item) => item.building.name === buildingName && item.metric.name === selectedMetric
        );
        chartData.push({
          name: buildingName,
          data: buildingData.map((item) => item.value),
        });
      });

      setChartSeries(chartData);

      const uniqueYears = Array.from(new Set(apiData.map((item) => item.year)));

      setChartOptions({
        ...chartOptions,
        xaxis: {
          categories: uniqueYears,
        },
      });
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  fetchData();
}, [selectedMetric, buildingNames]);






//Use Effect for Barplot
useEffect(() => {

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/buildingmetrics');
      const apiData = response.data;



    // Example criteria: Filter based on 'category' and 'value'
    const filterCriteria = {
      metricname: selectedMetric,
      //,
      year: selectedPeriod,
    };



      const firstBuildingData = apiData.filter(
        item =>  item.metric.name === filterCriteria.metricname && item.year === filterCriteria.year
      );


    setFirstBuildingData(firstBuildingData);
    const uniquefirstBuildingName = Array.from(new Set(firstBuildingData.map((item) => item.building.name)));

    setChartSeries2(
      { name: 'test', data: firstBuildingData.map(item => item.value) },
    
    );

    const chartData = [];

    
    chartData.push({
        // name: uniquefirstBuildingName,
        data: firstBuildingData.map((item) => item.value),
      });
    
    setChartSeries2(chartData);


    setChartOptions2({
      ...chartOptions2,
      xaxis: {
        categories: uniquefirstBuildingName,
      },
    });
    

    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  fetchData();
},  [selectedPeriod,selectedMetric]);





  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError, navigate]);



  



  return (
    <Layout>
      <Welcome />
      <div>
        <label>Select Metric:</label>
        <select value={selectedMetric} onChange={handleMetricChange}>
          {[...uniqueMetricNames].map((metricName) => (
            <option key={metricName} value={metricName}>
              {metricName}
            </option>
          ))}
        </select>
      </div>

      <div>
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
            {buildingmetrics.map((buildingmetric, index) => (
              <tr key={buildingmetric.id}>
                <td>{index + 1}</td>
                <td>{buildingmetric.building.name}</td>
                <td>{buildingmetric.metric.name}</td>
                <td>{buildingmetric.value}</td>
                <td>{buildingmetric.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h1>Data List:</h1>
        <ApexCharts options={chartOptions} series={chartSeries} type='line' height={350} />
      </div>

      <div>
        <label>Select Period for Bar:</label>
        <select value={selectedPeriod} onChange={handlePeriodChange}>
          {[...uniqueYears].map((uniqueYear) => (
            <option key={uniqueYear} value={uniqueYear}>
              {uniqueYear}
            </option>
          ))}
        </select>
      </div>

      <div>
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
                {firstBuildingData.map((firstBuildingData,index)=>(
                    <tr key={firstBuildingData.id}>
                        <td>{index+1}</td>
                        <td>{firstBuildingData.building.name}</td>
                        <td>{firstBuildingData.metric.name}</td>
                        <td>{firstBuildingData.value}</td>
                        <td>{firstBuildingData.year}</td>

                        
                    </tr>
                ))}
                
            </tbody>
        </table>
      </div>


      <div>
        <h1>Bar Plot </h1>
        <ApexCharts options={chartOptions2} series={chartSeries2} type='bar' height={350} />
      </div>


    </Layout>
  );
};

export default Dashboard;
