#!/bin/sh
echo "Selenium log:" 
cat /tmp/selenium-output.log
kill -9 `cat /tmp/selenium.pid`
sudo sh -e /etc/init.d/xvfb stop