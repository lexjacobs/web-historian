var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  console.log('in readListOfUrls');
  // console.log('this = ',this);
  // read sites.text
  fs.readFile(this.paths.list, function(err, data){
    if (err){
      throw err;
    } else {
      // console.log("sites.txt to string = ", data.toString().split('\n'));
      callback(data.toString().split('\n'));
    }
  });
};

exports.isUrlInList = function(url, callback){
  exports.readListOfUrls(function(sites){
    sites.length = sites.length || 0;
    for( var i = 0; i < sites.length; i++){
      if( sites[i] === url){
        callback( true);
        return;
      }
    }
    callback(false);
  });

};

exports.addUrlToList = function(url){
  fs.writeFile(exports.paths.list, url+"\n", {flag: 'a+'}, function(err){
    if(err) throw err;
  });
};

exports.isUrlArchived = function(url,callback){
  fs.stat(exports.paths.archivedSites +"/"+ url,function(err){
    if(err){
      // console.log("url not archived");
      callback(false);
    }else{
      // console.log("url is archived");
      callback(true);
    }
  });
};

exports.downloadUrls = function(){
};
