const StationSchema = require("../Models/station");

async function returnStationInfo(stationId) {
    const stationInfo = await StationSchema.findOne({id : stationId}).exec();
    return stationInfo;
}

async function updateStationInfo(stationInfo){
    const savedStation = await StationSchema.findOneAndUpdate({id: stationInfo.id}, stationInfo).exec();
    return savedStation;
}

module.exports = {returnStationInfo, updateStationInfo};