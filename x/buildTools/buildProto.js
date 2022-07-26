//pbjs -t static-module -w commonjs -o ../protos_js/Msg.js ../protos/common.proto
let path = require("path");
let fs = require("fs");
var process = require('child_process');
let projectPath = path.resolve(__dirname, '..')
let sourcePath = path.join(projectPath, "protos")
let destPath = path.join(projectPath, "protos_js")
let protoNames = fs.readdirSync(sourcePath);
const replaceStr = 'var $protobuf = require("protobufjs/minimal");'
let count=0;
let replaceFun = () => {
    //替换掉var $protobuf = require("protobufjs/minimal");
    let protojsNames = fs.readdirSync(destPath);
    protojsNames.forEach(protojsName => {
        let filePath = path.join(destPath, protojsName);
        let data = fs.readFileSync(filePath, "utf-8");
        fs.unlinkSync(filePath);
        data = data.replace(replaceStr, "var $protobuf = protobuf;");
        fs.writeFileSync(filePath, data);
    })
}

protoNames.forEach(protoName => {
    let destFileName = protoName.split(".")[0] + ".js "
    let cmd = 'pbjs -t static-module -w commonjs -o ' + path.join(destPath, destFileName) + path.join(sourcePath, protoName);
    process.exec(cmd, function (error, stdout, stderr) {
        if (!error) {
            count++;
            if(count==protoNames.length){
                setTimeout(replaceFun.bind(this),2)
            }
        }
    });
})


