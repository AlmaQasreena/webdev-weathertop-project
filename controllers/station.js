const logger = require("../utils/logger.js");
const stationStore = require("../models/station-store"); //include the models
const readingStore = require("../models/readings-store.js");
const stationAnalytics = require("../utils/station-analytics.js");


const station = {
    async index(request, response) {
        const stationId = request.params.id;
        const station = await stationStore.getStation(stationId);
        let readings = await readingStore.getReadingsForStations(stationId);
        readings = stationAnalytics.convertCodeWind(readings);
        const forecast = await stationStore.forecastChart(station.latitude,station.longitude);
        logger.info("Station id = " + stationId);
        const viewData = {
            title: "Stations",
            id: station.id,
            city: station.city,
            latitude: station.latitude,
            longitude: station.longitude,
            readings: readings,
            forecast: forecast,
            readingSummary: stationAnalytics.attribute_summary(readings)
        };
        response.render("station", viewData);
    },
    async addReadings(request, response) {
        const stationId = request.params.id;
        const newReading = {
            wetter: Number(request.body.wetter),
            temperatur: Number(request.body.temperatur),
            wind: Number(request.body.wind),
            windrichtung:  Number(request.body.windrichtung),
            luftdruck: Number(request.body.luftdruck)
        };
        logger.debug("New Reading", newReading);
        await readingStore.addReadings(stationId, newReading);
        response.redirect("/stations/" + stationId);
    },
    async deleteReadings(request, response) {
        const stationId = request.params.id;
        const readingId = request.params.readingid;
        logger.debug(`Deleting Reading ${readingId} from Playlist ${stationId}`);
        await readingStore.removeReading(readingId);
        response.redirect("/stations/" + stationId);
    },


};

module.exports = station;
