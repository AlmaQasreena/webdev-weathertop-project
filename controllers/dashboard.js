const logger = require("../utils/logger.js");
const WeatherCollection = require("../models/weather-store.js"); //include the models

const dashboard = {
    index(request, response) {
        logger.info("dashboard rendering");
        const viewData = {
            title: "Dashboard",
            stations: WeatherCollection, // output the states in View
        };
        logger.info("about to render", WeatherCollection);
        response.render("dashboard", viewData);
    },
};

module.exports = dashboard;
