import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'

const FormEditBuilding = () => {
    const[name,setName]=useState("");
    const[lat,setLat]=useState("");
    const[lon,setLon]=useState("");
    const[msg,setMsg]=useState("");
    const navigate = useNavigate();

    const{id} = useParams();

    useEffect(()=>{
        const getBuildingById = async()=>{
            try {
                const response=await axios.get(`http://localhost:5000/buildings/${id}`);
                setName(response.data.name);
                setLat(response.data.lat);
                setLon(response.data.lon);
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
            await axios.patch(`http://localhost:5000/buildings/${id}`, {
                name:name,
                lat:lat,
                lon:lon
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
        <h1 className='title'>Buildings</h1>
        <h2 className='subtitle'>Edit Building</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={updateBuilding}>
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
                            <input type="text" className="input" value={lon} onChange={(e)=> setLon(e.target.value)} placeholder='Longitude'/>
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

export default FormEditBuilding