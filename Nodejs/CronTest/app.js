var CronJob = require('cron').CronJob;
var moment = require('moment-timezone');

var job = new CronJob('10 44 12 * * 1-5', function() {
		/*
		* Runs every weekday (Monday through Friday)
		* at 11:30:00 AM. It does not run on Saturday
		* or Sunday.
		*/
		var now = moment(new Date());
		var nowUTC = now.clone().utc().format();

		console.log('You will see this message when time out ~ ' + nowUTC);
	}, function () {
		/* This function is executed when the job stops */
		console.log('Job stops ~ ' + new Date());
	},
	true, /* Start the job right now */
	'UTC' /* Time zone of this job. */
);

