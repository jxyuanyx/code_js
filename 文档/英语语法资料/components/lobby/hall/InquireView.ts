// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { ScrollViewReuse } from "../../../common/tools/ScrollViewReuse";
import cv from "../cv";
import { pb } from "../../../../Script/common/pb/ws_protocol";
import { HashMap } from "../../../common/tools/HashMap";

const { ccclass, property } = cc._decorator;

@ccclass
export default class InquireView extends cc.Component {

    @property(cc.Node) btn_arr: cc.Node[] = [];

    @property(cc.ScrollView) scrollView: cc.ScrollView = null;
    @property(cc.Prefab) item_prefab: cc.Prefab = null;
    @property(cc.Label) lab_arr: cc.Label[] = [];
    @property(cc.Node) noList_icon: cc.Node = null;
    @property(cc.Node) bottom_node: cc.Node = null;

    color_lab_select: cc.Color = cc.color(229, 209, 146);
    color_lab_noSelect: cc.Color = cc.color(153, 153, 153);
    list_arr: HashMap<pb.BankDetailsType, pb.BankDetailsSnapshot[]> = new HashMap();
    pre_pull: HashMap<pb.BankDetailsType, pb.BankDetailsQueryResponse> = new HashMap();
    no_pre_pull: HashMap<pb.BankDetailsType, pb.BankDetailsQueryResponse> = new HashMap();

    select_index: number = 0;
    isView: boolean = false;//用于列表刷新

    onLoad() {
        cv.resMgr.adaptWidget(this.node, true);
    }
    start() {
        this.registerMsg();
        cv.resMgr.adaptWidget(this.scrollView.node, true);

        let sv: ScrollViewReuse = this.scrollView.getComponent(ScrollViewReuse);
        sv.bindPrefab(this.item_prefab, "InquireItem", []);
        sv.generateItemPool();

        sv.bindScrollEventTarget(this);

        this.noList_icon.active = false;
        this.initLanguage();
        this.setBtnState(0);
        this.BankDetailsQueryRequest(pb.BankDetailsType.Gold, false);

        let len = this.btn_arr.length;
        for (let i = 0; i < len; i++) {
            this.btn_arr[i].on("click", () => {
                cv.AudioMgr.playButtonSound('button_click');
                this.select_index = i;
                this.setNolistIcon();
                this.setBtnState(i);
                this.show(i);
            }, this);
        }

        cc.find("btn_back", this.node).on("click", () => {
            cv.AudioMgr.playButtonSound('back_button');
            cv.action.showAction(this.node
                , cv.action.eMoveActionDir.EMAD_TO_RIGHT
                , cv.action.eMoveActionType.EMAT_FADE_OUT
                , cv.action.delay_type.NORMAL
                , (target: cc.Node, actIO: number): void => { }
                , (target: cc.Node, actIO: number): void => {
                    // 恢复显示"邮件"图标
                    cv.MessageCenter.send("show_mail_entrance", true);
                });
        }, this);
    }

    registerMsg() {
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
        cv.MessageCenter.register("InquireView_QueryResponse", this.BankDetailsQueryResponse.bind(this), this.node);
    }

    onDestroy() {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
        cv.MessageCenter.unregister("InquireView_QueryResponse", this.node);
    }

    initLanguage() {
        let len = this.lab_arr.length;
        for (let i = 0; i < len - 1; i++) {
            this.lab_arr[i].string = cv.config.getStringData("InquireView_lab_" + i);
        }
        this.setNolistIcon();
    }

    setNolistIcon() {
        let len = this.lab_arr.length;
        let index = len - 1;
        let temp_select = this.select_index + 1;
        let str = cv.config.getStringData("InquireView_lab_" + temp_select);
        str = this.select_index == 3 ? "USDT" : str;
        this.lab_arr[index].string = cv.StringTools.formatC(cv.config.getStringData("InquireView_lab_" + index), str);
    }

    onSVEventScrollToBottom(arg: cc.ScrollView): void {
        this.BankDetailsQueryRequest(this.select_index, true);
    }

