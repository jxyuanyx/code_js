import cv from "./../../../components/lobby/cv"
import AllianceResultTitle from "./AllianceResultTitle";
import AllianceClubTitleItem from "./AllianceClubTitleItem";
import AllianceResultInfoItem from "./AllianceResultInfoItem";
const { ccclass, property } = cc._decorator;

@ccclass
export default class AllianceInsuranceInfo extends cc.Component {

    msg: any = null;
    @property(cc.Node)
    content: cc.Node = null;
    @property(cc.Prefab)
    allianceResultInfoItem: cc.Prefab = null;
    @property(cc.Prefab)
    allianceResultTitle: cc.Prefab = null;
    @property(cc.Prefab)
    allianceClubTitleItem: cc.Prefab = null;

    onLoad() {
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
    }

    onDestroy() {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    init() {
        this.content.getParent().setContentSize(this.content.width, cv.config.HEIGHT - (cv.config.DESIGN_HEIGHT - this.content.height));
    }

    initLanguage():void {
        cc.find("alliance_result_text", this.node).getComponent(cc.Label).string = cv.config.getStringData("AllianceResultInfo_insurance_img_alliance_result_text");
        cc.find("result_title_text", this.node).getComponent(cc.Label).string = cv.config.getStringData("AllianceResultInfo_result_title_text");
    }

    setData(msg: any) { 
        this.content.setContentSize(this.content.getParent().getContentSize());
        this.content.getParent().getComponent(cc.ScrollView).scrollToTop();
        this.initLanguage();
        this.node.active = true;
        this.content.destroyAllChildren();
        this.content.removeAllChildren(true);
        this.msg = msg;
        // let contentSize = this.scrollSize;
        // this.content.getParent().setContentSize(contentSize.width, contentSize.height - 214);
        // this.content.getParent().setPositionY(this.scrollPosY - 214);
        // this.content.setContentSize(contentSize.width, contentSize.height - 214);

        let len = cv.StringTools.getArrayLength(msg.alliance_clubids);
        let insurances: number = 0;//这局总保险       
        let height: number = 0;
        let buyins = this.msg.buyins;
        let buyinsLen = cv.StringTools.getArrayLength(buyins);

        if (len == 0) {
            height = 214 * buyinsLen;
            if (height > this.content.getContentSize().height) {
                this.content.setContentSize(this.content.getContentSize().width, height);
            }
            else {
                height = this.content.getContentSize().height;
            }

            for (let p = 0; p < buyinsLen; p++) {
                // AllianceResultInfoItem * resultItem = AllianceResultInfoItem:: createLayer();
                // scrollView.addChild(resultItem);
                let resultItem = cc.instantiate(this.allianceResultInfoItem);
                this.content.addChild(resultItem);
                resultItem.getComponent(AllianceResultInfoItem).setData(this.msg, buyins[p].UID, cv.Enum.ResultType_PokerInfo.Insurance_type);
                //resultItem.setdata(g_pkDataManager.getGameRecords().pokerInfoData.BuyinList[p].UID, Insurance_type);
                //resultItem.setPositionY(height - 214 * (p + 1));
                insurances -= resultItem.getComponent(AllianceResultInfoItem).getTextNumber();
            }
        }
        else {
            for (let i = 0; i < cv.StringTools.getArrayLength(msg.alliance_clubids); i++) {
                height += 108;
                let allinceResultInfo = msg.alliance_clubids[i];
                for (let j = 0; j < cv.StringTools.getArrayLength(allinceResultInfo.Clubids); j++) {
                    let clubid = allinceResultInfo.Clubids[j];
                    let clubInfoData: any = this.getClubInfoByClubId(clubid);
                    if (clubInfoData) {
                        height += 106;
                        for (let k = 0; k < cv.StringTools.getArrayLength(clubInfoData.UIDs); k++) {
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

            for (let i = 0; i < cv.StringTools.getArrayLength(msg.alliance_clubids); i++) {
                let item = cc.instantiate(this.allianceResultTitle);
                posY -= 108;
                //item.setPositionY(posY);
                this.content.addChild(item);
                item.getComponent(AllianceResultTitle).setData(msg.alliance_clubids[i]);

                let allianceInsurances = 0;//当前联盟的总保险

                for (let j = 0; j < cv.StringTools.getArrayLength(msg.alliance_clubids[i].Clubids); j++) {
                    let clubInfoData: any = this.getClubInfoByClubId(msg.alliance_clubids[i].Clubids[j]);

                    if (clubInfoData) {
                        //AllianceClubTitleItem * titleItem = AllianceClubTitleItem:: createLayer();
                        let titleItem = cc.instantiate(this.allianceClubTitleItem);
                        clubList.push(titleItem);
                        posY -= 106;
                        //titleItem.setPositionY(posY);
                        this.content.addChild(titleItem);
                        titleItem.getComponent(AllianceClubTitleItem).setData(this.msg, clubInfoData, cv.Enum.ResultType_PokerInfo.Insurance_type);
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
                            resultItem.getComponent(AllianceResultInfoItem).setData(this.msg, clubInfoData.UIDs[p], cv.Enum.ResultType_PokerInfo.Insurance_type);
                            //resultItem.setPositionY(posY);
                            if (j == clubInfoData.UIDs.length - 1) {
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

        cv.StringTools.setLabelValueAndColor(cc.find("insurance_text", this.node), insurances);
    }

    getClubInfoByClubId(clubId: number): any {
        for (let i = 0; i < this.msg.clubInfos.length; i++) {
            if (this.msg.clubInfos[i].ClubId == clubId) {
                return this.msg.clubInfos[i];
            }
        }
        return null;
    }
}
