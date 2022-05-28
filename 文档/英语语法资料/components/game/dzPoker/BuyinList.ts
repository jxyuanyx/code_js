/**
 * 房主功能带入明细 列表
 */
import game_protocol = require("./../../../../Script/common/pb/gs_protocol");
import game_pb = game_protocol.protocol;
import cv from "../../lobby/cv"
import ListView from "../../../common/tools/ListView";
import { BuyinListItem } from "./BuyinListItem";

const { ccclass, property } = cc._decorator;
@ccclass
export class BuyinList extends cc.Component {
    @property(cc.Node) _curentTime_panel: cc.Node = null;
    @property(cc.Label) _title_text: cc.Label = null;
    @property(cc.Label) _role_name_text: cc.Label = null;
    @property(cc.Sprite) _name_buyin_score_bg: cc.Sprite = null;

    @property(cc.Label) _lasttime_word_text: cc.Label = null;
    @property(cc.Label) _buyin_limit_text: cc.Label = null;
    @property(cc.Label) _buyin_text: cc.Label = null;
    @property(cc.ScrollView) data_scrollview: cc.ScrollView = null;

    @property(cc.Node) _data_panel: cc.Node = null;

    @property(cc.Label) _handcount_text: cc.Label = null;

    onLoad(): void {
        cv.StatusView.showLeftCircles(false);
        this._curentTime_panel = cc.find("curentTime_panel", this.node);
        this._data_panel = cc.find("data_panel", this.node);

        this._handcount_text = cc.find("curentTime_panel/handcount_text", this.node).getComponent(cc.Label);
        this._title_text = cc.find("curentTime_panel/title_text", this.node).getComponent(cc.Label);
        this._role_name_text = cc.find("curentTime_panel/roleName_txt", this.node).getComponent(cc.Label);
        this._name_buyin_score_bg = cc.find("curentTime_panel/name_buyin_score_bg", this.node).getComponent(cc.Sprite);
        this._buyin_limit_text = cc.find("curentTime_panel/buyinLimit_txt", this.node).getComponent(cc.Label);
        this._buyin_text = cc.find("curentTime_panel/buyin_txt", this.node).getComponent(cc.Label);
        

        if (cv.config.getCurrentLanguage() != cv.Enum.LANGUAGE_TYPE.zh_CN)
        {
            this._buyin_limit_text.node.setPosition(this._buyin_limit_text.node.getPosition().x + 40, this._buyin_limit_text.node.getPosition().y);
        }

        this._role_name_text.string = cv.config.getStringData("curentTime_curentTime_panel_roleName_txt");
        this._title_text.string = cv.config.getStringData("BuyinTitle");
        this._buyin_limit_text.string = cv.config.getStringData("BuyinLimitTitle");
        this._buyin_text.string = cv.config.getStringData("BuyinTotalTitle");
        this._handcount_text.string = cv.config.getStringData("curentTime_curentTime_panel_shouNum_text");

        this.addEvent();

        if (cv.native.isFullScreen()) {
            this._curentTime_panel.getComponent(cc.Widget).top = cv.config.FULLSCREEN_OFFSETY;
        }
        cv.resMgr.adaptWidget(this.node, true);
    }
    public outRegion() {
        this.node.active = false;
        cv.StatusView.showLeftCircles(true);
        cv.StatusView.showSystemTime(true);
    }
    public adaptiveExpand(): void {
        cv.viewAdaptive.adaptiveIPhoneX(this._curentTime_panel, true);
    }

    public addEvent() {
        cv.MessageCenter.register("update_buyinInfo", this.updateBuyinInfo.bind(this),this.node);
    }

    public updateBuyinInfo(data) {
        let dataList = [];
        for (let index = 0; index < data.length; index++) {
            dataList.push({type:0,data:data[index]});
        }
        this.data_scrollview.getComponent(ListView).init(this.bindcallfunc.bind(this), this.getItemType.bind(this));
        this.data_scrollview.getComponent(ListView).notifyDataSetChanged(dataList);
    }

    public bindcallfunc(node: cc.Node, info, i) {
        console.log(info);
        console.log(i);
        if (info.type == 0) {
            let item = node.getComponent(BuyinListItem);
            node.getComponent(BuyinListItem).setdata(info.data, this._buyin_limit_text.node.x, this._handcount_text.node.x);
        } 
    }


    /**
     * name
     */
    public getItemType(data, index) {
        return data.type;
    }
    public onDestroy() {
        cv.MessageCenter.unregister("update_buyinInfo",this.node);
    }
}