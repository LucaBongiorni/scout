//var output = fs.createWriteStream(dir + '/scout.log', { flags: 'a' })

var fs = require('fs');

exports.toFile = function(msg){
	fs.appendFile("./scout.log", msg, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	}); 
}    

