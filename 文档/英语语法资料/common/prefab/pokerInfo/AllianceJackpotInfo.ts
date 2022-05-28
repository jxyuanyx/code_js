import cv from "./../../../components/lobby/cv"
import AllianceResultTitle from "./AllianceResultTitle";
import AllianceClubTitleItem from "./AllianceClubTitleItem";
import AllianceResultInfoItem from "./AllianceResultInfoItem";
const { ccclass, property } = cc._decorator;

@ccclass
export default class AllianceJackpotInfo extends cc.Component {

    msg: any = null;
    @property(cc.Node)
    content: cc.Node = null;
    @property(cc.Prefab)
    allianceResultInfoItem: cc.Prefab = null;
    @property(cc.Prefab)
    allianceResultTitle: cc.Prefab = null;
    @property(cc.Prefab)
    allianceClubTitleItem: cc.Prefab = null;
    @property(cc.Prefab)
    contributionItem: cc.Prefab = null;
    @property(cc.Prefab)
    Alliance_award_info: cc.Prefab = null;
    award_txt: cc.Node = null;
    contribution_txt: cc.Node = null;

    private _jackpotwinbet = 0;
    onLoad() {
        cv.MessageCenter.register(cv.config.CHANGE_LANGUAGE, this.initLanguage.bind(this), this.node);
    }

    onDestroy() {
        cv.MessageCenter.unregister(cv.config.CHANGE_LANGUAGE, this.node);
    }

    initLanguage(): void {
        cc.find("result_title_text", this.node).getComponent(cc.Label).string = cv.config.getStringData("AllianceResultInfo_result_title_text_2");

        if (this.award_txt) {
            this.award_txt.getComponent(cc.Label).string = cv.config.getStringData("Alliance_award_info_img_award_txt");
            this.contribution_txt.getComponent(cc.Label).string = cv.config.getStringData("contributionItem_contribution_img_contribution_txt");
        }
    }

    init() {
        this.content.getParent().setContentSize(this.content.width, cv.config.HEIGHT - (cv.config.DESIGN_HEIGHT - this.content.height));
        //cc.find("insurance_layout", this.node).active = false;
    }

    getBuyInData(uid: number): any {
        for (let k = 0; k < cv.StringTools.getArrayLength(this.msg.buyins); k++) {
            if (uid == this.msg.buyins[k].UID) {
                return this.msg.buyins[k];
            }
        }
        return null;
    }

    getClubInfoByClubId(clubId: number): any {
        if(!this.msg.clubInfos) return null;
        for (let i = 0; i < this.msg.clubInfos.length; i++) {
            if (this.msg.clubInfos[i].ClubId == clubId) {
                return this.msg.clubInfos[i];
            }
        }
        return null;
    }

