
import cv from "../../lobby/cv";

const { ccclass, property } = cc._decorator;

@ccclass
export class JackfruitSetting extends cc.Component {

    @property(cc.Node)
    nd_tabs: cc.Node = null;
    @property(cc.Node)
    nd_contents: cc.Node = null;

    //牌桌Tab
    @property(cc.Node)
    nd_title_card_styles: cc.Node = null;
    @property(cc.Node)
    nd_card_styles: cc.Node = null;
    @property(cc.Node)
    nd_title_table_bgs: cc.Node = null;
    @property(cc.Node)
    nd_table_bgs: cc.Node = null;

    //开关Tab
    @property(cc.Node)
    nd_switch_effect: any = null;
    @property(cc.Node)
    nd_switch_music: any = null;
    @property(cc.Node)
    nd_switch_vibrate: any = null;
    @property(cc.Node)
    nd_switch_barrage: any = null;
    @property(cc.Node)
    nd_switch_voice: any = null;

    onLoad() {
        this.nd_tabs.getChildByName("tab_table").getComponent(cc.Label).string = cv.config.getStringData("jackfruit_setting_tab_table");
        this.nd_tabs.getChildByName("tab_switch").getComponent(cc.Label).string = cv.config.getStringData("jackfruit_setting_tab_switch");

        this.nd_title_card_styles.getChildByName("title").getComponent(cc.Label).string = cv.config.getStringData("GameScene_changeCard_panel_changeCardTitle_txt");
        this.nd_title_table_bgs.getChildByName("title").getComponent(cc.Label).string = cv.config.getStringData("jackfruit_setting_0");

        this.nd_switch_effect.getChildByName("title").getComponent(cc.Label).string = cv.config.getStringData("jackfruit_setting_sound_effects_btn_label");
        this.nd_switch_music.getChildByName("title").getComponent(cc.Label).string = cv.config.getStringData("jackfruit_setting_music_btn_label");
        this.nd_switch_vibrate.getChildByName("title").getComponent(cc.Label).string = cv.config.getStringData("jackfruit_setting_vibrate_btn_label");
        this.nd_switch_barrage.getChildByName("title").getComponent(cc.Label).string = cv.config.getStringData("Faceview_danmu_button_danmu");
        cv.StringTools.setLabelString(this.nd_switch_voice, "title", "curentTime_curentTime_panel_voice_txt");

        this.onClickTab(null, String(0));

        this.onClickCardStyle(null, String(cv.tools.GetCardFaceJackfruit()));
        this.onClickTableBg(null, cv.tools.GetStringByCCFile("jackfruit_bg"));

        this.initSwitches();
    }

    show() {
        this.node.active = true;
        this.initSwitches();
    }

    onClose() {
        this.node.active = false;
    }

    //当tab被点击
    onClickTab(event: any, data: string) {
        let index = cv.Number(data);
        //游标
        for (let i = 0; i < this.nd_tabs.childrenCount; i++) {
            const node = this.nd_tabs.children[i];
            let isSelect = i == index;
            node.color = isSelect ? cc.color(251, 216, 136) : cc.color(138, 139, 144);
            cc.find("cursor", node).active = isSelect;
        }
        //内容
        for (let i = 0; i < this.nd_contents.childrenCount; i++) {
            const content = this.nd_contents.children[i];
            content.active = i == index;
        }
        if (event != null) cv.AudioMgr.playButtonSound('tab');
    }

    //当牌样式被点击
    onClickCardStyle(event: any, data: string) {
        let index = cv.Number(data);
        for (let i = 0; i < this.nd_card_styles.childrenCount; i++) {
            const style = this.nd_card_styles.children[i];
            style.getChildByName("select").active = i == index;
        }

        if (event != null) cv.AudioMgr.playButtonSound('tab');
        cv.tools.SetCardFaceJackfruit(index);
        cv.MessageCenter.send("change_cardface_jackfruit");
    }

    //当桌布被点击
    onClickTableBg(event: any, data: string) {
        let index = cv.Number(data);
        for (let i = 0; i < this.nd_table_bgs.childrenCount; i++) {
            const bg = this.nd_table_bgs.children[i];
            bg.getChildByName("select").active = i == index;
        }

        if (event != null) cv.AudioMgr.playButtonSound('tab');
        cv.tools.SaveStringByCCFile("jackfruit_bg", data);
        cv.MessageCenter.send("change_game_bg", index);
    }

    initSwitches() {
        this.nd_switch_effect._isSelect = cv.tools.isSoundEffectOpen();
        this.nd_switch_music._isSelect = cv.tools.isPlayMusic();
        this.nd_switch_vibrate._isSelect = cv.tools.isVibrate();
        this.nd_switch_barrage._isSelect = cv.tools.isShowBarrage();
        this.nd_switch_voice._isSelect = cv.tools.isPlayVoice();

        this.updateSwitch(this.nd_switch_effect);
        this.updateSwitch(this.nd_switch_music);
        this.updateSwitch(this.nd_switch_vibrate);
        this.updateSwitch(this.nd_switch_barrage);
        this.updateSwitch(this.nd_switch_voice);
    }

    updateSwitch(node: any) {
        let isSelect = node._isSelect;

        let child: cc.Node = node.getChildByName("switch");
        let path = `zh_CN/game/jackfruit/setting/${isSelect ? "img_switch_on" : "img_switch_off"}`;
        cv.resMgr.setSpriteFrame(child, path);

        let cursor: cc.Widget = child.getChildByName("cursor").getComponent(cc.Widget);
        let offset = cursor.left != 0 ? cursor.left : cursor.right;
        cursor.isAlignLeft = !isSelect;
        cursor.isAlignRight = isSelect;
        cursor.left = offset;
        cursor.right = offset;
        cursor.updateAlignment();
    }

    //当开关被点击
    onClickSwitch(event: any, data: string) {
        cv.AudioMgr.playButtonSound('button_click');
        let node = event.target.parent;
        node._isSelect = !node._isSelect;
        if (node == this.nd_switch_effect) { //音效
            cv.tools.setSoundEffect(node._isSelect);
        } else if (node == this.nd_switch_music) { //音乐
            cv.tools.SetPlayMusic(node._isSelect);
            cv.MessageCenter.send("updataBGM");
        } else if (node == this.nd_switch_vibrate) { //震动
            cv.tools.setVibrate(node._isSelect);
        } else if (node == this.nd_switch_barrage) { //弹幕
            cv.tools.setShowBarrage(node._isSelect);
            cv.MessageCenter.send("onClickDanmuSwitch");
        } else if (node == this.nd_switch_voice) { //语音
            cv.tools.setPlayVoice(node._isSelect);
        }
        this.updateSwitch(node);
    }
}
