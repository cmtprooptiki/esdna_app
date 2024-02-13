import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const FormAddMetric = () => {
    const[name,setName]=useState("");
    const[unit,setUnit]=useState("");

    const[unit_desc,setUnitDesc]=useState("");
    const[limit_desc,setLimitDesc]=useState("");
    const[min,setMin]=useState(null);
    const[max,setMax]=useState(null);
    const[msg,setMsg]=useState("");

    const navigate = useNavigate();

    const saveMetric = async (e) =>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:5000/metrics', {
                name:name,
                unit:unit,
                unit_desc:unit_desc,
                limit_desc:limit_desc,
                min:min,
                max:max

            });
            navigate("/metrics");
        }catch(error){
            if(error.response){
                setMsg(error.response.data.msg);
            }
        }
    }

  return (
    <div>
        <h1 className='title'>Metrics</h1>
        <h2 className='subtitle'>Add New Metric</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={saveMetric}>
                <p className='has-text-centered'>{msg}</p>
                <div className="field">
                        <label  className="label">Name</label>
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
                        <label  className="label">Limit Description</label>
                        <div className="control">
                            <input type="text" className="input" value={limit_desc} onChange={(e)=> setLimitDesc(e.target.value)} placeholder='Limit Descreption'/>
                        </div>
                    </div>

                    <div className="field">
                        <label  className="label">Min Unit Measure</label>
                        <div className="control">
                            <input type="text" className="input" value={min !== null ? min : ''} onChange={(e) => setMin(e.target.value === '' ? null : parseFloat(e.target.value))} placeholder='Min Unit Measure'/>
                        </div>
                    </div>

                    <div className="field">
                        <label  className="label">Max Unit Measure</label>
                        <div className="control">
                            <input type="text" className="input" value={max !== null ? max : ''} onChange={(e)=> setMax(e.target.value === '' ? null : parseFloat(e.target.value))} placeholder='Max Unit Measure'/>
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

export default FormAddMetric