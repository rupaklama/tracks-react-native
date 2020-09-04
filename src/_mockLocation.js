// This is test only file to mockup user's location
// faking user location to test our app
import * as Location from 'expo-location';

// This represents 10 meters in lat & long.
const tenMetersWithDegrees = 0.0001;

const getLocation = increment => {
  // tricking expo to think that user/app is moving around when it really isn't
  return {
    timestamp: 10000000,
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 5,
      altitudeAccuracy: 5,
      altitude: 5,
      longitude: -122.68167414618856 + increment * tenMetersWithDegrees,
      latitude: 38.45489932800971 + increment * tenMetersWithDegrees,
      // lat & long of user location
      // will move user to 10 meters & add 10 meters again
    },
  };
};

let counter = 0;
setInterval(() => {
  Location.EventEmitter.emit('Expo.locationChange', {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter),
  });
  counter++;
}, 1000);

// faking out user's location changed in the world
// Every second, user's location is changed by 10 meters
// This is only for testing purpose to make sure our app works in the real world.