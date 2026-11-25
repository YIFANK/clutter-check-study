#!/bin/sh
# Wraps index.html (the page body, also published as the Claude artifact) into a standalone site in docs/.
set -e
cd "$(dirname "$0")"
{
  printf '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n<link rel="icon" href="data:,">\n<style>body{margin:0}</style>\n<script src="config.js"></script>\n</head>\n<body>\n'
  cat index.html
  printf '\n</body>\n</html>\n'
} > docs/index.html
[ -f docs/config.js ] || printf '// URL of the deployed Apps Script web app (see README). Empty = participants get a copy-paste code.\nwindow.STUDY_API = "";\n' > docs/config.js
echo "built docs/index.html"
