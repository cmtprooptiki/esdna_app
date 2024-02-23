import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'
import { useSelector } from 'react-redux'
import apiBaseUrl from '../apiConfig'
const MetricList = () => {
    const [products,setMetrics]=useState([]);
    const {user} = useSelector((state)=>state.auth)
    useEffect(()=>{
        getMetrics()
    },[]);

    const getMetrics = async() =>{
        const response = await axios.get(`${apiBaseUrl}/metrics`);
        setMetrics(response.data);
    }
    const deleteMetric = async(productId)=>{
        await axios.delete(`${apiBaseUrl}/metrics/${productId}`);
        getMetrics();
    }
  return (
    <div>
        <h1 className='title'>Περιγραφή Ρύπων</h1>
        {user && user.role ==="admin" && (
        <Link to={"/metrics/add"} className='button is-primary mb-2'>Προσθήκη Νέου</Link>
        )}
        <table className='table is-stripped is-fullwidth'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Όνομα</th>
                    <th>Μονάδα Μέτρησης</th>
                    <th>Περιγραφή</th>
                    <th>Όρια</th>
                    <th>Κάτω Όριο</th>
                    <th>Άνω Όριο</th>
                    {user && user.role ==="admin" && (
                    <th>Ενέργειες</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {products.map((metric,index)=>(
                    <tr key={metric.uuid}>
                        <td>{index+1}</td>
                        <td>{metric.name}</td>
                        <td>{metric.unit}</td>
                        <td>{metric.unit_desc}</td>
                        <td>{metric.limit_desc}</td>
                        <td>{metric.min}</td>                        
                        <td>{metric.max}</td>                        
                        {user && user.role ==="admin" && (
                        <td>
                            <Link to={`/metrics/edit/${metric.uuid}`} className='button is-small is-info'>Επεξεργασία</Link>
                            <button onClick={()=>deleteMetric(metric.uuid)} className='button is-small is-danger'>Διαγραφή</button>
                        </td>
                        )}
                    </tr>
                ))}
                
            </tbody>
        </table>
    </div>
  )
}

export default MetricList