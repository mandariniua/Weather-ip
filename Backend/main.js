/**
 * Created by Коля on 26.02.2017.
 */

var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

function configureEndpoints(app) {
    var ip = require('./ip');

    app.get('/ipWeather/:ip/', ip.ipWeather);

}

function startServer(port) {
    //Создаем сервер
    var app = express();

    //Настройки вывода в консоль запросов сервера
    app.use(morgan('dev'));

    // //POST Ззапросы
    // app.use(bodyParser.urlencoded({ extended: false }));
    // app.use(bodyParser.json());

    //Настройка страницы
    configureEndpoints(app);

    //Заупуск дополнений по указаному порту
    app.listen(port, function () {
        console.log('My Application Running on http://localhost:'+port+'/');
    });
}

exports.startServer = startServer;