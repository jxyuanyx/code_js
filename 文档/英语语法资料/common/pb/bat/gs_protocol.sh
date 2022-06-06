echo Generate start...
DIR_PATH=$(cd `dirname $0`; pwd)
# echo $DIR_PATH
pbjs -t static-module -w commonjs --keep-case --no-beautify --force-number --dependency "protobuf" -o $DIR_PATH/gs_protocol.js $DIR_PATH/gs_protocol_pk.proto
pbts --no-comments -o $DIR_PATH/gs_protocol.d.ts $DIR_PATH/gs_protocol.js
uglifyjs $DIR_PATH/gs_protocol.js -o $DIR_PATH/gs_protocol.js
echo Generate success!
