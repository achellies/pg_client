#!/bin/sh
cd GQ_Player_Web
npm run-script coverage
perl ../scripts/coverage2text.pl build/coverage.html
