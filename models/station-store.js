
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
    async removeStation(stationId) {
        const query = 'DELETE FROM station WHERE id=$1';
        const values = [stationId];
        try {
            await dataStoreClient.query(query, values);
        } catch (e) {
            logger.error("Unable to remove station", e);
        }
    },
    async addStation(newStation) {
        const query = 'INSERT INTO station (CITY,LATITUDE,LONGITUDE,USER_ID) VALUES($1, $2, $3, $4)';
        const values = [newStation.name, newStation.latitude, newStation.longitude, newStation.userid];
        try {
            await dataStoreClient.query(query, values);
        } catch (e) {
            logger.error("Error adding station", e);
        }
    },
    async getUserStations(email) {
        const query = 'SELECT * FROM station WHERE user_id=$1';
        const values = [email];
        try {
            let result = await dataStoreClient.query(query, values);
            return result.rows;
        } catch (e) {
            logger.error("Error fetching stations for user: ", e);
        }
    },
};

module.exports = stationStore;