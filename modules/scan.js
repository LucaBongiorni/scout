var evilscan = require('./evilscan'),
	color = require('cli-color'),
	log = require('./log.js'),
	checkForVulns = require('./fingerprint.js'),
	lastPerc;

exports.init = function(options, show, logging){

	var scanner = new evilscan(options);

	scanner.on('result',function(data) {
        if (show){
        	console.log("[!] %s:%s Status: Open", data.ip, data.port);
        	log.toFile("[!] "+data.ip+":"+data.port+" Status: Open\n");
        }
        url = "http://"+data.ip+":"+data.port+"/";
        // console.log("Checking %s", url);
        checkForVulns(url, data.port, logging);

	});

	scanner.on('progress', function(data){
		if(data._progress != lastPerc){
			console.log("[*] %s% completed", data._progress);	
		}
		lastPerc = data._progress;
	})

	scanner.on('error',function(err) {
	    throw new Error(data.toString());
	});

	scanner.on('done',function() {

	});

	scanner.run();

}

