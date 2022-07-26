// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEnum } from "../../../gamecore/enums/NetEnum";
import { LoginType, TokenAccountData } from "../../../gamecore/models/AccountData";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game107Reconnect extends BaseDlg {


    onOkClick(){
        this.hide();
        let token=cc.sys.localStorage.getItem("token")
        if(token){
            let account=new TokenAccountData();
            account.Type=LoginType.TOKEN;
            account.token=token;
            cc.game.emit(NetEnum.REQ_CONTECT,account);
        }
    }

}
