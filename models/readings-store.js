const dataStore = require("./data-store.js");
const dataStoreClient = dataStore.getDataStore();
const logger = require("../utils/logger.js");


const readingStore = {

    async getReadingsForStations(stationId) {
        // current weather is the last added data, after query it's the first data in query
        const query = 'SELECT wetter,temperatur,wind,luftdruck FROM station_readings WHERE station_id=$1 ORDER BY DATE_ADDED DESC';
        const values = [stationId];
        try {
            let result = await dataStoreClient.query(query, values);
            return result.rows;
        } catch (e) {
            logger.error("Error fetching readings for station" ,e);
        }
    },
};

module.exports = readingStore;