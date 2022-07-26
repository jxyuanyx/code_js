// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { DlgEnum } from "../../../gamecore/enums/DlgEnum";
import { GameEvents } from "../../../gamecore/events/GameEvents";
import { SelfData } from "../../../gamecore/models/SelfData";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import { CONSTANTS } from "../../GameConfig";
import { getHead } from "../../gameHelper/AthHelper";
import { ComDlgData } from "../comdlg/ComDlg";

const {ccclass, property} = cc._decorator;

@ccclass
export class EditInfo extends BaseDlg {
    showMode=DlgEnum.R2L;

    @property(cc.EditBox)
    editbox_nick: cc.EditBox = null;

    private _headIndex;
    private _areaCode;

    @property(cc.EditBox)
    editbox_signature: cc.EditBox = null;

    UIBindData={
        head:null, // 头像
        country:"" //国籍
    }
    private _userinfo:SelfData;

    private _selfCountryInfo:any;
    private _countryIndex:number;

    afterShow(){
        this.updateData();
        let countryList=App.DataManager.getExtInfo(CONSTANTS.COUNTRY);
        for(let i=0;i<countryList.length;i++){
            if(countryList[i].area_code==this._userinfo.area_code){
                this._selfCountryInfo=countryList[i];
                this._countryIndex=i;
                break;
            }
        }
       this.UIBindData.country = (this._selfCountryInfo?.country_name || "Click to setting")+" >";

        cc.game.on(GameEvents.FLUSH_SELFDATA,this.updateData,this);
    }

    afterHide(){
        cc.game.off(GameEvents.FLUSH_SELFDATA,this.updateData,this);
        cc.error(cc.game.hasEventListener(GameEvents.FLUSH_SELFDATA));

    }

    updateData(){
        this._userinfo = App.DataManager.getSelfData();
        this.editbox_nick.string = this._userinfo.nick;
        this.editbox_signature.string = this._userinfo.signature;
        this._headIndex = this._userinfo.avatar;
        this._areaCode = this._userinfo.area_code;
        getHead(this._userinfo.avatar,this.UIBindData.head);
    }

    onHeadClick(){
        App.DlgManager.showDlg("editHead",(data:any)=>{
            this._headIndex = data;
            getHead(this._headIndex,this.UIBindData.head);
        },"mainpackage");
    }

    onEditNick(){
        if (this._userinfo.nick == this.editbox_nick.string)return;
        if (this.editbox_nick.string == "") {
            App.DlgManager.showDlg("toast",{title:"Tips",content:App.LangManager.getTxtByKey("namenulltip")});
            this.editbox_nick.string = this._userinfo.nick;
        }
        // App.HttpManager.post("profile/changenick",{uid:this._userinfo.Uid,nick:this.editbox_nick.string},"PUT",this.node,(data:any)=>{
        //     this._userinfo.Nick = this.editbox_nick.string;
        //     App.DataManager.setSelfData(this._userinfo);
        //     App.DlgManager.updateData("userInfo",null,"mainpackage");
        // },()=>{
        //     this.editbox_nick.string = this._userinfo.Nick;
        // });

    }

    onEditSignature(){
        // if (this._userinfo.Signature == this.editbox_signature.string)return;
        // App.HttpManager.post("profile/changesignature",{uid:this._userinfo.Uid,signature:this.editbox_signature.string},"PUT",this.node,(data:any)=>{
        //     App.DlgManager.showDlg("toast",{title:"提示",content:"更换签名成功"});
        //     this._userinfo.Signature = this.editbox_signature.string;
        //     App.DataManager.setSelfData(this._userinfo);
        //     App.DlgManager.updateData("userInfo",null,"mainpackage");
        // },()=>{
        //     this.editbox_signature.string = this._userinfo.Signature;
        // });
    }

    onCountryClick(){

        let countryList=App.DataManager.getExtInfo(CONSTANTS.COUNTRY);
        let list=countryList.concat();
        App.DlgManager.showDlg("comscrollviewbo",{
            cb:(data:any)=>{
                this._areaCode =data[0].area_code;
                this.UIBindData.country = data[0].country_name+ " >";
            },
            group:[{infoList:list,currentIndex:this._countryIndex}],
            top:this._selfCountryInfo?this._selfCountryInfo.country_name:""
        });
       
    }

    _checkModification(){
        let curnick = this.editbox_nick.string;
        let cursign = this.editbox_signature.string;
        let curCode = this._areaCode;
        let avatar = this._headIndex;
        
        if (curnick!=this._userinfo.nick || 
            cursign!=this._userinfo.signature ||
            avatar!=this._userinfo.avatar ||
            curCode != this._userinfo.area_code
        ) {
            let data:ComDlgData = new ComDlgData();
            data.title = "Congratulations";
            data.group = [{name:"Exit",isExit:true,cb:()=>{
                this.hide();
            }},{name:"Stay",isExit:true,cb:null}];
            data.txt = "Your edit has not been saved. Do you want to exit now?";
            App.DlgManager.showDlg("comdlg",data,"mainpackage");
            return false;
        }
        return true;
    }

    onCloseClick(){
        if(this._checkModification()){
            super.onCloseClick();
        }
    }

    async onSaveClick(){
        let curnick = this.editbox_nick.string;
        if (curnick == "") {
            App.DlgManager.showDlg("toast",{title:"Tips",content:App.LangManager.getTxtByKey("namenulltip")});
            return;
        }
        let cursign = this.editbox_signature.string;
        let curCode = this._areaCode;
        let avatar = this._headIndex;
        
        let info = {};
        if (curnick!=this._userinfo.nick) {
            info["nick"] = curnick;
        }
        if (cursign!=this._userinfo.signature) {
            info["signature"] = cursign;
        }
        
        if (avatar!=this._userinfo.avatar) {
            info["default_avatar"] = avatar;
        }
        if (curCode != this._userinfo.area_code) {
            info["area_code"] = curCode;
        }
        let data=await App.HttpManager.postAsync("user_api/modify_user_info",info);
        this._userinfo.signature = data.signature;
        this._userinfo.area_code = data.area_code;
        this._userinfo.avatar = data.avatar;
        this._userinfo.nick = data.nick;
        cc.game.emit(GameEvents.FLUSH_SELFDATA);
        App.DlgManager.showDlg("toast",{title:"Tips",content:"Modify Success"});
    }
}
