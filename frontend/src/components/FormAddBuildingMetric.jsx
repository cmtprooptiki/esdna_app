import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import apiBaseUrl from '../apiConfig'

const FormAddBuildingMetric = () => {
    const[buildingId,setBuildingId]=useState("");
    const[metricId,setMetricId]=useState("");
    const[value,setValue]=useState("");
    const[year,setYear]=useState("");
    const[msg,setMsg]=useState("");
    const navigate = useNavigate();

    const saveBuildingMetric = async (e) =>{
        e.preventDefault();
        try{
            await axios.post(`${apiBaseUrl}/createbuildingmetric`, {
                buildingId:buildingId,
                metricId:metricId,
                value:value,
                year:year
            });
            navigate("/buildingmetrics");
        }catch(error){
            if(error.response){
                setMsg(error.response.data.msg);
            }
        }
    }
    ///Get Buildings
    const [buildings,setBuildings]=useState([]);
    const [metrics,setMetrics]=useState([]);
    useEffect(()=>{
        getBuildings()
    },[]);
    useEffect(()=>{
        getMetrics()
    },[]);
    const getBuildings = async() =>{
        const response = await axios.get(`${apiBaseUrl}/buildings`);
        setBuildings(response.data);
    }
    const getMetrics = async() =>{
        const response = await axios.get(`${apiBaseUrl}/metrics`);
        setMetrics(response.data);
    }


  return (
    <div>
        <h1 className='title'>Διαχείριση Μετρησεων</h1>
        <h2 className='subtitle'>Προσθήκη Νέας Μέτρησης</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={saveBuildingMetric}>
                <p className='has-text-centered'>{msg}</p>
                <div className="field">
                        <label  className="label">Σημείο Μέτρησης</label>
                        {/* <div className="control">
                            <input type="text" className="input" value={buildingId} onChange={(e)=> setBuildingId(e.target.value)} placeholder='Building Name'/>
                        </div> */}
                        <div className="control">
                            <select className='input' type="text" onChange={(e)=> setBuildingId(e.target.value)} >
                                <option value="" disabled selected>Επιλέξτε Σημείο Μέτρησης</option>
                                {buildings.map((building,index)=>(
                                    <option key={building.id} value={building.id}>{building.name}</option>
                                ))}
                                {/* <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option> */}
                            </select>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label">Ρύπος</label>
                        {/* <div className="control">
                            <input type="text" className="input" value={metricId} onChange={(e)=> setMetricId(e.target.value)} placeholder='Latitude'/>
                        </div> */}
                        <div className="control">
                            <select className='input' onChange={(e)=> setMetricId(e.target.value)}>
                                <option value="" disabled selected>Επιλέξτε Ρύπο</option>
                                {metrics.map((metric,index)=>(
                                    <option key={metric.id} value={metric.id}>{metric.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label">Τιμή</label>
                        <div className="control">
                            <input type="number" className="input" value={value !== null ? value : ''} onChange={(e)=> setValue(e.target.value === '' ? null : parseFloat(e.target.value))} placeholder='Τιμή'/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label">Περίοδος Μέτρησης</label>
                        <div className="control">
                            <input type="text" className="input" value={year} onChange={(e)=> setYear(e.target.value)} placeholder='π.χ 2024-Περ Α: Φεβ - Μάρ'/>
                        
                        </div>
                    </div>
                    
                    
                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-success is-fullwidth">Αποθήκευση</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormAddBuildingMetric