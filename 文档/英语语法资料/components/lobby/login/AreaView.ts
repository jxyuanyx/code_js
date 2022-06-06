// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import cv from "./../cv";
import { ScrollViewReuse } from "./../../../common/tools/ScrollViewReuse";
import ListView from "../../../common/tools/ListView";
import { NoticeGameElectDealer } from "../../game/dzPoker/data/RoomData";
import AreaItem from "./AreaItem";
import { couldStartTrivia } from "typescript";
const { ccclass, property } = cc._decorator;

@ccclass
export default class AreaView extends cc.Component {
    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;
    @property(cc.Prefab)
    areaItem: cc.Prefab = null;
    @property(cc.Node)
    bg: cc.Node = null;
    @property(cc.Node)
    btnSure: cc.Node = null;
    _codeData: Array<any> = [];
    itemData: Array<any> = [];
    _searchContent: string = "";
    _AREA_COUNT: number = 234;
    getAreaCallback: Function = null;
    exitAreaCallback: Function = null;

    private _bakTouchItem:cc.Node = null;
    private _choiceCodeStr:string = "";  //当前选择国家的编码
    private _defaultTempCode:string = "";

    onLoad() {
        this.initText();
        this.initCodeData();
        cv.MessageCenter.register("AreaView_onBtnCodeItemClick", this.onBtnCodeItemClick.bind(this),this.node);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.onMsgChangeLanguage.bind(this), this.node);
        cv.config.adaptSize([this.scrollView.node, this.bg]);

