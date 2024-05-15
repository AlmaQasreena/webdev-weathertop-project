
const dataStore = require("./data-store.js");
const dataStoreClient = dataStore.getDataStore();
const logger = require("../utils/logger.js");

const stationStore = {
    async getAllStations() {
        const query = 'SELECT * FROM station';
        try {
            let result = await dataStoreClient.query(query);
            return result.rows;
        } catch (e) {
            logger.error("Error fetching all stations", e);
        }
    },
    async getStation(id) {
        const query = "SELECT * FROM station WHERE id=$1";
        const values = [id];
        try {
            let result = await dataStoreClient.query(query, values);
            return result.rows[0];
        } catch (e) {
            logger.error("Error fetching station", e);
        }
    },

};

module.exports = stationStore;