#!/bin/sh
pwd
Xvfb :99 -nolisten tcp & echo $! > /tmp/xvfb.pid
export DISPLAY=:99
echo "Starting Selenium server..."
java -jar /tmp/selenium-server-standalone-2.25.0.jar -port 4444 > /tmp/selenium-output.log 2>&1 & echo $! > /tmp/selenium.pid & while ! nc -vz localhost 4444; do sleep 1; done
echo "Selenium started..."