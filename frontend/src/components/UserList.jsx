import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const UserList = () => {
    const [users,setUsers]=useState([]);

    useEffect(()=>{
        getUsers()
    },[]);

    const getUsers = async() =>{
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
    }
    const deleteUser = async(userId)=>{
        await axios.delete(`http://localhost:5000/users/${userId}`);
        getUsers();
    }
  return (
    <div>
        
        <h1 className='title'>Χρήστες</h1>
        <Link to={"/users/add"} className='button is-primary mb-2'>Προσθήκη Νέου</Link>
        <table className='table is-stripped is-fullwidth'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Όνομα Χρήστη</th>
                    <th>Email</th>
                    <th>Ρόλος</th>
                    <th>Ενέργεια</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user,index)=>(
                    <tr key={user.uuid}>
                        <td>{index+1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            <Link to={`/users/edit/${user.uuid}`} className='button is-small is-info'>Επεξεργασία</Link>
                            <button onClick={()=>deleteUser(user.uuid)} className='button is-small is-danger'>Διαγραφή</button>
                        </td>
                    </tr>
                ))}
                
            </tbody>
        </table>
    </div>
  )
}

export default UserList