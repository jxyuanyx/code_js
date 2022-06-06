// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import cv from "../../lobby/cv";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    @property(cc.Label) cancel_button_label: cc.Label = null;
    @property(cc.Label) sure_button_label: cc.Label = null;
    private _des_list: cc.Label[] = [];                                        // 自己手牌

    onLoad () {
        this.cancel_button_label.string = cv.config.getStringData("GameScene_sitDownLimit_panel_view_panel_cancel_button");
        this.sure_button_label.string = cv.config.getStringData("GameScene_sitDownLimit_panel_view_panel_sure_button");
        let bg = this.node.getChildByName("Image_bg");
        for (let index = 0; index < 4; index++) {
            this._des_list[index] = bg.getChildByName(cv.StringTools.formatC("des_%d", index)).getComponent(cc.Label);
        }
        this._des_list[0].string = cv.config.getStringData("GameScene_sitDownLimit_panel_view_panel_des_1");
        this._des_list[2].string = cv.config.getStringData("GameScene_sitDownLimit_panel_view_panel_des_3");
        this.cancel_button_label.fontSize = cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN ? 44 : 38;
    }

    public onSitDownLimitSure() {
        cv.AudioMgr.playButtonSound('button_click');
        this.node.active = false;
        cv.gameNet.RequestGetRoomLimitID();
    }

    public onSitDownLimitCancel() {
        cv.AudioMgr.playButtonSound('button_click');
        this.node.active = false;
    }

    public onShow(str: string, isError: boolean){
        this.node.active = true;
        for (let index = 0; index < 4; index++) {
            this._des_list[index].node.active = index < 3 ? !isError : isError;
        }
        this._des_list[isError ? 3 : 1].string = str;
    }
}
