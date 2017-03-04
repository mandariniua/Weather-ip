/**
 * Created by Коля on 26.02.2017.
 */
var fs = require('fs');
var path = require('path');
var request = require('request');

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

function getWeatherInfo(ip,err) {

    getIpInfo(ip,function (err,contents) {
        if(err){
            new Promise(function (contents, err) {
                try{
                    return contents;
                }catch (e){
                    err(e);
                }
            })
        }
        getWeather(contents.city,contents.countryCode,function (err,cont) {
            if(err){
                new Promise(function (cont, err) {
                    try{
                        return cont;
                    }catch (e){
                        err(e);
                    }
                })
            }
            return {city:contents.city,temp:(cont.main.temp-273.15+'°C')};
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

exports.process = ipWeather;
