#!/bin/bash
set -e

echo "Convert mp3 files to ogg files"
for file in ./dist/sound/*.mp3; do
  ffmpeg -nostats -i "${file}" -aq 6 "${file/%mp3/ogg}";
done
