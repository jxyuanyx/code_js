import cv from "../../lobby/cv";
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class CriticismTips extends cc.Component {

    @property(cc.Label) title_text: cc.Label = null;
    @property(cc.RichText) msg_Richtext: cc.RichText = null;
    @property(cc.Button)   btn_Sure:cc.Button = null;
    private sureCallback: Function = null;
    // LIFE-CYCLE CALLBACKS:

    private static _g_prefabInst: cc.Node = null;  
    private  itemDataInfo: any = null;
    private  minCritProb: number = 10;  // 最小暴击时间
    private  maxCritProb: number = 20; // 最大暴击时间
    private  critNeedMoney: number = 10; // 暴击场暴击倍数
    private  gameTypeStr = "BB";

     /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!CriticismTips._g_prefabInst) CriticismTips._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(CriticismTips._g_prefabInst.uuid)) {
            if (!cc.isValid(CriticismTips._g_prefabInst, true)) {
                CriticismTips._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return CriticismTips._g_prefabInst;
    }

    autoShow(parentNode: cc.Node ,dataInfo: any, zIndex: number): void {

        this.node.active = true;
        this.itemDataInfo = dataInfo;

        if(dataInfo.minCritProb != 0)  this.minCritProb = dataInfo.minCritProb; // 最小暴击时间
        if(dataInfo.maxCritProb != 0)  this.maxCritProb = dataInfo.maxCritProb; // 最大暴击时间
        if(dataInfo.critNeedMoney != 0) this.critNeedMoney = dataInfo.critNeedMoney; // 暴击场暴击倍数

        this.gameTypeStr = "BB";
        if(dataInfo.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short){
            this.gameTypeStr = "Ante";
        }

        if (parentNode.getAnchorPoint().equals(cc.Vec2.ZERO)) {
            parentNode = cc.director.getScene();
        }
        if (!parentNode.getChildByUuid(this.node.uuid)) {
            parentNode.addChild(this.node);
        }
    }

    onLoad () {

        this.btn_Sure.node.on("click", (event: cc.Event): void => { 
            if(this.sureCallback){
                this.sureCallback();
                this.node.active = false;
            }
        }, this);  

        this.onChangeLanguage();
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.onChangeLanguage.bind(this),this.node);
    }

    start () {
        
    }

    
    onDestroy() {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE,this.node);
    }


    onChangeLanguage(){

        this.btn_Sure.node.getChildByName("Label").getComponent(cc.Label).string =  cv.config.getStringData("Confirm"); 
        this.title_text.string =   cv.config.getStringData("Criticsim_guide_title");
        let _curStr = cv.StringTools.formatC(cv.config.getStringData("Criticsim_guide_tips"),this.maxCritProb, this.critNeedMoney, this.gameTypeStr);
        cv.StringTools.setRichTextString(this.msg_Richtext.node, _curStr); 
    }

    setSureFunc(sureFunc){
        this.sureCallback = sureFunc;
    }
    // update (dt) {}
}
