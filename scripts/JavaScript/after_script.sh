#!/bin/sh
cd GQ_Player_PG_Android/assets
npm run-script coverage
perl ../../scripts/coverage2text.pl build/coverage.html
