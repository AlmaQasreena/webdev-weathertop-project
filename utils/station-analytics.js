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
            200: { description: "Gewitter", icon: `<svg xmlns="http://www.w3.org/2000/svg"  width="34" height="34" fill="grey" class="bi bi-cloud-lightning-rain" viewBox="0 0 16 16 " style="position: absolute; top: 20px; right: 20px;">
                                                        <path d="M2.658 11.026a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316m9.5 0a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316m-7.5 1.5a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316m9.5 0a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316m-.753-8.499a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973M8.5 1a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4 4 0 0 1 8.5 1M7.053 11.276A.5.5 0 0 1 7.5 11h1a.5.5 0 0 1 .474.658l-.28.842H9.5a.5.5 0 0 1 .39.812l-2 2.5a.5.5 0 0 1-.875-.433L7.36 14H6.5a.5.5 0 0 1-.447-.724z"/>
                                                    </svg>`},
            300: { description: "Nieselregen", icon: `<svg xmlns="http://www.w3.org/2000/svg"  width="34" height="34" fill="grey" class="bi bi-cloud-drizzle" viewBox="0 0 16 16 " style="position: absolute; top: 20px; right: 20px;">
                                                         <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m-3.5 1.5a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m.747-8.498a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973M8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4 4 0 0 1 8.5 2"/>
                                                       </svg>`},
            500: { description: "Regen", icon: `<svg xmlns="http://www.w3.org/2000/svg"  width="34" height="34" fill="grey" class="bi bi-cloud-rain" viewBox="0 0 16 16 " style="position: absolute; top: 20px; right: 20px;">
                                                    <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 0 1-.948-.316l1-3a.5.5 0 0 1 .632-.317m3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317m.247-6.998a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973M8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4 4 0 0 1 8.5 2"/>
                                                </svg>`},
            600: { description: "Schnee", icon: `<svg xmlns="http://www.w3.org/2000/svg"  width="34" height="34" fill="grey" class="bi bi-cloud-snow" viewBox="0 0 16 16 " style="position: absolute; top: 20px; right: 20px;">
                                                    <path d="M13.405 4.277a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10.25H13a3 3 0 0 0 .405-5.973M8.5 1.25a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1-.001 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4 4 0 0 1 8.5 1.25M2.625 11.5a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m2.75 2a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m5.5 0a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m-2.75-2a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m5.5 0a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25"/>
                                                 </svg>`},
            700: { description: "Wolkig", icon: `<svg xmlns="http://www.w3.org/2000/svg"  width="34" height="34" fill="grey" class="bi bi-cloudy" viewBox="0 0 16 16 " style="position: absolute; top: 20px; right: 20px;">
                                                    <path d="M13.405 8.527a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 14.5H13a3 3 0 0 0 .405-5.973M8.5 5.5a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1-.001 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4 4 0 0 1 8.5 5.5"/>
                                                 </svg>`},
            800: { description: "Sonnig", icon: `<svg xmlns="http://www.w3.org/2000/svg"  width="34" height="34" fill="grey" class="bi bi-sun" viewBox="0 0 16 16 " style="position: absolute; top: 20px; right: 20px;">
                                                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
                                                   </svg>`},
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
    trends(readings){
        let lastTwo = readings.slice(0,2);
        let trend = ``;
        if( lastTwo[0] >= lastTwo[1]){
            trend =`<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" className="bi bi-arrow-up-right" viewBox="0 0 16 16 " style="position: absolute; top: 60px; right: 20px;">
                        <path fill-rule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"/>
                    </svg>`;
        } else {
            trend = `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" class="bi bi-arrow-down-right" viewBox="0 0 16 16 " style="position: absolute; top: 60px; right: 20px;">
                        <path fill-rule="evenodd" d="M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0z"/>
                </svg>`;
        }
        return trend;
    },
    attribute_summary(readings) {
        let readingSummary = [];
        const attributes = ["temperatur", "wind", "luftdruck"];
        for (const attribute of attributes) {
            let list_attribute = [];
            for (const element of readings) {
                list_attribute.push(element[attribute]);
            }
            let minReading = this.getMinimumReading(list_attribute);
            let maxReading = this.getMaximumReading(list_attribute);
            let trends = this.trends(list_attribute);
            readingSummary.push({minReading: minReading, maxReading: maxReading, trend: trends});
        }
        return readingSummary;
    }

};


module.exports = stationAnalytics;