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
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
      }


  },{    
    // Define a composite unique constraint for year, buildingId, and metricId    
    indexes: [         
      {          
        unique: true,             
        fields: ['buildingId', 'metricId','year'],
        name:"unique_building_metric_year"
      }     
    ]
  });


Buildings.belongsToMany(Metrics, { through: BuildingMetric, foreignKey: 'buildingId'});
Metrics.belongsToMany(Buildings, { through: BuildingMetric, foreignKey: 'metricId'});
BuildingMetric.belongsTo(Buildings, { foreignKey: 'buildingId', targetKey: 'id' });
BuildingMetric.belongsTo(Metrics, { foreignKey: 'metricId', targetKey: 'id'});
// After sequelize.sync
// await queryInterface.addConstraint('BuildingMetric', {
//   fields: ['buildingId', 'metricId', 'year'],
//   type: 'unique',
//   name: 'BuildingMetrics_metricId_buildingId_unique' // use the same name as the existing index
// });




export default BuildingMetric;