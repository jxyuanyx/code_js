import ws_protocol = require("./../../../../Script/common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

import cv from "./../cv";

import { ClubSpread } from "../../club/ClubSpread";
import { ClubData } from "../../../../Script/data/club/ClubData";
import { ScrollViewReuse } from "../../../common/tools/ScrollViewReuse";

enum ReferralsViewType {
    VIEW_NULL = 0,
    VIEW_SUMMARY,
    VIEW_INCOME,
    VIEW_REFERRALS,
}

const { ccclass, property } = cc._decorator;
@ccclass
export default class ReferralsView extends cc.Component {

    @property(cc.Node) bg_image: cc.Node = null;
    @property(cc.Button) summary_button: cc.Button = null;
    @property(cc.Button) income_button: cc.Button = null;
    @property(cc.Button) referrals_button: cc.Button = null;
    @property(cc.Button) invite_friends_button: cc.Button = null;
    @property(cc.Button) Redeem_button: cc.Button = null;

    @property(cc.Prefab) prefab_clubSpread: cc.Prefab = null;
    @property(cc.Prefab) prefab_item: cc.Prefab = null;

    @property(cc.EditBox) searchTextField: cc.EditBox = null;

    @property(cc.Node) summary_panel: cc.Node = null;
    @property(cc.Node) income_panel: cc.Node = null;
    @property(cc.Node) referrals_panel: cc.Node = null;
    @property(cc.Node) data_panel: cc.Node = null;

    @property(cc.Node) nothing_sprite: cc.Node = null;
    @property(cc.Node) summary_des: cc.Node = null;
    @property(cc.Label) number_text: cc.Label = null;
    @property(cc.ScrollView) scrollView: cc.ScrollView = null;
    @property(cc.Node) image_line: cc.Node = null;


    _type: ReferralsViewType = ReferralsViewType.VIEW_SUMMARY;
    _incomeTextList: cc.Label[] = [];
    _summaryNumberList: cc.Label[] = [];
    _old_time: number = 0;
    _dataList: world_pb.ReferralsItem[] = [];
    _oldSearchStr: string = null;
    sv: ScrollViewReuse = null;

    _isLoad: boolean = false;
    _isUpTable: boolean = false;
    _isGetNewData: boolean = false;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        for (let i = 0; i < 3; i++) {
            this._incomeTextList[i] = this.income_panel.getChildByName("income_num_text_" + i).getComponent(cc.Label);
        }

        this.sv = this.scrollView.getComponent(ScrollViewReuse);
        this._isLoad = false;
        this.initEvent();
        this.initSummaryPanel();
        this.onChangeLanguage();
        this.nothing_sprite.active = true;
        this.image_line.active = false;
        this.data_panel.active = false;
        cv.MessageCenter.register("updateSummary", this.updateSummary.bind(this), this.node);
        cv.MessageCenter.register("updateReferrals", this.updateReferrals.bind(this), this.node);
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.onChangeLanguage.bind(this), this.node);
    }

    onDestroy() {
        cv.MessageCenter.unregister("updateSummary", this.node);
        cv.MessageCenter.unregister("updateReferrals", this.node);
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    start() {
        this.updateView();
        // let vClubList: ClubData[] = cv.clubDataMgr.getClubDataList();
        // if(vClubList.length <= 0){
        //     cv.worldNet.requestSnapshotList();
        // }
    }


    onChangeLanguage() {

        this.summary_button.node.getChildByName("text").getComponent(cc.Label).string = cv.config.getStringData("Referals_summary");
        this.income_button.node.getChildByName("text").getComponent(cc.Label).string = cv.config.getStringData("Referals_income");
        this.referrals_button.node.getChildByName("text").getComponent(cc.Label).string = cv.config.getStringData("Referals_referrals");

        let _data_0 = this.data_panel.getChildByName("data_0")
        _data_0.getChildByName("tatle_text").getComponent(cc.Label).string = cv.config.getStringData("Referals_income");
        _data_0.getChildByName("des_text").getComponent(cc.Label).string = cv.config.getStringData("Referals_last30day");

        let _data_1 = this.data_panel.getChildByName("data_1")
        _data_1.getChildByName("tatle_text").getComponent(cc.Label).string = cv.config.getStringData("Referals_totalIncome");

        let _data_2 = this.data_panel.getChildByName("data_2")
        _data_2.getChildByName("tatle_text").getComponent(cc.Label).string = cv.config.getStringData("Referals_referrals");
        _data_2.getChildByName("des_text").getComponent(cc.Label).string = cv.config.getStringData("Referals_last30day");

        let _data_3 = this.data_panel.getChildByName("data_3")
        _data_3.getChildByName("tatle_text").getComponent(cc.Label).string = cv.config.getStringData("Referals_totalReferrals");


        this.income_panel.getChildByName("title_text").getComponent(cc.Label).string = cv.config.getStringData("Referals_totalIncomeToDate");
        this.income_panel.getChildByName("income_text_0").getComponent(cc.Label).string = cv.config.getStringData("Referals_income30days");
        this.income_panel.getChildByName("income_text_1").getComponent(cc.Label).string = cv.config.getStringData("Referals_totalIncome");
        this.income_panel.getChildByName("income_text_2").getComponent(cc.Label).string = cv.config.getStringData("Referals_redeemable");
    }

    updateReferalsItemList() {
        if (this._isLoad == false) {
            this.sv.bindPrefab(this.prefab_item, "ReferralsItem", this._dataList);
            this.sv.generateItemPool();
            this.sv.bindScrollEventTarget(this);
            this._isLoad = true;
        }
        
        let h1 = this.sv.node.getContentSize().height;
        let y = this.sv.getScrollFixedPosition().y;
        this.sv.reloadView(this._dataList);
        let h2 = this.sv.node.getContentSize().height;
        if (this._isUpTable)
        {
            if (!this._isGetNewData)
            {
                y = y + h1 - h2;
            }
            this._isUpTable = false;
            this.sv.scrollToFixedPosition(cc.v2(0, y));
        }
    }

    initSummaryPanel() {
        for (let i = 0; i < 4; i++) {
            let panel = this.data_panel.getChildByName("data_" + i);
            this._summaryNumberList[i] = panel.getChildByName("number_text").getComponent(cc.Label);
        }
    }

    initEvent() {
        this.summary_button.node.on('click', function (event, customEventData) {
            this.setViewType(ReferralsViewType.VIEW_SUMMARY);
        }, this);

        this.income_button.node.on('click', function (event, customEventData) {
            this.setViewType(ReferralsViewType.VIEW_INCOME);
        }, this);

        this.referrals_button.node.on('click', function (event, customEventData) {
            this.setViewType(ReferralsViewType.VIEW_REFERRALS);
            this.searchTextField.string = "";
        }, this);

        this.invite_friends_button.node.on('click', function (event, customEventData) {
            this.showSpread();
        }, this);

        this.Redeem_button.node.on('click', function (event, customEventData) {
            if (cv.dataHandler.getUserData().summaryInfo.redeem_income > 0) {
                cv.worldNet.RequestGetInviteIncomeRedeem();
            }
        }, this);
    }

    showSpread() {
        let vClubList: ClubData[] = cv.clubDataMgr.getClubDataList();
        let bSearch = false;
        for (let i = 0; i < vClubList.length; ++i) {
            if (vClubList[i].club.club_id === cv.dataHandler.getUserData().firstClubId) {
                cv.clubDataMgr.setCurOpClubID(vClubList[i].club.club_id);
                bSearch = true;
                break;
            }
        }

        if (bSearch == false && vClubList.length > 0) {
            cv.clubDataMgr.setCurOpClubID(vClubList[0].club.club_id);
        }


        let scene: cc.Scene = cc.director.getScene();
        let inst: cc.Node = ClubSpread.getSinglePrefabInst(this.prefab_clubSpread);
        let clubSpread: ClubSpread = inst.getComponent(ClubSpread);
        clubSpread.autoShow(scene, this, true);
    }


    updateView() {
        let u64CurrTime = Math.floor((new Date()).getTime() / 1000);
        if (this._old_time == 0 || u64CurrTime - this._old_time > 10) {
            this._old_time = u64CurrTime;
            cv.dataHandler.getUserData().ReferralsPageNum = 0;
            cv.dataHandler.getUserData().ReferralsList = [];
            cv.worldNet.RequestReferrals(false);
            cv.worldNet.RequestGetInviteSummary();
        }

        this.setViewType(ReferralsViewType.VIEW_SUMMARY);
    }

    setViewType(type: ReferralsViewType) {
        this.setSelection(this.summary_button, type == ReferralsViewType.VIEW_SUMMARY);
        this.setSelection(this.income_button, type == ReferralsViewType.VIEW_INCOME);
        this.setSelection(this.referrals_button, type == ReferralsViewType.VIEW_REFERRALS);

        this.summary_panel.active = (type == ReferralsViewType.VIEW_SUMMARY);
        this.income_panel.active = (type == ReferralsViewType.VIEW_INCOME);
        this.referrals_panel.active = (type == ReferralsViewType.VIEW_REFERRALS);
        this.bg_image.active = (type == ReferralsViewType.VIEW_INCOME);

        if (this._type == type)
            return;

        switch (type) {
            case ReferralsViewType.VIEW_SUMMARY:
            case ReferralsViewType.VIEW_INCOME:
                this.updateSummary();
                break;

            case ReferralsViewType.VIEW_REFERRALS:
                this.updateReferrals();
                break;
        }
    }

    setSelection(btn: cc.Button, isSelect: boolean) {
        let selectimg = btn.node.getChildByName("selectimg");
        let text = btn.node.getChildByName("text");
        selectimg.active = isSelect;
        text.color = isSelect ? cc.color(254, 224, 154) : cc.Color.WHITE;
    }

    updateSummary() {
        let isShowData = cv.dataHandler.getUserData().summaryInfo.total_referrals > 0;
        this.nothing_sprite.active = !isShowData;
        this.data_panel.active = isShowData;
        this.image_line.active = !this.nothing_sprite.active;

        this._summaryNumberList[0].string = cv.StringTools.numToFloatString(cv.dataHandler.getUserData().summaryInfo.last_income);
        this._summaryNumberList[1].string = cv.StringTools.numToFloatString(cv.dataHandler.getUserData().summaryInfo.total_income);
        this._summaryNumberList[2].string = cv.StringTools.formatC("%u", cv.dataHandler.getUserData().summaryInfo.last_referrals);
        this._summaryNumberList[3].string = cv.StringTools.formatC("%u", cv.dataHandler.getUserData().summaryInfo.total_referrals);

        this._incomeTextList[0].string = cv.StringTools.numToFloatString(cv.dataHandler.getUserData().summaryInfo.last_income);
        this._incomeTextList[1].string = cv.StringTools.numToFloatString(cv.dataHandler.getUserData().summaryInfo.total_income);
        this._incomeTextList[2].string = cv.StringTools.numToFloatString(cv.dataHandler.getUserData().summaryInfo.redeem_income);
        this.summary_des.getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("Referals_earnIncome"), cv.dataHandler.getUserData().summaryInfo.invite_percent);

        this.Redeem_button.interactable = (cv.dataHandler.getUserData().summaryInfo.redeem_income > 0);
    }

    updateReferrals() {
        this._dataList = cv.dataHandler.getUserData().ReferralsList;
        this.number_text.string = cv.StringTools.formatC(cv.config.getStringData("Referals_refreshData"), cv.dataHandler.getUserData().ReferralsTotal, cv.dataHandler.getUserData().maxReferralsMember);
        this._oldSearchStr = "";
        this.updateReferalsItemList();
    }


    onSearchTextFieldChange(text, editbox, customEventData) {
        let _str = this.searchTextField.string;
        this.searchName(_str);
    }

    onSVEventScrollToBottom(arg: cc.ScrollView): void {
        this._isUpTable = true;
        this._isGetNewData = false;
        cv.worldNet.RequestReferrals(false);
    }

    //回彈最上面
    onSVEventBounceTop(arg: cc.ScrollView): void {
        this._isUpTable = true;
        this._isGetNewData = true;
        cv.worldNet.RequestReferrals(true);
    }

    searchName(str: string) {
        if (str == null || str == this._oldSearchStr)
            return;

        this._oldSearchStr = str;

        let tempList: world_pb.ReferralsItem[] = [];
        if (str.length <= 0) {
            cv.StringTools.deepCopy(this._dataList, tempList);
        } else {

            for (let i = 0; i < this._dataList.length; i++) {
                let item: world_pb.ReferralsItem = this._dataList[i];
                if (item.name.indexOf(str) != -1) {
                    tempList.push(item);
                }
            }
        }

        this.sv.reloadView(tempList);
    }


    // update (dt) {}
}
