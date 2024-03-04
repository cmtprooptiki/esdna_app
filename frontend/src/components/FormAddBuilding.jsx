import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import apiBaseUrl from '../apiConfig'

const FormAddBuilding = () => {
    const[name,setName]=useState("");
    const[lat,setLat]=useState("");
    const[lon,setLon]=useState("");
    const[category,setCategory]=useState("");
    const[msg,setMsg]=useState("");

    const navigate = useNavigate();

    const saveBuilding = async (e) =>{
        e.preventDefault();
        try{
            await axios.post(`${apiBaseUrl}/buildings`, {
                name:name,
                lat:lat,
                lon:lon,
                category:category
            });
            navigate("/buildings");
        }catch(error){
            if(error.response){
                setMsg(error.response.data.msg);
            }
        }
    }

  return (
    <div>
        <h1 className='title'>Προσθήκη Νέου Σημείου Μέτρησης</h1>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={saveBuilding}>
                <p className='has-text-centered'>{msg}</p>
                <div className="field">
                        <label  className="label">Όνομα Σημέιου</label>
                        <div className="control">
                            <input type="text" className="input" value={name} onChange={(e)=> setName(e.target.value)} placeholder='Όνομα Σημέιου'/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label">Γεωγραφικό πλάτος (Lat)</label>
                        <div className="control">
                            <input type="text" className="input" value={lat} onChange={(e)=> setLat(e.target.value)} placeholder='Γεωγραφικό πλάτος (Lat)'/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label">Γεωγραφικό μήκος(Lon)</label>
                        <div className="control">
                            <input type="text" className="input" value={lon} onChange={(e)=> setLon(e.target.value)} placeholder='Γεωγραφικό μήκος (Lon)'/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label">Κατηγορία</label>
                        <div className="control">
                            <input type="text" className="input" value={category} onChange={(e)=> setCategory(e.target.value)} placeholder='Κατηγορία'/>
                        </div>
                    </div>
                    
                    
                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-success is-fullwidth">Προσθήκη</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormAddBuilding