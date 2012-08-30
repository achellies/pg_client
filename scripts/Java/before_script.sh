#!/bin/sh
pwd
sudo sh -e /etc/init.d/xvfb start
export DISPLAY=:99
echo "Starting selenium server..."
java -jar /tmp/selenium-server-standalone-2.25.0.jar -port 4444 > /tmp/selenium-output.log 2>&1 & echo $! > /tmp/selenium.pid
cat /tmp/selenium-output.log