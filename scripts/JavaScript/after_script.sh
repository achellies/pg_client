#!/bin/sh
cd /home/travis/builds/geoquest/pg_client/GeoQuestPhoneGapClient/assets
npm run-script coverage
w3m -dump build/coverage.html
