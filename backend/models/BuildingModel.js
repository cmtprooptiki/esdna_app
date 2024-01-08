import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Metrics from "./MetricModel.js";

const {DataTypes} = Sequelize;

const Buildings = db.define('building',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },

    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    // location: {
    //     type: DataTypes.GEOGRAPHY('POINT'), // Using GEOGRAPHY data type for POINT
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // }
    lat:{
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    lon:{
        type: DataTypes.DECIMAL(11, 8),
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
    
},{
    freezeTableName: true
});



// Buildings.belongsToMany(Metrics, { through: 'MetricsBuildings' });
// Metrics.belongsToMany(Buildings, { through: 'MetricsBuildings' });

export default Buildings;