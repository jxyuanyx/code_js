echo Generate start...
pbjs -t static-module -w commonjs --keep-case --no-beautify --force-number --dependency "protobuf" -o ./jackfruit.js ./jackfruit_pk.proto
pbts --no-comments -o ./jackfruit.d.ts ./jackfruit.js
uglifyjs jackfruit.js -o jackfruit.js
echo Generate success!
