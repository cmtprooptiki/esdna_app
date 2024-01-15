import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'

const BuildingList = () => {
    const [buildings,setBuildings]=useState([]);

    useEffect(()=>{
        getBuildings()
    },[]);

    const getBuildings = async() =>{
        const response = await axios.get('http://localhost:5000/buildings');
        setBuildings(response.data);
    }
    const deleteBuilding = async(buildingId)=>{
        await axios.delete(`http://localhost:5000/buildings/${buildingId}`);
        getBuildings();
    }

  return (
    <div>
        <h1 className='title'>Buildings</h1>
        <h2 className='subtitle'>List of Buildings</h2>
        <Link to={"/buildings/add"} className='button is-primary mb-2'>Add New</Link>
        <table className='table is-stripped is-fullwidth'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Building Name</th>
                    <th>Lat</th>
                    <th>Lon</th>
                    <th>Category</th>

                </tr>
            </thead>
            <tbody>
                {buildings.map((building,index)=>(
                    <tr key={building.uuid}>
                        <td>{index+1}</td>
                        <td>{building.name}</td>
                        <td>{building.lat}</td>
                        <td>{building.lon}</td>
                        <td>{building.category}</td>
                        <td>
                            <Link to={`/buildings/profile/${building.uuid}`} className='button is-small is-info'>Profile</Link>
                            <Link to={`/buildings/edit/${building.uuid}`} className='button is-small is-info'>Edit</Link>
                            <button onClick={()=>deleteBuilding(building.uuid)} className='button is-small is-danger'>Delete</button>
                        </td>
                    </tr>
                ))}
                
            </tbody>
        </table>
    </div>
  )
}

export default BuildingList
