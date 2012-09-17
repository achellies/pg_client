#!/bin/sh
echo "Selenium log:" 
cat /tmp/selenium-output.log
kill `cat /tmp/selenium.pid`
rm /tmp/selenium.pid
sleep 1
kill `cat /tmp/xvfb.pid`
rm /tmp/xvfb.pid