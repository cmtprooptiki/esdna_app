import Metric from "../models/MetricModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getMetrics= async(req,res)=>{
    try{
        let response;
        if(req.role === "admin"){
            response=await Metric.findAll({
                // attributes:['uuid','name', ['ST_X(location)', 'latitude'], ['ST_Y(location)', 'longitude']],

                attributes:['id','uuid','name','unit','unit_desc','limit_desc','min','max'],
                // include:[{
                //     model:User,
                //     attributes:['name','email'],

                // }]
            });
        }else{
            response = await Metric.findAll({
                // attributes:['uuid','name', ['ST_X(location)', 'latitude'], ['ST_Y(location)', 'longitude']],

                attributes:['id','uuid','name','unit','unit_desc','limit_desc','min','max'],

                
            });
        }
        res.status(200).json(response);
    }catch (error){
        res.status(500).json({msg:error.message});

    }
}

export const getMetricById = async(req,res)=>{

    try{
        const response = await Metric.findOne({
            attributes:['id','uuid','name','unit','unit_desc','limit_desc','min','max'],
            where:{
                uuid:req.params.id
            }
        });
        res.status(200).json(response);

    } catch (error){
        res.status(500).json({ msg:error.message });
    }
    

}

export const createMetric= async(req,res)=>{
    const {name} = req.body
    const {unit} = req.body
    const {unit_desc} = req.body
    const {limit_desc} = req.body
    const {min} = req.body
    const {max} = req.body
    // const { name, coordinates } = req.body; // Assuming the request body contains 'name' and 'coordinates' for the building


    try {
        await Metric.create({
            name:name,
            unit:unit,
            unit_desc:unit_desc,
            limit_desc:limit_desc,
            min:min,
            max:max
           
            
        });
        res.status(201).json({msg:"Metric Created succesfuly"})


    }
    catch(error){
        res.status(500).json({msg:error.message});

    }
    
}

export const updateMetric= async(req,res)=>{

        const metric = await Metric.findOne({
            where:{
                uuid:req.params.id
            }
        });

        if (!metric) return res.status(404).json({msg:"Data not found"})
        const {name} = req.body
        const {unit} = req.body
        const {unit_desc} = req.body
        const {limit_desc} = req.body
        const {min} = req.body
        const {max} = req.body
        try{

            await Metric.update({name,unit,unit_desc,limit_desc,min,max},{
                where:{
                    id:metric.id
                }
            });
            
        
        res.status(200).json({msg:"Metric update successfulyyy"});
    } catch (error){
        res.status(500).json({msg:error.message});
    
    }
}


export const deleteMetric= async(req,res)=>{
    
    const metric = await Metric.findOne({
        where:{
            uuid:req.params.id
        }
    });
    if (!metric) return res.status(404).json({msg:"metric not found"});
    
    try{
        await Metric.destroy({
            
      
            where:{
                id:metric.id
            }
        });
        res.status(200).json({msg:"Metric deleted"});
    
    } catch(error){
        res.status(400).json({msg:error.message});
    
    }

}
