#!/bin/sh
sudo apt-get install xvfb
wget -O /tmp/selenium-server-standalone-2.25.0.jar http://selenium.googlecode.com/files/selenium-server-standalone-2.25.0.jar

# download the latest android sdk and unzip
pwd
wget -O /tmp/android-sdk-linux.tgz http://dl.google.com/android/android-sdk_r20-linux.tgz
cd /tmp/
tar -zxf android-sdk-linux.tgz

# setup your ANDROID_HOME and PATH environment variables
export ANDROID_SDK_HOME=/tmp/android-sdk-linux
export PATH=${PATH}:${ANDROID_SDK_HOME}/tools:${ANDROID_SDK_HOME}/platform-tools

# only update the sdk for the tools and platform-tools (1,2) and whatever api level
# you are building for android (run "android list sdk" to get the full list. 9 = 2.3.3 or API level 10
android update sdk --filter android-10,platform-tools -u --force
