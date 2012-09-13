#!/bin/sh
sudo apt-get install xvfb
wget -O /tmp/selenium-server-standalone-2.25.0.jar http://selenium.googlecode.com/files/selenium-server-standalone-2.25.0.jar

# download the latest android sdk and unzip
pwd
wget -O /tmp/android-sdk-linux.tgz http://dl.google.com/android/android-sdk_r20-linux.tgz
cd /tmp/
tar -zxf android-sdk-linux.tgz

# setup your ANDROID_HOME and PATH environment variables
export ANDROID_HOME=/tmp/android-sdk-linux
export PATH=${PATH}:${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools

# only update the sdk for the platform/tools android 10 (2.3.3) and android-15 (4.0.3)
android update sdk --filter android-10,android-15,platform-tools,addon-google_apis-google-10,addon-google_apis-google-15 -u --force
