import React,{useEffect} from 'react'
import Layout from './Layout'
import FormEditBuildingMetric from '../components/FormEditBuildingMetric'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/authSlice'

const EditBuildingMetric = () => {
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
        <FormEditBuildingMetric/>
    </Layout>
  )
}

export default EditBuildingMetric