// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../../gamecore/App";
import { BaseComponent } from "../../../../gamecore/ui/baseview/imp/BaseComponent";


const {ccclass, property} = cc._decorator;

export const EVENT_MORECLICK="more_click";

@ccclass
export class MatchListTitleItem extends BaseComponent {

    @property(cc.Node)
    btnNode:cc.Node=null;

    // @property(cc.Sprite)
    // icon:cc.Sprite=null;

    // @property([cc.SpriteFrame])
    // iconFrames:cc.SpriteFrame[]=[];

    UIBindData={
        title:""
    }

    private _type:number=0;

    setData(type:number,title:string){
        this._type=type;
        let gameData=App.DataManager.getGameData();
        this.UIBindData.title=App.LangManager.getTxtByKey("machList_types")[this._type];
    }

    onMorebtnClick(){
        cc.game.emit(EVENT_MORECLICK,this._type);
    }

    setFold(val,anim:boolean=false){
        if(anim){
            let scaley=(this.btnNode.scaleY>0)?-1:1;
            this.btnNode.runAction(cc.scaleTo(0.2,1,scaley));
        }else{
            this.btnNode.scaleY=val?-1:1;
        }
    }

    get type():number{
        return this._type;
    }
}
