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
    res.json(routingResponse(req));
}).listen(8080)



function routingResponse(req) {
    var dateFormatData = req.params.date;
    //we're looking for a unix stamp or a date in the format of mm+dd+yyyy
    //log request url parameters just to see the properties
    //console.log(url.parse(req.url));
    
    var dateFormatOptions = {
        year : "numeric",
        month: "long",
        day: "2-digit"
    }
    
    //check for a natural language date passed in as the url query
    if (isNaN(dateFormatData)) {
        var dateObject = new Date(dateFormatData);
        
        var unix = dateObject.getTime()/1000;
        //format naturallanguage to local date using formattion options
        var naturalLanguageDate = dateObject.toLocaleDateString("en-us", dateFormatOptions);
    }
   
    //program control falls here if the url query is a unix number
    else {
        var unix = dateFormatData;
        var naturalLanguageDate = new Date(dateFormatData*1000).toLocaleString("en-us", dateFormatOptions);
    }
    
    var responseData = {unix: unix, naturalDate: naturalLanguageDate};
    return responseData;
}