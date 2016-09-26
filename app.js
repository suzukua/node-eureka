/**
 * Created by zhudan on 2016/9/26.
 */
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var httpUtil = require('./httpUtil');
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// ------------------ METHODS --------------------------------------------------

app.all('/', function (req, res) {
    var port = server.address().port;
    var msg = 'Hello Service ' + port;
    res.status(200);
    res.end(msg);
})


app.get('/node/test', function(req, res){
    var msg = 'you get [/node/test] from node-eureka server';
    res.status(200);
    res.end(msg);
})


app.get("/node/innerCall", function(req, res){
    var msg = 'node微服务通过vipAddress内部调用/node/test的微服务';
    httpUtil.exchange("http://node-eureka/node/test", {}, client, function(err, response, body){
        if(err) console.log(err);
        res.status(200);
        res.end(msg + ", 调用返回值: " + response)
    })
})

// ------------------ Eureka Config --------------------------------------------

var Eureka = require("eureka-js-client").Eureka;

var client = new Eureka({
    filename: 'eureka-client',
    cwd: __dirname
});
client.logger.level('debug');
client.start(function(error){
    console.log(error || 'complete');
});


// ------------------ Server Config --------------------------------------------
var server = app.listen(9999, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);
});