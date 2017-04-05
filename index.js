var { exec, execSync } = require('child_process').exec, tmp = require('tmp'), path = require('path');

var command;
try {
	execSync('which weasyprint');
	command = 'weasyprint';
} catch(e) {
	command = '. '+ path.resolve(__dirname, 'venv/bin/activate')+' && weasyprint';
}

module.exports = (function() {
	'use strict';
	return {
		toPdf: function(html, cb) {
			tmp.file({ postfix: '.pdf', mode: parseInt('0644',8) }, function(err, tmppath, fd, cleanup) {
				if (err) return cb(err);
				var first = true;
				function firstcb() {
					if (! first) return;
					first = false;
					cb.apply(undefined, arguments);
				}
				var child = exec(command+' - "'+tmppath+'"', function(err, stdout, stderr) {
					if (err) {
						cleanup();
						return firstcb(err); 
					}
					firstcb(err, tmppath, fd, stdout, stderr, cleanup);
				});
				child.stdin.on('error', function(err) { firstcb(err); });
				child.stdin.end(html);
			});
		}
	};
})();
