import React,{useEffect,useState} from 'react'
import Layout from './Layout'
import Welcome from '../components/Welcome'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/authSlice'
import axios from 'axios'
import ApexCharts from 'react-apexcharts';



 
const Dashboard = () => {

  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const {isError} = useSelector((state=>state.auth));


    const [buildingmetrics,setBuildingMetrics]=useState([]);


    const [dataList, setDataList] = useState([]);


    const [firstBuildingData, setFirstBuildingData] = useState([]);
    const [secondBuildingData, setSecondBuildingData] = useState([]);


const [selectedMetric, setSelectedMetric] = useState('');
const [uniqueMetricNames, setUniqueMetricNames] = useState(new Set());



const handleMetricChange = (event) => {
  setSelectedMetric(event.target.value);
};

    useEffect(()=>{
      getBuildingMetrics()

  },[]);

  const getBuildingMetrics = async() =>{
      const response = await axios.get('http://localhost:5000/buildingmetrics');
      
      setBuildingMetrics(response.data);
     

  }



  useEffect(()=>{
      dispatch(getMe());
  },[dispatch]);

  useEffect(()=>{
      if(isError){
          navigate("/");
      }
  },[isError,navigate]);




//Chart Logic


// State variable for ApexCharts options
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
  // Function to fetch data from the API and update the state
  const fetchData = async () => {
    try {
      // Make an Axios GET request to the API
      const response = await axios.get('http://localhost:5000/buildingmetrics');

      // Extract the data from the response
      const apiData = response.data;
      // const sortedData = apiData.sort((a, b) => a.year - b.year);
      // console.log('sorted'+sortedData);

 // Extract unique metric names
 const uniqueNamesSet = new Set(apiData.map(item => item.metric.name));

 setUniqueMetricNames(uniqueNamesSet);

      // Example criteria: Filter based on 'category' and 'value'
      const filterCriteria = {
        metricname: selectedMetric
        //,
        // year: 2023,
      };

        // Apply filter with AND operator
        //  const filteredData = apiData.filter(
        //   item => item.metric.name === filterCriteria.metricname && item.year === filterCriteria.year
        // );
        const firstBuildingName = 'Entrance XYTA'; // Replace with the actual name

        const firstBuildingData = apiData.filter(
          item => item.building.name === firstBuildingName && item.metric.name === filterCriteria.metricname
        );


 // Assuming 'category' is the column you want to filter on, and 'desiredCategory' is the value to filter by
        // const filteredData = apiData.filter((item => item.metric.name === 'PM10') && (item => item.year===2023)) ;
        

      // Update the state with the data
      // setDataList(apiData);
      setFirstBuildingData(firstBuildingData);

      
      //Filtering for second building 
      const secondBuildingName = 'EMAK Offices'; // Replace with the actual name

      const secondBuildingData = apiData.filter(
        item => item.building.name === secondBuildingName && item.metric.name === filterCriteria.metricname
      );

      setSecondBuildingData(secondBuildingData);

      const uniqueYears = Array.from(new Set([...firstBuildingData.map(item => item.year), ...secondBuildingData.map(item => item.year)]));

        // setFilteredData(firstBuildingData);


        

      // Update the chart options with category labels
      setChartOptions({
        ...chartOptions,
        xaxis: {
          categories:uniqueYears
            //firstBuildingData.map(item => item.year),
                      // secondBuildingData.map(item => item.year)
                    

          // categories: apiData.map(item => item.building.name), // Replace 'category' with the actual key in your data
        },
      });

      setChartSeries([
        { name: firstBuildingName, data: firstBuildingData.map(item => item.value) },
        { name: secondBuildingName, data: secondBuildingData.map(item => item.value) },
      ]);


    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error.message);
      // You might want to handle errors differently based on your needs
    }
  };
  
  // Call the fetchData function when the component mounts
  fetchData();

}, [selectedMetric]); // Include chartOptions in the dependency array if you need to re-render the chart when options change




   







  return (
    <Layout><Welcome/>
    
    <div>
  <label>Select Metric:</label>
  <select value={selectedMetric} onChange={handleMetricChange}>
    {/* {buildingmetrics.length > 0 && buildingmetrics.map((buildingmetric) => (
        <option key={buildingmetric.id} value={buildingmetric.metric.name}>
          {buildingmetric.metric.name}
        </option>
      ))} */}

{[...uniqueMetricNames].map(metricName => (
      <option key={metricName} value={metricName}>
        {metricName}
      </option>
    ))}
  </select>
</div>

    <div>
      <h1>Here will be the dashboard</h1>
      
<h1>show{buildingmetrics[0]?.building.name}</h1>
      <table className='table is-stripped is-fullwidth'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Building Name</th>
                    <th>Metric Name1</th>
                    <th>Metric value</th>
                    <th>Year</th>
                 
                </tr>
            </thead>
            <tbody>
                {buildingmetrics.map((buildingmetric,index)=>(
                    <tr key={buildingmetric.id}>
                        <td>{index+1}</td>
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


  

      <h1>Here will be the dashboard</h1>
      
<h1>Filterd Data for entrance xyta</h1>
      <table className='table is-stripped is-fullwidth'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Building Name</th>
                    <th>Metric Name1</th>
                    <th>Metric value</th>
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
      <h1>Here will be the dashboard</h1>
      
<h1>Filterd Data for emmak office</h1>
      <table className='table is-stripped is-fullwidth'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Building Name</th>
                    <th>Metric Name1</th>
                    <th>Metric value</th>
                    <th>Year</th>
                 
                </tr>
            </thead>
            <tbody>
                {secondBuildingData.map((secondBuildingData,index)=>(
                    <tr key={secondBuildingData.id}>
                        <td>{index+1}</td>
                        <td>{secondBuildingData.building.name}</td>
                        <td>{secondBuildingData.metric.name}</td>
                        <td>{secondBuildingData.value}</td>
                        <td>{secondBuildingData.year}</td>

                        
                    </tr>
                ))}
                
            </tbody>
        </table>



    </div>

    <div>
      <h1>Data List:</h1>
 
      {/* <ApexCharts options={chartOptions} series={[{ data: filteredData.map(item => item.value) }]} type="line" height={350} /> */}
      <ApexCharts options={chartOptions} series={chartSeries} type="line" height={350} />

      {/* <ApexCharts options={chartOptions} series={[{ data: dataList.map(item => item.value) }]} type="bar" height={350} /> */}
    </div>
    
    </Layout>
  )
}

export default Dashboard
