var path = require('path');
var archive = require('../helpers/archive-helpers');
var helper = require('./http-helpers');
var fs = require('fs');
var querystring = require('querystring');
var http = require('http-request');
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
        // WRITE TO SITES.TXT
        fs.open("/Users/HR10/Code/FaridSiddiqi/2014-02-web-historian/archives/sites.txt", "a+", 666, function(err,fd){
          if( err){
            console.log('file could not be opened');
          }else{
            console.log('file opened successfully');
            console.log('fd = ',typeof fd);
            fs.write(fd, parsedData.url + '\n',null, 'utf8', function(err, written, buffer){
              if(err){
                console.log('could not write');
              }else{
                console.log('write is successful');
                fs.close(fd, function(){
                  console.log('file closed');
                });
              }
            });
          }
        });
        // SCRAPE SITE
        http.get({
          url: parsedData.url,
          progress: function(current,total){
            console.log('downloaded %d bytes from %d', current, total);
          }
        }, archive.paths['archivedSites']+"/"+parsedData.url, function(err, res){
          if( err){
            console.log('err in scraper');
            return;
          }
          console.log(res.code, res.header, res.file);
        });
      });
      break;

    case 'OPTIONS':
      break;

    default:
      break;
  }
};
