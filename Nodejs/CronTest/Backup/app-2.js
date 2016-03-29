var CronJob = require('cron').CronJob;

var job = new CronJob('10 58 19 * * 1-5', function() {
  /*
   * Runs every weekday (Monday through Friday)
   * at 11:30:00 AM. It does not run on Saturday
   * or Sunday.
   */
  	console.log('You will see this message when time out ~ ' + new Date());
  }, function () {
    /* This function is executed when the job stops */
  	console.log('Job stops ~ ' + new Date());
  },
  true, /* Start the job right now */
  'Asia/Shanghai' /* Time zone of this job. */
);

