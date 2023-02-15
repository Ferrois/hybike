var stationQueue = [];

function addQueuer(username, station) {
  stationQueue.push({ station, username });
}

function removeQueuer(username,station) {
    stationQueue = stationQueue.filter((queuer) => queuer.username !== username && queuer.station !== station);
}

function isAvailable(station) {
  return !stationQueue.find((queuer) => queuer.station === station);
}

function returnQueuer(station) {
  return stationQueue.find((queuer) => queuer.station === station);
}

module.exports = { addQueuer,removeQueuer, isAvailable, returnQueuer };
