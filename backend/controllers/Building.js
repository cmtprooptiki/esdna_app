import Building from "../models/BuildingModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getBuildings = async(req,res)=>{
    try{
        let response;
        if(req.role === "admin"){
            response=await Building.findAll({
                // attributes:['uuid','name', ['ST_X(location)', 'latitude'], ['ST_Y(location)', 'longitude']],

                attributes:['id','uuid','name','lat','lon','category'],
                // include:[{
                //     model:User,
                //     attributes:['name','email'],

                // }]
            });
        }else{
            response = await Building.findAll({
                // attributes:['uuid','name', ['ST_X(location)', 'latitude'], ['ST_Y(location)', 'longitude']],

                attributes:['id','uuid','name','lat','lon','category'],

                
            });
        }
        res.status(200).json(response);
    }catch (error){
        res.status(500).json({msg:error.message});

    }
}

export const getBuildingById = async(req,res)=>{

    try{
        const response = await Building.findOne({
            attributes:['id','uuid','name','lat','lon','category'],
            where:{
                uuid:req.params.id
            }
        });
        res.status(200).json(response);

    } catch (error){
        res.status(500).json({ msg:error.message });
    }
    






    // try{

    //     const building = await Building.findOne({
    //         where:{
    //             uuid:req.params.id
    //         }
    //     });

    //     if (!building) return res.status(404).json({msg:"Data not found"})
    //     let response;
    
    //     if(req.role === "admin"){
    //         response=await Building.findOne({
    //             attributes:['uuid','name','lat','lon'],
    //             where:{
    //                 id:building.id
    //             },
    //             include:[{
    //                 model:User,
    //                 attributes:['name','email'],
    
    //             }]
    //         });
    //     }
    //     // else{
    //     //     response = await Product.findOne({
    //     //         attributes:['uuid','name','lat','lon'],
    
    //     //         where:{
    //     //             [Op.and]:[{id:building.id},{userId:req.userId}]
    //     //         },
    //     //         include:[{
    //     //             model:User,
    //     //             attributes:['name','email'],
    
    //     //         }]
    //     //     });
    //     // }
    //     res.status(200).json(response);
    // }catch (error){
    //     res.status(500).json({msg:error.message});
    
    // }
}

export const createBuilding = async(req,res)=>{
    const {name,lat,lon,category} = req.body
    // const { name, coordinates } = req.body; // Assuming the request body contains 'name' and 'coordinates' for the building


    try {
        await Building.create({
            name:name,
            lat:lat,
            lon:lon,
            category:category
            // location: {
            //     type: 'Point',
            //     coordinates: coordinates // Array containing latitude and longitude values [latitude, longitude]
            //   }
        });
        res.status(201).json({msg:"Building Created succesfuly"})


    }
    catch(error){
        res.status(500).json({msg:error.message});

    }
    
}

export const updateBuilding= async(req,res)=>{

        const building = await Building.findOne({
            where:{
                uuid:req.params.id
            }
        });

        if (!building) return res.status(404).json({msg:"Data not found"})
        const {name,lat,lon,category} = req.body

        try{

            await Building.update({name,lat,lon,category},{
                where:{
                    id:building.id
                }
            });
            
       
        
        // else{
        //     if (req.userId !== product.userId) return res.status(403).json({msg:"Access is forbidedn"})

        //     await Building.update({name,lat,lon},{
        //         where:{
        //             [Op.and]:[{id:building.id},{userId:req.userId}]
        //         }
        //     });
        // }
        res.status(200).json({msg:"Building update successfulyyy"});
    } catch (error){
        res.status(500).json({msg:error.message});
    
    }
}


export const deleteBuilding = async(req,res)=>{
    
    const building = await Building.findOne({
        where:{
            uuid:req.params.id
        }
    });
    if (!building) return res.status(404).json({msg:"Building not found"});
    
    try{
        await Building.destroy({
            
      
            where:{
                id:building.id
            }
        });
        res.status(200).json({msg:"Building deleted"});
    
    } catch(error){
        res.status(400).json({msg:error.message});
    
    }

}
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