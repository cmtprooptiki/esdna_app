import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import apiBaseUrl from '../apiConfig'
const FormEditBuildingMetric = () => {
    const[buildingName,setBuildingName]=useState("");
    const[metricName,setMetricName]=useState("");
    const[value,setValue]=useState("");
    const[year,setYear]=useState("");
    const[msg,setMsg]=useState("");
    const navigate = useNavigate();

    const{id} = useParams();

    useEffect(()=>{
        const getBuildingMetricById = async()=>{
            try {
                const response=await axios.get(`${apiBaseUrl}/buildingmetrics/${id}`);
                setBuildingName(response.data.building.name);
                setMetricName(response.data.metric.name);
                setValue(response.data.value);
                setYear(response.data.year);
                console.log(response.data)
            } catch (error) {
                if(error.response){
                    setMsg(error.response.data.msg);
                }
            }
        };
        getBuildingMetricById();
    },[id]);

    const updateBuildingMetric = async (e) =>{
        e.preventDefault();
        try{
            await axios.patch(`${apiBaseUrl}/updatebuildingmetric/${id}`, {
                value:value,
                year:year
            });

            navigate("/buildingmetrics");
        }catch(error){
            if(error.response){
                setMsg(error.response.data.msg);
            }
        }
    };
  return (
    <div>
        <h1 className='title'>Buildings</h1>
        <h2 className='subtitle'>Edit Building</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={updateBuildingMetric}>
                    <p className='has-text-centered'>{msg}</p>
                <div className="field">
                        <label  className="label">Building Name</label>
                        <div className="control">
                            <p>{buildingName}</p>
                            {/* <input type="text" className="input" value={buildingId} onChange={(e)=> setBuildingId(e.target.value)} placeholder='Building Name'/> */}
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label">Metric Name</label>
                        <div className="control">
                            <p>{metricName}</p>
                            {/* <input type="text" className="input" value={metricId} onChange={(e)=> setMetricId(e.target.value)} placeholder='Latitude'/> */}
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label">Value</label>
                        <div className="control">
                            <input type="text" className="input" value={value} onChange={(e)=> setValue(e.target.value)} placeholder='Longitude'/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label">Year</label>
                        <div className="control">
                            <input type="text" className="input" value={year} onChange={(e)=> setYear(e.target.value)} placeholder='Longitude'/>
                        </div>
                    </div>
                    
                    
                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-success is-fullwidth">Update</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormEditBuildingMetric