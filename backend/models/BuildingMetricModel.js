import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Buildings  from "./BuildingModel.js";
import Metrics from "./MetricModel.js";


const {DataTypes} = Sequelize;


const BuildingMetric = db.define('BuildingMetric', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    buildingId: {
      type: DataTypes.INTEGER,
      references: {
        model: Buildings, // 'Buildings' would also work
        foreignkey: 'id'
      }
    },
    metricId: {
      type: DataTypes.INTEGER,
      references: {
        model: Metrics, // 'Metrics' would also work
        foreignKey: 'id'
      }
      
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
      },

      year: {
        type: DataTypes.STRING,
        // type: DataTypes.DATEONLY, // Change the type to DATE
        allowNull: false,
        validate:{
            notEmpty: true
        }
      }


  }
  // ,
  // {    
  //   // Define a composite unique constraint for year, buildingId, and metricId    
  //   indexes: [         
  //     {          
  //       unique: true,             
  //       fields: ['buildingId', 'metricId','year'],
  //       name:"unique_building_metric_year"
  //     }     
  //   ]
  // }
  
  );



  Buildings.hasMany(BuildingMetric, { foreignKey: 'buildingId' });
  Metrics.hasMany(BuildingMetric, { foreignKey: 'metricId' });
  
  BuildingMetric.belongsTo(Buildings, { foreignKey: 'buildingId', targetKey: 'id' });
  BuildingMetric.belongsTo(Metrics, { foreignKey: 'metricId', targetKey: 'id' });
  

//Restriction for metricID-it cannot multiple same metricid for the same building
// Buildings.belongsToMany(Metrics, { through: BuildingMetric, foreignKey: 'buildingId'});
// Metrics.belongsToMany(Buildings, { through: BuildingMetric, foreignKey: 'metricId'});
// BuildingMetric.belongsTo(Buildings, { foreignKey: 'buildingId', targetKey: 'id' });
// BuildingMetric.belongsTo(Metrics, { foreignKey: 'metricId', targetKey: 'id'});





export default BuildingMetric;