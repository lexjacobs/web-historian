console.log('hey cron running');
var archive = require('./helpers/archive-helpers');
var fs = require('fs');
fs.writeFile('/Users/HR10/Code/FaridSiddiqi/2014-02-web-historian/cronResults.txt' , 'cron is here to save your day!', function(){});