    onSVEventScrollToTop(arg: cc.ScrollView): void {
        this.BankDetailsQueryRequest(this.select_index, false);
    }

    setBtnState(index: number) {
        let len = this.btn_arr.length;
        for (let i = 0; i < len; i++) {
            let btn = this.btn_arr[i];
            if (i == index) {
                btn.getChildByName("Label").color = this.color_lab_select;
                btn.getChildByName("Background").active = true;
            }
            else {
                btn.getChildByName("Label").color = this.color_lab_noSelect;
                btn.getChildByName("Background").active = false;
            }
        }
    }

    show(index: number) {
        this.isView = false;
        let msg = this.list_arr.get(index);
        if (!msg) {
            this.BankDetailsQueryRequest(index, false);
        }
        else {
            let sv: ScrollViewReuse = this.scrollView.getComponent("ScrollViewReuse");
            sv.reloadView(msg);
            this.isView = msg.length > 0;
            this.noList_icon.active = !this.isView;
            this.bottom_node.active = this.isView;
            if (msg.length <= 0) {
                this.BankDetailsQueryRequest(index, false);
            }
        }
    }

    BankDetailsQueryRequest(type: pb.BankDetailsType, is_prev_pull: boolean) {
        let hash = is_prev_pull ? this.pre_pull : this.no_pre_pull;
        let pull_count = 20;
        let msg = hash.get(type);
        let data = null;
        if (!msg) {
            data = {
                detail_type: type,
                is_prev_pull: is_prev_pull,
                pull_count: pull_count,
                pull_pos: 0,
                begin_time: 0,
                end_time: 0,
                table_suffix_time: 0
            }
        }
        else {
            data = {
                detail_type: type,
                is_prev_pull: is_prev_pull,
                pull_count: pull_count,
                pull_pos: is_prev_pull ? msg.first_inc_id : msg.last_inc_id,
                begin_time: msg.begin_time,
                end_time: msg.end_time,
                table_suffix_time: msg.table_suffix_time
            }
        }
        
        cv.worldNet.BankDetailsQueryRequest(data);
    }

    BankDetailsQueryResponse(data: pb.BankDetailsQueryResponse) {
        let len = cv.StringTools.getArrayLength(data.snapshots);
        if (len > 0) {
            let hash = data.is_prev_pull ? this.pre_pull : this.no_pre_pull;
            let msg = pb.BankDetailsQueryResponse.create(data);
            hash.add(data.detail_type, msg);
            if (data.is_prev_pull) {
                let item = this.no_pre_pull.get(data.detail_type);
                if (!item) {
                    item = pb.BankDetailsQueryResponse.create(data);
                    item.is_prev_pull = false;
                    this.no_pre_pull.add(data.detail_type, item);
                }
            }
            else {
                let item = this.pre_pull.get(data.detail_type);
                if (!item) {
                    item = pb.BankDetailsQueryResponse.create(data);
                    item.is_prev_pull = true;
                    this.pre_pull.add(data.detail_type, item);
                }
            }
            let sno = this.list_arr.get(data.detail_type);
            if (!sno) {
                sno = [];
            }
            let is_prev_pull = data.is_prev_pull;
            if (is_prev_pull) {
                for (let i = len - 1; i >= 0; i--) {
                    sno.unshift(pb.BankDetailsSnapshot.create(data.snapshots[i]));
                }
            }
            else {
                for (let i = 0; i < len; i++) {
                    sno.push(pb.BankDetailsSnapshot.create(data.snapshots[i]));
                }
            }
            this.list_arr.add(data.detail_type, sno);
        }
        let arr = this.list_arr.get(data.detail_type);
        if (!arr) {
            arr = [];
        }
        let sv: ScrollViewReuse = this.scrollView.getComponent("ScrollViewReuse");
        sv.reloadView(arr, !this.isView);

        let result = cv.StringTools.getArrayLength(arr) <= 0;
        this.isView = !result;
        this.noList_icon.active = result;
        this.bottom_node.active = !result;
    }
}
