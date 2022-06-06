var fs = require('fs');
// const fsExtra = require('fs-extra')
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
            compressed =(subpath.toLowerCase().indexOf(".so.zip")==-1)&&path.extname(subpath).toLowerCase() === '.zip';

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
readDir(src, manifest.assets);

var destManifest = path.join(dest, 'project.manifest');
var destVersion = path.join(dest, 'version.manifest');

// mkdirSync(dest);

//生成热更新文件
let createHotUpdate=function(){
    var updateDir=dest
    fs.cpSync(destManifest, path.join(src, 'project.manifest'),{force:true,recursive:false});
    fs.cpSync(destVersion, path.join(src, 'version.manifest'),{force:true,recursive:false});
    fs.cpSync(src, dest,{force:true,recursive:true});

    // fsExtra.copySync(destManifest,path.join(src, 'project.manifest'));
    // fsExtra.copySync(destVersion,path.join(src, 'version.manifest'));
    // fsExtra.copySync(src,dest);

    //生成测试更新
    if(testUrl){
        if(fs.existsSync(updateDir+"_test")){
            fs.rmSync(updateDir+"_test", {recursive:true, force:true});
        }
        else{
            fs.mkdirSync(updateDir+"_test");
        }
        fs.cpSync(updateDir,updateDir+"_test", {force:true,recursive:true});
        // if(fsExtra.pathExistsSync(updateDir+"_test")){
        //     fsExtra.removeSync(updateDir+"_test")
        // }
        // fsExtra.copySync(updateDir,updateDir+"_test");
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

    //updateMainJs()
}
fs.writeFileSync(destManifest, JSON.stringify(manifest));
delete manifest.assets;
delete manifest.searchPaths;
fs.writeFileSync(destVersion, JSON.stringify(manifest));
// createHotUpdate()

