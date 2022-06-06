import cv from "../../lobby/cv";
import { ScrollViewReuse } from "../../../common/tools/ScrollViewReuse";
import ListView from "../../../common/tools/ListView";
import MyRedpacketItem from "./MyRedpacketItem";
import game_protocol = require("./../../../../Script/common/pb/gs_protocol");
import game_pb = game_protocol.protocol;

const {ccclass, property} = cc._decorator;

@ccclass
export default class StarRedpacketView extends cc.Component {
    @property(cc.Node) redpacket_panel: cc.Node = null;
    @property(cc.Node) my_panel: cc.Node = null;

    @property(cc.Label) redpacket_title: cc.Label = null;
    @property(cc.Label) redpacket_des: cc.Label = null;
    @property(cc.Label) time_title: cc.Label = null;
    @property(cc.Label) time_nums: cc.Label[] = [];
    @property(cc.Label) reward_title: cc.Label = null;
    @property(cc.Label) reward_num: cc.Label = null;
    @property(cc.Label) reward_num_des: cc.Label = null;
    @property(cc.Label) record_title: cc.Label = null;
    @property(cc.ScrollView) record_scrollView: cc.ScrollView = null;
    @property(cc.Label) my_redpacket_btn_label: cc.Label = null;
    @property(cc.Label) red_empty_label: cc.Label = null;

    @property(cc.Label) my_title: cc.Label = null;
    @property(cc.ScrollView) my_scrollView: cc.ScrollView = null;
    @property(cc.Label) my_empty_label: cc.Label = null;
    
    @property(cc.Prefab) MyRedpacketItem: cc.Prefab = null;
    @property(cc.Prefab) RecordItem: cc.Prefab = null;

    private _time = 0;
    private _list = []
    onLoad ()
    {
        this._initLanguage();
    }

