#!/bin/bash
# Fails if any file in src/ does not use kebab-case for its filename

invalid_files=$(find src/ -type f | grep -v -e '.*\/[+a-z0-9][a-z0-9.-]*$')

if [ -n "$invalid_files" ]; then
  echo "The following files do not use kebab-case:"
  echo "$invalid_files"
  exit 1
fi

exit 0
