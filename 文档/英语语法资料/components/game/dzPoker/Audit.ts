import { ObItem } from "./ObItem";
import cv from "../../lobby/cv";
import { GameNetWork } from "../../../common/net/GameNetWork";
import GameDataManager from "./data/GameDataManager";
import { TipsPanel } from "../../../common/prefab/TipsPanel";
import { PlayerRecord } from "./data/RecordData";
import { ObView } from "./ObView";
import { ObPlayer, PlayerInfo } from "./data/RoomData"
import { GameReviewDataType } from "../../../common/tools/Enum";

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
export default class Audit extends cc.Component {

    @property(cc.Button) sure_btn: cc.Button = null;
    @property(cc.Button) cancel_btn: cc.Button = null;
    @property(cc.Label) expense_txt: cc.Label = null;
    @property(cc.Label) expense_money_txt: cc.Label = null;
    @property(cc.Label) des_txt: cc.Label = null;
    @property(cc.Label) pleaseChoose_txt:cc.Label = null;
    @property(cc.Label) title_txt:cc.Label = null;
    @property(cc.EditBox) email_EditBox: cc.EditBox = null;

    @property(cc.Sprite) head_Img: cc.Sprite = null;

    public obItemList:cc.Node[] = [];

    @property(cc.Prefab) obItemPrefab: cc.Prefab = null;

    @property(cc.Prefab) obViewPrefab: cc.Prefab = null;
    @property(cc.Node) _pkObView: cc.Node = null;

    private static _g_prefabInst: cc.Node = null;     

    private _eDataSourceType: GameReviewDataType = GameReviewDataType.EDST_NONE;    // 数据源类型


