echo Generate start...
DIR_PATH=$(cd `dirname $0`; pwd)
# echo $DIR_PATH
pbjs -t static-module -w commonjs --keep-case --no-beautify --force-number --dependency "protobuf" -o $DIR_PATH/data.js $DIR_PATH/data_pk.proto
pbts --no-comments -o $DIR_PATH/data.d.ts $DIR_PATH/data.js
uglifyjs $DIR_PATH/data.js -o $DIR_PATH/data.js
echo Generate success!
