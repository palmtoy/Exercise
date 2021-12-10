How to start on system boot ?

$ crontab -e


add
`
PATH=... ...

@reboot pm2 ls && pm2 flush && cd $HOME/Exercise/AWSSDKTest/SNS && ./GO-PM2-App.sh > ./logs/crontab.log 2>&1
`
at the end of crontab


$ crontab -l

$ grep CRON /var/log/syslog

