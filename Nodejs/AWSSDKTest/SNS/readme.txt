How to start on system boot ?

$ crontab -e

add `@reboot cd $HOME/Exercise/AWSSDKTest/SNS && ./GO-PM2-App.sh > ./logs/crontab.log 2>&1` at the end of crontab

$ crontab -l

