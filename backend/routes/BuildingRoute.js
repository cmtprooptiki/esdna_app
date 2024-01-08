import express from "express";

import {
    getBuildings,
    // getBuildings,
    getBuildingById,
    createBuilding,
    updateBuilding,
    deleteBuilding
} from "../controllers/Building.js"
import { verifyUser,adminOnly } from "../middleware/AuthUser.js";
const router = express.Router();

router.get('/buildings',verifyUser,getBuildings);
router.get('/buildings/:id',verifyUser,getBuildingById);
router.post('/buildings',verifyUser,adminOnly,createBuilding);
router.patch('/buildings/:id',verifyUser,adminOnly,updateBuilding);
router.delete('/buildings/:id',verifyUser,adminOnly,deleteBuilding);


export default router;