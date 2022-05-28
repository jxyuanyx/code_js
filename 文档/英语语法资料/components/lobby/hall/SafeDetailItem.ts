import { ScrollViewReuse } from "../../../common/tools/ScrollViewReuse";
import ws_proto = require("../../../../Script/common/pb/ws_protocol");
import pb_proto = ws_proto.pb;
import cv from "../cv"

const { ccclass, property } = cc._decorator;

@ccclass
export default class SafeDetailItem extends cc.Component {

    @property(cc.Label) time_txt = null;
    @property(cc.Label) type_txt = null;
    @property(cc.Label) amount_txt = null;
    @property(cc.Label) balance_txt = null;

    msg: pb_proto.StrongboxDetail = pb_proto.StrongboxDetail.create();

    updateSVReuseData(index: number, dataArray: Array<any>, view: ScrollViewReuse): void {
        if (dataArray.length <= 0 || dataArray.length - 1 < index) return;
        let data: pb_proto.StrongboxDetail = dataArray[index];
        //if (!(data instanceof pb_proto.StrongboxDetail)) return;

        this.msg = data;
        let timeStr = cv.StringTools.formatTime(this.msg.time, cv.Enum.eTimeType.Month_Day_Hour_Min);
        this.time_txt.getComponent(cc.Label).string = timeStr.replace("-","/");

        if (this.msg.type == 1)
        {
            //存入
            this.type_txt.getComponent(cc.Label).string = cv.config.getStringData("Safe_deposit");
        }
        else if (this.msg.type == 2)
        {
            //取出
            this.type_txt.getComponent(cc.Label).string = cv.config.getStringData("Safe_takeout");
        }
        else if (this.msg.type == 3)
        {
            //冻结
            this.type_txt.getComponent(cc.Label).string = cv.config.getStringData("Safe_frozen");
        }
        else if (this.msg.type == 4)
        {
            //解冻
            this.type_txt.getComponent(cc.Label).string = cv.config.getStringData("Safe_thaw");
        }

        this.amount_txt.getComponent(cc.Label).string = cv.StringTools.serverGoldToShowString(this.msg.amount);
        this.balance_txt.getComponent(cc.Label).string = cv.StringTools.serverGoldToShowString(this.msg.balance);
    }
}