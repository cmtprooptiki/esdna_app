import express from "express";
import cors from "cors";
import session from "express-session";
import db from "./config/Database.js";
import dotenv from "dotenv";
import  SequelizeStore  from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import BuildingRoute from "./routes/BuildingRoute.js"
import MetricRoute from "./routes/MetricRoute.js"
import BuildingMetricRoute from "./routes/BuildingMetricRoute.js";
import AuthRoute from "./routes/AuthRoute.js";


dotenv.config();

const app = express();
const sessionStore=SequelizeStore(session.Store);

const store = new sessionStore({
    db:db
});

// (async()=>{
//     await db.sync();
// })();

app.use(session({
    secret:process.env.SESS_SECRET,
    resave:false,
    saveUninitialized:"true",
    store:store,
    cookie:{
        secure:'auto'
    }
}))

app.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}));

app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(BuildingRoute);
app.use(MetricRoute);
app.use(BuildingMetricRoute);
app.use(AuthRoute);
// store.sync();

app.listen(process.env.APP_PORT,()=>{
    console.log('Server up and runningg....');
});