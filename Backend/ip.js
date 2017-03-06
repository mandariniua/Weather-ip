/**
 * Created by Коля on 26.02.2017.
 */
var fs = require('fs');
var path = require('path');
var request = require('request');
var rp = require('request-promise');

function getIpInfo(ip, callback) {
    var url = 'http://ip-api.com/json/' + ip;
    request(url, function (error, response, body) {
        if(error){
            return callback(error)
        }

        var obj = JSON.parse(body);
        callback(null, obj);
        return;
    });
}

function  getWeather(city, countryCode, callback) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city +','
        + countryCode + '&appid=e5131bba754d38c18d6ac1f4cffb19ac';
    request(url, function (error, response, body) {
        if(error){
            return callback(error);
        }
        var obj = JSON.parse(body);
        callback(null,obj);
        return;
    });
}

function getWeatherInfo(ip) {
    return new Promise(function getIpInfo(resolve, reject) {
        getWeather('ok',resolve.city, resolve.countryCode, function (cont, err) {
            resolve({city: resolve.city, temp: (cont.main.temp - 273.15 + '°C')});
        });
        getWeather('error',function (err) {
            reject(err);
        })
    });
}

function ipWeather(req, res) {
    var ip = req.params.ip;

    getWeatherInfo(ip,function (err, content) {
        if (err){
            console.error('My error:',err);
            res.status(500).send('Something broke!');
            return;
        }
        return content;
    })
}

// getWeatherInfo('62.216.46.98',function (err,contents) {
//     console.log(err,contents);
// });

var client = require('elasticio-rest-node')(
    ' ', ' '
);

client.sshkeys.create({
    "key": "",
    "title": "My Key"
}).then(function(key) {
    // do something with the key
});

exports.process = getWeatherInfo;
