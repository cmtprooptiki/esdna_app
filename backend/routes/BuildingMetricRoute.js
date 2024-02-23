import express from "express";

import {
    getBuildingMetrics,
    getBuildingMetricsPublic,
    getBuildingMetricsById,
    createBuildingMetric,
    updateBuildingMetric,
    deleteBuildingMetric,
    getBuildingMetricsAVG,
    getGeoMetrics,
    importFromCSV
    // getProducts,
    // getProductById,
    // createProduct,
    // updateProduct,
    // deleteProduct
} from "../controllers/BuildingMetrics.js"
import { verifyUser,adminOnly } from "../middleware/AuthUser.js";
const router = express.Router();

router.get('/buildingmetrics',verifyUser,getBuildingMetrics);
//getBuildingMetrics for Public Use

router.get('/buildingmetrics-public',getBuildingMetricsPublic);


router.get('/buildingmetrics-avg',verifyUser,getBuildingMetricsAVG)
router.get('/buildingmetrics-geo',verifyUser,getGeoMetrics);
router.get('/buildingmetrics/:id',verifyUser,getBuildingMetricsById);
router.post('/createbuildingmetric',verifyUser,adminOnly,createBuildingMetric);
router.post('/upload-csv',verifyUser,adminOnly,importFromCSV);
router.patch('/updatebuildingmetric/:id',verifyUser,adminOnly,updateBuildingMetric);
router.delete('/deletebuildingmetric/:id',verifyUser,adminOnly,deleteBuildingMetric);
// router.get('/products/:id',verifyUser,getProductById);
// router.post('/products',verifyUser,createProduct);
// router.patch('/products/:id',verifyUser,updateProduct);
// router.delete('/products/:id',verifyUser,deleteProduct);


export default router;