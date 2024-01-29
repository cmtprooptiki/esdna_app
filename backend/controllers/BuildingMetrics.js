import BuildingMetric from "../models/BuildingMetricModel.js";
import User from "../models/UserModel.js";
import Building from "../models/BuildingModel.js"
import Metric from "../models/MetricModel.js"

import { Sequelize,Op } from "sequelize";


export const importFromCSV = async(req,res)=>{
    // const {buildingId,metricId,value,year} = req.body
    // // const { name, coordinates } = req.body; // Assuming the request body contains 'name' and 'coordinates' for the building


    // try {
    //     await BuildingMetric.create({
    //         buildingId:buildingId,
    //         metricId:metricId,
    //         value:value,
    //         year:year
    //     });
    //     res.status(201).json({msg:"BuildingMetric Created succesfuly"})


    // }
    // catch(error){
    //     res.status(500).json({msg:error.message});

    // }
    console.log("mpike edw")
    const data = req.body.data;
    console.log(data)
    try {
      // Bulk insert the data into the database
      console.log("Bike kai edw")
      await BuildingMetric.bulkCreate([
        {  "uuid":"ea4d3725-9830-4565-a6ba-970188dsfse5c",
          "buildingId": "4",
          "metricId": "12",
          "value": "120",
          "year": "2023-05-01"
        }
      ],{ fields: ['uuid','buildingId','metricId','value','year' ] });
  
      res.status(200).json({ message: 'Data imported successfully.' });
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }


    
    
}

export const getGeoMetrics = async (req, res) => {
    try {
        let response;
        if (req.role === 'admin') {

            response = await BuildingMetric.findAll({
                attributes: [
                  'id',
                  'uuid',
                  [Building.sequelize.literal('building.id'), 'buildingId'],
                  [Metric.sequelize.literal('metric.id'), 'metricId'],
                  [Building.sequelize.literal('building.name'), 'buildingName'],
                  [Metric.sequelize.literal('metric.name'), 'metricName'],
                  'value',
                  'year',
                  [Building.sequelize.literal('building.lat'), 'lat'],
                  [Building.sequelize.literal('building.lon'), 'lon']                ],
                include: [
                  {
                    model: Building,
                    attributes: [],
                    where: {
                      id: BuildingMetric.sequelize.col('buildingId')
                    }
                  },
                  {
                    model: Metric,
                    attributes: [],
                    where: {
                      id: BuildingMetric.sequelize.col('metricId')
                    }
                  }
                ]
              });

        }
        res.status(200).json(response);

    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
    
}


export const getBuildingMetricsAVG = async (req, res) => {
    try {
        let response;
        const groupAttributes = [
            'Building.name',
            'Building.category',
            'Metric.name',
            'year',
        ];

        if (req.role === 'admin') {
            response = await BuildingMetric.findAll({
                attributes: [
                    ...groupAttributes,
                    [Sequelize.fn('AVG', Sequelize.col('value')), 'mean_value'],
                ],
                include: [
                    {
                        model: Building,
                        attributes: ['name', 'lat', 'lon', 'category'],
                    },
                    {
                        model: Metric,
                        attributes: ['name'],
                    },
                ],
                group: groupAttributes,
            });
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}



export const getBuildingMetrics = async(req,res)=>{
    try{
        let response;
        if(req.role === "admin"){
            response=await BuildingMetric.findAll({
                attributes:['uuid','year','value'] ,
                include:[
                    {
                    model:Building,
                    attributes:['name','lat','lon','category'],
                },
                {
                    model:Metric,
                    attributes:['name','unit','unit_desc']
                            
                }
           ],
           order: [['year', 'ASC']] // Add this line to order by 'year' in ascending order


            });
        }
        
     
        res.status(200).json(response);
    }catch (error){
        res.status(500).json({msg:error.message});

    }
}

export const getBuildingMetricsById = async(req,res)=>{

    try{
        const response = await BuildingMetric.findOne({
            attributes:['uuid','year','value'],
            include:[
                {
                model:Building,
                attributes:['name','lat','lon','category'],
            },
            {
                model:Metric,
                attributes:['name','unit','unit_desc']
                        
            }
            ],    
            where:{
                uuid:req.params.id
            }
        });
        res.status(200).json(response);

    } catch (error){
        res.status(500).json({ msg:error.message });
    }
}

export const createBuildingMetric = async(req,res)=>{
    const {buildingId,metricId,value,year} = req.body
    // const { name, coordinates } = req.body; // Assuming the request body contains 'name' and 'coordinates' for the building


    try {
        await BuildingMetric.create({
            buildingId:buildingId,
            metricId:metricId,
            value:value,
            year:year
        });
        res.status(201).json({msg:"BuildingMetric Created succesfuly"})


    }
    catch(error){
        res.status(500).json({msg:error.message});

    }
    
}

export const updateBuildingMetric= async(req,res)=>{

    const buildingmetric = await BuildingMetric.findOne({
        where:{
            uuid:req.params.id
        }
    });

    if (!buildingmetric) return res.status(404).json({msg:"Data not found"})
    const {value,year} = req.body

    try{

        await BuildingMetric.update({value,year},{
            where:{
                id:buildingmetric.id
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
    res.status(200).json({msg:"BuildingMetric updated successfulyyy"});
} catch (error){
    res.status(500).json({msg:error.message});

}
}


export const deleteBuildingMetric = async(req,res)=>{
    
    const buildingmetric = await BuildingMetric.findOne({
        where:{
            uuid:req.params.id
        }
    });
    if (!buildingmetric) return res.status(404).json({msg:"BuildingMetric not found"});
    
    try{
        await BuildingMetric.destroy({
            
      
            where:{
                id:buildingmetric.id
            }
        });
        res.status(200).json({msg:"BuildingMetric deleted"});
    
    } catch(error){
        res.status(400).json({msg:error.message});
    
    }

}
