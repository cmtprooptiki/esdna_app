import React, { useEffect, useState } from 'react';


export const HelperComponent = () => {

    
const getColorClass2 = (value, metricname) => {
    // Define color cases based on metricname
    switch (metricname) {
      case 'PM10':
        return{
          label: value < 50 ?'Χαμηλή': 'Υψηλή',
          className: value < 50 ? 'green-text' : 'red-text' 
      };
      case 'PM2.5':
        return{
          label: value < 20 ?'Χαμηλή': 'Υψηλή',
          className: value < 20 ? 'green-text' : 'red-text' 
      };
      case 'SO2':
        return{
          label: value < 125 ?'Χαμηλή': 'Υψηλή',
          className: value < 50 ? 'green-text' : 'red-text' 
      };
      case 'CO':
        return{
          label: value < 10 ?'Χαμηλή': 'Υψηλή',
          className: value < 10 ? 'green-text' : 'red-text' 
      };
      case 'NO2':
        return{
          label: value < 40 ?'Χαμηλή': 'Υψηλή',
          className: value < 40 ? 'green-text' : 'red-text' 
      };
  
      case 'TSP':
        return {
          label:value < 50 ? 'Χαμηλή' : value >= 50 && value <= 80 ? 'Μέτρια' : 'Υψηλή',
          className: value < 50 ? 'green-text' : value >= 50 && value <= 80 ? 'yellow-text' : 'red-text'
      };
      case 'TEQ PCDD/Fs':
        return {
          label:value < 42 ? 'Χαμηλή' : value >= 42 && value <= 150 ? 'Μέτρια' : 'Υψηλή',
          className: value < 42 ? 'green-text' : value >= 42 && value <= 150 ? 'yellow-text' : 'red-text'
      };
      case 'TEQ PCBS':
        return {
          label:value < 10 ? 'Χαμηλή' : value >= 10 && value <= 40 ? 'Μέτρια' : 'Υψηλή',
          className: value < 10 ? 'green-text' : value >= 10 && value <= 40 ? 'yellow-text' : 'red-text'
      };
      case 'ind PCBs':
        return {
          label:value < 60 ? 'Χαμηλή' : value >= 60 && value <= 180 ? 'Μέτρια' : 'Υψηλή',
          className: value < 60 ? 'green-text' : value >= 60 && value <= 180 ? 'yellow-text' : 'red-text'
      };
      case 'NO':
        return {
          label:value < 10 ? 'Χαμηλή' : value >= 10 && value <= 50 ? 'Μέτρια' : 'Υψηλή',
          className: value < 10 ? 'green-text' : value >= 10 && value <= 50 ? 'yellow-text' : 'red-text'
      };
      case 'OC/EC':
        return {
          label:value < 50 ? 'Χαμηλή' : value >= 50 && value <= 80 ? 'Μέτρια' : 'Υψηλή',
          className: value < 50 ? 'green-text' : value >= 50 && value <= 80 ? 'yellow-text' : 'red-text'
      };
      // Add more cases as needed
      default:
        return { label: 'Άγνωστο', className: 'black-text' }; // Default label and class name
    }
  };


  const getLimitAnnotation =(metricname)=>{
    switch (metricname) {
      case 'PM10':
        return{
          max: 50 
          
      };
      case 'PM2.5':
        return{
          max:20
      };
      case 'SO2':
        return{
          max: 125
      };
      case 'CO':
        return{
          max:10
      };
      case 'NO2':
        return{
          max:40 
      };
      case 'TSP':
        return {
          min:50,
          
          max:80 
      };
      case 'TEQ PCDD/Fs':
        return {
          min:42,
          max:150 
      };
      case 'TEQ PCBS':
        return {
          min:10,
          max:40 
      };
      case 'ind PCBs':
        return {
          min:60,
          max:180 
      };
      case 'NO':
        return {
          min:10,
          max:50 
      };
      case 'OC/EC':
        return {
          min:5/0.5,
          max:20/2 
      };
      // Add more cases as needed
      default:
        return { max:0}; // Default label and class name
    }
  };

  return null;

}
export default HelperComponent;
 
