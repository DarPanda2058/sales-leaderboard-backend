import { getSalesRecord, addSalesRecord } from "../controllers/dashboard-controllers";
const express = require('express');

const router = express.Router();

router.get('/sales-record', getSalesRecord);

router.post('/add-sale', addSalesRecord);


export default router;
