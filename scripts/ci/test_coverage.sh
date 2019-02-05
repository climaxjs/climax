#!/bin/bash

# https://www.gnu.org/software/bash/manual/bashref.html#The-Set-Builtin
set -e

npm run test:unit --coverage
./node_modules/.bin/coveralls < ./coverage/lcov.info
