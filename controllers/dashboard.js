const logger = require("../utils/logger.js");
const stationStore = require("../models/station-store.js"); //include the models
const readingStore = require("../models/readings-store.js");

const dashboard = {
    async index(request, response) {
        logger.info("dashboard rendering");
        const city = await stationStore.getAllStations();
        let station =[];
        for (let i=0; i<city.length; i++) {
            const readings = await readingStore.getReadingsForStations(i+1);
            station.push({id:city[i].id, city: city[i].city, readings: readings});
        }
        const viewData = {
            title: "Dashboard",
            stations: station,
        };
        logger.info("about to render", station);
        response.render("dashboard", viewData);
    },
};

module.exports = dashboard;
