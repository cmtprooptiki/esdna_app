import express from "express";

import {
    getBuildingMetrics,
    getBuildingMetricsById,
    createBuildingMetric,
    updateBuildingMetric,
    deleteBuildingMetric,
    getBuildingMetricsAVG
    // getProducts,
    // getProductById,
    // createProduct,
    // updateProduct,
    // deleteProduct
} from "../controllers/BuildingMetrics.js"
import { verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();

router.get('/buildingmetrics',verifyUser,getBuildingMetrics);

router.get('/buildingmetrics-avg',verifyUser,getBuildingMetricsAVG)

router.get('/buildingmetrics/:id',verifyUser,getBuildingMetricsById);
router.post('/createbuildingmetric',verifyUser,createBuildingMetric);
router.patch('/updatebuildingmetric/:id',verifyUser,updateBuildingMetric);
router.delete('/deletebuildingmetric/:id',verifyUser,deleteBuildingMetric);
// router.get('/products/:id',verifyUser,getProductById);
// router.post('/products',verifyUser,createProduct);
// router.patch('/products/:id',verifyUser,updateProduct);
// router.delete('/products/:id',verifyUser,deleteProduct);


export default router;