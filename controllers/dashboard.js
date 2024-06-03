const logger = require("../utils/logger.js");
const stationStore = require("../models/station-store.js"); //include the models
const readingStore = require("../models/readings-store.js");
const accounts = require("./accounts.js");
const stationAnalytics = require("../utils/station-analytics");

const dashboard = {
    async index(request, response) {
        logger.info("dashboard rendering");
        const loggedInUser = await accounts.getCurrentUser(request);
        //const city = await stationStore.getAllStations();
        const city = await stationStore.getUserStations(loggedInUser.id);
        let station =[];
        for (let i= 0; i<city.length; i++) {
            let readings = await readingStore.getReadingsForStations(i+1);
            readings = stationAnalytics.convertCodeWind(readings);
            station.push({
                id: city[i].id,
                city: city[i].city,
                latitude: city[i].latitude,
                longitude: city[i].longitude,
                readings: readings,
                readingSummary: stationAnalytics.attribute_summary(readings)
            });
        }
        const viewData = {
            title: "Dashboard",
            stations: station,
        };
        logger.info("about to render", station);
        response.render("dashboard", viewData);
    },
    async addStation(request, response) {
        const loggedInUser = await accounts.getCurrentUser(request);
        const newStation = {
            name: request.body.name,
            latitude: Number(request.body.latitude),
            longitude: Number(request.body.longitude),
            userid: loggedInUser.id,
        };
        logger.debug("New Station", newStation);
        await stationStore.addStation(newStation);
        response.redirect("/dashboard");
    },
    async deleteStation(request, response) {
        const stationId = request.params.id;
        logger.debug(`Deleting Station ${stationId}`);
        await stationStore.removeStation(stationId);
        response.redirect("/dashboard");
    },

};

module.exports = dashboard;
