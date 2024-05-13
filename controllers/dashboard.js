const logger = require("../utils/logger.js");
const StationsCollection = require("../models/station-store.js"); //include the models

const dashboard = {
    index(request, response) {
        logger.info("dashboard rendering");
        const viewData = {
            title: "Dashboard",
            stations: StationsCollection, // output the states in View
        };
        logger.info("about to render", StationsCollection);
        response.render("dashboard", viewData);
    },
};

module.exports = dashboard;
