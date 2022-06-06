import cv from "../../../../Script/components/lobby/cv";
import { ClubData } from "../../../../Script/data/club/ClubData";
import { userData } from "../../../../Script/data/userData";
import { eClubSceneView } from "../../../../Script/components/club/ClubScene";
import { CircleSprite, Head_Mode } from "../../../../Script/common/tools/CircleSprite";

const { ccclass, property } = cc._decorator;
@ccclass
export class ClubItem extends cc.Component {
    @property(cc.Label) txt_club_flag: cc.Label = null;             // 标志文本
    @property(cc.Label) txt_club_name: cc.Label = null;             // 俱乐部名
    @property(cc.Label) txt_club_member: cc.Label = null;           // 成员数量
    @property(cc.Label) txt_club_area: cc.Label = null;             // 区域
    @property(cc.Label) txt_club_game_num: cc.Label = null;         // 牌局
    @property(cc.Label) txt_club_identify: cc.Label = null;         // 识别标志(是否是创建者,管理员,普通成员等)
    @property(cc.Sprite) img_club_identify: cc.Sprite = null;       // 创建者精灵
    @property(cc.Sprite) img_club_icon: cc.Sprite = null;           // 俱乐部图标
    @property(cc.Label) hasInClub_text: cc.Label = null;            // 搜索社区使用

    private _clubData: ClubData = null;                             // 当前俱乐部数据引用

    protected onLoad(): void {

        cv.resMgr.adaptWidget(this.node, true);
        
        this.node.on("click", this._onClick, this);

        // 隐藏若干控件
        this.txt_club_area.node.active = false;
        this.hasInClub_text.string = cv.config.getStringData("ClubItem_hasInClub_text");
    }

    protected start(): void {
    }

    // 更新滚动视图复用数据
    updateSVReuseData(index: number, dataArray: any[]): void {
        if (index < 0 || index >= dataArray.length) return;
        let data: ClubData = dataArray[index];
        this._setData(data);
    }

    private _setData(data: ClubData): void {
        if (!(data instanceof ClubData)) return;
        this._clubData = data;

        // 显示牌局数量
        do {
            // 当前正在进行的牌局数量
            let currentBoardListNum = 0;
            let currentBoardList = cv.clubDataMgr.getClubCurrentBoardList();
            for (let i = 0; i < currentBoardList.length; ++i) {
                if (currentBoardList[i].club_name === data.club.club_name) {
                    ++currentBoardListNum;
                }
            }
            this.txt_club_game_num.string = cv.StringTools.formatC("%d", currentBoardListNum);
            this.txt_club_game_num.node.active = currentBoardListNum > 0;
            this.txt_club_game_num.node.active = false; // 暂时隐藏
        } while (false);

        if (data.club.club_type == 3) {
            if (cv.clubDataMgr.isIncludedOwnClubs(data.club.club_id)) {
                this.hasInClub_text.node.active = true;
            }
            else {
                this.hasInClub_text.node.active = false;
            }
        }

        this.txt_club_flag.string = cv.config.getStringData("UITitle3");
        this.txt_club_name.string = data.club.club_name;
        this.txt_club_member.string = cv.StringTools.formatC(cv.config.getStringData("UIClubMember"), data.club.club_member_count, data.club.club_member_max);

        let user_data: userData = cv.dataHandler.getUserData();
        let bManager: boolean = data.club.is_manager === 1;

        this.img_club_identify.node.active = bManager;
        this.txt_club_identify.node.active = bManager;
        this.txt_club_member.node.active = bManager;
        cc.find("all_member", this.node).active = bManager;
        if (bManager) {
            if (data.club.club_owner === user_data.u32Uid) {
                cv.resMgr.setSpriteFrame(this.img_club_identify.node, "zh_CN/club/myclub-icon-creator1");
                this.txt_club_identify.string = cv.config.getStringData("ClubItem_identify_1_text");
                this.txt_club_identify.node.color = cc.color(228, 175, 46);
            }
            else {
                cv.resMgr.setSpriteFrame(this.img_club_identify.node, "zh_CN/club/myclub-icon-creator");
                this.txt_club_identify.string = cv.config.getStringData("ClubItem_identify_0_text");
                this.txt_club_identify.node.color = cc.color(35,142,211);
            }
        }

        CircleSprite.setCircleSprite(this.img_club_icon.node, data.club.club_icon, 0, false, Head_Mode.CLUB);
    }

    private _onClick(event: cc.Event.EventCustom): void {
        // 先设置数据
        cv.clubDataMgr.setCurOpClubID(this._clubData.club.club_id);

        // 在更新视图
        if (this._clubData.club.club_type === 3) {
            cv.MessageCenter.send("onClubSceneTransView", {
                nextView: eClubSceneView.E_CSV_CLUB_INTRODUCE_VIEW,
                lastView: eClubSceneView.E_CSV_CLUB_SEARCH_VIEW,
                transDir: cv.action.eMoveActionDir.EMAD_TO_LEFT,
                transBoth: true
            });
        }
        else {
            cv.MessageCenter.send("onClubSceneTransView", {
                nextView: eClubSceneView.E_CSV_CLUB_INTRODUCE_VIEW,
                lastView: eClubSceneView.E_CSV_CLUB_MAIN_VIEW,
                transDir: cv.action.eMoveActionDir.EMAD_TO_LEFT,
                transBoth: true
            });
        }
    }
}
