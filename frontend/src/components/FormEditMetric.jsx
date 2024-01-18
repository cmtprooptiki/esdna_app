import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'

const FormEditMetric = () => {
    const[name,setName]=useState("");
    const[unit,setUnit]=useState("");

    const[unit_desc,setUnitDesc]=useState("");

    const[msg,setMsg]=useState("");
    const navigate = useNavigate();

    const{id} = useParams();

    useEffect(()=>{
        const getMetricsgById = async()=>{
            try {
                const response=await axios.get(`http://localhost:5000/metrics/${id}`);
                setName(response.data.name);
                setUnit(response.data.unit);
                setUnitDesc(response.data.unit_desc);

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
                unit:unit,
                unit_desc:unit_desc,
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
                        <label  className="label">Metric Name</label>
                        <div className="control">
                            <input type="text" className="input" value={name} onChange={(e)=> setName(e.target.value)} placeholder='Metric Name'/>
                        </div>
                    </div>

                    <div className="field">
                        <label  className="label">Metric Unit Measure</label>
                        <div className="control">
                            <input type="text" className="input" value={unit} onChange={(e)=> setUnit(e.target.value)} placeholder='Metric Unit Measure'/>
                        </div>
                    </div>

                    <div className="field">
                        <label  className="label">Metric Unit Description</label>
                        <div className="control">
                            <input type="text" className="input" value={unit_desc} onChange={(e)=> setUnitDesc(e.target.value)} placeholder='Metric Unit Descreption'/>
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