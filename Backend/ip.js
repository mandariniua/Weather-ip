/**
 * Created by Коля on 26.02.2017.
 */
var fs = require('fs');
var path = require('path');
var request = require('request');
var rp = require('request-promise');

function getIpInfo() {
    var options = {
        uri: 'http://ip-api.com/json/',
        qs: {
            access_token: 'http://ip-api.com/json/' + 'ip' // -> uri + '?access_token=xxxxx%20xxxxx'
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };
    rp(options)
        .then(function (ip) {
            console.log('User has %d repos', ip.length);
        })
        .catch (function (err) {
            return err;
        });
}

// function  getWeather(city, countryCode, callback) {
//     var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city +','
//         + countryCode + '&appid=e5131bba754d38c18d6ac1f4cffb19ac';
//     request(url, function (error, response, body) {
//         if(error){
//             return callback(error);
//         }
//         var obj = JSON.parse(body);
//         callback(null,obj);
//         return;
//     });
// }
//
// function getWeatherInfo(ip,err) {
//     if(err){
//         return err;
//     }
//     getIpInfo(ip,function (err,contents) {
//         if(err){
//             return err;
//         }
//         getWeather(contents.city,contents.countryCode,function (err,cont) {
//             if(err){
//                 return err;
//             }
//             return {city:contents.city,temp:(cont.main.temp-273.15+'°C')};
//         })
//
//     });
// }

// function ipWeather() {
//     var options = {
//         method : 'POST',
//         uri: 'http://localhost/ipWeather/${ip}',
//         body: {
//             some: 'payload'
//         },
//         json: true
//
//     };
//
//     var response = request.get(options);
//
//     rp(options)
//         .then(function getWeatherInfo(content) {
//            return content;
//
//         })
//             .catch(function (err) {
//                 console.error('My error:',err);
//             });
// }

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

exports.process = getIpInfo;
