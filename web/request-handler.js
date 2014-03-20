var path = require('path');
var archive = require('../helpers/archive-helpers');
var helper = require('./http-helpers');
var fs = require('fs');
var querystring = require('querystring');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log("in handle request");
  console.log("this is req.url: " + req.url);
  console.log("this is req.method: " + req.method);
  //res.write(archive.paths.siteAssets);
  // helper.serveAssets(res, pathname)
  switch(req.method){
    case 'GET':
      var pathname = archive.paths.siteAssets+"/index.html";
      // console.log( "path name is " + pathname );
      fs.readFile(pathname, function(err, file){
        // console.log("in readfile callback");
        // console.log(" file is" + file);
        res.writeHeader(200);
        res.write(file);
        res.end()
      });
      break;

    case 'POST':
      req.content = '';
      req.on('data', function(chunk){
        req.content += chunk;
      });
      req.on('end', function(){
        // parsedData.url is the form entry
        var parsedData = querystring.parse(req.content);
        console.log("archive.paths.list",archive.paths.list);
        // fs.write(archive.paths.list, parsedData.url, function(err, written, buffer){
        fs.write("/Users/HR10/Code/FaridSiddiqi/2014-02-web-historian/archives/sites.txt", "hi test yay", function(err, written, buffer){
          if(!err){
            console.log("write successful!")
          }
        });
      })
      break;

    case 'OPTIONS':
      break;

    default:
      break;
  }
};
