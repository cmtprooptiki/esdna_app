import { Sequelize } from "sequelize";

<<<<<<< HEAD
// const db=new Sequelize('environ_db','environ_user','#eUq.x43s[;&',{
//     host:"5.77.39.26",
//     dialect:"mysql",
//     port:3306
// });


const db=new Sequelize('auth_db','root','',{
    host:"localhost",
=======
const db=new Sequelize('environ_db','environ_user','#eUq.x43s[;&',{
    host:"5.77.39.26",
>>>>>>> 928921a3500a3d5848200bcdaf860855ca9e7bfb
    dialect:"mysql",
    port:3306
});


// const db=new Sequelize('auth_db2','root','',{
//     host:"localhost",
//     dialect:"mysql",
//     port:3308
// });


export default db;