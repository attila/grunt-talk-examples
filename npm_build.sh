#!/bin/sh

find . -type d -name node_modules -prune -o -name 'package.json' -print | while read package;
do \
if grep -q "\"build\": \"grunt --no-color\"" "$package"; then \
  if [ ! -d "$(dirname $package)/node_modules" ]; then \
    eval `echo 'mkdir -p "$(dirname $package)/node_modules"'`; \
  fi; \
  eval `echo 'npm install --no-color --quiet --prefix "$(dirname $package)"'`; \
  R=$?; if [ $R -ne 0 ]; then exit $R; fi; \
  if [ -f "$(dirname $package)/Gruntfile.js" ]; then \
    eval `echo 'grunt --base "$(dirname $package)" --gruntfile "$(dirname $package)/Gruntfile.js"'`; \
  fi; \
elif [ -f "$(dirname $package)/config.rb" ]; then \
  eval `echo 'compass compile "$(dirname $package)" --boring -e production'`; \
fi; \
R=$?; if [ $R -ne 0 ]; then exit $R; fi; \
rm -rf $(dirname $package)/node_modules
done
