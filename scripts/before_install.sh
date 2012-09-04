#!/bin/sh

# download the latest android sdk and unzip
pwd
wget -O /tmp/android-sdk-linux.tgz http://dl.google.com/android/android-sdk_r18-linux.tgz
cd /tmp/
tar -zxf android-sdk-linux.tgz

# setup your ANDROID_HOME and PATH environment variables
export ANDROID_SDK_HOME=/tmp/android-sdk-linux
export PATH=${PATH}:${ANDROID_SDK_HOME}/tools:${ANDROID_SDK_HOME}/platform-tools

# only update the sdk for the tools and platform-tools (1,2) and whatever api level
# you are building for android (run "android list sdk" to get the full list. 9 = 2.3.3 or API level 10
android update sdk --filter 10 --no-ui --force
