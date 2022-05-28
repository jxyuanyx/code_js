
import cv from "../cv";
const { ccclass, property } = cc._decorator;

@ccclass
export default class starDetails extends cc.Component {

    public static _g_prefabInst: cc.Node = null;
    public msg: any = null;
    public cur_s: number = 0; //当前展示的明星索引
    public enterCallFunc: Function = null;
    @property(cc.Label) btnGameTxt: cc.Label = null;
    private _touchTag:number = 0; //当前点击的是第几个头像
    private _starInfos:any = null;

    static getSinglePrefabInst(prefab: cc.Prefab): cc.Node {
        let scene = cc.director.getScene();
        if (!starDetails._g_prefabInst) starDetails._g_prefabInst = cc.instantiate(prefab);
        if (!scene.getChildByUuid(starDetails._g_prefabInst.uuid)) {
            if (!cc.isValid(starDetails._g_prefabInst, true)) {
                starDetails._g_prefabInst = cc.instantiate(prefab);
            }
            scene.addChild(starDetails._g_prefabInst, cv.Enum.ZORDER_TYPE.ZORDER_TOP);
        }
        return starDetails._g_prefabInst;
    }

    onLoad() {
        this.onChangeLanguage();
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.onChangeLanguage.bind(this), this.node);
        cv.MessageCenter.register("onStarDetailInfoResponse", this.onstarDetailResponse.bind(this), this.node);
    }

    start() {
    }

    onChangeLanguage() {
        this.btnGameTxt.string = cv.config.getStringData("jackfruit_joinGame_label"); //进入游戏
    }

    protected onDestroy(): void {
        cv.MessageCenter.unregister("onStarDetailInfoResponse", this.node);
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    onstarDetailResponse(data: any): void {
        this.node.active = true;
        this.msg = data;
        let firstId = this.msg.firstId;
        this._starInfos = this.msg.starInfo;

        this.cur_s = 0;
        for (let i = 0; i < this._starInfos.length; i++) {
            if (firstId == this._starInfos[i].uid) {
                this.cur_s = i;
                break;
            }
        }
        //如果点击的是第2个，数据排在第一条，数组逆转
        if(this._touchTag == 2 && this.cur_s == 0){
            this._starInfos.reverse();
            this.cur_s = 1;
        }

        let starInfo = this._starInfos[this.cur_s];
        this.refreshStarDeatail(starInfo);
    }

    public setData(callfunc: Function, touchTag:number = 1) {
        this.enterCallFunc = callfunc;
        this._touchTag = touchTag;
    }

    refreshStarDeatail(starInfo: any) {

        //详情图片
        let profilePic = starInfo.profilePic;

        if (profilePic == null) return;

        let url = cv.dataHandler.getUserData().getImageUrlByPlat(profilePic);
        let headSp = cc.find("content/detailPic", this.node).getComponent(cc.Sprite);
        headSp.spriteFrame = null;

        cv.resMgr.loadRemote(url, (error: Error, resource: cc.Texture2D) => {
            if (error) {
                console.log(error.message || error);
                return;
            }
            //异步加载，在切换完场景的时候headSp.node有可能已被销毁。造成报错，在此加一个判断
            if (!headSp.node || !cc.isValid(headSp.node,true)) return;
            let spr = new cc.SpriteFrame(resource);
            headSp.spriteFrame = spr;
        });


        let btnLeft = cc.find("content/btnLeft", this.node);
        let btnRight = cc.find("content/btnRight", this.node);

        let BrightUrl = "zh_CN/hall/lobby/arrow_bright";
        let darkUrl = "zh_CN/hall/lobby/arrow_dark";

        if (this._starInfos.length == 1) {  //只有一条数据
            btnLeft.getComponent(cc.Button).interactable = false;
            btnRight.getComponent(cc.Button).interactable = false;

        } else if (this.cur_s == 0) {   //展示第一条
            btnLeft.getComponent(cc.Button).interactable = false;
            btnRight.getComponent(cc.Button).interactable = true;

        } else if (this.cur_s == 1) {  //展示的最后一条
            btnLeft.getComponent(cc.Button).interactable = true;
            btnRight.getComponent(cc.Button).interactable = false;
        }

        let leftURl = btnLeft.getComponent(cc.Button).interactable == true ? BrightUrl : darkUrl;
        let rightURl = btnRight.getComponent(cc.Button).interactable == true ? BrightUrl : darkUrl;

        cv.resMgr.setSpriteFrame(btnLeft.getChildByName("sprite"), leftURl);
        cv.resMgr.setSpriteFrame(btnRight.getChildByName("sprite"), rightURl);
    }

    //点击进入房间
    onBtnClickJoinRoom(event: cc.Component.EventHandler) {
        this.node.active = false;
        if (this.enterCallFunc) {
            this.enterCallFunc(null);
        }
    }

    onClose(event: cc.Component.EventHandler) {
        this.node.active = false;
    }

    onBtnClickLeft() {
        if(this._starInfos.length <= 1){
            return;
        }
        this.cur_s = 0;
        let starInfo = this._starInfos[this.cur_s];
        if (starInfo) {
            this.refreshStarDeatail(starInfo);
        }

    }

    onBtnClickRight() {
        if(this._starInfos.length <= 1){
            return;
        }
        this.cur_s = 1;
        let starInfo = this._starInfos[this.cur_s];
        if (starInfo) {
            this.refreshStarDeatail(starInfo);
        }

    }
    // update (dt) {}
}
