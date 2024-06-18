import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import apiBaseUrl from '../apiConfig'

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
            await axios.post(`${apiBaseUrl}/metrics`, {
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
        <h1 className='title'>Διαχείριση Ρύπων</h1>
        <h2 className='subtitle'>Προσθήκη Νέου Ρύπου</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={saveMetric}>
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
                            <input type="number" className="input" value={min !== null ? min : ''} onChange={(e) => setMin(e.target.value === '' ? null : parseFloat(e.target.value))} placeholder='Κάτω Όριο'/>
                        </div>
                    </div>

                    <div className="field">
                        <label  className="label">Άνω Όριο</label>
                        <div className="control">
                            <input type="number" className="input" value={max !== null ? max : ''} onChange={(e)=> setMax(e.target.value === '' ? null : parseFloat(e.target.value))} placeholder='Άνω Όριο'/>
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

export default FormAddMetric