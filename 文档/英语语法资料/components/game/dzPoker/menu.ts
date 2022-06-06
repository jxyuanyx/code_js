import cv from "../../lobby/cv";
import { PlayerInfo } from "./data/RoomData";
import { GameScene } from "./GameScene";
import RecallBuyin from "./RecallBuyin";
import Buyin from "./Buyin";
import RuleDiscription from "./RuleDiscription";
import { GameMain } from "./GameMain";
import AutoRecallBuyin from "./AutoRecallBuyin";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export class menu extends cc.Component {
	@property(cc.Prefab) public goldview: cc.Prefab = null;
	@property(cc.Node) public menubg: cc.Node = null;
	@property(cc.Button) public standUp_button: cc.Button = null;
	@property(cc.Button) public houseOwer_button: cc.Button = null;
	@property(cc.Button) public ruleDiscription_button: cc.Button = null;
	@property(cc.Button) public buyin_button: cc.Button = null;
	@property(cc.Button) public recallBuyIn_button: cc.Button = null;
	@property(cc.Button) public changeCard_button: cc.Button = null;
	@property(cc.Button) public changeTable_button: cc.Button = null;
	@property(cc.Button) public leaveSeat_button: cc.Button = null;
	@property(cc.Button) public exitPoker_button: cc.Button = null;
	@property(cc.Button) public settlement_button: cc.Button = null;
	@property(cc.Button) public witchServer_button: cc.Button = null;

	public menuList: cc.Button[] = [];
	public menuImgList: cc.Node[] = [];
	public game: GameScene;
	private gamenet: any;
	constructor() {
		super();
	}
	onLoad() {
		let goldView: cc.Node = cc.instantiate(this.goldview);
		cc.find("gold_Panel", this.node).addChild(goldView);
		cv.resMgr.adaptWidget(this.node, true);
		this.init();
		cv.MessageCenter.register("Exit_click", this.exitClick.bind(this), this.node);
	}

	start() {
		this.initLanguage();
		let str = cv.tools.GetStringByCCFile("changeCard_button");
		this.changeCard_button.node.getChildByName("image_pos").active = (str == null || str == "");
	}

	onDestroy() {
		cv.MessageCenter.unregister("Exit_click", this.node);
	}

	public init() {
		this.menuList.push(this.witchServer_button);
		this.menuList.push(this.standUp_button);
		this.menuList.push(this.houseOwer_button);
		this.menuList.push(this.ruleDiscription_button);
		this.menuList.push(this.buyin_button);
		this.menuList.push(this.recallBuyIn_button);
		this.menuList.push(this.leaveSeat_button);
		this.menuList.push(this.changeCard_button);
		this.menuList.push(this.changeTable_button);
		this.menuList.push(this.exitPoker_button);
		this.menuList.push(this.settlement_button);
		for (let i = 0; i < 11; i++) {
			this.menuImgList.push(cc.find("menu_img" + i, this.node));
		}
		if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Allin) {
			this.gamenet = cv.aofNet;
		} else {
			this.gamenet = cv.gameNet;
		}
	}

	public initLanguage() {
		cv.StringTools.setLabelString(this.standUp_button.node, "Label", "GameScene_menu_Panel_menu_img0_aroundLook_button");
		cv.StringTools.setLabelString(this.houseOwer_button.node, "Label", "GameScene_menu_Panel_menu_img1_houseOwer_button");
		cv.StringTools.setLabelString(this.ruleDiscription_button.node, "Label", "GameScene_menu_Panel_menu_img2_ruleDiscription_button");
		cv.StringTools.setLabelString(this.buyin_button.node, "Label", "GameScene_menu_Panel_menu_img3_buyin_button");
		cv.StringTools.setLabelString(this.recallBuyIn_button.node, "Label", "GameScene_menu_Panel_menu_img4_recallBuyIn_button");
		cv.StringTools.setLabelString(this.leaveSeat_button.node, "Label", "GameScene_menu_Panel_menu_img6_leaveSeat_button");
		cv.StringTools.setLabelString(this.changeCard_button.node, "Label", "GameScene_menu_Panel_menu_img7_changeCard_button");
		cv.StringTools.setLabelString(this.changeTable_button.node, "Label", "GameScene_menu_Panel_menu_img8_changeTable_button");
		cv.StringTools.setLabelString(this.exitPoker_button.node, "Label", "GameScene_menu_Panel_menu_img9_exitPoker_button");
		cv.StringTools.setLabelString(this.settlement_button.node, "Label", "GameScene_menu_Panel_menu_img10_settlement_button");
		cv.StringTools.setLabelString(this.witchServer_button.node, "Label", "GameScene_menu_Panel_menu_img11_settlement_button");
	}

	public setGameScene(game: GameScene) {
		this.game = game;
	}
	public onClickSelf(evt) {
		this.node.active = false;
	}
	public enableMenuButton(index: number, isSeat: boolean) {
		this.menuList[index].interactable = isSeat;
		console.log("index：" + index + "  isSeat::" + isSeat);
		this.menuImgList[index].active = true;
		//this.menuList[index].getComponent(cc.Button).enabled = false;
		if (this.menuList[index].interactable) {
			let color: cc.Color = cc.Color.WHITE;

			// 奥马哈的快速换桌颜色增强
			if (index === 8 && cv.GameDataManager.tRoomData.u32GameID === cv.Enum.GameId.Plo) {
				color = cc.color(0xFB, 0xD8, 0x88);
			}

			this.menuList[index].node.color = color;						// btn
			this.menuList[index].node.parent.color = color;					// img
			cc.find("Label", this.menuList[index].node).color = color;		// txt
		}
		else {
			let color: cc.Color = cc.color(130, 130, 130);
			this.menuList[index].node.color = color							// btn
			this.menuList[index].node.parent.color = color;					// img
			cc.find("Label", this.menuList[index].node).color = color;		// txt
		}
	}

	private hideBtns() {

	}

	public aofUpdateMenu() {
		for (let i = 0; i < 10; i++) {
			this.menuImgList[i].active = false;
		}
		let offset: number = 0;
		let offsetY: number = 0;
		if (cv.config.IS_FULLSCREEN) {
			offsetY = cv.config.FULLSCREEN_OFFSETY;
		}
		//如果是自己的局
		let _isSeat: boolean = (cv.GameDataManager.tRoomData.i32SelfSeat != -1);
		this.enableMenuButton(0, true);
		this.enableMenuButton(3, true);//房主
		this.enableMenuButton(7, true);
		if (_isSeat) {
			this.enableMenuButton(1, !cv.GameDataManager.tRoomData.m_isAllInMode);
			this.enableMenuButton(8, !cv.GameDataManager.tRoomData.m_isAllInMode);
		} else {
			this.enableMenuButton(1, false);
			this.enableMenuButton(8, true);
		}
		let showLen = 0;
		for (let i = 0; i < this.menuImgList.length; i++) {
			if (this.menuImgList[i].active) {
				this.menuImgList[i].setPosition(this.menuImgList[i].getPosition().x, this.menuImgList[0].y - showLen * 130);
				showLen++;
			}
		}

		this.menubg.setContentSize(cc.size(this.menubg.getContentSize().width, 180 + 130 * showLen + offsetY));
	}

	public updateMenu() {
		let offsetY: number = 0;
		if (cv.config.IS_FULLSCREEN) {
			offsetY = cv.config.FULLSCREEN_OFFSETY;
		}
		//如果是自己的局
		let isSelf: boolean = cv.dataHandler.getUserData().u32Uid == cv.GameDataManager.tRoomData.u32OwnerId;
		let _isSeat: boolean = (cv.GameDataManager.tRoomData.i32SelfSeat != -1);
		console.log("cv.GameDataManager.tRoomData.i32SelfSeat::" + cv.GameDataManager.tRoomData.i32SelfSeat);
		this.enableMenuButton(0, true);
		if (isSelf) {
			this.menuImgList[2].active = true;
			this.enableMenuButton(1, _isSeat);
			this.enableMenuButton(2, true);//房主
			this.enableMenuButton(4, _isSeat);
			this.enableMenuButton(5, _isSeat);
			this.enableMenuButton(6, _isSeat);
			this.enableMenuButton(10, cv.GameDataManager.tRoomData.isBuyin);
		}
		else {
			this.menuImgList[2].active = false;
			this.enableMenuButton(1, _isSeat);
			//this.enableMenuButton(2, _isSeat);//房主
			this.enableMenuButton(4, _isSeat);
			this.enableMenuButton(5, _isSeat);
			this.enableMenuButton(6, _isSeat);
			this.enableMenuButton(10, cv.GameDataManager.tRoomData.isBuyin);
		}


		if (_isSeat) {
			this.enableMenuButton(1, !cv.GameDataManager.tRoomData.m_isAllInMode);
			this.enableMenuButton(9, !cv.GameDataManager.tRoomData.m_isAllInMode);
		} else {
			this.enableMenuButton(1, false);
			this.enableMenuButton(9, true);
		}

		let isopenRecall = cv.GameDataManager.tRoomData.pkRoomParam.is_opened_drawback;
		let auto_withdraw = cv.GameDataManager.tRoomData.pkRoomParam.auto_withdraw;
		if ((_isSeat && isopenRecall) || (_isSeat && auto_withdraw)) {
			this.enableMenuButton(5, true);
		}
		else {
			this.enableMenuButton(5, false);
		}

		//微局不显示 和ante5以上不显示
		let anteNum = cv.GameDataManager.tRoomData.pkRoomParam.rule_ante_amount;
		let isShort = (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short);
		if (cv.GameDataManager.tRoomData.pkRoomParam.is_mirco == 1
			|| cv.GameDataManager.tRoomData.pkRoomParam.IscalcIncomePerhand
			|| isShort) {
			this.menuImgList[10].active = false;
		}

		if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Bet) {
			this.menuImgList[10].active = false;
		}

		this.enableMenuButton(9, true);  //退出按钮一直可以操作

		//急速游戏
		if (cv.GameDataManager.tRoomData.isZoom()) {
			this.enableMenuButton(4, true);
			for (let i = 0; i < 11; i++) {
				if (i == 0 || i == 3 || i == 4 || i == 5 || i == 7 || i == 9) {
					this.menuImgList[i].active = true;
				} else {
					this.menuImgList[i].active = false;
				}
			}
		}
		this.enableMenuButton(8, !_isSeat);
		if (cv.GameDataManager.tRoomData.u32GameID == cv.Enum.GameId.StarSeat || cv.GameDataManager.tRoomData.isZoom()) {
			this.menuImgList[8].active = false;
		} else {
			this.menuImgList[8].active = true;
		}
		let showLen = 0;
		for (let i = 0; i < this.menuImgList.length; i++) {
			if (this.menuImgList[i].active) {
				this.menuImgList[i].setPosition(this.menuImgList[i].getPosition().x, this.menuImgList[0].y - showLen * 130);
				showLen++;
			}
		}

		this.menubg.setContentSize(cc.size(this.menubg.getContentSize().width, 180 + 130 * showLen + offsetY));
	}
	public onBtnstandUpButton() {
		cv.AudioMgr.playButtonSound('tab');
		this.node.active = false
		this.gamenet.RequestStandup(cv.GameDataManager.tRoomData.u32RoomId);

	}
	public onBtnHouseOwer() {
		cv.AudioMgr.playButtonSound('tab');
		this.node.active = false
		this.gamenet.RequestAddRoomTimeCount(cv.GameDataManager.tRoomData.u32RoomId)
	}
	public onBtnRuleDiscription() {
		cv.AudioMgr.playButtonSound('tab');
		cv.StatusView.show(false);
		this.game.ruleDiscription_panel.getComponent(RuleDiscription).show(true);
	}
	public onBtnBuyin(bSeat: boolean, isclick = true) {
		if (isclick) {
			cv.AudioMgr.playButtonSound('tab');
		}
		let _isSeat: boolean = bSeat; //(cv.GameDataManager.tRoomData.i32SelfSeat != -1);
		if (_isSeat == false) {
			if (cv.GameDataManager.tRoomData.isZoom()) {

				this.node.active = false;
				this.game.gameMain_panel.getComponent(GameMain).quickSit();
			}
		} else {
			this.node.active = false;
			cv.worldNet.requestGetUserData();
			this.game.buyin_panel.active = true;
			this.game.buyin_panel.getComponent(Buyin).UpdateBuyinInfo();
		}
	}
	public onBtnrecallBuyIn() {
		cv.AudioMgr.playButtonSound('tab');
		this.node.active = false;

		if (cv.GameDataManager.tRoomData.pkRoomParam.auto_withdraw) {
			this.game.autorecallbuyin_panel.active = true;

			this.game.autorecallbuyin_panel.getComponent(AutoRecallBuyin).updateHoldTimes();
			this.game.autorecallbuyin_panel.getComponent(AutoRecallBuyin).updateTotal();
			let isopenRecall = cv.GameDataManager.tRoomData.pkRoomParam.is_opened_drawback;
			if (isopenRecall) {
				this.game.autorecallbuyin_panel.getComponent(AutoRecallBuyin).calculate();
			}
		}
		else {
			this.game.recallbuyin_panel.active = true;
			this.game.recallbuyin_panel.getComponent(RecallBuyin).updateHoldTimes();
			this.game.recallbuyin_panel.getComponent(RecallBuyin).calculate();
		}
	}
	public onBtnLeaveSeat() {
		cv.AudioMgr.playButtonSound('tab');
		console.log("onBtnLeaveSeat");

		// 发送离开座位消息, 用于在游戏场景中采集消息
		cv.MessageCenter.send("click_btn_leave_seat");
		this.gamenet.RequestStayPosition(cv.GameDataManager.tRoomData.u32RoomId);
	}
	public onBtnChangeCard() {
		cv.AudioMgr.playButtonSound('tab');
		console.log("onBtnChangeCard");
		cv.tools.SaveStringByCCFile("changeCard_button", "1");
		this.changeCard_button.node.getChildByName("image_pos").active = false;
		cc.find("menu_button/image_pos", this.game.gameMain_panel).active = false;
		this.game.changeCard_panel.getComponent("ChangeCard").show();
		this.node.active = false;
	}

	public onBtnChangeTable() {
		cv.AudioMgr.playButtonSound('tab');
		cv.gameNet.RequestChangeTable();
		this.node.active = false;
	}

	public onBtnExitPoker() {
		cv.AudioMgr.playButtonSound('tab');
		let anteNum = cv.GameDataManager.tRoomData.pkRoomParam.rule_ante_amount;
		let isShort = (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short);
		// 微局退出先提前结算
		if (cv.GameDataManager.tRoomData.pkRoomParam.is_mirco == 1
			|| cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Allin
			|| cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Bet
			|| cv.GameDataManager.tRoomData.pkRoomParam.IscalcIncomePerhand
			|| isShort) {
			this.sureToSettlement();
		}
		this.node.active = false;

		// 发送退出房间消息, 用于在游戏场景中采集消息
		cv.MessageCenter.send("click_btn_exit_room");
		cv.roomManager.RequestLeaveRoom();
	}
	public onBtnSettlement() {
		cv.AudioMgr.playButtonSound('tab');
		console.log("onBtnSettlement");
		cv.TP.showMsg(cv.config.getStringData("TipsPanel_Image_duanxin_text_duanxin_3"), cv.Enum.ButtonStyle.TWO_BUTTON, this.sureToSettlement.bind(this),
			this.cancleToSettlement.bind(this));
		let image = cv.TP.getMessageImage();
		let msgTxt = cv.TP.getMessageImageText();
		let msgtext = cv.TP.getMessageText();
		image.node.active = true;
		msgTxt.string = "";
		msgTxt.node.active = true;
		cv.resMgr.setSpriteFrame(image.node, "zh_CN/hall/ui/common_prompt");
		msgtext.node.position.y = 255;
	}
	public sureToSettlement() {

		if (!cv.GameDataManager.tRoomData.isZoom()) {
			this.gamenet.RequestCheckOutAndLeave(cv.roomManager.getCurrentRoomID());
		}
		cv.GameDataManager.tRoomData.isBuyin = false;
		this.enableMenuButton(9, cv.GameDataManager.tRoomData.isBuyin);
		this.updateMenu();
	}
	private cancleToSettlement() {

	}

	public isShowPos(): boolean {
		let str = cv.tools.GetStringByCCFile("changeCard_button");
		return str == null || str == "";
	}

	private onClickSwitchServer(evt) {
		cv.AudioMgr.playButtonSound('tab');
		cv.TP.showMsg(cv.config.getStringData("UIWitchServer2"), cv.Enum.ButtonStyle.TWO_BUTTON, this.onGoReconnect.bind(this));
	}

	private onGoReconnect() {
		cv.netWorkManager.onGoReconnect();
	}

	exitClick() {
		let anteNum = cv.GameDataManager.tRoomData.pkRoomParam.rule_ante_amount;
		let isShort = (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short);
		// 微局退出先提前结算
		if (cv.GameDataManager.tRoomData.pkRoomParam.is_mirco == 1
			|| cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Allin
			|| cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Bet
			|| cv.GameDataManager.tRoomData.pkRoomParam.IscalcIncomePerhand
			|| isShort) {
			this.sureToSettlement();
		}
		this.node.active = false;

		// 发送退出房间消息, 用于在游戏场景中采集消息
		cv.MessageCenter.send("click_btn_exit_room");
		cv.roomManager.RequestLeaveRoom();
	}

}
