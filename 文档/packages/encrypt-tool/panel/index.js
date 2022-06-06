"use strict";
window.packageRoot = "packages://encrypt-tool/";
var Fs = require('fs');
var Path = require('path');
const jpgBufferHeader = {
    bufBegin: [0xff, 0xd8],
    bufEnd: [0xff, 0xd9],
    suffix: '.jpg'
};
const pngBufferHeader = {
    bufBegin: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
    bufEnd: [0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82],
    suffix: '.png'
};
//暂时没用，存着备用                         
const imageBufferHeaders = [{
    bufBegin: [0x00, 0x00, 0x02, 0x00, 0x00],
    suffix: '.tga'
},
{
    bufBegin: [0x00, 0x00, 0x10, 0x00, 0x00],
    suffix: '.rle'
},
{
    bufBegin: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61],
    suffix: '.gif'
},
{
    bufBegin: [0x47, 0x49, 0x46, 0x38, 0x37, 0x61],
    suffix: '.gif'
},
{
    bufBegin: [0x42, 0x4d],
    suffix: '.bmp'
},
{
    bufBegin: [0x0a],
    suffix: '.pcx'
},
{
    bufBegin: [0x49, 0x49],
    suffix: '.tif'
},
{
    bufBegin: [0x4d, 0x4d],
    suffix: '.tif'
},
{
    bufBegin: [0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x20, 0x20],
    suffix: '.ico'
},
{
    bufBegin: [0x00, 0x00, 0x02, 0x00, 0x01, 0x00, 0x20, 0x20],
    suffix: '.cur'
},
{
    bufBegin: [0x46, 0x4f, 0x52, 0x4d],
    suffix: '.iff'
},
{
    bufBegin: [0x52, 0x49, 0x46, 0x46],
    suffix: '.ani'
}]
Editor.Panel.extend({
    style:`
    h2 {
        color: #f90;
        font-size: 12px;
        width: 200px;
        text-align: left
    }
    .middle {
        width: 200px;
        margin-left: 2%;
        align-items: center;
    }
    .inputstyle {
        width: 200px
    }
    .okstyle {
        margin-top: 50px;
        width: 100px;
        margin-left: 2%;
    }`,
    template:`
    <div class="middle layout vertical" > 
        <h2>请输入签名:</h2>
        <ui-input placeholder="sign" class="inputstyle" v-value="signKey"></ui-input>
    </div>

    <div class="middle layout vertical">
        <h2>请输入密码:</h2> 
        <ui-input placeholder="password" class="inputstyle" v-value="passWord"></ui-input>
    </div> 
    <div class="middle layout vertical">
        <h2>请选择构项目建模板:</h2> 
        <ui-select value="1" class="inputstyle" v-on:change="onBuildTypeChange" v-value="buildTypeSelect" id="buildType">
            <option value="0">link</option>
            <option value="1">default</option>
        </ui-select>
    </div> 

    <ui-button class="okstyle" v-on:confirm="onDoEncrypt">加密</ui-button>
    <div style="width: 96%; height: 150px;margin: 2% 2% 2% 2%;">
        <h2 style="margin: 0 0 5 0">日志:</h2> 
        <textarea class="flex-1" id="logTextArea" v-model="logView" style="width: 100%; height: 150px; background: #252525; resize: none; color: #fd942b; border-color: #fd942b;" disabled></textarea>
    </div>`,

    $:{
        logTextArea: "#logTextArea",
    },
    ready() {
        let logarea = this.$logTextArea;
        window.plugin = new window.Vue({
            el: this.shadowRoot,
            created: function() {
                this.initPluginCfg();
            },
            init: function() {
            },
            data: {
                logView: "",
                //默认的是这个
                signKey: "civiTool",
                passWord: "civiTool2020",
                engineVersion:"",
                rootPath: "",
                cfgPath: "",
                totalPng: [],
                hasEncrypt: 0,
                hasBuildProj: false,
                isNewVersion:false,
                buildTypeSelect:0,
            },
            computed: {},
            methods: {
                stringToHex(str) {
                    if (str === "")　　　　
                        return "";　　
                    var hexCharCode = [];　　
                    for (var i = 0; i < str.length; i++) {
                        hexCharCode.push((str.charCodeAt(i)));　　
                    }　　
                    return hexCharCode;
                },
                checkPngSig(fileBuffer) {
                    let isEqual = false
                    // 判断标识头前缀
                    if (pngBufferHeader.bufBegin) {
                        const buf = Buffer.from(pngBufferHeader.bufBegin);
                        isEqual = buf.equals(fileBuffer.slice(0, pngBufferHeader.bufBegin.length));
                    }
                    // 判断标识头后缀
                    if (isEqual && pngBufferHeader.bufEnd) {
                        const buf = Buffer.from(pngBufferHeader.bufEnd);
                        isEqual = buf.equals(fileBuffer.slice(-pngBufferHeader.bufEnd.length));
                    }
                    if (isEqual) {
                        return pngBufferHeader.suffix;
                    }
                    return ''
                },
                walk(path) {
                    var isPNG = function(pathStr) {
                        let extname = Path.extname(pathStr);
                        if (extname == ".png" || extname == ".PNG") {
                            let buf = Fs.readFileSync(pathStr); 
                            let sig = this.checkPngSig(buf);
                            if (sig == ".png") {
                                return true;
                            };
                        } else {
                            return false;
                        }
                    }.bind(this);

                    //先取出文件夹
                    var dirList = Fs.readdirSync(path);
                    //遍历文件夹
                    dirList.forEach(function(item) {
                        //判断是不是文件夹
                        if (Fs.statSync(path + '/' + item).isDirectory()) {
                            if (this.isNewVersion) {
                                if (item == "internal" ) {
                                    //默认的不管pass
                                }else{
                                    this.walk(path + '/' + item);
                                }
                            }else{
                                this.walk(path + '/' + item);
                            }
                        } else {
                            //判断是不是PNG图片
                            if (isPNG(path + '/' + item)) {
                                //进行加密
                                this.totalPng.push(path + '/' + item);
                            } else {
                                // pass
                            }
                        }
                    }.bind(this));
                },
                onDoEncrypt() {
                    if (this.hasBuildProj) {
                        this.addLog("请不要重复点击");
                        return;
                    };
                    Editor.log("encrypt tool init")
                    this.logView = "";
                    this.hasEncrypt = 0;
                    this.totalPng = [];
                    this.hasBuildProj = true;
                    let target = this.getBuildTips();
                    if (Fs.existsSync(this.rootPath + "/build/"+target)) {
                        let imgh = this.rootPath + "/build/jsb-default/frameworks/cocos2d-x/cocos/platform/CCImage.h";
                        let imgcpp = this.rootPath + "/build/jsb-default/frameworks/cocos2d-x/cocos/platform/CCImage.cpp";
                        if (this.buildTypeSelect == 0) {
                            let simulatorP = Editor.url('unpack://simulator', 'utf8');
                            let Cpath = Path.resolve(simulatorP, '..');
                            imgh = Cpath + "/cocos/platform/CCImage.h";
                            imgcpp = Cpath + "/cocos/platform/CCImage.cpp";
                        };
                        let buf = Fs.readFileSync(imgh, "UTF-8");
                        let tmp = buf.split("//civi encrypt,don't delete//");
                        if (tmp.length < 2) {
                            this.addLog("CCImage尚未添加代码,准备添加代码");
                            let finalRes = this.addEncryptScriptHeader(buf);
                            Fs.writeFileSync(imgh, finalRes);

                            let cppbuf = Fs.readFileSync(imgcpp, "UTF-8");
                            let finalSres = this.addEncryptScript(cppbuf);
                            Fs.writeFileSync(imgcpp, finalSres);
                            this.addLog("CCImage添加代码完成");
                        } else {
                            this.addLog("CCImage已经添加代码");
                            this.addLog("更新签名及密码");
                            let changeBuf = this.changeEncryptSignPass(buf);
                            Fs.writeFileSync(imgh, changeBuf);
 
                        }
                    } else {
                        Editor.log("项目还未构建，请先构建"+target+"项目");
                        this.addLog("项目还未构建，请先构建"+target+"项目");
                        this.hasBuildProj = false
                        return;
                    }
                    this.saveCfg();
                    this.addLog("开始加密...请耐心等待");
                    if (this.isNewVersion) {
                        this.walk(this.rootPath + "/build/"+target+"/assets");

                    }else{
                        this.walk(this.rootPath + "/build/"+target+"/res/raw-assets");
                    }
                    this.addLog("共检测到" + this.totalPng.length + "张需要加密的png");
                    for (var i = 0; i < this.totalPng.length; i++) {
                        let pathStr = this.totalPng[i];
                        this.beginEncrypt(pathStr);
                    };
                },
                beginEncrypt(pathStr) {
                    let buf = Fs.readFileSync(pathStr);
                    let newData = this.encryptPng(buf);
                    Fs.writeFile(pathStr, newData,function(error) {
                        this.addLog(pathStr + "加密完成");
                        this.hasEncrypt = this.hasEncrypt + 1;
                        if (this.hasEncrypt == this.totalPng.length) {
                            this.addLog("全部加密完成"); 
                            Editor.log("png资源加密完成");
                            this.hasBuildProj = false;
                        };
                    }.bind(this));
                },
                onBuildTypeChange(e)
                {
                    let t = e.target.value;
                    this.checkBuildDir();
                },
                encryptPng(fileBuffer) {
                    //预处理，先切头，再去尾
                    let cutHeader = fileBuffer.slice(pngBufferHeader.bufBegin.length);
                    let iendData = cutHeader.slice( - pngBufferHeader.bufEnd.length);
                    let lastData;
                    const buf = Buffer.from(pngBufferHeader.bufEnd);
                    if (buf.equals(iendData)) {
                        lastData = cutHeader.slice(0, -pngBufferHeader.bufEnd.length);
                    } else {
                        lastData = cutHeader;
                    }
                    let k = this.stringToHex(this.passWord);
                    let klen = k.length;
                    let kindex = 0;
                    for (var i = 0; i < lastData.length; i++) {
                        if (kindex >= klen) {
                            kindex = 0;
                        };
                        lastData[i] = lastData[i] ^ k[kindex];
                        kindex = kindex + 1;
                    };
                    let sign = new Buffer(this.signKey);
                    let finalData = Buffer.concat([sign, lastData]);
                    return finalData;
                },
                addLog(t) {
                    let i = new Date;
                    this.logView += "[" + i.toLocaleString() + "]: " + t + "\n",
                    setTimeout(function() {
                        logarea.scrollTop = logarea.scrollHeight;
                    },10)
                },
                versionCompareHandle(versionA, versionB) {
                    var vA = versionA.split('.');
                    var vB = versionB.split('.');
                    for (var i = 0; i < vA.length; ++i) {
                        var a = parseInt(vA[i]);
                        var b = parseInt(vB[i] || 0);
                        if (a === b) {
                            continue;
                        }
                        else {
                            return a - b;
                        }
                    }
                    if (vB.length > vA.length) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                },
                initPluginCfg() {
                    let e = Editor.libraryPath;
                    this.rootPath = e.substring(0, e.length - 7);
                    this.cfgPath = this.rootPath + "/packages/encrypt-tool/cfg.json";
                    this.addLog("项目路径为" + e.substring(0, e.length - 7)); 
                    this.readCfg();
                    this.checkBuildDir();
                },
                checkBuildDir()
                {
                    let target = this.getBuildTips()
                    this.addLog("当前加密目标模板为"+target+",即"+target+"目录下的png将被加密");
                    if (Fs.existsSync(this.rootPath + "/build/"+target)) {
                        let projCfg = this.rootPath + "/build/"+target+"/.cocos-project.json";
                        let buf = Fs.readFileSync(projCfg,"UTF-8");
                        let cfg = JSON.parse(buf);
                        this.engineVersion = cfg.engine_version;
                        this.addLog("当前引擎版本为" + this.engineVersion); 
                        let ret = this.versionCompareHandle(this.engineVersion,"2.4.0");
                        if (ret >= 0) {
                            this.isNewVersion = true;
                        };
                    }else{
                        Editor.log("项目还未构建，请先构建"+target+"项目");
                        this.addLog("项目还未构建，请先构建"+target+"项目");
                    }
                },
                saveCfg() {
                    let newData = this.signKey + "civiEncrypt" + this.passWord + "civiEncrypt"+this.buildTypeSelect;
                    Fs.writeFile(this.cfgPath, newData,function(error) {

                    });
                },
                readCfg() {
                    if (Fs.existsSync(this.cfgPath)) {
                        let st = Fs.readFileSync(this.cfgPath, "UTF-8");
                        let signData = st.split("civiEncrypt");
                        if (signData.length > 1) {
                            this.signKey = signData[0];
                            this.passWord = signData[1];
                            if (signData.length > 2) {
                                this.buildTypeSelect = signData[2];
                            };
                            this.addLog("上次签名为" + this.signKey);
                            this.addLog("上次密码为" + this.passWord);
                        };
                    } else {
                        this.addLog("未检测到历史配置");
                    }
                },
                getBuildTips()
                {
                    if(this.buildTypeSelect== 1)
                    {
                        return "jsb-default";
                    }
                    return "jsb-link";
                },
                addEncryptScriptHeader(buf) {
                    let splitStr = "PNG,";
                    let addEnum = buf.split(splitStr);
                    if (addEnum.length == 2) {
                        buf = addEnum[0] + splitStr + "\n        //civi encrypt,don't delete//\n        ENCRYPTEDPNG, //加密后的Png图片\n        //civi encrypt,don't delete//" + addEnum[1];
                    };

                    let splitStr1 = "bool initWithImageFile(const std::string& path);";
                    let tmp1 = buf.split(splitStr1);
                    if (tmp1.length == 2) {
                        buf = tmp1[0] + splitStr1 + "\n    //civi encrypt,don't delete//\n    void deEncryptPng(unsigned char **copyData, const char *key, ssize_t dataLen);\n    //civi encrypt,don't delete//" + tmp1[1];
                    };

                    let splitStr2 = "std::string _filePath;";
                    let tmp2 = buf.split(splitStr2);
                    if (tmp2.length == 2) {
                        buf = tmp2[0] + splitStr2 + "\n    //civi encrypt signPass,don't delete//\n    const char *signKey = \"" + this.signKey + "\";\n    const char *passWord = \"" + this.passWord + "\";\n    //civi encrypt signPass,don't delete//" + tmp2[1];
                    };

                    let splitStr3 = "bool isS3TC(const unsigned char * data,ssize_t dataLen);";
                    let tmp3 = buf.split(splitStr3);
                    if (tmp3.length == 2) {
                        buf = tmp3[0] + splitStr3 + "\n    //civi encrypt,don't delete//\n    bool isEncryptedPng(const unsigned char * data,ssize_t dataLen);\n    //civi encrypt,don't delete//" + tmp3[1];
                    };

                    return buf;
                },
                addEncryptScript(buf) {
                    let splitStr = "NS_CC_END";
                    let addEnum = buf.split(splitStr);
                    if (addEnum.length == 2) {
                        buf = addEnum[0] + "//civi encrypt,don't delete//\nvoid Image::deEncryptPng(unsigned char **copyData, const char *key, ssize_t dataLen) {\n    static const unsigned char PNG_SIGNATURE[] = { 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a };\n    static const unsigned char PNG_IEND[] = { 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82 };\n    unsigned char* data = *copyData;\n    memcpy(data, PNG_SIGNATURE, 8);\n    memcpy(data + (dataLen - 12), PNG_IEND, 12);\n    unsigned char* destart = data + 8;\n    unsigned char* de_end = data + dataLen - 13;\n    ssize_t keyLen = strlen(key);\n    ssize_t keyIndex = 0;\n    for(; destart <= de_end; destart++, keyIndex++) {\n        if (keyIndex >= keyLen)\n            keyIndex = 0;\n        *destart ^= key[keyIndex];\n    }\n}\nbool Image::isEncryptedPng(const unsigned char *data, ssize_t dataLen)\n{\n    if (dataLen <= 7 || memcmp(signKey, data, 7) != 0) {\n        return false;\n    }\n    return true;\n}\n//civi encrypt,don't delete//\n" + splitStr;
                    };

                    let splitStr1 = "else if (isJpg(data, dataLen))";
                    let tmp1 = buf.split(splitStr1);
                    if (tmp1.length == 2) {
                        buf = tmp1[0] + "//civi encrypt,don't delete//\n    else if (isEncryptedPng(data, dataLen)) {\n        return Format::ENCRYPTEDPNG;\n    }\n    //civi encrypt,don't delete//\n    " + splitStr1 + tmp1[1];
                    };

                    let splitStr2 = "case Format::PNG:";
                    let tmp2 = buf.split(splitStr2);
                    if (tmp2.length == 2) {
                        buf = tmp2[0] + "//civi encrypt,don't delete//\n        case Format::ENCRYPTEDPNG:\n        {\n            unsigned char* copyData = new unsigned char[unpackedLen + 13]; // 8 + 12 - 7\n            memcpy(copyData + 8, unpackedData + 7, unpackedLen - 7);\n            deEncryptPng(&copyData, passWord, unpackedLen + 13);\n            ret = initWithPngData(copyData, unpackedLen + 13);\n            delete [] copyData;\n        }\n            break;\n        //civi encrypt,don't delete//\n        " + splitStr2 + tmp2[1];
                    };
                    return buf;
                },
                changeEncryptSignPass(buf) {
                    let splitStr2 = "//civi encrypt signPass,don't delete//";
                    let tmp2 = buf.split(splitStr2);
                    if (tmp2.length == 3) {
                        buf = tmp2[0] + splitStr2 + "\n    const char *signKey = \"" + this.signKey + "\";\n    const char *passWord = \"" + this.passWord + "\";\n    //civi encrypt signPass,don't delete//" + tmp2[2];
                    }
                    return buf;
                },
                onBuildFinished(t) {
                }
            }
        })
    },
    messages: {
        "encrypt-tool:onBuildFinished":function(e, t) {

        }
    },
});