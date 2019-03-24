const request = require("request");
//const geoUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Indianapolis.json?access_token=pk.eyJ1IjoiaHJkeWEiLCJhIjoiY2p0OHpwa2o2MGVkNDQ0dWl4NHE3ZTIyOCJ9.M70MZkTnBw9-wfyj1DjbAw";

const geography = (address,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address + ".json?access_token=pk.eyJ1IjoiaHJkeWEiLCJhIjoiY2p0OHpwa2o2MGVkNDQ0dWl4NHE3ZTIyOCJ9.M70MZkTnBw9-wfyj1DjbAw";
    request({url, json :true},(error,response) =>{
        if(error) {
            callback("Connectivity issue");
        }else if(response.body.features.length === 0 || response.body.message){
            callback("Invalid location");
        }else {
             callback(undefined,{
                 longitude : response.body.features[0].center[0],
                 latitude : response.body.features[0].center[1],
                 location: response.body.features[0].place_name
             });
        }
    });
};
module.exports = geography;