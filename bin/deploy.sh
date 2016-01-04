#!/bin/bash

# Set CNAME file
if [ "$DEPLOY_DOMAIN" ]; then
  echo "$DEPLOY_DOMAIN" > ./dist/CNAME
else
  echo "hei.khoanguyen.me" > ./dist/CNAME
fi

# Deployment target
if [ "$WERCKER_DEPLOYTARGET_NAME" == "surge" ]; then
  npm install -g surge
  surge ./dist $DEPLOY_DOMAIN
else
  git config --global user.email "khoa02031995@gmail.com"
  git config --global user.name "Khoa Nguyen"
  DEBUG=* node -r dotenv/config --harmony bin/deploy
fi
