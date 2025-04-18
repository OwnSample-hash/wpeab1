#!/bin/bash

set -xe

if [[ $EUID -ne 33 ]]; then
    echo "Please run this script as httpd user."
    exit 1
fi

git reset --hard HEAD
git pull
rm -rf react
mkdir react
cd react_feladat
npm i
ln -s ../react dist
npm run build
