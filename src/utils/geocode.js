const request = require("request");
const geocoder = function (place, callback) {
  const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    place
  )}.json?access_token=pk.eyJ1IjoiZGV2MTcyOSIsImEiOiJja3A5b3hzejQwZnJwMnFxbW4wYWRieDBhIn0.91QcGuzuH-c0v2Zwymelqg`;
  // console.log(geoUrl);
  request({ url: geoUrl, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable To Connect To The Service Station.", undefined);
    } else if (body.features.length === 0) {
      callback("Location Invalid Please Try Again With New Name", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: place,
      });
    }
  });
};

module.exports = geocoder;
