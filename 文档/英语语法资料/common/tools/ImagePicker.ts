import cv from "../../components/lobby/cv";
import { CircleSprite } from "./CircleSprite";
import { NativeEventCMD, NATIVE_KEY_MAP } from "./NativeEventCMD";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export class ImagePicker extends cc.Component {
    isRun: boolean = false;
    spImg: cc.Node = null;
    PhotoObj: HTMLElement = null;
    headStr: string = null;
    customHeadTime: number = 0;
    scaleNum: number = 1.5;
    headScale: number = 0.99;
    onLoad() {
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
        //cv.MessageCenter.register("native_onImageSaved", this.onImageSaved.bind(this), this.node);
        cc.find("Panel_2", this.node).on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventCustom) => { event.stopPropagation(); }, this);
        this.initLanguage();
    }

    init(spImg: cc.Node) {
        this.spImg = spImg;

        if (cc.sys.isBrowser) {
            if (!this.PhotoObj) {
                this.PhotoObj = document.createElement("input");
                this.PhotoObj.setAttribute("type", "file");
                this.PhotoObj.setAttribute("accept", "image/*");
                // this.PhotoObj.setAttribute("capture", "camera");
                document.body.appendChild(this.PhotoObj);
                this.PhotoObj.addEventListener("change", this.tmpSelectFile.bind(this), false);
            }
            this.PhotoObj.click();
        }
        else {
            this.show();
        }

        if (cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/ImagePicker", "getPermissions", "()V");
        }
    }

    initLanguage(): void {
        cv.StringTools.setLabelString(this.node, "m_layer/btnPhoto/Label", "ImagePicker_btnPhoto");
        cv.StringTools.setLabelString(this.node, "m_layer/btnCamera/Label", "ImagePicker_btnCamera");
        cv.StringTools.setLabelString(this.node, "m_layer/btnCancel/Label", "ImagePicker_btnCancel");
    }

    onDestroy(): void {
        //cv.MessageCenter.unregister("native_onImageSaved", this.node);
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }
    onImageSaved(path: any) {
        cv.resMgr.loadRemote(path.msg, function (err, tex) {
            console.log('Result should be a texture: ' + (tex instanceof cc.Texture2D), false, null);
            CircleSprite.setHeadTexture(this.spImg, tex, this.headScale);
        }.bind(this));
        this.setHeadString(path.base64str);
        // let data = jsb.fileUtils.getDataFromFile(path.msg);
        // this.headStr = CryptoJS.enc.Base64.stringify(aesHandler.Int8parse(data));
        // this.headStr = this.headStr.replace(/\+/g, "-");
        // this.headStr = this.headStr.replace(/\//g, "_");
        // console.log(this.headStr);
    }

    setHeadString(str: string) {
        this.headStr = str;
        this.headStr = this.headStr.replace(/\+/g, "-");
        this.headStr = this.headStr.replace(/\//g, "_");
    }

    onBtnPhotoClick() {
        if (cc.sys.os == cc.sys.OS_IOS) {
            cv.native.invokeAsynFunc(NATIVE_KEY_MAP.KEY_OPEN_PHOTO)
        } else if (cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/ImagePicker", "openPhoto", "()V");
        }
    }

    onBtnCameraClick() {
        if (cc.sys.os == cc.sys.OS_IOS) {
            cv.native.invokeAsynFunc(NATIVE_KEY_MAP.KEY_OPEN_CAMERA);
        } else if (cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/ImagePicker", "openCamera", "()V");
        }
    }

    onBtnCancelClick() {
        this.hide();
    }

    static add(prefabFile: cc.Prefab, zorder?: number): cc.Node {
        return cv.action.addChildToScene(null, prefabFile, [], zorder, true);
    }

    show() {
        this.node.active = true;
        let m_layer = cc.find("m_layer", this.node);
        m_layer.setScale(this.scaleNum, this.scaleNum);
        let height = m_layer.getContentSize().height * this.scaleNum;
        if (!this.isRun) {
            this.isRun = true;
            m_layer.setPosition(m_layer.position.x, m_layer.position.y - height);
        }

        m_layer.runAction(cc.moveBy(0.3, cc.v2(0, height)));

        let Panel_2 = cc.find("Panel_2", this.node);
        Panel_2.opacity = 0;
        Panel_2.runAction(cc.fadeTo(0.2, 255));
    }

    hide() {
        let m_layer = cc.find("m_layer", this.node);
        let height = m_layer.getContentSize().height * this.scaleNum;
        m_layer.runAction(cc.moveBy(0.2, cc.v2(0, -height)));

        let Panel_2 = cc.find("Panel_2", this.node);
        Panel_2.runAction(cc.sequence(cc.fadeTo(0.2, 0), cc.callFunc(function () {
            this.node.active = false;
        }.bind(this))));
    }

    loadLocalimg(uri) {
        var my = document.getElementById("divCreator");
        if (my === null) {
            my = document.createElement("div");
            document.body.appendChild(my);
            my.style.position = "absolute";
            my.id = "divCreator";
            my.style.width = "100";
            my.style.height = "100";
            my.style.backgroundColor = "#ffffcc";
        }
        my.innerHTML = '<img id=imghead>';
        var img = document.getElementById('imghead');
        img.onload = function () {
            let texture = new cc.Texture2D();
            texture.initWithElement(img);
            texture.handleLoadedTexture();
            CircleSprite.setHeadTexture(this.spImg, texture, this.headScale);

        }.bind(this);
        img.setAttribute('src', uri);
        my.style.display = 'none';
        my.style.visibility = "hidden";
    }
    tmpSelectFile(evt) {
        //console.log("image selected...");
        var file = evt.target.files[0];
        // var type = file.type;
        // if (!type) {
        //      type = mime[file.name.match(/\.([^\.]+)$/i)[1]];
        // }
        // var url = this.myCreateObjectURL(file);
        // this.loadLocalimg(url);

        var reader = new FileReader();
        reader.readAsDataURL(file);//发起异步请求
        reader.onload = function () {
            //读取完成后，将结果赋值给img的src
            this.canvasDataURL(reader.result, 100);
        }.bind(this);
    }

    myCreateObjectURL(blob) {
        if (window.URL !== undefined)
            return window['URL']['createObjectURL'](blob);
        else
            return window['webkitURL']['createObjectURL'](blob);
    }

    canvasDataURL(re, w) {
        var newImg = new Image();
        newImg.src = re;
        var imgWidth = 0, imgHeight = 0;
        newImg.onload = function () {
            var img = document.createElement("img");
            img.src = newImg.src;
            imgWidth = img.width;
            imgHeight = img.height;
            var canvas = document.createElement("canvas");

            var scale = 1;
            if (imgWidth > imgHeight) {
                scale = w / imgHeight;
            } else {
                scale = w / imgWidth;
            }
            canvas.width = imgWidth * scale;
            canvas.height = imgHeight * scale;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            var base64 = canvas.toDataURL("image/jpeg");
            this.loadLocalimg(base64);
            this.setHeadString(base64.slice(base64.search(",") + 1));
            // console.log("@####################+++====>" + this.headStr);
            this.customHeadTime = (new Date()).getTime();

        }.bind(this);

    }
}
