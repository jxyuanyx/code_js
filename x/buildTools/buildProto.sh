pbjs -t static-module -w commonjs --keep-case --force-number -o ../protos_js/proto.js ../protos/hall.proto 

pbts -o  ../protos_js/proto.d.ts ../protos_js/proto.js 

echo 'proto create success'

sed -i 's/require(\"protobufjs\/minimal\")/protobuf;$protobuf\.util\.toJSONOptions\.defaults\=\{\}/g' ../protos_js/proto.js
echo 'replace proto.js success'


cp -f ../protos_js/proto.js ../assets/gamecore/net/protos/proto.js
cp -f ../protos_js/proto.d.ts ../assets/gamecore/net/protos/proto.d.ts


pbjs -t static-module -w commonjs --keep-case --force-number -o ../protos_js/ludo.js  ../protos/hall.proto  ../protos/ludo.proto 

pbts -o  ../protos_js/ludo.d.ts ../protos_js/ludo.js 

echo 'ludo create success'

sed -i 's/require(\"protobufjs\/minimal\")/protobuf;$protobuf\.util\.toJSONOptions\.defaults\=true/g' ../protos_js/ludo.js
echo 'replace ludo.js success'


cp -f ../protos_js/ludo.js ../assets/game107/net/protos/ludo.js
cp -f ../protos_js/ludo.d.ts ../assets/game107/net/protos/ludo.d.ts


echo 'copy ludo.js to assets success'