        cv.resMgr.adaptWidget(this.node, true);
    }
    onDestroy(){
        cv.MessageCenter.unregister("AreaView_onBtnCodeItemClick", this.node);
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }
    start() {
        this.scrollView.getComponent(ListView).init(this.bindcallfunc.bind(this), this.getItemType.bind(this));
        this._choiceCodeStr = "";
        this.updatSpawnData(this._searchContent === "");
    }

     public bindcallfunc(node: cc.Node, info, i) {
        if (info.type == 0) {  

            let _showChoice:boolean = false;  //是否显示勾选
            let index = -1;

            if(this._choiceCodeStr.length > 0){  //如果有选择的
                index = info.data.indexOf(this._choiceCodeStr)
            }else{      
                //如果没有手动勾选的，采用默认选择地区
                let codeStr = this._defaultTempCode.replace("+","*");
                if(codeStr.length > 0){
                    index = info.data.indexOf(codeStr); //搜索默认该item是否是默认选择的国家
                }
            }
            _showChoice = (index == -1)?false:true;
            node.getComponent(AreaItem).updateSVReuseData(i, info.data, _showChoice);   
            if(_showChoice &&  node.getComponent(AreaItem).getCurChoiceNode()){
                //保存选择的node节点
                this.setCurChoiceNode(node);
            }
        }
    }

    public getItemType(data, index) {
        return data.type;
    }

    public setDefaultCode(code:string){
        this._defaultTempCode = code;
        this.setDefaultChoiceItem();
    }

    onMsgChangeLanguage(): void {
        this.initText();
        this.initCodeData();
        this.scrollView.getComponent(ListView).init(this.bindcallfunc.bind(this), this.getItemType.bind(this));
        this.updatSpawnData(this._searchContent === "");
    }

    onEnable(){
    }

    initText() {
        cv.action.setText(this.node, "Text_5", "Login_Scene_areaCode_panel_Text_5");
        cv.action.setText(this.node, "search_conuntry_text", "Login_Scene_areaCode_panel_search_conuntry_text", true);

        let txtBtnBack = this.node.getChildByName("areaCode_close_button").getChildByName("txt");
        txtBtnBack.active = (cv.config.getCurrentLanguage() != cv.Enum.LANGUAGE_TYPE.zh_CN);
        cv.action.setText(this.node, "areaCode_close_button/txt", "BackBtnTitle"); 
        cv.action.setText(this.node, "title", "AreaView_title1"); 
        cv.action.setText(this.node, "title2", "AreaView_title2"); 
        cv.action.setText(this.node, "btnSure/Label", "Confirm"); 
        
    }

    initCodeData() {
        this._codeData = [];
        for (var i = 0; i < this._AREA_COUNT; ++i) {
            var str = "areaCode" + i;
            this._codeData.push(cv.config.getStringData(str));
        }
    }

    updatSpawnData(result: boolean) {
        this.itemData = [];
        var data = this._codeData;
        var index = 0;
        for (var i = 0; i < data.length; ++i) {
            if ((data[i].toLowerCase()).indexOf(this._searchContent.toLowerCase()) != -1 || result) {
                this.itemData[index] = data[i];
                index++;
            }
        }
        
        let dataList = [];
        for (let index = 0; index < this.itemData.length; index++) {
            dataList.push({ type: 0, data: this.itemData[index]});
        }
        this.scrollView.getComponent(ListView).notifyDataSetChanged(dataList);
        this.scrollView.content.height +=  250;
    }

    onEditBoxSearchEnd() {
        this._searchContent = this.node.getChildByName("search_conuntry_text").getComponent(cc.EditBox).string;
        this._searchContent = this._searchContent.replace("+","*");
        this.updatSpawnData(this._searchContent === "");
    }

    private cleanSearch(){
        this._searchContent = "";
        this.node.getChildByName("search_conuntry_text").getComponent(cc.EditBox).string = this._searchContent;
        this._choiceCodeStr = "";
        let _curNode = this.getCurChoiceNode();
        if(_curNode){
            _curNode.getChildByName("choiceBg").active = false;
        }
        this.updatSpawnData(this._searchContent === "");
    }

    onBtnCleanCodeClick() {
        cv.AudioMgr.playButtonSound('button_click');
        this._searchContent = "";
        this.node.getChildByName("search_conuntry_text").getComponent(cc.EditBox).string = this._searchContent;
        this.updatSpawnData(this._searchContent === "");
    }

    onBtnCodeItemClick(msg: any) {
        this._choiceCodeStr = msg.choiceCodeStr;
        let choiceNode = msg.choiceNode

        let _curNode = this.getCurChoiceNode();
        if(_curNode != choiceNode){
            if(_curNode){
                _curNode.getChildByName("choiceBg").active = false;
            }
            this.setCurChoiceNode(choiceNode);
        }
    }

    //将默认选择的地区，设置为勾选
    setDefaultChoiceItem(){
        let content = this.scrollView.content;
        let codeStr = this._defaultTempCode.replace("+","*");
        for (let i = 0; i < content.childrenCount; ++i) {
            let node: cc.Node = content.children[i];
            if(cc.isValid(node)){
               let msgData =  node.getComponent(AreaItem).setCurChoiceShow(codeStr);
               if(msgData){ //当前勾选了
                    this.setCurChoiceNode(msgData.choiceNode);
                    this._choiceCodeStr = msgData.choiceCodeStr;
               }
            }
        }
     
    }

    //设置当前选择的国旗item节点
    setCurChoiceNode(node:cc.Node){
        this._bakTouchItem = node;
    }

    //获取当前选择的国旗item节点
    getCurChoiceNode(){
        return this._bakTouchItem;
    }

    onChoiceSure() {

        if(this._choiceCodeStr.length <= 0 || this.itemData.length <= 0){
            this.onBtnBackClick();
            return;
        }

        cv.AudioMgr.playButtonSound('button_click');
       
        this.node.active = false;
        let codeStr: string = this._choiceCodeStr;
        if(codeStr){
            let commaPos = codeStr.lastIndexOf(",");
            // let coutryName = codeStr.substring(0, commaPos);
            let AsteriskPos = codeStr.indexOf("*");
            
            let codeTemp = codeStr.substring(commaPos + 1, AsteriskPos) + '+' + codeStr.substring(AsteriskPos + 1, codeStr.length);
            if (this.getAreaCallback) {
                this.getAreaCallback(codeTemp);
            }
        }
     
        this.cleanSearch();
  
    }

    onBtnBackClick() {
        cv.AudioMgr.playButtonSound('button_click');
      
        this.node.active = false;
        if (this.exitAreaCallback) {
            this.exitAreaCallback();
        }
        this.cleanSearch();

    }

    setBg(isView: boolean) {
        this.bg.active = isView;
    }

    getAreaCode(code: string): string {
        let result = "";
        for (var i = 0; i < this._AREA_COUNT; ++i) {
            let tempCode: string = this._codeData[i];
            let pos = tempCode.lastIndexOf("*");
            let temp: string = tempCode.substring(pos+1);
            if (temp == code) {
                let pos2 = tempCode.lastIndexOf(",");
                result = tempCode.substring(pos2+1, pos) + "+" + code;
                break;
            }
        }
        return result;
    }
}
