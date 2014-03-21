var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)

};

exports.send404 = function(resp){
  resp.writeHead(404, exports.headers);
  resp.end('404 - site not found');
};

exports.redirect = function(url, folder, statusCode, resp){
  // res.redirect(archive.paths.siteAssets + '/' + url);

  var pathname = folder + '/' + url;
    fs.readFile(pathname, function(err, file){
      if(err){
        console.log('cannot read file');
        exports.send404(resp);
      } else {
        // console.log("in readfile callback");
        // console.log(" file is" + file);
        resp.writeHead(statusCode, exports.headers);
        // resp.write(file);
        resp.end(file);
      }
    });

};
// As you progress, keep thinking about what helper functions you can put here!
