import cv from "./../../../components/lobby/cv"
import AllianceResultTitle from "./AllianceResultTitle";
import AllianceClubTitleItem from "./AllianceClubTitleItem";
import AllianceResultInfoItem from "./AllianceResultInfoItem";
const { ccclass, property } = cc._decorator;

@ccclass
export default class AllianceIntegralInfo extends cc.Component {

    msg: any = null;
    @property(cc.Node)
    content: cc.Node = null;
    scrollPosY: number = 0;
    scrollSize: cc.Size = null;
    @property(cc.Prefab)
    allianceResultInfoItem: cc.Prefab = null;
    @property(cc.Prefab)
    allianceResultTitle: cc.Prefab = null;
    @property(cc.Prefab)
    allianceClubTitleItem: cc.Prefab = null;

    init() {
        this.scrollSize = cc.find("Panel_1_0", this.node).getContentSize();
        let tempScroll = this.content.getParent();
        if (cv.config.IS_WIDESCREEN) {
            this.content.getParent().setContentSize(this.scrollSize);
        }
        else {
            let tempSize = this.scrollSize;
            console.log("===========> let tempSize = this.scrollSize;" + tempSize + ", " + cc.size(tempSize.width, (cv.config.HEIGHT - cv.config.DESIGN_HEIGHT) + tempSize.height));
            tempScroll.setContentSize(tempSize.width, (cv.config.HEIGHT - cv.config.DESIGN_HEIGHT) + tempSize.height);
        }

        this.scrollPosY = this.content.y;

        cc.find("insurance_img", this.node).active = false;
        cc.find("alliance_result_text", this.node).active = false;
        cc.find("insurance_text", this.node).active = false;
        // cc.find("insurance_img/alliance_result_text", this.node).getComponent(cc.Label).string = cv.config.getStringData("AllianceResultInfo_insurance_img_alliance_result_text");
        this.registerMsg();
    }

    onDestroy() {
        this.unregisterMsg();
    }

    registerMsg() {
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
    }

    unregisterMsg() {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    initLanguage() {
        cc.find("result_title_text", this.node).getComponent(cc.Label).string = cv.config.getStringData("AllianceResultInfo_result_title_text_1");
    }

    setData(msg: any) {
        this.content.setContentSize(this.content.getParent().getContentSize());
        this.content.getParent().getComponent(cc.ScrollView).scrollToTop();
        this.initLanguage();
        this.content.getParent().setPosition(0, -cv.config.HEIGHT * 0.5);
        console.log("=========================> this.content.getParent().position = " + this.content.getParent().position + ", " + this.content.getParent().getContentSize());
        this.node.active = true;
        this.content.destroyAllChildren();
        this.content.removeAllChildren(true);
        let tempValue = cv.config.IS_WIDESCREEN ? 0 : (cv.config.HEIGHT - cv.config.DESIGN_HEIGHT);
        this.content.setContentSize(this.scrollSize.width, this.scrollSize.height + tempValue);
        this.content.setPosition(this.content.x, this.content.getParent().height);
        console.log("=========================> this.content.getParent().position = " + this.content.position + ", " + this.content.getContentSize());
        this.msg = msg;
        let height: number = 0;
        for (let i = 0; i < cv.StringTools.getArrayLength(msg.alliance_clubids); i++) {
            height += 108;
            let allinceResultInfo = msg.alliance_clubids[i];
            for (let j = 0; j < cv.StringTools.getArrayLength(allinceResultInfo.Clubids); j++) {
                let clubid = allinceResultInfo.Clubids[j];
                let clubInfoData: any = this.getClubInfoByClubId(clubid);
                if (clubInfoData) {
                    height += 106;
                    for (let k = 0; k < clubInfoData.UIDs.length; k++) {
                        height += 214;
                    }
                }
            }
        }

        if (height > this.content.getContentSize().height) {
            this.content.setContentSize(this.content.getContentSize().width, height);
        }

        let hasAddClubIds: any[] = [];
        let sameClubIds: any[] = [];
        let clubList: any[] = [];

        let posY = this.content.getContentSize().height;
        let insurances: number = 0;//这局总保险
        for (let i = 0; i < cv.StringTools.getArrayLength(msg.alliance_clubids); i++) {
            let item = cc.instantiate(this.allianceResultTitle);
            posY -= 108;
            //item.setPositionY(0);//posY
            //item.setPosition(0);
            this.content.addChild(item);
            item.getComponent(AllianceResultTitle).setData(msg.alliance_clubids[i]);

            let allianceInsurances = 0;//当前联盟的总保险

            for (let j = 0; j < cv.StringTools.getArrayLength(msg.alliance_clubids[i].Clubids); j++) {
                let clubInfoData: any = this.getClubInfoByClubId(msg.alliance_clubids[i].Clubids[j]);

                if (clubInfoData) {
                    let titleItem = cc.instantiate(this.allianceClubTitleItem);
                    clubList.push(titleItem);
                    posY -= 106;
                    //titleItem.setPositionY(posY);
                    this.content.addChild(titleItem);
                    titleItem.getComponent(AllianceClubTitleItem).setData(this.msg, clubInfoData, cv.Enum.ResultType_PokerInfo.Integral_type);
                    /* 过滤重复的俱乐部*/
                    let hasAdd: boolean = false;
                    for (let k = 0; k < hasAddClubIds.length; k++) {
                        if (hasAddClubIds[k] == clubInfoData.ClubId) {
                            hasAdd = true;
                            sameClubIds.push(clubInfoData.ClubId);
                        }
                    }
                    if (!hasAdd) {
                        hasAddClubIds.push(clubInfoData.ClubId);
                        insurances += titleItem.getComponent(AllianceClubTitleItem).getInsurance();
                    }
                    allianceInsurances += titleItem.getComponent(AllianceClubTitleItem).getInsurance();
                    /* 过滤重复的俱乐部*/
                    titleItem.getComponent(AllianceClubTitleItem).hideBuyIn();

                    for (let p = 0; p < cv.StringTools.getArrayLength(clubInfoData.UIDs); p++) {
                        //allianceResultInfoItem * resultItem = allianceResultInfoItem:: createLayer();
                        let resultItem = cc.instantiate(this.allianceResultInfoItem);
                        this.content.addChild(resultItem);
                        posY -= 214;
                        resultItem.getComponent(AllianceResultInfoItem).setData(this.msg, clubInfoData.UIDs[p], cv.Enum.ResultType_PokerInfo.Integral_type);
                        // resultItem.setdata(clubInfoData.uids[p], Integral_type);
                        //resultItem.setPositionY(posY);
                        if (j == clubInfoData.UIDs.length - 1) {
                            // resultItem.hideLine();
                            resultItem.getComponent(AllianceResultInfoItem).hideLine();
                        }
                    }
                }
            }
            item.getComponent(AllianceResultTitle).setTotalInsurance(allianceInsurances);
        }
        for (let i = 0; i < sameClubIds.length; i++) {
            for (let k = 0; k < clubList.length; k++) {
                if (clubList[k].getComponent(AllianceClubTitleItem).getClubId() == sameClubIds[i]) {
                    clubList[k].getComponent(AllianceClubTitleItem).showTheSameMark();
                }
            }
        }

    }

    getClubInfoByClubId(clubId: number): any {
        for (let i = 0; i < this.msg.clubInfos.length; i++) {
            if (this.msg.clubInfos[i].ClubId == clubId) {
                return this.msg.clubInfos[i];
            }
        }
        return null;
    }

    onBtnBackClick(event: cc.Event) {
        this.node.active = false;
    }
}
