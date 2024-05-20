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
            id: station.id,
            city: station.city,
            latitude: station.latitude,
            longitude: station.longitude,
            readings: readings,
        };
        response.render("station", viewData);
    },
    async addReadings(request, response) {
        const stationId = request.params.id;
        const newReading = {
            wetter: Number(request.body.wetter),
            temperatur: Number(request.body.temperatur),
            wind: Number(request.body.wind),
            luftdruck: Number(request.body.luftdruck)
        };
        logger.debug("New Reading", newReading);
        await readingStore.addReadings(stationId, newReading);
        response.redirect("/stations/" + stationId);
    },
};

module.exports = station;
