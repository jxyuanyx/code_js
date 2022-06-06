import cv from "../../lobby/cv";
import { ScrollViewReuse } from "../../../common/tools/ScrollViewReuse";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RedEnvelopeItem extends cc.Component {

    @property(cc.Label) rank_num: cc.Label = null;
    @property(cc.Sprite) rank_icon: cc.Sprite = null;
    @property(cc.Label) rank_name: cc.Label = null;
    @property(cc.Label) rank_money: cc.Label = null;
    @property(cc.Label) rank_time: cc.Label = null;
    @property(cc.Node) goods_icon: cc.Node = null;
    @property(cc.Node) img_line: cc.Node = null;

    updateSVReuseData(index: number, dataArray: Array<any>, view: ScrollViewReuse): void {
        if (dataArray.length <= 0 || dataArray.length - 1 < index) return;
        let data = dataArray[index];
        if (index < 3)
        {
            this.rank_icon.node.active = true;
            this.rank_num.node.active = false;
            cv.resMgr.setSpriteFrame(this.rank_icon.node, `zh_CN/hall/laba/hb_rank_${index + 1}`);
        }else{
            this.rank_icon.node.active = false;
            this.rank_num.node.active = true
            this.rank_num.string = (index + 1).toString();
        }
        this.img_line.active = index >= 2 && dataArray.length > 3;

        let type = data.currency_type;
        cv.resMgr.setSpriteFrame(this.goods_icon, `zh_CN/hall/laba/icon_${type}`);
        if(type < 3) {
            this.rank_money.string = cv.StringTools.numToFloatString(data.amount);
        } else {
            let indx = this.getLanguageIndx()
            let desArr = data.goods_desc.split("#");
            if (desArr.length < indx + 1){
                indx = desArr.length >= 2 ? 1 : 0;
            }
            this.rank_money.string = desArr[indx];
        }
        cv.StringTools.setShrinkString(this.rank_name.node, data.nick_name);
        this.rank_time.string = cv.StringTools.formatTime(data.lottery_time,cv.Enum.eTimeType.Hour_Minute)
    }

    getLanguageIndx(): number{
        let indx = 0;
        if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN)
        {
            indx = 0;
        }
        else if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.yn_TH)
        {
            indx = 2;
        }
        else if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.th_PH)
        {
            indx = 3;
        }
        else
        {
            indx = 1;
        }
        return indx;
    }
}
