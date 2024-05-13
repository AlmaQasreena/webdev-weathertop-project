const logger = require("../utils/logger.js");
const StationsCollection = require("../models/station-store.js"); //include the models

const station = {
    index(request, response) {
        const stationId = request.params.id;
        logger.info("Station id = " + stationId);

        const viewData = {
            title: "Station List",
            city: StationsCollection[stationId].city,
            weather:StationsCollection[stationId].weather,
             // output the states in View
        };

        response.render("station", viewData);
    },
};

module.exports = station;
