pwd
sudo sh -e /etc/init.d/xvfb start
export DISPLAY=:99
java -jar /tmp/selenium-server-standalone-2.25.0.jar -port 4444 > /tmp/selenium-output.log 2> /tmp/selenium-error.log & echo $! > /tmp/selenium.pid