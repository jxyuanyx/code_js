var fs = require('fs');
const fsExtra = require('fs-extra')
var path = require('path');
var crypto = require('crypto');
const { version } = require('os');

var manifest = {
    packageUrl: 'http://localhost/tutorial-hot-update/remote-assets/',
    remoteManifestUrl: 'http://localhost/tutorial-hot-update/remote-assets/project.manifest',
    remoteVersionUrl: 'http://localhost/tutorial-hot-update/remote-assets/version.manifest',
    version: '1.0.0',
    assets: {},
    searchPaths: []
};

var dest = './remote-assets/';
var src = './jsb/';
var testUrl=""

// Parse arguments
var i = 2;
while ( i < process.argv.length) {
    var arg = process.argv[i];

    switch (arg) {
    case '--url' :
    case '-u' :
        var url = process.argv[i+1];
        manifest.packageUrl = url;
        manifest.remoteManifestUrl = url + 'project.manifest';
        manifest.remoteVersionUrl = url + 'version.manifest';
        i += 2;
        break;
    case '--version' :
    case '-v' :
        manifest.version = process.argv[i+1];
        i += 2;
        break;
    case '--src' :
    case '-s' :
        src = process.argv[i+1];
        i += 2;
        break;
    case '--dest' :
    case '-d' :
        dest = process.argv[i+1];
        i += 2;
        break;
    case '-t' :
        testUrl = process.argv[i+1];
        i += 2;
        break;
    default :
        i++;
        break;
    }
}

function updateMainJs(){
    let mainjs=path.join(src,"main.js")
    fs.readFile(mainjs, "utf8", function (error, data) {
        if (error) throw error;
        let a = data.replace(" cc.macro.CLEANUP_IMAGE_CACHE = true;", " cc.macro.CLEANUP_IMAGE_CACHE = true;\n\n    if (cc && cc.sys.isNative) { \n        var hotUpdateSearchPaths = cc.sys.localStorage.getItem('HotUpdateSearchPaths'); \n        if (hotUpdateSearchPaths) { \n            jsb.fileUtils.setSearchPaths(JSON.parse(hotUpdateSearchPaths)); \n            console.log('[main.js] 热更新SearchPath: ' + JSON.parse(hotUpdateSearchPaths));\n        }else {\n            console.log('[main.js] 未获取到热更新资源路径!');\n        }\n    }else {\n        console.log('[main.js] 不是native平台!');\n    }\n");
        fs.writeFile(mainjs, a, function (e) {
            console.log("[HotUpdateTools] SearchPath updated in built main.js for hot update")
        })
    })
}

function readDir (dir, obj) {
    var stat = fs.statSync(dir);
    if (!stat.isDirectory()) {
        return;
    }
    var subpaths = fs.readdirSync(dir), subpath, size, md5, compressed, relative;
    for (var i = 0; i < subpaths.length; ++i) {
        if (subpaths[i][0] === '.') {
            continue;
        }
        subpath = path.join(dir, subpaths[i]);
        stat = fs.statSync(subpath);
        if (stat.isDirectory()) {
            readDir(subpath, obj);
        }
        else if (stat.isFile()) {
            // Size in Bytes
            size = stat['size'];
            md5 = crypto.createHash('md5').update(fs.readFileSync(subpath)).digest('hex');
            compressed = path.extname(subpath).toLowerCase() === '.zip';

            relative = path.relative(src, subpath);
            relative = relative.replace(/\\/g, '/');
            relative = encodeURI(relative);
            obj[relative] = {
                'size' : size,
                'md5' : md5
            };
            if (compressed) {
                obj[relative].compressed = true;
            }
        }
    }
}

var mkdirSync = function (path) {
    try {
        fs.mkdirSync(path);
    } catch(e) {
        if ( e.code != 'EEXIST' ) throw e;
    }
}

// Iterate assets and src folder
readDir(path.join(src, 'src'), manifest.assets);
readDir(path.join(src, 'res'), manifest.assets);

var destManifest = path.join(dest, 'project.manifest');
var destVersion = path.join(dest, 'version.manifest');

mkdirSync(dest);

let writeCount=0

var copy=function(src,dst){
    //读取目录
    fs.readdir(src,function(err,paths){
        console.log(paths)
        if(err){
            throw err;
        }
        paths.forEach(function(path){
            var _src=src+'/'+path;
            var _dst=dst+'/'+path;
            var readable;
            var writable;
            stat(_src,function(err,st){
                if(err){
                    throw err;
                }
                
                if(st.isFile()){
                    readable=fs.createReadStream(_src);//创建读取流
                    writable=fs.createWriteStream(_dst);//创建写入流
                    readable.pipe(writable);
                }else if(st.isDirectory()){
                    exists(_src,_dst,copy);
                }
            });
        });
    });
}

//生成热更新文件
let createHotUpdate=function(){
    if(writeCount!=2)return
    var updateDir=path.join(src,"hotUpdatePackages",manifest.version)
    if(fsExtra.pathExistsSync(updateDir)){
        fsExtra.removeSync(updateDir)
    }
    fsExtra.ensureDirSync(updateDir)
    fsExtra.copySync(destManifest,path.join(updateDir, 'project.manifest'));
    fsExtra.copySync(destVersion,path.join(updateDir, 'version.manifest'));
    fsExtra.copySync(path.join(src, 'src'),path.join(updateDir, 'src'));
    fsExtra.copySync(path.join(src, 'res'),path.join(updateDir, 'res'));

    //生成测试更新
    if(testUrl){
        if(fsExtra.pathExistsSync(updateDir+"_test")){
            fsExtra.removeSync(updateDir+"_test")
        }
        fsExtra.copySync(updateDir,updateDir+"_test");
        updateDir=updateDir+"_test"
        //更改路径
        let projectManifest=path.join(updateDir, 'project.manifest')
        let versionManifest=path.join(updateDir, 'version.manifest')
        fs.readFile(projectManifest, "utf8", function (error, data) {
            if (error) throw error;
            let a=data.replace(new RegExp(manifest.packageUrl,"gm"),testUrl)
            fs.writeFile(projectManifest, a, function (e) {
            })
        })
        fs.readFile(versionManifest, "utf8", function (error, data) {
            if (error) throw error;
            let a=data.replace(new RegExp(manifest.packageUrl,"gm"),testUrl)
            fs.writeFile(versionManifest, a, function (e) {
            })
        })
    }

    updateMainJs()
}




fs.writeFile(destManifest, JSON.stringify(manifest), (err) => {
  if (err) throw err;
  console.log('Manifest successfully generated');
  writeCount++
  createHotUpdate()
});

delete manifest.assets;
delete manifest.searchPaths;
fs.writeFile(destVersion, JSON.stringify(manifest), (err) => {
  if (err) throw err;
  console.log('Version successfully generated');
  writeCount++
  createHotUpdate()
});