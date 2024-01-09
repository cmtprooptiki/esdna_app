import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


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
            await axios.post('http://localhost:5000/createbuildingmetric', {
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
        const response = await axios.get('http://localhost:5000/buildings');
        setBuildings(response.data);
    }
    const getMetrics = async() =>{
        const response = await axios.get('http://localhost:5000/metrics');
        setMetrics(response.data);
    }


  return (
    <div>
        <h1 className='title'>Building Metrics</h1>
        <h2 className='subtitle'>Add New Building Metric</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={saveBuildingMetric}>
                <p className='has-text-centered'>{msg}</p>
                <div className="field">
                        <label  className="label">Building Id</label>
                        {/* <div className="control">
                            <input type="text" className="input" value={buildingId} onChange={(e)=> setBuildingId(e.target.value)} placeholder='Building Name'/>
                        </div> */}
                        <div className="control">
                            <select className='input' type="text" onChange={(e)=> setBuildingId(e.target.value)} >
                                <option value=""></option>
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
                        <label  className="label">Metric Id</label>
                        {/* <div className="control">
                            <input type="text" className="input" value={metricId} onChange={(e)=> setMetricId(e.target.value)} placeholder='Latitude'/>
                        </div> */}
                        <div className="control">
                            <select className='input' onChange={(e)=> setMetricId(e.target.value)}>
                                <option value=""></option>
                                {metrics.map((metric,index)=>(
                                    <option key={metric.id} value={metric.id}>{metric.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label">Value</label>
                        <div className="control">
                            <input type="text" className="input" value={value} onChange={(e)=> setValue(e.target.value)} placeholder='Lontitude'/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label">Year</label>
                        <div className="control">
                            <input type="text" className="input" value={year} onChange={(e)=> setYear(e.target.value)} placeholder='Lontitude'/>
                        </div>
                    </div>
                    
                    
                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-success is-fullwidth">Save</button>
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