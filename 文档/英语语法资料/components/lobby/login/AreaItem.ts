// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import { InferencePriority } from "typescript";
import cv from "./../cv"
const { ccclass, property } = cc._decorator;

@ccclass
export default class AreaItem extends cc.Component {
    _index: number = 0;
    _canTouch: boolean = true;
    private _curCodeStr:string = "";

    updateSVReuseData(index: number, info:any, bChoiceItem:boolean = false): void {
 
        this._index = index;
        let codeStr = info;
        this._curCodeStr = codeStr;
        var posname = codeStr.indexOf(",");
        let country_text = this.node.getChildByName("country_text");
        let areaCode_text = this.node.getChildByName("areaCode_text");
        let areaFlag = this.node.getChildByName("areaFlag");
     
        this.node.getChildByName("choiceBg").active = bChoiceItem;
        
        //country_text.getComponent(cc.Label).string = codeStr.substring(0, pos);
        var pos = codeStr.indexOf("*");
        let str = codeStr.substring(pos + 1, codeStr.length);
        areaCode_text.getComponent(cc.Label).string = '+' + str;
        let arr = ["852", "63", "886", "375", "7", "30", "31", "32", "33", "34", "350", "351", "352", "353", "354", "355", "356", "357", "358", 
        "359", "36", "37", "370", "371", "372", "373", "374", "376", "377", "378", "379", "38", "380", "381", "382", "383", "384", "385", "386",
        "387", "388", "389", "39", "40", "41", "42", "420", "421", "422", "423", "424", "425", "426", "427", "428", "429", "43", "44", "45", "46",
        "47", "48", "49", "1", "61", "672", "853"];

        let _coutry_str:string = null;

        if (arr.indexOf(str) != -1) {
            if (str == "852" || str == "63" || str == "886") {
                _coutry_str = codeStr.substring(0, posname);
            }
            else
            {
                let zi = cv.config.getStringData("areaCode91");
                let pos1 = zi.lastIndexOf("(");
                let pos2 = zi.lastIndexOf(")");
                let left = zi.substring(pos1 + 1, pos2);
                _coutry_str = codeStr.substring(0, posname) + "(" + left  +  ")";
            }

            country_text.color = cc.Color.GRAY;
            areaCode_text.color = cc.Color.GRAY;
            this._canTouch = false;
        }
        else {
            _coutry_str = codeStr.substring(0, posname);
            country_text.color = cc.Color.WHITE;
            areaCode_text.color = cc.Color.GRAY;
            this._canTouch = true;
        }

        let len = cv.resMgr.getLabelStringSize(country_text.getComponent(cc.Label), _coutry_str).width;
        areaCode_text.x = country_text.x + len + 5;
        var pos = codeStr.indexOf(",");
        let _str = codeStr.substring(pos + 1, codeStr.length);
        cv.resMgr.setSpriteFrame(areaFlag, "zh_CN/hall/areaFlag/" +  _str.replace("*", "+"));
    }

    onBtnItemClick() {
        if (!this._canTouch) return;

        cv.AudioMgr.playButtonSound('button_click');
        let choiceBg = this.node.getChildByName("choiceBg");
        choiceBg.active = true;

        let msg = {
            choiceCodeStr: this._curCodeStr,  //选择的国家区码
            choiceNode: this.node, //选择的国家节点
        }
        cv.MessageCenter.send("AreaView_onBtnCodeItemClick", msg);
    }


    setCurChoiceShow(defaultCode:string){
        let choiceBg = this.node.getChildByName("choiceBg");
        choiceBg.active = false;

        let msg = {
            choiceCodeStr: this._curCodeStr, //选择的国家区码
            choiceNode: this.node,  //选择的国家节点
        }

        if(-1 != this._curCodeStr.indexOf(defaultCode)){
            choiceBg.active = true;
            return msg;
        } 

        return null;
    }

    getCurChoiceNode(){
        if(this.node.getChildByName("choiceBg").active){
            return this.node;
        }
        return null;
    }
}
