var request = require('request'),
	color = require('cli-color'),
	log = require('./log.js');

var checks = [{"string":"", "port":"8080", "verification":"manager/html"},
			  {"string":"script", "port":"8080", "verification":"Jenkins"}];

function finger(url, string, verification, logging){
	request(url+string, function(error, response, body) {
		testCase = url+string;
	    if (!error) {
	    	if(response.body.match(verification)){
	    		console.log(color.green("[!] %s confirmed at %s"), verification, testCase);
	    		if (logging){
	    			log.toFile("["+verification+"] => "+testCase+"\n");
	    		}
	    	} else {

	    	}

	    } else {
	    }
	});
}


module.exports = function(url, port, logging){
	port = port.toString();

	for (i=0;i<checks.length;i++){

		if (checks[i].port === port){
			finger(url, checks[i].string, checks[i].verification, logging);
		} else {

		}
	}
}
