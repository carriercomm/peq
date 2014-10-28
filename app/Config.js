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

	missingGems: [],

	// gems are placed here just before their ajax check is fired off so we don't request gems multiple times
	loadedGems: [],

	gridSettings: {
		'itemsGrid-ID': {
			'bagMode': undefined,
			'bagModeLast': undefined
		},
		'zonesGrid-ID': {
			'smallMode': undefined,
			'smallModeLast': undefined
		},
		'spellsGrid-ID': {

		},
		'spellsetsGrid-ID': {

		},
		'npcsGrid-ID': {
			
		}
	},

	getApiEndpoint: function () {
		return (this.environment == "production") ? this.api_prod : this.api_dev;
	},

	getAppUrl: function () {
		return (this.environment == "production") ? this.appUrl : this.appUrlDev;
	},

	isSmallerScreen: function () {
		if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <= 1440) {
			return true;
		} else {
			return false;
		}
	}
});