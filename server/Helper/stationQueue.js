var stationQueue = [];

function addQueuer(username,stationId) {
  stationQueue.push({ stationId, username });
}

function removeQueuer(username,stationId) {
    stationQueue = stationQueue.filter((queuer) => queuer.username !== username && queuer.stationId !== stationId);
}

function isAvailable(stationId) {
  return !stationQueue.find((queuer) => queuer.stationId === stationId);
}

function returnQueuer(stationId) {
  return stationQueue.find((queuer) => queuer.stationId === stationId);
}

function returnWholeQueue() {
  return stationQueue;
}

module.exports = { addQueuer,removeQueuer, isAvailable, returnQueuer, returnWholeQueue };
