const express = require("express");
const router = express.Router();

const home = require("./controllers/home.js");
const dashboard = require("./controllers/dashboard.js");
const station = require("./controllers/station.js");


router.get("/", home.index);
router.get("/dashboard", dashboard.index);
router.get('/dashboard/deletestation/:id', dashboard.deleteStation);
router.post('/dashboard/addstation', dashboard.addStation);

router.get("/stations/:id", station.index);
router.post("/station/:id/addreadings", station.addReadings);
router.get('/station/:id/deletereadings/:readingid', station.deleteReadings);
module.exports = router;
