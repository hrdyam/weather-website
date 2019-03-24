const request = require('request');

const forecast = (long,lati,callback) =>{
    const url = "https://api.darksky.net/forecast/c9e87bd5b270cb4cd17841a297f2d319/" + long + "," + lati;
    request({ url, json : true},(error,response)=>{
        if(error) {
            callback("Connectivity issue!");
        }else if(response.body.error){
            callback("Invalid Location!");
        }else {
            callback(undefined,{
                forecast: response.body.currently.summary + '. It is currently ' +
                response.body.currently.temperature + ' degrees out. There is a ' +
                response.body.currently.precipProbability + '% chance of rain.',
            });
        };
    });
}    
module.exports = forecast;