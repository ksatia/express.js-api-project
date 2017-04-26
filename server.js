var express = require('express');
var app = express();
var route = require('./routes.js');
var url = require('url');

//app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');
//app.use(route.function());

app.get('/:date', function(req, res){
    //res.render("index");

    //res.send() assumes the content-type of the response to be html and then calls end whereas res.end() makes no such assumption
    res.send(routingResponse(req));
}).listen(8080)



function routingResponse(req) {
    var dateFormatData = req.params.date;
    
    //log request url parameters just to see the properties
    console.log(url.parse(req.url));
    
    if (typeof dateFormatData === "string") {
        var unix = "1234567";
        var naturalLanguageDate = dateFormatData;
    }
    else {
        var unix = "1234567";
        var naturalLanguageDate = "poopeedoopee";
    }
    
    var responseData = {unix: unix, naturalDate: naturalLanguageDate};
    return responseData;
}