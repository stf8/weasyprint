var wp = require('./index.js'), fs = require('fs');

wp.toPdf('<html><body><h1>hhhhhh</h1></body></html>', function(err, path, fd, stdout, stderr, cleanup) {
	if (err) 
		console.error(err);
	else {
		console.error('PDF file : '+path+' was generated, and removed.');
		cleanup();
	}
});

