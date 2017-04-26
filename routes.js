//we can throw our app gets, puts and posts in here and export as a module called routes at the very end of the file
//in our server.js file we can just require the module, create a server and then write "app.use(require...)" which will
    //essentially use the route module as middleware and all server requests will get passed through to there first.
    
var express = require('express');
var app = express();
var url = require('url');


module.exports = (function() {
app.get(url, function(req, res){
    var requestType = "GET";
    if (req.method === requestType) {
        res.write("nice job, we got a get request here");
    }
    var parsed = url.parse(req.url);
});
})();



    