import cv from "../cv"
import { userData } from "../../../data/userData";
import { CircleSprite } from "../../../common/tools/CircleSprite"
import ws_protocol = require("./../../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;
const {ccclass, property} = cc._decorator;

@ccclass
export default class MyRedPacketsShare extends cc.Component {
    @property(cc.Node)share_bg: cc.Node = null;
    @property(cc.Label)title: cc.Label = null;
    @property(cc.Label)name_label: cc.Label = null;
    @property(cc.Label)des_0: cc.Label = null;
    @property(cc.Label)title_code: cc.Label = null;
    @property(cc.Label)code: cc.Label = null;
    @property(cc.Label)des_1: cc.Label = null;
    @property(cc.Node)share_avtar: cc.Node = null;
    @property(cc.Label)btn_share_label: cc.Label = null;
    @property(cc.Node)cash_panel: cc.Node = null;
    private static _g_prefabInst: cc.Node = null;

    private _data:world_pb.HelpWrapInfo = null;
    /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!MyRedPacketsShare._g_prefabInst) MyRedPacketsShare._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(MyRedPacketsShare._g_prefabInst.uuid)) {
            if (!cc.isValid(MyRedPacketsShare._g_prefabInst, true)) {
                MyRedPacketsShare._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return MyRedPacketsShare._g_prefabInst;
    }

    onLoad () {
        this._initLanguage();
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this._initLanguage.bind(this), this.node);
    }

    onDestroy() {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    close()
    {
        this.node.active = false;
    }

    private _initLanguage()
    {
        this.title.string = cv.config.getStringData("MyRedPacketsShare_title");
        this.des_0.string = cv.config.getStringData("MyRedPacketsShare_des_0");
        this.title_code.string = cv.config.getStringData("MyRedPacketsShare_title_code");
        this.des_1.string = cv.config.getStringData("MyRedPacketsShare_des_1");
        this.btn_share_label.string = cv.config.getStringData("MyRedPacketsShare_btn_share_label");
    }

    onBtnShare()
    {
        let scene = cc.director.getScene();
        let Canvas = scene.getChildByName("HallScene")
        let camera = Canvas.getChildByName("Main Camera").getComponent(cc.Camera);
        let texture = new cc.RenderTexture();
        let gl = cc.game._renderContext;
        let size = cc.size(Math.floor(this.share_bg.width), Math.floor(this.share_bg.height));
        texture.initWithSize(size.width, size.height, gl.STENCIL_INDEX8);
        camera.targetTexture = texture;
        camera.render(this.share_bg);
        let data = texture.readPixels();
        let picData = this.filpYImage(data, size.width, size.height);
        camera.targetTexture = null;
        if (cc.sys.isNative) {
            let writePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/'));
            let filePath = writePath + "screenshot.png";
            if (jsb.fileUtils.isFileExist(filePath)) {
                jsb.fileUtils.removeFile(filePath);
            }
            jsb.saveImageData(picData, size.width, size.height, filePath);
            let isok = true;
            if (cc.sys.os == cc.sys.OS_IOS) {
                let _iosRet = cv.native.invokeSyncFunc(cv.nativeCMD.KEY_SAVE_TO_ABLM, { "path": filePath })
                if (_iosRet == "false") {
                    isok = false;
                }
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                isok = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/ImagePicker", "saveTophoto", "(Ljava/lang/String;)Z", filePath);
            }

            if (isok) {
                cv.TT.showMsg(cv.config.getStringData("ClubSpreadTips0"), cv.Enum.ToastType.ToastTypeInfo);
            } else {
                cv.TT.showMsg(cv.config.getStringData("ClubSpreadTips1"), cv.Enum.ToastType.ToastTypeInfo);
            }
        }
        this.close();
    }

    show(data:world_pb.HelpWrapInfo)
    {
        // 这里用自己的头像数据是为了防止玩家更改后缓存不刷新
        let userData: userData = cv.dataHandler.getUserData();
        this.name_label.string = userData.nick_name;
        this._data = data;
        this.code.string = data.captcha_data.code.toString();

        CircleSprite.cleanHeadNode(this.share_avtar);
        CircleSprite.setCircleSprite(this.share_avtar, userData.headUrl, 0, false);
        let url = data.captcha_data.share_image_url;
        if(typeof url == "string" && url.length > 0)
        {
            url = cv.dataHandler.getUserData().getImageUrlByPlat(cv.StringTools.getServerStrByLanguage(url));
            cv.resMgr.downloadImg(url, this.share_bg, ()=>{
                this.cash_panel.active = false;
            })
        }else {
            cv.resMgr.setSpriteFrame(this.share_bg, "zh_CN/hall/MyRedPackets/share");
            this.cash_panel.active = true;
        }
        this.node.active = true;
    }
    
    // This is a temporary solution
    public filpYImage(data, width, height) {
        // create the data array
        let picData = new Uint8Array(width * height * 4);
        let rowBytes = width * 4;
        for (let row = 0; row < height; row++) {
            let srow = height - 1 - row;
            let start = srow * width * 4;
            let reStart = row * width * 4;
            // save the piexls data
            for (let i = 0; i < rowBytes; i++) {
                picData[reStart + i] = data[start + i];
            }
        }
        return picData;
    }
}
