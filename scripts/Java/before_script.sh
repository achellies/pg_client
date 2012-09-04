#!/bin/sh


# download the latest android sdk and unzip
cd /home/travis/
wget http://dl.google.com/android/android-sdk_r18-linux.tgz
tar -zxf android-sdk_r18-linux.tgz

# setup your ANDROID_HOME and PATH environment variables
# use ~/builds/[Github username]/[project]/android-sdk-linux
export ANDROID_SDK_HOME=/home/travis/android-sdk-linux
export PATH=${PATH}:${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools

# only update the sdk for the tools and platform-tools (1,2) and whatever api level
# you are building for android (run "android list sdk" to get the full list. 9 = 2.3.3 or API level 10
android update sdk --filter 1,2,9 --no-ui --force
