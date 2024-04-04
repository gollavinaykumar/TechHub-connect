import { Router } from "express";

import { createPayment, updatePricePlan } from "../Controllers/updatePricePlan";

const router = Router();

router.patch("/", updatePricePlan);
router.post("/", createPayment);
export default router;
