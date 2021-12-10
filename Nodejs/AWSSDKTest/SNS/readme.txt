How to start on system boot ?

$ crontab -e


add
`
PATH=... ...

@reboot cd $HOME/Exercise/AWSSDKTest/SNS && pm2 flush && ./GO-PM2-App.sh > ./logs/crontab.log 2>&1
`
at the end of crontab


$ crontab -l

