import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'

const BuildingMetricList = () => {
    const [buildingmetrics,setBuildingMetrics]=useState([]);

    useEffect(()=>{
        getBuildingMetrics()
    },[]);

    const getBuildingMetrics = async() =>{
        const response = await axios.get('http://localhost:5000/buildingmetrics');
        setBuildingMetrics(response.data);
    }
    const deleteBuildingMetric = async(buildingmetricId)=>{
        await axios.delete(`http://localhost:5000/buildingmetrics/${buildingmetricId}`);
        getBuildingMetrics();
    }
  return (
    <div>
        <h1 className='title'>Overview</h1>
        <h2 className='subtitle'>List of Buildings-Metrics</h2>
        <Link to={"/buildingmetrics/add"} className='button is-primary mb-2'>Add New</Link>
        <table className='table is-stripped is-fullwidth'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Building Name</th>
                    <th>Metric Name</th>
                    <th>Metric value</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {buildingmetrics.map((buildingmetric,index)=>(
                    <tr key={buildingmetric.id}>
                        <td>{index+1}</td>
                        <td>{buildingmetric.building.name}</td>
                        <td>{buildingmetric.metric.name}</td>
                        <td>{buildingmetric.value}</td>
                        <td>
                            <Link to={`/buildingmetrics/edit/${buildingmetric.id}`} className='button is-small is-info'>Edit</Link>
                            <button onClick={()=>deleteBuildingMetric(buildingmetric.id)} className='button is-small is-danger'>Delete</button>
                        </td>
                    </tr>
                ))}
                
            </tbody>
        </table>
    </div>
  )
}

export default BuildingMetricList