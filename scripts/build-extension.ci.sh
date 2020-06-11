#!/bin/bash

source $(dirname "$0")/functions.sh
environment=$1

replace_name_in_manifest() {
  manifest="$1"

  if [ "$environment" == 'staging' ]; then
    sed -i $'s/"name": "Réagir à l\'information"/"name": "Réagir à l\'information (staging)"/' $manifest
  fi
}

sources_zip_filename="zetecom-extension-$environment-sources-$(package_version ./package.json).zip"
zip_filename="zetecom-extension-$environment-$(package_version ./package.json).zip"

create_source_archive() {
  echo APP_URL="$APP_URL" > .env
  echo NODE_ENV=production > .env
  replace_name_in_manifest manifest.json
  zip_directory "./$sources_zip_filename" .
}

build_extension_from_sources() {
  tmp_dir=$(mktemp -d)

  unzip "$sources_zip_filename" -d "$tmp_dir"

  (cd "$tmp_dir" && yarn && yarn build --silent)
  replace_name_in_manifest "$tmp_dir/dist/manifest.json"
  zip_directory "./$zip_filename" "$tmp_dir/dist"

  rm -rf "$tmp_dir"
}

main() {
  if [ "$environment" != 'staging' ] && [ "$environment" != 'production' ]; then
    err "usage: build-extension.ci.sh [staging|production]"
  fi

  if [ -z "$APP_URL" ]; then
    err "Environment variable APP_URL is not set"
  fi

  echo "Build extension in environment: $environment"
  create_source_archive
  build_extension_from_sources
}

main