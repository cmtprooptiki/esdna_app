import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'
import CSVReaderComponent from './CSVReaderComponent'

import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import apiBaseUrl from '../apiConfig'; // Update the path accordingly


const BuildingMetricList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state)=>state.auth)

    const [buildingmetrics,setBuildingMetrics]=useState([]);

    useEffect(()=>{
        getBuildingMetrics()
    },[]);

    const getBuildingMetrics = async() =>{
        const response = await axios.get(`${apiBaseUrl}/buildingmetrics`);
        setBuildingMetrics(response.data);
    }
    const deleteBuildingMetric = async(buildingmetricId)=>{
        await axios.delete(`${apiBaseUrl}/deletebuildingmetric/${buildingmetricId}`);
        getBuildingMetrics();
    }
  return (
    <div>
        <h1 className='title'>Καταχωρημένες Μετρήσεις Ρύπων</h1>
        <h2 className='subtitle'></h2>
        {user && user.role ==="admin" && (
        
        <div className="columns">
            
          <div className="column">
            
                <Link to={"/buildingmetrics/add"} className='button is-primary mb-2'>Προσθήκη Νέας Μέτρησης</Link>
            
          </div>
          <div className="column">
            
            <CSVReaderComponent/>
           
          </div>
        
        </div>
   )}
    <div className="table-responsive-md">
        <table className='table is-stripped is-fullwidth'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Όνομα Σημέιου</th>
                    <th>Όνομα Ρύπου</th>
                    <th>Τιμή</th>
                    <th>Περίοδος Μετρήσεων</th>
                    {user && user.role ==="admin" && (


                    <th>Ενέργειες</th>
                    )}
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
                        {user && user.role ==="admin" && (

                        <td>
                            <Link to={`/buildingmetrics/edit/${buildingmetric.uuid}`} className='button is-small is-info'>Επεξεργασία</Link>
                            &nbsp;
                            <button onClick={()=>deleteBuildingMetric(buildingmetric.uuid)} className='button is-small is-danger'>Διαγραφή</button>
                        </td>
                          )}
                    </tr>
                ))}
                
            </tbody>
        </table>
    </div>
    </div>
  )
}

export default BuildingMetricList