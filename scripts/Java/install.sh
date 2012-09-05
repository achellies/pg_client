#!/bin/sh

echo 'Android SDK Path:'
echo $ANDROID_SDK_HOME

mvn install -B --quiet -DskipTests=true -Dandroid.sdk.path=$ANDROID_SDK_HOME
#echo 'install skipped'
