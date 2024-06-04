import { Sequelize } from "sequelize";

// const db=new Sequelize('environ_db','environ_user','#eUq.x43s[;&',{
//     host:"5.77.39.26",
//     dialect:"mysql",
//     port:3306
// });


const db=new Sequelize('auth_db','root','',{
    host:"localhost",
    dialect:"mysql",
    port:3306
});


export default db;