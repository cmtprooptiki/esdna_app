import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'
import { useSelector } from 'react-redux';
import '../buildinglist.css';
import apiBaseUrl from '../apiConfig'; // Update the path accordingly


const BuildingList = () => {
    const [buildings,setBuildings]=useState([]);
    const {user} = useSelector((state)=>state.auth)
    useEffect(()=>{
        getBuildings()
    },[]);

    const getBuildings = async() =>{
        const response = await axios.get(`${apiBaseUrl}/buildings`);
        setBuildings(response.data);
    }
    const deleteBuilding = async(buildingId)=>{
        await axios.delete(`${apiBaseUrl}/buildings/${buildingId}`);
        getBuildings();
    }

  return (
    <div>
        <h1 className='title'>Σημεία Μέτρησης</h1>
        {user && user.role ==="admin" && (
        <Link to={"/buildings/add"} className='button is-primary mb-2'>Προσθήκη Νέου</Link>
        )}
        <table className='table is-stripped is-fullwidth'>
            <thead>
                <tr>

                    <th>#</th>

                    <th>Όνομα Σημείου</th>
                    <th>Γεωγραφικό πλάτος (Lat)</th>
                    <th>Γεωγραφικό μήκος(Lon)</th>
                    <th>Κατηγορία</th>
                    <th>Εκτέλεση</th>

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
                            <Link to={`/buildings/profile/${building.uuid}`} className='button is-small is-info'>Προφίλ</Link>
                            {user && user.role ==="admin" && (
                            <div>
                                <Link to={`/buildings/edit/${building.uuid}`} className='button is-small is-info'>Επεξεργασία</Link>
                                <button onClick={()=>deleteBuilding(building.uuid)} className='button is-small is-danger'>Διαγραφή</button>
                            </div>
                            )}
                            
                        </td>
                    </tr>
                ))}
                
            </tbody>
        </table>
    </div>
  )
}

export default BuildingList
