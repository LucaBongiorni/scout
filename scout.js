#!/usr/bin/env node

var argv = require('yargs').argv,
    log = require('./modules/log'),
    scan = require('./modules/scan'),
    jenkins = require('./modules/jenkins'),
    tomcat = require('./modules/tomcat'),
    color = require('cli-color'),
    rate = 500, timeout = 3000, show = false, logging = true;

if (argv.help || argv.h) {
	console.log(color.green("\n--[Scouting Examples]--\n"));
	console.log("[1.] Scout a subnet for low hanging fruit on port 8080");
	console.log(color.blackBright("\n\t$> scout --ip=192.168.0.0/24 --port=8080\n"));
	console.log("[2.] Scout a subnet for various ports -- printing results of each open port");
	console.log(color.blackBright("\n\t$> scout --ip=192.168.0.0/24 --port=80,443,8443,8080-8082 --open\n"));
	
	console.log(color.blackBright("\t--rate")+" Number of open sockets per scan - default 500");
	console.log(color.blackBright("\t--timeout")+" Number of miliseconds before deciding port is closed - default 3000");
	console.log(color.blackBright("\t--logging")+" Enable\\Disable logging (results are saved to scout.log) - default true\n")


	console.log(color.red("\n--[Exploitation Examples]--\n"));
	console.log("[1.] Run a command against a known Jenkins server (that has the script console enabled)");
	console.log(color.blackBright("\n\t$> scout --ip=192.168.0.109 --target=jenkins --cmd='whoami' \n"));
	console.log("[2.] Run a command against a discovered Tomcat Manager");
	console.log(color.blackBright("\n\t$> scout --ip=192.168.0.110 --target=tomcat --cmd='whoami' --creds='admin:password' \n"));

} else if ((argv.ip && argv.port) && !argv.cmd) {

    console.log("Scanning %s", argv.ip);

    if (argv.rate) {
        rate = parseInt(argv.rate);
    }

    if (argv.show){
    	show = true;
    }
    
    try{
	    if (argv.logging.toUpperCase() === "FALSE"){
	    	logging = false;
	    }

    } catch(err){

    }

    if (argv.timeout) {
        timeout = parseInt(argv.timeout);
    }

    var options = {
        target: argv.ip,
        port: argv.port,
        status: 'O',
        banner: true,
        progress: true,
        concurrency: rate,
        timeout: timeout
    };

    scan.init(options, show, logging);

} else if (argv.ip && argv.cmd) {
    try {
        switch (argv.target.toUpperCase()) {
            case "JENKINS":
                jenkins.cmd(argv.ip, argv.cmd);
                break;
            case "TOMCAT":
                if (argv.creds) {
                    tomcat.cmd(argv.ip, argv.cmd, argv.creds);
                } else {
                    console.log("Please specify tomcat credentials (ex: --creds='admin:admin'");
                }

                break;
            default:
                console.log("");
                break;
        }
    } catch (err) {

    }
}
