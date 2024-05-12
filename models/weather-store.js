const logger = require("../utils/logger.js");

const Regensburg = {
    city: "Regensburg",
    weather: [
        {
            Wetter: 800,
            Temperatur:20.32,
            Wind: 0.89,
            Luftdruck: 1016
        },
        {
            Wetter: 800,
            Temperatur:20.32,
            Wind: 0.89,
            Luftdruck: 1016
        },
        {
            Wetter: 400,
            Temperatur:32.5,
            Wind: 15,
            Luftdruck:90
        },
        {
            Wetter: 400,
            Temperatur:32.5,
            Wind: 15,
            Luftdruck:90
        },
        {
            Wetter: 800,
            Temperatur:11.16,
            Wind: 2.23,
            Luftdruck: 1024
        },
        {
            Wetter: 800,
            Temperatur:11.16,
            Wind: 2.23,
            Luftdruck: 1024
        },
        {
            Wetter: 800,
            Temperatur:-6.14,
            Wind: 1.15,
            Luftdruck: 1027
        },
    ],
};

const Kelheim = {
    city: "Kelheim",
    weather: [
        {
            Wetter: 600,
            Temperatur: 0.25,
            Wind: 1.02,
            Luftdruck: 1002
        },
        {
            Wetter: 600,
            Temperatur: 0.25,
            Wind: 1.02,
            Luftdruck: 1002
        },
        {
            Wetter: 500,
            Temperatur: 0.5,
            Wind: 2.02,
            Luftdruck: 1020
        },
        {
            Wetter: 500,
            Temperatur: 0.5,
            Wind: 2.02,
            Luftdruck: 1020
        },
        {
            Wetter: 300,
            Temperatur: 12.7,
            Wind: 1.87,
            Luftdruck: 1012
        },
        {
            Wetter: 300,
            Temperatur: 12.7,
            Wind: 1.87,
            Luftdruck: 1012
        },
        {
            Wetter: 800,
            Temperatur: 24.14,
            Wind: 1.04,
            Luftdruck: 1002
        },
    ],
};

const München = {
    city: "München",
    weather: [
        {
            Wetter: 500,
            Temperatur:17.67,
            Wind: 0.89,
            Luftdruck: 1017
        },
        {
            Wetter: 500,
            Temperatur:17.67,
            Wind: 0.89,
            Luftdruck: 1017
        },
        {
            Wetter: 800,
            Temperatur:22.5,
            Wind:0.58,
            Luftdruck:1000
        },
        {
            Wetter: 800,
            Temperatur:22.5,
            Wind:0.58,
            Luftdruck:1000
        },
        {
            Wetter: 300,
            Temperatur:12.4,
            Wind: 1.00,
            Luftdruck: 1047
        },
        {
            Wetter: 300,
            Temperatur:12.4,
            Wind: 1.00,
            Luftdruck: 1047
        },
        {
            Wetter: 200,
            Temperatur:0.05,
            Wind: 1.73,
            Luftdruck: 1042
        },
    ]
};

const WeatherStation = [Regensburg,Kelheim,München];
module.exports = WeatherStation;
