const stationAnalytics = {
    degree_to_direction(degree){
        if (degree >= 337.5 || degree < 22.5) {
            return "Nord";
        } else if (degree >= 22.5 && degree < 67.5) {
            return "Nordost";
        } else if (degree >= 67.5 && degree < 112.5) {
            return "Ost";
        } else if (degree >= 112.5 && degree < 157.5) {
            return "Südost";
        } else if (degree >= 157.5 && degree < 202.5) {
            return "Süd";
        } else if (degree >= 202.5 && degree < 247.5) {
            return "Südwest";
        } else if (degree >= 247.5 && degree < 292.5) {
            return "West";
        } else if (degree >= 292.5 && degree < 337.5) {
            return "Nordwest";
        } else {
            return "Unknown";
        }
    },
    convertCodeWind(readings){
        const weatherCode ={
            200: { description: "Gewitter", icon: `<i class="bi bi-cloud-lightning-rain"  style="color: grey; font-size: 34px; position: absolute; top: 20px; right: 20px;"></i>`},
            300: { description: "Nieselregen", icon: `<i class="bi bi-cloud-drizzle"  style="color: grey; font-size: 34px; position: absolute; top: 20px; right: 20px;"></i>`},
            500: { description: "Regen", icon: `<i class="bi bi-cloud-rain"  style="color: grey; font-size: 34px; position: absolute; top: 20px; right: 20px;"></i>`},
            600: { description: "Schnee", icon: `<i class="bi bi-cloud-snow"  style="color: grey; font-size: 34px; position: absolute; top: 20px; right: 20px;"></i>`},
            700: { description: "Wolkig", icon: `<i class="bi bi-cloudy"  style="color: grey; font-size: 34px; position: absolute; top: 20px; right: 20px;"></i>`},
            800: { description: "Sonnig", icon: `<i class="bi bi-sun"  style="color: grey; font-size: 34px; position: absolute; top: 20px; right: 20px;"></i>`},
        }
        return readings.map(reading=>{
            const {description, icon} = weatherCode[reading.wetter];
            return {
                ...reading,
                description: description ? description : "Unknown",
                icon: icon ? icon : "",
                direction : this.degree_to_direction(reading.deg)
            }
        })
    },

    getMinimumReading(readings) {
        let min = null;
        if (readings.length > 0) {
            min = readings[0];
            for (let i = 1; i < readings.length; i++) {
                if (readings[i] < min) {
                    min = readings[i];
                }
            }
        }
        return min;
    },
    getMaximumReading(readings) {
        let max = null;
        if (readings.length > 0) {
            max = readings[0];
            for (let i = 1; i < readings.length; i++) {
                if (readings[i] > max) {
                    max = readings[i];
                }
            }
        }
        return max;
    },
    trends(readings,attribute){
        let latest = readings.slice(0,2); // get the 2 latest reading (first 2 in the array)
        let trend = ``;
        let color = "";
        switch(attribute){
            case "temperatur":
                color = "grey";
                break;
            case "wind":
                color = "orange";
                break;
            case "luftdruck":
                color = "yellow";
                break;
        }
        if( latest[0] >= latest[1]) {
            trend = `<i class="bi bi-arrow-up-right" style="color: ${color}; font-size: 34px; position: absolute; top: 60px; right: 20px;"></i>`;
        } else {
            trend = `<i class="bi bi-arrow-down-right" style="color: ${color}; font-size: 34px; position: absolute; top: 60px; right: 20px;"></i>`;
        }
        return trend;
    },
    attribute_summary(readings) {
        let readingSummary = [];
        const attributes = ["temperatur", "wind", "luftdruck"];
        for (const attribute of attributes) {
            let attribute_readings = [];
            for (const reading of readings) {
                attribute_readings.push(reading[attribute]); // the last readings added will be the first one in this array
            }
            let minReading = this.getMinimumReading(attribute_readings);
            let maxReading = this.getMaximumReading(attribute_readings);
            let trends = this.trends(attribute_readings,attribute);
            readingSummary.push({minReading: minReading, maxReading: maxReading, trend: trends});
        }
        return readingSummary;
    }

};


module.exports = stationAnalytics;