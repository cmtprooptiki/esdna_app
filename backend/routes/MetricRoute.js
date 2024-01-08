import express from "express";

import {
    getMetrics,
    // getBuildings,
    getMetricById,
    createMetric,
    updateMetric,
    deleteMetric
} from "../controllers/Metrics.js"
import { verifyUser,adminOnly } from "../middleware/AuthUser.js";
const router = express.Router();

router.get('/metrics',verifyUser,getMetrics);
router.get('/metrics/:id',verifyUser,getMetricById);
router.post('/metrics',verifyUser,adminOnly,createMetric);
router.patch('/metrics/:id',verifyUser,adminOnly,updateMetric);
router.delete('/metrics/:id',verifyUser,adminOnly,deleteMetric);


export default router;