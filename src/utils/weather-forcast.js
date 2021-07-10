const request = require("request");
const chalk = require("chalk");
const weather = function (longitude, latitude, callback) {
  const weatherUrl = `http://api.weatherstack.com/current?access_key=684633ffa78a5b36194ad1270d049e58&%20query=${latitude},${longitude}`;
  // console.log(weatherUrl);
  request({ url: weatherUrl, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable To Connect To The Server.", undefined);
    } else if (body.error) {
      console.log("Unable To Find The Location.", undefined);
    } else {
      //     console.log(
      //       chalk.redBright.inverse(
      //         `HEY BUDDY😀!!
      // What's Up in ${body.location.region},${body.location.country}
      // The Current Temperature is ${body.current.temperature}
      // Chances of 🌧 Rain are ${body.current.precip}%,
      // Still There Is Humidity is ${body.current.humidity}%,
      // But the Current 💨Wind Speed is ${body.current.wind_speed}
      // And Go With A Pair of 😎 Sunglasses As The UV Index is ${body.current.uv_index}
      // Overall The Weather Description Is ${body.current.weather_descriptions[0]}`
      //       )
      //     );
      callback(
        undefined,
        `HEY BUDDY😀!!
      What's Up in :${body.location.region},${body.location.country}
      The Current Temperature is :${body.current.temperature}
      Chances of 🌧 Rain are ${body.current.precip}%,
      There Is Humidity is ${body.current.humidity}%,
      The Current 💨Wind Speed is ${body.current.wind_speed}
      Go With A Pair of 😎 Sunglasses As The UV Index is ${body.current.uv_index}.
      ▶▶Overall The Weather Description Is ${body.current.weather_descriptions[0]}◀◀`
      );
    }
  });
};
module.exports = weather;