    setData(msg: any) {
        this.content.setContentSize(this.content.getParent().getContentSize());
        this.content.getParent().getComponent(cc.ScrollView).scrollToTop();
        this.initLanguage();
        cv.resMgr.setSpriteFrame(cc.find("insurance_img", this.node), "zh_CN/hall/ui/jp");
        cc.find("alliance_result_text", this.node).getComponent(cc.Label).string = "JackPot";
        this.node.active = true;
        this.content.destroyAllChildren();
        this.content.removeAllChildren(true);
        this.msg = msg;
        let height: number = 0;

        let contributionItem = cc.instantiate(this.contributionItem);
        let contribution_img = cc.find("contribution_img", contributionItem);
        let contribution_text = cc.find("contribution_text", contribution_img);
        let contribution_txt = cc.find("contribution_txt", contribution_img);
        // contributionItem.setPositionY(this.content.getContentSize().height - 100);
        this.content.addChild(contributionItem);
        height += contributionItem.height;

        let hasAddClubIds: any[] = [];
        let sameClubIds: any[] = [];
        let clubList: any[] = [];

        let posY = this.content.getContentSize().height - 100;
        let insurances: number = 0;//����ܱ���
        for (let i = 0; i < cv.StringTools.getArrayLength(msg.alliance_clubids); i++) {
            let item = cc.instantiate(this.allianceResultTitle);
            posY -= 108;
            // item.setPositionY(posY);
            this.content.addChild(item);
            height += item.height;
            item.getComponent(AllianceResultTitle).setData(msg.alliance_clubids[i]);

            let allianceInsurances = 0;//��ǰ���˵��ܱ���

            for (let j = 0; j < cv.StringTools.getArrayLength(msg.alliance_clubids[i].Clubids); j++) {
                let clubInfoData: any = this.getClubInfoByClubId(msg.alliance_clubids[i].Clubids[j]);

                if (clubInfoData) {
                    let titleItem = cc.instantiate(this.allianceClubTitleItem);
                    clubList.push(titleItem);
                    posY -= 106;
                    // titleItem.setPositionY(posY);
                    this.content.addChild(titleItem);
                    height += titleItem.height;
                    titleItem.getComponent(AllianceClubTitleItem).setData(this.msg, clubInfoData, cv.Enum.ResultType_PokerInfo.Jackpot_type);
                    /* �����ظ��ľ��ֲ�*/
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
                    /* �����ظ��ľ��ֲ�*/
                    titleItem.getComponent(AllianceClubTitleItem).hideBuyIn();
                }
            }

            item.getComponent(AllianceResultTitle).setText(allianceInsurances, cc.Color.GREEN);
        }
        //����Ϊ������ϸ
        posY -= 120;

        let Alliance_award_info = cc.instantiate(this.Alliance_award_info);
        let award_info_img = cc.find("award_info_img", Alliance_award_info);
        let award_info_text = cc.find("award_info_text", award_info_img);
        let award_txt = cc.find("award_txt", award_info_img);
        this.content.addChild(Alliance_award_info);
        height += Alliance_award_info.height;

        // Alliance_award_info.setPositionY(posY);
        let allianceTotal_jackpot: number = 0;//���д����ܹ�����jackpot
        let hasAddAwardClubIds: any[] = [];
        for (let i = 0; i < cv.StringTools.getArrayLength(msg.alliance_clubids); i++) {
            let alliance_jackpot = 0;//�������ܹ�����jackpot
            let allianceNode:cc.Node = null;
            let hasAward = false;//�����������н�����
            let allinceResultInfo = msg.alliance_clubids[i];
            for (let j = 0; j < cv.StringTools.getArrayLength(msg.alliance_clubids[i].Clubids); j++) {
                let clubHasAward = false;//�þ��ֲ������н�����
                let clubid = allinceResultInfo.Clubids[j];
                let clubInfoData: any = this.getClubInfoByClubId(msg.alliance_clubids[i].Clubids[j]);
                if(!clubInfoData) continue;
                for (let p = 0; p < cv.StringTools.getArrayLength(clubInfoData.UIDs); p++) {
                    let playInfo = this.getBuyInData(clubInfoData.UIDs[p]);
                    if (playInfo.LastBuyinClubid == clubid && playInfo.JackpotWinbet > 0) {
                        if (!hasAward) {
                            hasAward = true;
                            allianceNode = cc.instantiate(this.allianceResultTitle);
                            //item.setPositionY(curAlliancePosy);
                            this.content.addChild(allianceNode);
                            height += allianceNode.height;
                            allianceNode.getComponent(AllianceResultTitle).setData(msg.alliance_clubids[i]);
                        }
                        if (!clubHasAward) {
                            clubHasAward = true;
                            let titleItem = cc.instantiate(this.allianceClubTitleItem);
                            clubList.push(titleItem);
                            // titleItem.setPositionY(curClubPosy);
                            this.content.addChild(titleItem);
                            height += titleItem.height;
                            posY -= 106;
                            titleItem.getComponent(AllianceClubTitleItem).setData(this.msg, clubInfoData, cv.Enum.ResultType_PokerInfo.Award_type);
                            /* �����ظ��ľ��ֲ�*/
                            titleItem.getComponent(AllianceClubTitleItem).hideBuyIn();
                        }
                        alliance_jackpot += playInfo.Award2ClubFund;
                        alliance_jackpot += playInfo.JackpotWinbet;

                        allianceTotal_jackpot += playInfo.Award2ClubFund;
                        allianceTotal_jackpot += playInfo.JackpotWinbet;

                        let resultItem = cc.instantiate(this.allianceResultInfoItem);
                        this.content.addChild(resultItem);
                        height += resultItem.height;
                        resultItem.getComponent(AllianceResultInfoItem).setData(this.msg, clubInfoData.UIDs[p], cv.Enum.ResultType_PokerInfo.Jackpot_type);
                        // resultItem.setPositionY(posY);

                        if (j == msg.alliance_clubids[i].Clubids.length - 1) {
                            resultItem.getComponent(AllianceResultInfoItem).hideLine();
                        }
                    }
                }
            }
            if (hasAward) {
                allianceNode.getComponent(AllianceResultTitle).setText(alliance_jackpot, cc.Color.RED);
            }
        }
        
        if (height > this.content.getContentSize().height) {
            this.content.setContentSize(this.content.getContentSize().width, height);
        }

        cv.StringTools.setLabelValueAndColor(contribution_text, insurances);
        let jackpot_num = cv.StringTools.serverGoldToShowNumber(allianceTotal_jackpot);
        award_info_text.color = cv.tools.getLoseColor();
        if (allianceTotal_jackpot != 0) {
            award_info_text.getComponent(cc.Label).string = (-jackpot_num).toString();
        }
        else {
            award_info_text.getComponent(cc.Label).string = jackpot_num.toString();
        }

        cv.StringTools.setLabelValueAndColor(cc.find("insurance_text", this.node), insurances - allianceTotal_jackpot);
        this._jackpotwinbet = insurances - allianceTotal_jackpot;
        for (let i = 0; i < sameClubIds.length; i++) {
            for (let k = 0; k < clubList.length; k++) {
                if (clubList[k].getComponent(AllianceClubTitleItem).getClubId() == sameClubIds[i]) {
                    clubList[k].getComponent(AllianceClubTitleItem).showTheSameMark();
                }
            }
        }

        this.award_txt = award_txt;
        this.contribution_txt = contribution_txt;
        award_txt.getComponent(cc.Label).string = cv.config.getStringData("Alliance_award_info_img_award_txt");
        contribution_txt.getComponent(cc.Label).string = cv.config.getStringData("contributionItem_contribution_img_contribution_txt");
    }

    public getjackpotwinbet():number{
        return this._jackpotwinbet
    }
}