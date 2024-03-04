import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import apiBaseUrl from '../apiConfig'
const FormEditBuilding = () => {
    const[name,setName]=useState("");
    const[lat,setLat]=useState("");
    const[lon,setLon]=useState("");
    const[category,setCategory]=useState("");

    const[msg,setMsg]=useState("");

    const navigate = useNavigate();

    const{id} = useParams();

    useEffect(()=>{
        const getBuildingById = async()=>{
            try {
                const response=await axios.get(`${apiBaseUrl}/buildings/${id}`);
                setName(response.data.name);
                setLat(response.data.lat);
                setLon(response.data.lon);
                setCategory(response.data.category);
            } catch (error) {
                if(error.response){
                    setMsg(error.response.data.msg);
                }
            }
        };
        getBuildingById();
    },[id]);

    const updateBuilding = async (e) =>{
        e.preventDefault();
        try{
            await axios.patch(`${apiBaseUrl}/buildings/${id}`, {
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
    };
  return (
    <div>
        <h1 className='title'>Διαχείριση Σημείων Μέτρησης</h1>
        <h2 className='subtitle'>Επεξεργασία Σημείων Μέτρησης</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={updateBuilding}>
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
                            <input type="text" className="input" value={lon} onChange={(e)=> setLon(e.target.value)} placeholder='Γεωγραφικό μήκος(Lon)'/>
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

export default FormEditBuilding