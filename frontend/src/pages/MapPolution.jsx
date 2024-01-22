import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import axios from 'axios';
import ApexCharts from 'react-apexcharts';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import {Map} from '../components/MapComponent';
import {MapPolutionComponent} from '../components/MapPolutionComponent';


const MapPolution = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError } = useSelector((state) => state.auth);



  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError, navigate]);



  return (
    <Layout>
  <div>
    <MapPolutionComponent></MapPolutionComponent>
  </div>
    </Layout>
  );
};

export default MapPolution;
