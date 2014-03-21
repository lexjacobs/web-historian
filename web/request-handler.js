var path = require('path');
var archive = require('../helpers/archive-helpers');
var helper = require('./http-helpers');
var fs = require('fs');
var querystring = require('querystring');
var http = require('http-request');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log("in handle request");
  console.log("this is req.url: " + req.url + "this is req.method: " + req.method);
  // archive.readListOfUrls();
  //res.write(archive.paths.siteAssets);
  // helper.serveAssets(res, pathname)
  switch(req.method){
    case 'GET':
      var url = querystring.parse(req.content).url;
      console.log('url =', url);
      if(req.url === '/'){
        helper.redirect('index.html', archive.paths.siteAssets, 200, res);
      } else {
        archive.isUrlArchived(url, function(status){
          if(status){
            helper.redirect(url, archive.path.archivedSites, 200, res);
          } else {
            helper.send404(res);
          }
        });
      }
      break;

    case 'POST':
      // initialize data variable to empty string
      req.content = '';
      // chunk it until it done
      req.on('data', function(chunk){
        req.content += chunk;
      });
      // once data is recieved
      req.on('end', function(){
        // console.log('req.content = ', req.content);
        var url = querystring.parse(req.content).url;
        console.log( "before isUrlInList");
        console.log( "url = ", url);

        archive.isUrlInList(url, function(isInList){
          console.log( "isInList = ", isInList);
          if( isInList === true){
            // check to see if it's already archived
            archive.isUrlArchived(url, function(isArchived){
              console.log("isArchived = ", isArchived);
              if(isArchived){
                helper.redirect(url, archive.paths.archivedSites, 200, res);
              } else {
                // in list, but not archived
                // redirect to loading page
                helper.redirect('loading.html', archive.paths.siteAssets, 200, res);
              }
            });
          } else {
            // add it to list
            archive.addUrlToList(url);
            helper.redirect('loading.html', archive.paths.siteAssets, 302, res);
          }
        });
      });
      break;

    case 'OPTIONS':
      break;

    default:
      break;
  }
};