        /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!Audit._g_prefabInst) Audit._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(Audit._g_prefabInst.uuid)) {
            if (!cc.isValid(Audit._g_prefabInst, true)) {
                Audit._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return Audit._g_prefabInst;
    }

    autoShow(parentNode: cc.Node, data_source?: GameReviewDataType,  zIndex?: number): void {

        this.node.active = true;
        if(zIndex){
            this.node.zIndex = zIndex;
        }
        // this.node.setPosition(cc.Vec2.ZERO);
        if (parentNode.getAnchorPoint().equals(cc.Vec2.ZERO)) {
            parentNode = cc.director.getScene();
            // this.node.setPosition(cv.action.WIDTH / 2, cv.action.HEIGHT / 2);
        }
        if (!parentNode.getChildByUuid(this.node.uuid)) {
            parentNode.addChild(this.node);
        }

        let _type:GameReviewDataType = data_source? data_source:GameReviewDataType.EDST_GAMEROOM;
        this.updateView(_type);
        this.updateAuditMoney();
    }

    autoHide(){
         this.node.active = false;
    }

    // LIFE-CYCLE CALLBACKS:
    onLoad () {

        this.sure_btn.node.on("click", (event: cc.Event): void => { 
            cv.AudioMgr.playButtonSound('button_click');
            this.onClickSureBtn(); 
        }, this);   //提交审核
        this.cancel_btn.node.on("click", (event: cc.Event): void => { 
            cv.AudioMgr.playButtonSound('button_click');
            this.cancelAudit(); 
        }, this); //我再想想

        this.email_EditBox.node.on("editing-did-began", this._onEdtDidBegan, this)
        this.email_EditBox.node.on("editing-did-ended", this._onEdtDidEnded, this)
        this.email_EditBox.node.on("text-changed", this._onEdtTxtChanged, this)
        this.email_EditBox.node.on("editing-return", this._onEdtReturn, this)

        this.onChangeLanguage();
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.onChangeLanguage.bind(this),this.node);
    }

    onDestroy() {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE,this.node);
    }


    onChangeLanguage(){
        this.title_txt.string = cv.config.getStringData("Audit_title_txt");
        this.pleaseChoose_txt.string = cv.config.getStringData("Audit_pleaseChoose_txt");
        this.email_EditBox.placeholder = cv.config.getStringData("Audit_email_text");
        this.sure_btn.node.getChildByName("Label").getComponent(cc.Label).string = cv.config.getStringData("AuditButton");
      
        this.des_txt.string = cv.StringTools.calculateAutoWrapString(this.des_txt.node, cv.config.getStringData("Audit_des_txt"));
        this.expense_txt.string = cv.config.getStringData("Audit_expense_txt");
        this.cancel_btn.node.getChildByName("Label").getComponent(cc.Label).string = cv.config.getStringData("Audit_cancel_button");
    }

    setData():void{
    }

    start () {

    }

    onClickSureBtn():void{

        let num =  cv.StringTools.serverGoldToShowNumber(cv.dataHandler.getUserData().chargefee);
        let tipsStr = cv.StringTools.formatC(cv.config.getStringData("UIGameSceneTips25"), num);

        let email_address = this.email_EditBox.string;
        if(email_address.length > 0) {
            if(!cv.StringTools.isEmailFormat(email_address)){  //邮件格式不合格
                cv.TT.showMsg(cv.config.getStringData("AuditEmailTips"), cv.Enum.ToastType.ToastTypeError);
                return;
            }
        }

       if(cv.dataHandler.getUserData().isfirst  || cv.dataHandler.getUserData().freecounts > 0){
            cv.TP.showMsg(tipsStr, cv.Enum.ButtonStyle.TWO_BUTTON, this.sureToAudit.bind(this));
        }else{
            if(cv.dataHandler.getUserData().isgoldenough){
                cv.TP.showMsg(tipsStr, cv.Enum.ButtonStyle.TWO_BUTTON, this.sureToAudit.bind(this));
            
            }else{
                tipsStr = cv.StringTools.formatC(cv.config.getStringData("UIGameSceneTips24"), num)
                cv.TP.showMsg(tipsStr, cv.Enum.ButtonStyle.TWO_BUTTON, this.gotoShop.bind(this));
            }
        }
    }

    sureToAudit(): void {

        let tPokerHandData = null;
        switch (this._eDataSourceType) {
            case GameReviewDataType.EDST_NONE: 
            case GameReviewDataType.EDST_RECORD:
            case GameReviewDataType.EDST_GAMEROOM: {
                tPokerHandData =  GameDataManager.tGameRecords.tPokerHandData;
            } break;

            case GameReviewDataType.EDST_COLLECTION: {
                tPokerHandData =  GameDataManager.tCollectPokerMapData.tPokerHandData;
            } break;
            default: break;
        }

        let roomid = tPokerHandData.nRoomID;
        let clubId = tPokerHandData.nClubID;
        let room_uuid = Number(tPokerHandData.sRoomUUID);
        let game_uuid = Number(tPokerHandData.sGameUUID);
        
        let suspect_uids:number[] = [];
        for (let i = 0; i < this.obItemList.length; i++) {
            let item = this.obItemList[i].getComponent(ObItem)
            if(item.headIsSelect()){
                suspect_uids.push(item.playerData.nPlayerID);
            }
        }
        //举报必须两个以上
        if(suspect_uids.length < 2){
            cv.TT.showMsg(cv.config.getStringData("AuditMustTwoPersons"), cv.Enum.ToastType.ToastTypeError);
            return;  
        }

        let email_address = this.email_EditBox.string;
        let detail = "nice";
        this.node.active = false;
        cv.worldNet.RequestFairPlayReport(roomid, clubId, room_uuid, game_uuid, suspect_uids, email_address, detail);
    }

    cancelAudit():void {
        this.node.active = false;
    }

    gotoShop():void{
        this.cancelAudit();
        cv.SHOP.RechargeClick();
    }

    updateAuditMoney():void{
        if(cv.dataHandler.getUserData().isfirst == 1){
            this.expense_money_txt.string = cv.config.getStringData("UIGameSceneTips23");
        }else if(cv.dataHandler.getUserData().freecounts > 0){
            let num = cv.dataHandler.getUserData().freecounts;
            let acBuffer = cv.StringTools.formatC(cv.config.getStringData("UIGameSceneTips27"), num);
            this.expense_money_txt.string =  acBuffer;
        }else{
            let num = cv.StringTools.serverGoldToShowNumber(cv.dataHandler.getUserData().chargefee);
            let acBuffer = cv.StringTools.formatC(cv.config.getStringData("UIGameSceneTips22"), num);
            this.expense_money_txt.string =  acBuffer;
        }
    }   

    //从缓存mHandMapCache获取牌普信息
    getPokerHandDataFromMapCache():Array<PlayerRecord>{
        let curAuditGameuuid = cv.dataHandler.getUserData().auditGameuuid; //当前的举报ID
        let mHandMapCache = GameDataManager.tGameRecords.mHandMapCache;

        let kPlayerRecords: Array<PlayerRecord> = [];   
        let data = mHandMapCache.get(curAuditGameuuid);
        if(curAuditGameuuid.length <= 0 || data == null){
            return kPlayerRecords;
        }
        let tTotalRecord = data.game_record;
        let vRecords: any[] = !tTotalRecord.records ? [] : tTotalRecord.records;
        for (let i = 0; i < vRecords.length; ++i) {
            let tRecord: PlayerRecord = new PlayerRecord();
            tRecord.sPlayerName = cv.String(vRecords[i].player_name);
            tRecord.sPlayerHead = cv.String(vRecords[i].player_head);
            tRecord.plat = cv.Number(vRecords[i].plat);
            tRecord.nPlayerBettingRoundBet = cv.Number(vRecords[i].player_betting_round_bet);
            tRecord.nWinBet = cv.Number(vRecords[i].win_bet);
            tRecord.nInsuranceBet = cv.Number(vRecords[i].insurance_bet_amount);
            tRecord.nInsuranceAmount = cv.Number(vRecords[i].insurance_winbet);
            tRecord.nPlayerID = cv.Number(vRecords[i].playerid);
            tRecord.bMuck = Boolean(vRecords[i].is_muck);
            tRecord.bActiveShow = Boolean(vRecords[i].is_active_show);
            tRecord.bForceShowDown = Boolean(vRecords[i].is_force_show);
            kPlayerRecords.push(tRecord);
        }
        return kPlayerRecords;
    }
    
    updateView(dataSourceType: GameReviewDataType):void {

        this._eDataSourceType = dataSourceType;  //数据来源

        let length = 0;
        let kPlayerRecords: Array<PlayerRecord> = [];   

        switch (this._eDataSourceType) {
            case GameReviewDataType.EDST_NONE: 
            case GameReviewDataType.EDST_RECORD:
            case GameReviewDataType.EDST_GAMEROOM: {

                let _kPlayerRecords =  this.getPokerHandDataFromMapCache();  //为了防止牌局中http请求延时，获取牌局信息先从MapCache缓存中取
                if(_kPlayerRecords.length > 0){
                    length = _kPlayerRecords.length;
                    kPlayerRecords = _kPlayerRecords;
                }else{
                    length = GameDataManager.tGameRecords.tPokerHandData.vPlayerRecords.length;
                    kPlayerRecords = GameDataManager.tGameRecords.tPokerHandData.vPlayerRecords;
                }
                
            } break;

            case GameReviewDataType.EDST_COLLECTION: {
                length = GameDataManager.tCollectPokerMapData.tPokerHandData.vPlayerRecords.length;
                kPlayerRecords = GameDataManager.tCollectPokerMapData.tPokerHandData.vPlayerRecords;
            } break;
            default: 
                length = GameDataManager.tGameRecords.tPokerHandData.vPlayerRecords.length;
                kPlayerRecords = GameDataManager.tGameRecords.tPokerHandData.vPlayerRecords;
            break;
        }

        if(this.obItemList.length > 0){
            for(let i = 0; i < this.obItemList.length; i++){
                this.obItemList[i].removeFromParent(true);
                this.obItemList[i].destroy();
            }
        }

        this.obItemList = [];
        let  scale = 0.8;
        for(let i = 0; i < length; i++){
            let obItem = cc.instantiate(this.obItemPrefab);
            obItem.setPosition(cc.v2(i % 5 * obItem.getContentSize().width*scale+30, this.head_Img.node.getContentSize().height - (Math.floor(i/5) + 1) * obItem.getContentSize().height*scale-450));
            obItem.setScale(scale);
            obItem.getComponent(ObItem).setData(kPlayerRecords[i])
            this.head_Img.node.addChild(obItem);
            this.obItemList.push(obItem)
        }

        if(cv.dataHandler.getUserData().isfirst == 1){
            this.des_txt.node.active = false;
           // this.email_EditBox.node.y =
        }else{
            this.expense_txt.node.active = true;
            this.expense_money_txt.node.active = true;
            //this.des_txt.node.active = true;
        }
    }


    // 开始编辑文本输入框触发的事件回调
    private _onEdtDidBegan(edt: cc.EditBox): void {
        console.log("editing - did_began");
    }

    // 结束编辑文本输入框时触发的事件回调
    private _onEdtDidEnded(edt: cc.EditBox): void {
        console.log("editing - did_ended");
    }

    // 编辑文本输入框时触发的事件回调
    private _onEdtTxtChanged(edt: cc.EditBox): void {
        console.log("editing - txt_changed = ");
    }

    // 当用户按下回车按键时的事件回调(目前不支持 windows 平台)
    private _onEdtReturn(edt: cc.EditBox): void {
        console.log("editing - return");
    }

    // update (dt) {}
}
