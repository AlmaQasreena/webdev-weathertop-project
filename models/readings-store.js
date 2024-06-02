const dataStore = require("./data-store.js");
const dataStoreClient = dataStore.getDataStore();
const logger = require("../utils/logger.js");


const readingStore = {

    async getReadingsForStations(stationId) {
        // current weather is the last added data, after query it's the first data in query
        const query = 'SELECT * FROM station_readings WHERE station_id=$1 ORDER BY DATE_ADDED DESC';
        const values = [stationId];
        try {
            let result = await dataStoreClient.query(query, values);
            return result.rows;
        } catch (e) {
            logger.error("Error fetching readings for station" ,e);
        }
    },
    async addReadings(stationId, newReading) {
        const query = 'INSERT INTO station_readings (WETTER,TEMPERATUR,WIND,LUFTDRUCK,DEG,STATION_ID) VALUES($1, $2, $3, $4, $5, $6)';
        const values = [newReading.wetter, newReading.temperatur, newReading.wind, newReading.luftdruck, newReading.windrichtung, stationId];
        try {
            await dataStoreClient.query(query, values);
        } catch (e) {
            logger.error("Error adding readings", e);
        }
    },
    async removeReading(readingId) {
        const query = 'DELETE FROM station_readings WHERE id=$1';
        const values = [readingId];
        try {
            await dataStoreClient.query(query, values);
        } catch (e) {
            logger.error("Unable to remove reading from station", e);
        }
    },

};

module.exports = readingStore;