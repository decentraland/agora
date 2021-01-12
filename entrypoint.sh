#!/bin/sh

npm run build:tsc || exit 1
npm run start || exit 1