    start ()
    {
        this._initRecordScrollView();
        this._initMyScrollView();
        cv.MessageCenter.register("update_star_seat_draw_list", this.onUpdateStarSeatDrawList.bind(this), this.node);
        cv.MessageCenter.register("update_self_star_seat_result_list", this.onUpdateSelfStarSeatDrawList.bind(this), this.node);
        cc.game.on(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
        cc.game.on(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
    }

    onDestroy()
    {
        cc.director.getScheduler().unschedule(this.updataTime, this);
        cv.MessageCenter.unregister("update_star_seat_draw_list", this.node);
        cv.MessageCenter.unregister("update_self_star_seat_result_list", this.node);
        cc.game.off(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
        cc.game.off(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
    }
    
    public updataTime(time: number) {
        if (this._time > 0) {
            let h = Math.floor(this._time / 3600);
            let m = Math.floor(this._time % 3600 / 60);
            let s = Math.floor(this._time % 60);
            let list = [];
            list.push(Math.floor(h / 10));
            list.push(Math.floor(h % 10));
            list.push(Math.floor(m / 10));
            list.push(Math.floor(m % 10));
            list.push(Math.floor(s / 10));
            list.push(Math.floor(s % 10));
            for (let i = 0; i < this.time_nums.length; i++) {
                this.time_nums[i].string = list[i];
            }
            this._time -= 1;
        }
        else {
            cc.director.getScheduler().unschedule(this.updataTime, this);
            for (let i = 0; i < this.time_nums.length; i++) {
                this.time_nums[i].string = "-";
            }
            this.reward_num.string = "--";
            this.reward_num_des.string = "";
        }
    }
    
    private _initLanguage()
    {
        this.time_title.string = cv.config.getStringData("StarRedpacketView_time_title");
        this.reward_title.string = cv.config.getStringData("StarRedpacketView_reward_title");
        this.red_empty_label.string = cv.config.getStringData("StarRedpacketView_red_empty_label");
        this.my_empty_label.string = cv.config.getStringData("StarRedpacketView_my_empty_label");
        this.record_title.string = cv.config.getStringData("StarRedpacketView_record_title");
        this.my_title.string = cv.config.getStringData("MyRedPackets_btn_my");
        this.my_redpacket_btn_label.string = cv.config.getStringData("MyRedPackets_btn_my");
    }

    private _initRecordScrollView()
    {
        let sv: ScrollViewReuse = this.record_scrollView.getComponent(ScrollViewReuse);
        sv.bindPrefab(this.RecordItem, "RecordItem", []);
        sv.generateItemPool();
        sv.bindScrollEventTarget(this);
    }

    private _initMyScrollView()
    {
        let sv: ListView = this.my_scrollView.getComponent(ListView);
        sv.bindScrollEventTarget(this);
        sv.init(this.bindcallfunc.bind(this), this.getItemType.bind(this));
    }

    bindcallfunc(node: cc.Node, info, i)
    {
        node.getComponent(MyRedpacketItem).updateItemData(info.data);
    }

    getItemType(data, index)
    {
        return data.type;
    }

    updateView()
    {
        cv.gameNet.requestGetLuckStarSeatDrawList();
        cv.gameNet.requestGetSelfLuckStarSeatResultList();
        if(cv.StringTools.getArrayLength(cv.GameDataManager.tRoomData.starRedpacketInfo.title) == 0) {
            this.redpacket_title.string = cv.config.getStringData("StarRedpacketView_title");
        } else {
            this.redpacket_title.string = cv.GameDataManager.tRoomData.starRedpacketInfo.title;
        }
        this.redpacket_des.string = cv.GameDataManager.tRoomData.starRedpacketInfo.desc;
        let newTime = Math.floor((new Date()).getTime() / 1000);
        this._time = cv.GameDataManager.tRoomData.starRedpacketInfo.left_time - newTime;
        this.updataTime(0);
        if(this._time > 0)
        {
            cc.director.getScheduler().unschedule(this.updataTime, this);
            cc.director.getScheduler().schedule(this.updataTime, this, 1);
            this.reward_num.string = cv.StringTools.serverGoldToShowString(cv.GameDataManager.tRoomData.starRedpacketInfo.total_luck_amount);
            this.reward_num_des.string = cv.config.getStringData("unit");
        }
    }

    showView()
    {
        this.showRedPacket();
        this.node.active = true;
        this.updateView();
    }

    isShowView():boolean
    {
        return this.node.active;
    }

    hideView()
    {
        this.node.active = false;
        cc.director.getScheduler().unschedule(this.updataTime, this);
    }

    onBtnClose()
    {
        cv.AudioMgr.playButtonSound('back_button');
        this.hideView();
    }

    onBtnMyRedpacket()
    {
        cv.AudioMgr.playButtonSound('button_click');
        this.redpacket_panel.active = false;
        this.my_panel.active = true;
        this.my_scrollView.scrollToTop(0.01);
    }

    onBtnBack()
    {
        cv.AudioMgr.playButtonSound('button_click');
        this.showRedPacket();
    }

    showRedPacket()
    {
        this.redpacket_panel.active = true;
        this.my_panel.active = false;
    }

    onUpdateStarSeatDrawList(msg)
    {
        if(msg.page === 1) {
            this._list = [];
        }
        for (let i = 0; i < msg.draw_result_list.length; i++) {
            this._list.push(msg.draw_result_list[i]);
        }
        if(msg.total == this._list.length)
        {
            let sv: ScrollViewReuse = this.record_scrollView.getComponent(ScrollViewReuse);
            sv.reloadView(this._list);
            this.red_empty_label.node.active = this._list.length == 0;
        }
    }

    onUpdateSelfStarSeatDrawList(list:game_pb.LuckSelfStarSeatResultItem[])
    {
        let dataList0 = [];
        let dataList1 = [];
        for (let i = 0; i < list.length; i++) {
            if(list[i].state == 0) {
                dataList0.push({ type: dataList0.length == 0 ? 0 : 1, data: list[i] });
            } else {
                dataList1.push({ type: dataList1.length == 0 ? 0 : 1, data: list[i] });
            }
        }
        let ls = this.my_scrollView.getComponent(ListView);
        let dataList = dataList0.concat(dataList1);
        ls.notifyDataSetChanged(dataList);
        this.my_empty_label.node.active = dataList.length == 0;
    }

    OnAppEnterBackground(): void {

    }

    OnAppEnterForeground(): void {
        this.updateView();
    }
}
