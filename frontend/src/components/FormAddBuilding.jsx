import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


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
            await axios.post('http://localhost:5000/buildings', {
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
        <h1 className='title'>Buildings</h1>
        <h2 className='subtitle'>Add New Building</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={saveBuilding}>
                <p className='has-text-centered'>{msg}</p>
                <div className="field">
                        <label  className="label">Name</label>
                        <div className="control">
                            <input type="text" className="input" value={name} onChange={(e)=> setName(e.target.value)} placeholder='Building Name'/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label">Latitude</label>
                        <div className="control">
                            <input type="text" className="input" value={lat} onChange={(e)=> setLat(e.target.value)} placeholder='Latitude'/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label">Longitude</label>
                        <div className="control">
                            <input type="text" className="input" value={lon} onChange={(e)=> setLon(e.target.value)} placeholder='Lontitude'/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label">Category</label>
                        <div className="control">
                            <input type="text" className="input" value={category} onChange={(e)=> setCategory(e.target.value)} placeholder='Category'/>
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

export default FormAddBuilding