// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import cv from "../../lobby/cv";
import {GoldViewNew} from "./GoldViewNew";

const { ccclass, property } = cc._decorator;

@ccclass
export class GoldViewNewHall extends GoldViewNew {
    protected viewStyle: number = 1;

    setViewStyle(style: number) {
        if ((style != 1 && style != 2) || style == this.viewStyle) {
            return;
        }
        this.viewStyle = style;
        cc.find("style_1", this.node).active = style == 1? true : false;
        cc.find("style_2", this.node).active = style == 2? true : false;
        let curStyleNode: cc.Node = style == 1? cc.find("style_1", this.node) : cc.find("style_2", this.node);
        this.gold_text = cc.find("gold_text", curStyleNode);
        this.usdt_text = cc.find("usdt_text", curStyleNode);
        this.UpdateUserInfo();
    }

    getGoldIcon(): cc.Node
    {
        let style_1 = cc.find("style_1", this.node);
        let style_2 = cc.find("style_2", this.node);
        if(style_2.active == true) {
            return cc.find("gold_icon", style_2);
        } else {
            return cc.find("gold_icon", style_1);
        }
    }

    getUstdIcon(): cc.Node
    {
        let style_1 = cc.find("style_1", this.node);
        let style_2 = cc.find("style_2", this.node);
        if(style_2.active == true) {
            return cc.find("usdt_cion", style_2);
        } else {
            return cc.find("usdt_cion", style_1);
        }
    }
}
