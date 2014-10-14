Ext.define('peq.singleton.Config', {
	singleton: true,
	alternateClassName: ['AppConfig'],
	
	constructor: function(config) {
		this.initConfig(config);
	},

	// development | production
	environment: "development",
	appUrlDev: "http://peq-dev.devroar.com",
	appUrl: "http://peq.devroar.com",
	api_dev: "http://peq-api.devroar.com",
	api_prod: "http://peq-api.devroar.com",

	getApiEndpoint: function () {
		return (this.environment == "production") ? this.api_prod : this.api_dev;
	},

	getAppUrl: function () {
		return (this.environment == "production") ? this.appUrl : this.appUrlDev;
	}
});