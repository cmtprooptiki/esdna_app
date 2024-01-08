import BuildingMetric from "../models/BuildingMetricModel.js";
import User from "../models/UserModel.js";
import Building from "../models/BuildingModel.js"
import Metric from "../models/MetricModel.js"


import { Op } from "sequelize";

export const getBuildingMetrics = async(req,res)=>{
    try{
        let response;
        if(req.role === "admin"){
            response=await BuildingMetric.findAll({
                attributes:['year','value'] ,
                include:[
                    {
                    model:Building,
                    attributes:['name','lat','lon'],
                },
                {
                    model:Metric,
                    attributes:['name']
                            
                }
           ]
            });
        }
        
     
        res.status(200).json(response);
    }catch (error){
        res.status(500).json({msg:error.message});

    }
}

// export const getProductById = async(req,res)=>{
//     try{

//         const product = await Product.findOne({
//             where:{
//                 uuid:req.params.id
//             }
//         });
//         if (!product) return res.status(404).json({msg:"Data not found"})
//         let response;
//         if(req.role === "admin"){
//             response=await Product.findOne({
//                 attributes:['uuid','name','price'],
//                 where:{
//                     id:product.id
//                 },
//                 include:[{
//                     model:User,
//                     attributes:['name','email'],
    
//                 }]
//             });
//         }else{
//             response = await Product.findOne({
//                 attributes:['uuid','name','price'],
    
//                 where:{
//                     [Op.and]:[{id:product.id},{userId:req.userId}]
//                 },
//                 include:[{
//                     model:User,
//                     attributes:['name','email'],
    
//                 }]
//             });
//         }
//         res.status(200).json(response);
//     }catch (error){
//         res.status(500).json({msg:error.message});
    
//     }
// }

// export const createBuildingMetric = async(req,res)=>{
//     const {name,price} = req.body

//     try {
//         await Product.create({
//             name:name,
//             price:price,
//             userId:req.userId
//         });
//         res.status(201).json({msg:"Product Created succesfuly"})


//     }
//     catch(error){
//         res.status(500).json({msg:error.message});

//     }
    
// }

// export const updateProduct = async(req,res)=>{
//     try{

//         const product = await Product.findOne({
//             where:{
//                 uuid:req.params.id
//             }
//         });
//         if (!product) return res.status(404).json({msg:"Data not found"})
//         const {name,price} = req.body
//         if(req.role === "admin"){
//             await Product.update({name,price},{
//                 where:{
//                     id:product.id
//                 }
//             });
            
       
//         }else{
//             if (req.userId !== product.userId) return res.status(403).json({msg:"Access is forbidedn"})
//             await Product.update({name,price},{
//                 where:{
//                     [Op.and]:[{id:product.id},{userId:req.userId}]
//                 }
//             });
//         }
//         res.status(200).json({msg:"Product update successfulyyy"});
//     }catch (error){
//         res.status(500).json({msg:error.message});
    
//     }
// }

// export const deleteProduct = async(req,res)=>{
//     try{

//         const product = await Product.findOne({
//             where:{
//                 uuid:req.params.id
//             }
//         });
//         if (!product) return res.status(404).json({msg:"Data not found"})
//         const {name,price} = req.body
//         if(req.role === "admin"){
//             await Product.destroy({
//                 where:{
//                     id:product.id
//                 }
//             });
            
       
//         }else{
//             if (req.userId !== product.userId) return res.status(403).json({msg:"Access is forbidedn"})
//             await Product.destroy({
//                 where:{
//                     [Op.and]:[{id:product.id},{userId:req.userId}]
//                 }
//             });
//         }
//         res.status(200).json({msg:"Product delete successfulyyy"});
//     }catch (error){
//         res.status(500).json({msg:error.message});
    
//     }
// }