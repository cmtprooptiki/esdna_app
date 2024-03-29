import React,{useState,useEffect} from 'react'
import {NavLink} from "react-router-dom"
import {IoPerson,IoPricetag,IoHome,IoLogOut} from "react-icons/io5";
import { FaMap } from "react-icons/fa";
import { GiBubbles } from "react-icons/gi";
import { MdScience } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {LogOut, LoginUser,reset} from "../features/authSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import '../sidebar.css'
import Expander from './ExpanderComponent';
import apiBaseUrl from '../apiConfig';
import 'react-pro-sidebar';

// import { faWind,faDroplet,faTemperatureLow,faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';

export const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state)=>state.auth)
    const [buildings,setBuildings]=useState([]);

    const logout = ()=>{
        dispatch(LogOut());
        dispatch(reset());
        navigate("/");
    };

    useEffect(()=>{
        getBuildings()
    },[]);

    const getBuildings = async() =>{
        const response = await axios.get(`${apiBaseUrl}/buildings`);
        setBuildings(response.data);
    }

  return (
    <div className="sidebar">
        <aside className="menu pl-2 has-shadow">
            <p className="menu-label">Γενικα</p>
            <ul  className="menu-list">
                <li ><NavLink to="/dashboard" ><AiFillDashboard/> Dashboard</NavLink></li>
                <li><NavLink to="/map"><FaMap /> Χάρτης</NavLink></li>

                <li><NavLink to="/buildings"><HiOutlineLocationMarker/> Σημεία Μέτρησης</NavLink></li>
                <li><NavLink to="/metrics"><GiBubbles/> Ρύποι</NavLink></li>
                <li><NavLink to="/buildingmetrics"><MdScience/> Μετρήσεις Ρύπων</NavLink></li>
                <li>
                <Expander  title="Σημεία">
                {buildings.map((building, index) => (
                    
                    <p><NavLink to={`/buildings/profile/${building.uuid}`} ><AiFillDashboard/> {building.name}</NavLink></p>
                ))}       
                   
                </Expander>
                </li>
            </ul>
            {user && user.role ==="admin" && (
                <div>
                    <p className="menu-label">Διαχειρηστης</p>
                    <ul className="menu-list">
                        <li><NavLink to="/users"><IoPerson/> Χρήστες</NavLink></li>
                    </ul>
                </div>
            )}
            
            <p className="menu-label">Ρυθμησεις</p>
            <ul className="menu-list">
                <li><button onClick={logout} className='button-logout'><IoLogOut/> Αποσύνδεση</button></li>
            </ul>
        </aside>
    </div>
  )
}
