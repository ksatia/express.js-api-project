var express = require('express');
var app = express();
var route = require('./routes.js');
var url = require('url');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

//app.use(route.function());

app.get('/', function(req,res){
    res.render('index');
})

app.get('/:date', function(req, res){
    //res.send() assumes the content-type of the response to be html and then calls end whereas res.end() makes no such assumption
    res.json(routingResponse(req));
}).listen(process.env.PORT);



function routingResponse(req) {
    var dateFormatData = req.params.date;
    //we're looking for a unix stamp or a date in the format of mm+dd+yyyy
    //log request url parameters just to see the properties
    //console.log(url.parse(req.url));
    
    
    var dateFormatOptions = {
        year: 'numeric',
        month: "long",
        day: "2-digit"
    };

    
    //check for a natural language date passed in as the url query
    if (isNaN(dateFormatData)) {
        var dateObject = new Date(dateFormatData);
        //format naturallanguage to local date using formattion options
        var naturalLanguageDate = dateObject.toLocaleDateString("en-us", dateFormatOptions);
        
        //get time returns ms which is what JS uses internally - unix is actually in seconds, so we must divide by 1000
        var unix = dateObject.getTime()/1000;

    }
   
    //program control falls here if the url query is a unix number
    else if (!isNaN(dateFormatData)){
        dateObject = new Date(dateFormatData*1000);
        unix = dateFormatData;
        naturalLanguageDate = new Date(dateFormatData*1000).toLocaleString("en-us", dateFormatOptions);

        /*
        // If we don't want to use formatting options passed as a local string parameter, we can just use an array of months and format the date ourselves.
        
        var monthsArray = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        var year = dateObject.getFullYear();
        var day = dateObject.getDate();
        var month = monthsArray[dateObject.getMonth()];
        var naturalLanguageDate = month + " " + day + ", " + year;
        */
    }
    else {
        unix = null;
        naturalLanguageDate = null;
    }
    
    var responseData = {Unix: unix, NaturalDate: naturalLanguageDate};
    return responseData;
}

//test unix with 1493110400