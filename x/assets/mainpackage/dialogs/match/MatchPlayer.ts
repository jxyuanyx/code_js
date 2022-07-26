// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { getHead } from "../../gameHelper/AthHelper";
import { core} from "../../../gamecore/net/protos/proto";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MatchPlayer extends cc.Component {

    @property(cc.Sprite)
    head: cc.Sprite = null;

    @property(cc.Label)
    userName:cc.Label=null;
    
    @property(cc.Sprite)
    flag:cc.Sprite=null;

    setData(data:core.IMatchPlayerData){
        // this.userName.string=data.Nick;
        this.userName.string=data.nick.length > 12?data.nick.substr(0,12)+"...":data.nick;
        this.flag.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/country").getSpriteFrame(data.area_code);
        getHead(data.avatar,this.head);
    }

}
