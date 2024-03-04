import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import apiBaseUrl from '../apiConfig'


const FormEditMetric = () => {
    const[name,setName]=useState("");
    const[unit,setUnit]=useState("");

    const[unit_desc,setUnitDesc]=useState("");
    const[limit_desc,setLimitDesc]=useState("");
    const[min,setMin]=useState("");
    const[max,setMax]=useState("");
    const[msg,setMsg]=useState("");
    const navigate = useNavigate();

    const{id} = useParams();

    useEffect(()=>{
        const getMetricsgById = async()=>{
            try {
                const response=await axios.get(`${apiBaseUrl}/metrics/${id}`);
                setName(response.data.name);
                setUnit(response.data.unit);
                setUnitDesc(response.data.unit_desc);
                setLimitDesc(response.data.limit_desc);
                setMin(response.data.min);
                setMax(response.data.max);
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
            await axios.patch(`${apiBaseUrl}/metrics/${id}`, {
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
    };
  return (
    <div>
        <h1 className='title'>Διαχείριση Ρύπων</h1>
        <h2 className='subtitle'>Επεξεργασία Νέου Ρύπου</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={updateMetric}>
                    <p className='has-text-centered'>{msg}</p>
                <div className="field">
                        <label  className="label">Όνομα</label>
                        <div className="control">
                            <input type="text" className="input" value={name} onChange={(e)=> setName(e.target.value)} placeholder='Όνομα Ρύπου'/>
                        </div>
                    </div>

                    <div className="field">
                        <label  className="label">Μονάδα Μέτρησης Ρύπου</label>
                        <div className="control">
                            <input type="text" className="input" value={unit} onChange={(e)=> setUnit(e.target.value)} placeholder='Μονάδα Μέτρησης Ρύπου'/>
                        </div>
                    </div>

                    <div className="field">
                        <label  className="label">Περιγραφή Ρύπου</label>
                        <div className="control">
                            <input type="text" className="input" value={unit_desc} onChange={(e)=> setUnitDesc(e.target.value)} placeholder='Περιγραφή Ρύπου'/>
                        </div>
                    </div>

                    <div className="field">
                        <label  className="label">Όρια</label>
                        <div className="control">
                            <input type="text" className="input" value={limit_desc} onChange={(e)=> setLimitDesc(e.target.value)} placeholder='Όρια'/>
                        </div>
                    </div>

                    <div className="field">
                        <label  className="label">Κάτω Όριο</label>
                        <div className="control">
                            <input type="text" className="input" value={min !== null ? min : ''} onChange={(e) => setMin(e.target.value === '' ? null : parseFloat(e.target.value))} placeholder='Κάτω Όριο'/>
                        </div>
                    </div>

                    <div className="field">
                        <label  className="label">Άνω Όριο</label>
                        <div className="control">
                            <input type="text" className="input" value={max !== null ? max : ''} onChange={(e)=> setMax(e.target.value === '' ? null : parseFloat(e.target.value))} placeholder='Άνω Όριο'/>
                        </div>
                    </div>
                    
                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-success is-fullwidth">Ενημέρωση</button>
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