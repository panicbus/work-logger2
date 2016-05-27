var configValues = require('./config');
// require a encrypter/decrypter here too

module.exports = {
	getDbConnectionString : function(){
		// this is the connection path from mlabs database w the uname/psw from config.json
		return 'mongodb://' + configValues.uname + ':' + configValues.psw + '@ds015909.mlab.com:15909/worklogger';
		// return 'mongodb://username:password@ds015909.mlab.com:15909/worklogger';
	}
}