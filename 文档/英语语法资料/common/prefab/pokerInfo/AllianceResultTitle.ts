import cv from "./../../../components/lobby/cv"
const { ccclass, property } = cc._decorator;

@ccclass
export default class AllianceResultTitle extends cc.Component {

    setData(alliance_clubids: any) {
        cc.find("alliance_name_text", this.node).getComponent(cc.Label).string = alliance_clubids.AllianceName;
    }

    setTotalInsurance(totalNumber: number) {
        let alliance_winInfo_text: cc.Node = cc.find("alliance_winInfo_text", this.node);
        cv.StringTools.setLabelValueAndColor(alliance_winInfo_text, totalNumber);
    }

    setText(num: number, color: cc.Color) {
        num = cv.StringTools.clientGoldByServer(num);
        let alliance_winInfo_text = cc.find("alliance_winInfo_text", this.node);
        alliance_winInfo_text.color = color;
        alliance_winInfo_text.getComponent(cc.Label).string = cv.StringTools.numberToShowString(num);
    }
}
