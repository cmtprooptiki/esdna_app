import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
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
import { HiLocationMarker } from "react-icons/hi";
export const SidebarNew = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state)=>state.auth)
    const [buildings,setBuildings]=useState([]);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); // State to manage submenu open/close
    
    const logout = ()=>{
        dispatch(LogOut());
        dispatch(reset());
        navigate("/");
    };

    useEffect(()=>{
        getBuildings()
        console.log(isSubMenuOpen)
    },[]);

    const getBuildings = async() =>{
        const response = await axios.get(`${apiBaseUrl}/buildings`);
        setBuildings(response.data);
    }
    const changeMenu=() =>{
        setIsSubMenuOpen(true);
        console.log("hello")
    }
    return(
        <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar className="app">
        <Menu>
          <MenuItem> <NavLink to="/dashboard" ><AiFillDashboard/> Επισκόπηση</NavLink></MenuItem>
          <MenuItem> <NavLink to="/map"><FaMap /> Διαδραστικός Χάρτης</NavLink> </MenuItem>
          <MenuItem> <NavLink to="/metrics"><GiBubbles/> Περιγραφή Ρύπων</NavLink> </MenuItem>
          <MenuItem> <NavLink to="/buildingmetrics"><MdScience/> Καταγραφή Ρύπων</NavLink> </MenuItem>
          <SubMenu label="Σημεία">
          {buildings.map((building, index) => (
                     
                    <MenuItem><NavLink to={`/buildings/profile/${building.uuid}`} ><HiOutlineLocationMarker/> {building.name}</NavLink> </MenuItem>
                ))}  
            
          </SubMenu>
          {user && user.role ==="admin" && (
            <SubMenu label="Διαχειριστής" defaultOpen={isSubMenuOpen}>
                
                <MenuItem onChange={() =>setIsSubMenuOpen(true)}><NavLink to="/users" ><IoPerson/> Χρήστες</NavLink></MenuItem>
                <MenuItem onChange={() => setIsSubMenuOpen(true)}> <NavLink to="/buildings" ><HiOutlineLocationMarker/> Διαχείρηση Σημείων <br/>Μέτρησης</NavLink> </MenuItem>

            </SubMenu>
            )}
          
          <MenuItem> <button onClick={logout} className='button-logout'><IoLogOut/> Αποσύνδεση</button></MenuItem>
          {/* <MenuItem> <NavLink  onClick={logout}><AiFillDashboard/> Dashboard</NavLink></MenuItem> */}
        </Menu>
      </Sidebar>
      
    </div>
    );
};

