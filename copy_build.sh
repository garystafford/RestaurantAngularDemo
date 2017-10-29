#!/usr/bin/env bash

project_path="cd /c/Users/gary.stafford/WebstormProjects/RestaurantDemo"

cd ${project_path}
cp -r dist/ /tmp/
git checkout dist
cp -r /tmp/dist/ .

git add -A && git commit -m "New build of Restaurant App" && git push

git checkout master
