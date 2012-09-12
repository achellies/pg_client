#!/bin/sh
cd GeoQuestPhoneGapClient/assets
npm run-script coverage
w3m -dump build/coverage.html
