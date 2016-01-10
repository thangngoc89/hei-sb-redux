#!/bin/bash
set -e

bash ./bin/convert.sh
# Set CNAME file
echo "Set CNAME file"
if [ "$DEPLOY_DOMAIN" ]; then
  echo "$DEPLOY_DOMAIN" > ./dist/CNAME
else
  echo "hei.khoanguyen.me" > ./dist/CNAME
fi

# Deployment target
if [ "$WERCKER_DEPLOYTARGET_NAME" == "surge" ]; then
  echo "Deploy to surge"
  npm install -g surge
  surge ./dist $DEPLOY_DOMAIN
else
  echo "Deploy to github-pages"
  git config --global user.email "khoa02031995@gmail.com"
  git config --global user.name "Khoa Nguyen"
  DEBUG=* node -r dotenv/config --harmony bin/deployGhPages
fi
