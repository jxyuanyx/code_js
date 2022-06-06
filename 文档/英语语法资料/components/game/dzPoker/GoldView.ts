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
const { ccclass, property } = cc._decorator;

@ccclass
export class GoldView extends cc.Component {

    @property(cc.Node) gold_text: cc.Node = null;
    @property(cc.Node) gold_icon: cc.Node = null;
    @property(cc.Node) gold_icon_en: cc.Node = null;
    @property(cc.Node) gold_add_image: cc.Node = null;
    @property(cc.Node) gold_add_image_en: cc.Node = null;

    onLoad() {
        cv.MessageCenter.register("update_info", this.UpdateUserInfo.bind(this),this.node);
        cv.MessageCenter.register("update_gold", this.UpdateUserInfo.bind(this),this.node);

        if(cv.config.isOverSeas()){  //海外版
            this.gold_icon.active = false;
            this.gold_add_image.active = false;
            this.gold_icon_en.active = true;
            this.gold_add_image_en.active = true;
        }

        this.UpdateUserInfo();
    }

    onDestroy() {
        cv.MessageCenter.unregister("update_info", this.node);
        cv.MessageCenter.unregister("update_gold", this.node);
    }
    
    setGoldNumber(num: number) {
        this.gold_text.getComponent(cc.Label).string = cv.StringTools.numToFloatString(num);
    }

    UpdateUserInfo() {
        this.setGoldNumber(cv.dataHandler.getUserData().total_amount);
    }

    onBtnAddClick(event: cc.Event) {
        cv.AudioMgr.playButtonSound('button_click');
        let noticeView = this.node.parent.getChildByName("noticeView");
        if (!cc.sys.isBrowser && cc.sys.os == cc.sys.OS_IOS) {
            if (noticeView && noticeView.active) {
                noticeView.active = false;
                cv.SHOP.setExitCallFunc(() => {
                    noticeView.active = true;
                });
            }
            else {
                cv.SHOP.setExitCallFunc(() => {
                });
            }
        }
        cv.SHOP.RechargeClick();
    }
}
