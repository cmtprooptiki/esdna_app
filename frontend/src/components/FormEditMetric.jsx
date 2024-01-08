import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'

const FormEditMetric = () => {
    const[name,setName]=useState("");
    const[msg,setMsg]=useState("");
    const navigate = useNavigate();

    const{id} = useParams();

    useEffect(()=>{
        const getMetricsgById = async()=>{
            try {
                const response=await axios.get(`http://localhost:5000/metrics/${id}`);
                setName(response.data.name);
            } catch (error) {
                if(error.response){
                    setMsg(error.response.data.msg);
                }
            }
        };
        getMetricsgById();
    },[id]);

    const updateMetric = async (e) =>{
        e.preventDefault();
        try{
            await axios.patch(`http://localhost:5000/metrics/${id}`, {
                name:name,
            });

            navigate("/metrics");
        }catch(error){
            if(error.response){
                setMsg(error.response.data.msg);
            }
        }
    };
  return (
    <div>
        <h1 className='title'>Metrics</h1>
        <h2 className='subtitle'>Edit Metric</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={updateMetric}>
                    <p className='has-text-centered'>{msg}</p>
                <div className="field">
                        <label  className="label">Name</label>
                        <div className="control">
                            <input type="text" className="input" value={name} onChange={(e)=> setName(e.target.value)} placeholder='Building Name'/>
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

export default FormEditMetric