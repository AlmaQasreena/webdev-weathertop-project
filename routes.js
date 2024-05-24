const express = require("express");
const router = express.Router();

const home = require("./controllers/home.js");
const dashboard = require("./controllers/dashboard.js");
const station = require("./controllers/station.js");
const accounts = require("./controllers/accounts.js");
const auth = require("./utils/auth.js");

router.get("/", home.index);
router.get("/dashboard", auth.protected, dashboard.index);
router.get('/dashboard/deletestation/:id', auth.protected, dashboard.deleteStation);
router.post('/dashboard/addstation', auth.protected, dashboard.addStation);

router.get("/stations/:id", auth.protected, station.index);
router.post("/station/:id/addreadings", auth.protected, station.addReadings);
router.get('/station/:id/deletereadings/:readingid', auth.protected, station.deleteReadings);

//router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
module.exports = router;