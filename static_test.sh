#!/bin/bash
git clone --depth=1 https://github.com/Leidenschaft/Deutsch-Lernen.git
cd Deutsch-Lernen
cp js/config-example.js js/config.js
python3 -m http.server
# clean up
cd ..
rm -rf Deutsch-Lernen