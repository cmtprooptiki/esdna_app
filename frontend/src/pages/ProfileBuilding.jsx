import React,{useEffect} from 'react'
import Layout from './Layout'
import FormProfileBuilding from '../components/FormProfileBuilding'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/authSlice'

const ProfileBuilding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state=>state.auth));

  useEffect(()=>{
      dispatch(getMe());
  },[dispatch]);

  useEffect(()=>{
      if(isError){
          navigate("/");
      }
  },[isError,navigate]);
  return (
    <Layout>
        <FormProfileBuilding/>
    </Layout>
  )
}

export default ProfileBuilding