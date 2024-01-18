import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Metrics = db.define('metric',{
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
            len: [1, 100]
        }
    },
    unit:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [1, 100]
        }
    },
    unit_desc:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
            len: [1, 300]
        }
    }
  
   
},{
    freezeTableName: true
});


export default Metrics;