const logger = require("../utils/logger.js");
const stationStore = require("../models/station-store"); //include the models
const readingStore = require("../models/readings-store.js");

const station = {
    async index(request, response) {
        const stationId = request.params.id;
        const station = await stationStore.getStation(stationId);
        const readings = await readingStore.getReadingsForStations(stationId);
        logger.info("Station id = " + stationId);
        const viewData = {
            title: "Stations",
            city: station.city,
            readings: readings,
        };
        response.render("station", viewData);
    },
};

module.exports = station;
