#!/bin/sh
cd GeoQuestPhoneGapClient/assets
npm run-script coverage
perl ../../scripts/coverage2text.pl build/coverage.html
