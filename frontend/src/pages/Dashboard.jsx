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

    const [filteredData, setFilteredData] = useState([]);



// State variable for ApexCharts options
const [chartOptions, setChartOptions] = useState({
  chart: {
    type: 'bar',
  },
  xaxis: {
    categories: [],
  },
});


useEffect(() => {
  // Function to fetch data from the API and update the state
  const fetchData = async () => {
    try {
      // Make an Axios GET request to the API
      const response = await axios.get('http://localhost:5000/buildingmetrics');

      // Extract the data from the response
      const apiData = response.data;

// Example criteria: Filter based on 'category' and 'value'
const filterCriteria = {
  metricname: 'PM10',
  year: 2023,
};

   // Apply filter with AND operator
   const filteredData = apiData.filter(
    item => item.metric.name === filterCriteria.metricname && item.year === filterCriteria.year
  );


 // Assuming 'category' is the column you want to filter on, and 'desiredCategory' is the value to filter by
        // const filteredData = apiData.filter((item => item.metric.name === 'PM10') && (item => item.year===2023)) ;
        

      // Update the state with the data
      setDataList(apiData);
      setFilteredData(filteredData);

      // Update the chart options with category labels
      setChartOptions({
        ...chartOptions,
        xaxis: {
          categories: filteredData.map(item => item.building.name),

          // categories: apiData.map(item => item.building.name), // Replace 'category' with the actual key in your data
        },
      });
    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error.message);
      // You might want to handle errors differently based on your needs
    }
  };

  // Call the fetchData function when the component mounts
  fetchData();
}, [chartOptions]); // Include chartOptions in the dependency array if you need to re-render the chart when options change


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








  return (
    <Layout><Welcome/>
    
    
    <div>
      <h1>Here will be the dashboard</h1>
      
<h1>show{buildingmetrics[0]?.building.name}</h1>
      <table className='table is-stripped is-fullwidth'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Building Name</th>
                    <th>Metric Name</th>
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
      <h1>Data List:</h1>
      <ul>
        {filteredData.map((item, index) => (
          <li key={index}>{/* Render your data item here */}</li>
        ))}
      </ul>
      <ApexCharts options={chartOptions} series={[{ data: filteredData.map(item => item.value) }]} type="bar" height={350} />

      {/* <ApexCharts options={chartOptions} series={[{ data: dataList.map(item => item.value) }]} type="bar" height={350} /> */}
    </div>
    
    </Layout>
  )
}

export default Dashboard