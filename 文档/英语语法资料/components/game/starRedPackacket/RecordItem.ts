import cv from "../../lobby/cv";
const {ccclass, property} = cc._decorator;

@ccclass
export default class RecordItem extends cc.Component {
    @property(cc.Label) name_label: cc.Label = null;
    @property(cc.Label) num_label: cc.Label = null;
    @property(cc.Label) time_label: cc.Label = null;


    updateSVReuseData(index: number, dataArray: Array<any>): void {
        if (dataArray.length <= 0 || dataArray.length - 1 < index) return;
        let data = dataArray[index];
        let color = data.is_high_light ? cc.color(239, 209, 133) : cc.color(172, 172, 212);
        this.name_label.string = data.nick_name;
        this.num_label.string = cv.StringTools.serverGoldToShowString(data.amount);
        this.time_label.string = cv.StringTools.formatTime(data.draw_time, cv.Enum.eTimeType.Hour_Minute);
        this.name_label.node.color = color;
        this.num_label.node.color = color;
        this.time_label.node.color = color;
    }
}
