
import cv from "../../lobby/cv";

const {ccclass, property} = cc._decorator;

@ccclass
export class JackfruitCardScore extends cc.Component {

    @property(cc.Node) title_text: cc.Node = null;
    @property(cc.Node) rule_img: cc.Node = null;


    onLoad () {
        cv.resMgr.setSpriteFrame(this.title_text, cv.config.getLanguagePath("game/jackfruit/gamerule/card_score_title"));
        cv.resMgr.setSpriteFrame(this.rule_img, cv.config.getLanguagePath("game/jackfruit/gamerule/card_score"));
        
        if (cv.config.IS_IPHONEX_SCREEN) {
            cc.find("view_panel",this.node).getComponent(cc.Widget).top = cv.config.FULLSCREEN_OFFSETY;
            cc.find("title_panel",this.node).getComponent(cc.Widget).top = cv.config.FULLSCREEN_OFFSETY;
        }
    }

    onBtnClose(event, str:string)
    {
        if(str == "btn")
        {
            cv.AudioMgr.playButtonSound('close');
        }
        this.node.active = false;
		// cv.StatusView.show(true);
    }
    
    show(){
        this.node.active = true;
    }
    // update (dt) {}
}
