const axios = require("axios");
const dataStore = require("./data-store.js");
const dataStoreClient = dataStore.getDataStore();
const logger = require("../utils/logger.js");
const API_KEY = process.env.API_KEY;

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
    async forecastChart(lat,lon) {
        let report = {};
        const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        const result = await axios.get(requestUrl);
        if (result.status == 200) {
            report.tempTrend = [];
            report.windTrend = [];
            report.trendLabels = [];
            const trends = result.data;
            for (let i = 0; i < trends.cnt; i++) {
                report.tempTrend.push(trends.list[i].main.temp);
                report.windTrend.push(trends.list[i].wind.speed);
                const date = new Date(trends.list[i].dt * 1000);
                console.log(date);
                report.trendLabels.push(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`);

            }
        }
        return report;
    }

};

module.exports = stationStore;