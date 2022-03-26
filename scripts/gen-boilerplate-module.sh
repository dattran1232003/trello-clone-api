#!/bin/bash

dir=$1

entryFile='index.ts'

FOLDERS=(
  'interfaces'
  'schemas'
  'constants'
  'collections'
  'functions'
  'services'
  'controllers'
  'subscribers'
)


for folderName in "${FOLDERS[@]}"
do
  folder="${dir}/${folderName}"
  file="${folder}/${entryFile}"

  mkdir -p $folder && touch $file
  echo "created ${file}."
done

echo "generate boilerplate files completed"


