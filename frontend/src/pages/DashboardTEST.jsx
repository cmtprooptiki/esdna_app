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
  const { isError } = useSelector(state => state.auth);

  const [buildingmetrics, setBuildingMetrics] = useState([]);

  const [dataList, setDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [secondBuildingData, setSecondBuildingData] = useState([]);
  
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
  });
  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/buildingmetrics');
        const apiData = response.data;

        const filterCriteria = {
          metricname: 'PM10',
        };


        const firstBuildingName = 'Entrance XYTA'; // Replace with the actual name

        const firstBuildingData = apiData.filter(
          item => item.building.name === firstBuildingName && item.metric.name === filterCriteria.metricname
        );


        // const filteredData = apiData.filter(item => item.metric.name === filterCriteria.metricname);

        setDataList(apiData);
        setFilteredData(firstBuildingData);


        const secondBuildingName = 'EMAK Offices'; // Replace with the actual name

        const secondBuildingData = apiData.filter(
          item => item.building.name === secondBuildingName && item.metric.name === filterCriteria.metricname
        );

        setSecondBuildingData(secondBuildingData);

        setChartOptions({
          ...chartOptions,
          xaxis: {
            categories: [2023,2023,2023,2024],
          },
        });

        setChartSeries([
          { name: firstBuildingName,                data: firstBuildingData.map(item => item.value) },
          { name: secondBuildingName,                data: secondBuildingData.map(item => item.value) },
        ]);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []); // No need to include chartOptions in the dependency array

  useEffect(() => {
    getBuildingMetrics();
  }, []);

  const getBuildingMetrics = async () => {
    const response = await axios.get('http://localhost:5000/buildingmetrics');
    setBuildingMetrics(response.data);
  };

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
        <h1>Here will be the dashboard</h1>
        <h1>show {buildingmetrics[0]?.building.name}</h1>
        <table className="table is-stripped is-fullwidth">
          {/* ... (existing code) */}
        </table>
      </div>
      <div>
        <h1>Data List:</h1>
        {/* ... (existing code) */}
        <ApexCharts options={chartOptions} series={chartSeries} type="line" height={350} />
      </div>
    </Layout>
  );
};

export default Dashboard;
