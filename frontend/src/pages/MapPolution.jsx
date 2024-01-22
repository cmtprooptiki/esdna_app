import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import axios from 'axios';
import ApexCharts from 'react-apexcharts';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import {Map} from '../components/MapComponent';
import {MapPolutionComponent} from '../components/MapPolutionComponent';


const MapPolution = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError } = useSelector((state) => state.auth);
  const [buildingMetrics, setBuildingMetrics] = useState([]);

  const [uniqueMetricNames, setUniqueMetricNames] = useState(new Set());
  const [uniqueYears, setUniqueYears] = useState(new Set());
  const [buildingNames, setBuildingNames] = useState(new Set());

  const [secondBuildingData,setSecondBuildingMetrics]=useState([]);

  const [selectedMetric2,setSelectedMetric2 ] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');


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
    const fetchData = async () => {
      try {
        const filterCriteria = {
          metricname: selectedMetric2,
          year: selectedPeriod,
        };

       
        const secondBuildingData = buildingMetrics.filter(
          (item) => item.metric.name === filterCriteria.metricname && item.year === filterCriteria.year
        );
        setSecondBuildingMetrics(secondBuildingData)

       
      } catch (error) {
        console.error('Error fetching data for BarChart:', error.message);
      }
    };

    fetchData();
  }, [selectedPeriod, selectedMetric2]);





  return (
    <Layout>
  <div>
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


    <MapPolutionComponent></MapPolutionComponent>
  </div>
    </Layout>
  );
};

export default MapPolution;
