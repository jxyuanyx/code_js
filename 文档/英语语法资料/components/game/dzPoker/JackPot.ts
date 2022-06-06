import ListView from "../../../common/tools/ListView";
import cv from "../../lobby/cv";
import { GameJackPotSignItem } from "./GameJackPotSignItem";
import { dataItem, GameJackpotItem } from "./GameJackpotItem";

const { ccclass, property } = cc._decorator;
const Blind_ClubMax: number = 24;
const Blind_NormalMax: number = 13;
@ccclass
export class JackPot extends cc.Component {
	@property(cc.Node) public jackPot_panel: cc.Node = null;
	@property(cc.Node) public allJackpotInfo_panel: cc.Node = null;
	@property(cc.Node) public jackPotSign_panel: cc.Node = null;
	@property(cc.ScrollView) public recordScorllView: cc.ScrollView = null;
	@property(cc.ScrollView) public infoScorllView: cc.ScrollView = null;
	@property(cc.Node) public allJackpot_img: cc.Node = null;
	@property(cc.Node) public jackpot_img: cc.Node = null;
	@property(cc.Node) public jackpotRecord_img: cc.Node = null;
	@property(cc.Label) public jackPotInfo_text: cc.Label = null;
	@property(cc.Label) public bigWinnerName_text: cc.Label = null;
	@property(cc.Label) public bigWinnerCard_type_text: cc.Label = null;
	@property(cc.Label) public bigWinnerNumber_text: cc.Label = null;
	@property(cc.Label) public bigWinnerTime_text: cc.Label = null;
	@property(cc.Label) public clubName_text: cc.Label = null;
	@property(cc.Label) public clubId_text: cc.Label = null;
	@property(cc.Label) public address_text: cc.Label = null;
	//@property(cc.Node) public jackPot_number: cc.Node = null;
	@property(cc.Label) public jackpot_level_number_text: cc.Label = null;
	@property(cc.Label) public jackpot_total_number_text: cc.Label = null;
	//@property(cc.Node) public info_number: cc.Node = null;

	@property(cc.Prefab) public signItemPrefab: cc.Prefab = null;
	signItem: cc.Node = null;
	@property(cc.Prefab) public jackPotItemPrefab: cc.Prefab = null;
	jackPotItem: cc.Node = null;
	isShort = false;
	blindArr: number[] = [];

	award_type = [];	isRecord: boolean = false;//处理记录按钮高频率点击卡死
	onLoad() {
		cv.resMgr.adaptWidget(this.node, true);
		cv.MessageCenter.register("currentRoomJackpot", this.updateJackpot.bind(this), this.node);
		cv.MessageCenter.register("on_jackpot_data", this.updateJackpotInfo.bind(this), this.node);
		cv.MessageCenter.register("jackpotAwardRecord", this.updateBtnJackpotRecord.bind(this), this.node);

		this.signItem = cc.instantiate(this.signItemPrefab);
		this.node.addChild(this.signItem);

		this.jackPotItem = cc.instantiate(this.jackPotItemPrefab);
		this.node.addChild(this.jackPotItem);
		if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
			this.isShort = true;
		}
		this.jackPotItem.active = false;
		this.signItem.active = false;
		this.initLanguage();
	}
	start() {
		this.showJackpot();
	}

	onDestroy() {
		cv.MessageCenter.unregister("currentRoomJackpot", this.node);
		cv.MessageCenter.unregister("on_jackpot_data", this.node);
		cv.MessageCenter.unregister("jackpotAwardRecord", this.node);
	}
	initLanguage() {
		cv.StringTools.setLabelString(this.node, "button_panel/allJackpotInfo_button/Label", "GameJackPot_button_panel_allJackpotInfo_button");
		cv.StringTools.setLabelString(this.node, "button_panel/jackpotRecord_button/Label", "GameJackPot_button_panel_jackpotRecord_button");
		cv.StringTools.setLabelString(this.node, "button_panel/jackpot_button/Label", "GameJackPot_button_panel_jackpot_button");
		cv.StringTools.setLabelString(this.node, "jackPot_panel/awardType_txt", "GameJackPot_jackPot_panel_awardType_txt");
		cv.StringTools.setLabelString(this.node, "jackPot_panel/awardPercent_txt", "GameJackPot_jackPot_panel_awardPercent_txt");
		cv.StringTools.setLabelString(this.node, "jackPot_panel/RoyalFlush_txt", "GameJackPot_jackPot_panel_Text_65");
		cv.StringTools.setLabelString(this.node, "jackPot_panel/straight_flush", "GameJackPot_jackPot_panel_Text_65_0");
		cv.StringTools.setLabelString(this.node, "jackPot_panel/four_txt", "GameJackPot_jackPot_panel_Text_65_0_0");
		cv.StringTools.setLabelString(this.node, "jackPot_panel/jackpotDetail_text", "GameJackPot_jackPot_panel_jackpotDetail_text");
		cv.StringTools.setLabelString(this.node, "jackPot_panel/jackpotDetailTips_text", "GameJackPot_jackPot_panel_jackpotDetailTips_text");
		cv.StringTools.setLabelString(this.node, "allJackpotInfo_panel/totalAmount_txt", "GameJackPot_allJackpotInfo_panel_totalAmount_txt");
		cv.StringTools.setLabelString(this.node, "allJackpotInfo_panel/jackpotlevelAmount_txt", "GameJackPot_allJackpotInfo_panel_jackpotlevelAmount_txt");
		cv.StringTools.setLabelString(this.node, "allJackpotInfo_panel/jackPotSet_button/Label", "ClubJackPotSet_jackpotSet_txt");
		cv.StringTools.setLabelString(this.node, "jackPotSign_panel/Panel_5/jackPotInfo_text", "GameJackPot_jackPotSign_panel_Panel_5_jackPotInfo_text");
		if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
			let blind: string = cv.config.getblindString(cv.GameDataManager.tRoomData.pkRoomParam.rule_blind_enum - 1);
			blind = blind.substr(0, blind.indexOf("/"));
			cc.find("blind_text", this.jackPotSign_panel).getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("Aof_game_short_ante_record"), blind);
		}
		else {
			let blind: string = cv.config.getblindString(cv.GameDataManager.tRoomData.pkRoomParam.rule_blind_enum - 1);
			cc.find("blind_text", this.jackPotSign_panel).getComponent(cc.Label).string = cv.StringTools.formatC(cv.config.getStringData("UIGameJackPotBlindAmount"), blind);
		}

	}
	public onClickSelf(evt) {
		this.node.active = false;
	}

	private updateItem(item: cc.Node, isopen: boolean, blind_num: number) {
		let _potNum_text: cc.Label = item.getChildByName("potNum_text").getComponent(cc.Label);
		let _bindNum_tex: cc.Label = item.getChildByName("bindNum_text").getComponent(cc.Label);
		let bindNum_des_text: cc.Label = item.getChildByName("bindNum_des_text").getComponent(cc.Label);
		let open_img: cc.Sprite = item.getChildByName("open_img").getComponent(cc.Sprite);
		let close_img: cc.Sprite = item.getChildByName("close_img").getComponent(cc.Sprite);
		bindNum_des_text.string = cv.config.getStringData("ClubJackPotItem_Node_bindNum_text");
		_potNum_text.string = "0";
		bindNum_des_text.string = cv.config.getStringData("ClubJackPotItem_Node_bindNum_text");
		let blind = cv.config.getblindString(blind_num);
		if (this.isShort == true) {
			blind = blind.substr(0, blind.indexOf("/"));
		}
		_bindNum_tex.string = blind;
		open_img.node.active = isopen;
		close_img.node.active = !isopen;
	}

	// private updateItemAmount(item: cc.Node, amount_num: number) {
	// 	let _potNum_text: cc.Label = item.getChildByName("potNum_text").getComponent(cc.Label);
	// 	_potNum_text.string = cv.StringTools.numberToString(amount_num / 100);
	// }

	// private setIsOpen(item: cc.Node, isopen: boolean) {
	// 	let _potNum_text: cc.Label = item.getChildByName("potNum_text").getComponent(cc.Label);
	// 	let open_img: cc.Sprite = item.getChildByName("open_img").getComponent(cc.Sprite);
	// 	let close_img: cc.Sprite = item.getChildByName("close_img").getComponent(cc.Sprite);
	// 	open_img.node.active = isopen;
	// 	close_img.node.active = !isopen;
	// }

	public onBtnAllJackpotInfo() {
		this.isRecord = false;
		cv.AudioMgr.playButtonSound('tab');
		this.setDissPanel()
		//this.updateJackpotInfo();
		this.allJackpotInfo_panel.active = true;
		this.allJackpot_img.active = true;

		if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.yn_TH) {
			this.allJackpot_img.setContentSize(cc.size(250, 62));
		}
		else
		{
			this.allJackpot_img.setContentSize(cc.size(224, 62));
		}
		
		cc.find("button_panel/allJackpotInfo_button/Label", this.node).color = new cc.Color().fromHEX("#2C2C39");
		cc.find("button_panel/allJackpotInfo_button/Label", this.node).getComponent(cc.Label).enableBold=true;
	}
	public updateJackpotInfo() {
		let amount: number = 0;//总金额
		let infos = cv.GameDataManager.tJackPot.baseJackpotInfos

		this.initBlindArr(infos);
		for (let j = 0; j < infos.length; j++) {
			for (let i = 0; i < this.blindArr.length; i++) {
				if (this.blindArr[i] == infos[j].blind_level - 1)//服务器端从1开始
				{
					// let item = this.infoScorllView.content.getChildByName(this.blindArr[i].toString());
					// this.setIsOpen(item, true);
					// this.updateItemAmount(item, infos[j].amount)
					amount += infos[j].amount;
				}
			}
		}
		let zhengshu = Math.round(parseInt(cv.StringTools.numberToShowString(amount)) / 100);
		//let amounts: string = (10000000 + zhengshu).toString();
		// for (let i = amounts.length - 1; i >= 1; i--) {
		// 	let path = `zh_CN/game/dzpoker/common/un_0${amounts[i]}.png`;
		// 	let sprt = this.info_number.getChildByName(`sprite_${i}`).getComponent(cc.Sprite)
		// 	cc.resources.load(path, cc.SpriteFrame, function (err, spriteFrame) {
		// 		sprt.spriteFrame = spriteFrame;
		// 	});
		// }
		this.jackpot_total_number_text.string = zhengshu.toString();
		this.clubName_text.string = cv.GameDataManager.tJackPot.club_name;
		this.clubId_text.string = cv.GameDataManager.tJackPot.club_id.toString();
		this.address_text.string = cv.GameDataManager.tJackPot.club_area.toString();
	}

	public onBtnJackpot() {
		this.isRecord = false;
		cv.AudioMgr.playButtonSound('tab');
		this.showJackpot();
	}

	/**
	 * 显示jackpot
	 */
	public showJackpot() {
		this.setDissPanel();
		this.jackPot_panel.active = true;
		this.jackpot_img.active = true;

		if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.yn_TH) {
			this.jackpot_img.setContentSize(cc.size(250, 62));
		}
		else
		{
			this.jackpot_img.setContentSize(cc.size(224, 62));
		}

		//this.updateJackpot();
		cc.find("button_panel/jackpot_button/Label", this.node).color = new cc.Color().fromHEX("#2C2C39");
		cc.find("button_panel/jackpot_button/Label", this.node).getComponent(cc.Label).enableBold = true;
	}
	public updateJackpot() {
		let blinds: string = cv.config.getblindString(cv.GameDataManager.tRoomData.pkRoomParam.rule_blind_enum - 1);
		let blind: cc.Label = this.jackPot_panel.getChildByName('jackPot_blind_text').getComponent(cc.Label);
		let blindSet: cc.Label = this.jackPot_panel.getChildByName('jackPot_blindSet_text').getComponent(cc.Label);

		if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
			let blindLv = blinds.substr(0, blinds.indexOf("/"));
			blind.string = cv.StringTools.formatC(cv.config.getStringData("Aof_game_short_level_number"), blindLv.toString());
			blindSet.string = cv.StringTools.formatC(cv.config.getStringData("Aof_game_short_levels_set"), blindLv.toString());
		}
		else {
			blind.string = cv.StringTools.formatC(cv.config.getStringData("UIGameJackpotBlindAwardAmount"), blinds.toString());
			blindSet.string = cv.StringTools.formatC(cv.config.getStringData("UIGameJackpotRecordAwardSet"), blinds.toString());
		}

		let types = cv.GameDataManager.tJackPot.currentRoomJackpot.CurrentRoomAwardTypes;
		let len: number = cv.StringTools.getArrayLength(types);
		for (let i = 0; i < len; i++) {
			let idx: number = types[i].hand_level;
			let strr: string = `handLevel_${idx}_text`;
			let txts: cc.Label = this.jackPot_panel.getChildByName(strr).getComponent(cc.Label);
			txts.string = types[i].award_percent.toString() + `%`;
			if (types[i].hand_level == 10) {
				let gress: cc.Sprite = this.jackPot_panel.getChildByName('bar_1').getComponent(cc.Sprite);
				gress.fillRange = -1 * types[i].award_percent * 0.01;
			}
			else if (types[i].hand_level == 9) {
				let gress: cc.Sprite = this.jackPot_panel.getChildByName('bar_2').getComponent(cc.Sprite);
				gress.fillRange = -1 * types[i].award_percent * 0.01;
			}
			else if (types[i].hand_level == 8) {
				let gress: cc.Sprite = this.jackPot_panel.getChildByName('bar_3').getComponent(cc.Sprite);
				gress.fillRange = -1 * types[i].award_percent * 0.01;
			}
		}

		let amount = cv.GameDataManager.tJackPot.getJackpotAmountByBlind(cv.GameDataManager.tRoomData.pkRoomParam.rule_blind_enum);
		let n_amount = Math.round(parseInt(cv.StringTools.numberToShowString(amount)) / 100);
		// let amounts: string = (10000000 + n_amount).toString();
		// for (let i = amounts.length - 1; i >= 1; i--) {
		// 	let path = `zh_CN/game/dzpoker/common/un_0${amounts[i]}.png`;
		// 	let sprt = this.jackPot_number.getChildByName(`sprite_${i}`).getComponent(cc.Sprite)
		// 	cc.resources.load(path, cc.SpriteFrame, function (err, spriteFrame) {
		// 		sprt.spriteFrame = spriteFrame;
		// 	});
		// }

		this.jackpot_level_number_text.string = n_amount.toString();

		let drawin_amout = cv.GameDataManager.tJackPot.currentRoomJackpot.drawin_amout;
		let profit_scale = cv.GameDataManager.tJackPot.currentRoomJackpot.profit_scale;
		let detail: cc.Label = this.jackPot_panel.getChildByName('jackpotDetail_text').getComponent(cc.Label);
		detail.node.active = true;
		//detail.node.setContentSize(cc.size(800, 110));
		if (cv.roomManager.getCurrentGameID() == cv.Enum.GameId.Allin) {
			detail.node.active = false;
		}
		detail.string = cv.StringTools.formatC(cv.config.getStringData("UIGameJackpotDetail"), profit_scale, drawin_amout, drawin_amout);
		//detail.string = cv.StringTools.calculateAutoWrapString(detail.node, detail.string);
	}

	public onBtnJackpotRecord() {
		cv.AudioMgr.playButtonSound('tab');
		if (this.isRecord)	return;
		this.isRecord = true;
		this.setDissPanel();
		this.jackPotSign_panel.active = true;
		this.jackpotRecord_img.active = true;

		if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.yn_TH) {
			this.jackpotRecord_img.setContentSize(cc.size(250, 62));
		}
		else
		{
			this.jackpotRecord_img.setContentSize(cc.size(224, 62));
		}
		//this.updateBtnJackpotRecord();
		this.recordScorllView.getComponent(ListView).init(this.bindrecordcallfunc.bind(this), this.getItemType.bind(this));
		this.recordScorllView.getComponent(ListView).notifyDataSetChanged(this.award_type);

		cc.find("button_panel/jackpotRecord_button/Label", this.node).color = new cc.Color().fromHEX("#2C2C39");
		cc.find("button_panel/jackpotRecord_button/Label", this.node).getComponent(cc.Label).enableBold = true;
	}
	public updateBtnJackpotRecord() {
		//this.recordScorllView.content.removeAllChildren()
		let award_players = cv.GameDataManager.tJackPot.award_players;
		this.award_type = [];
		for (let prop in award_players) {
			this.award_type.push({ type: 0, data: award_players[prop] });
		}
		
		//this.recordScorllView.content.setContentSize(this.recordScorllView.content.getContentSize().width, award_players.length*142);
		//if(award_players.length <= 0) return;
		// for (let i = 0; i < award_players.length; i++) {
		// 	let cloneItem = cc.instantiate(this.signItem);
		// 	let playerName: cc.Label = cloneItem.getChildByName("playerName_text").getComponent(cc.Label)
		// 	let cardTypeName: cc.Label = cloneItem.getChildByName("cardTypeName_text").getComponent(cc.Label)
		// 	let award: cc.Label = cloneItem.getChildByName("award_text").getComponent(cc.Label)
		// 	let times: cc.Label = cloneItem.getChildByName("day_text").getComponent(cc.Label)
		// 	cv.StringTools.setShrinkString(playerName.node, award_players[i].player_name, true);
		// 	//playerName.string = award_players[i].player_name;
		// 	award.string = cv.StringTools.numberToString(award_players[i].award_amount / 100);
		// 	cardTypeName.string = cv.config.getStringData(`UITitle${112 + award_players[i].hand_level}`);
		// 	times.string = cv.StringTools.formatTime(award_players[i].award_time, cv.Enum.eTimeType.Month_Day, false);
		// 	let width = this.recordScorllView.content.getContentSize().width / 2
		// 	cloneItem.setPosition(width, -142 * (0.5 + i))
		// 	this.recordScorllView.content.addChild(cloneItem);
		// 	cloneItem.active = true;
		// }
		// this.recordScorllView.getComponent(ListView).init(this.bindrecordcallfunc.bind(this), this.getItemType.bind(this));
		// this.recordScorllView.getComponent(ListView).notifyDataSetChanged(award_type);
		

		let luckDog = cv.GameDataManager.tJackPot.luckyDog;
		// this.bigWinnerName_text.string = luckDog.player_name;
		//this.bigWinnerName_text.enableBold = true;
		//this.bigWinnerCard_type_text.enableBold = true;
		if (luckDog==null) {
			this.bigWinnerName_text.node.active = false;
			this.bigWinnerNumber_text.node.active = false;
			this.bigWinnerCard_type_text.node.active = false;
			this.bigWinnerTime_text.node.active = false;
			return;
		}
		cv.StringTools.setShrinkString(this.bigWinnerName_text.node, luckDog.player_name, true);
		if (luckDog.hand_level >= 8 && luckDog.hand_level <= 10) {
			this.bigWinnerCard_type_text.string = cv.config.getStringData(`UITitle${112 + luckDog.hand_level}`);
		}

		let blind: string = "";
		if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
			blind = cv.config.getblindString(cv.GameDataManager.tRoomData.pkRoomParam.rule_blind_enum - 1);
			blind = blind.substr(0, blind.indexOf("/"));
		}
		else {
			blind = cv.config.getblindString(cv.GameDataManager.tRoomData.pkRoomParam.rule_blind_enum - 1);
		}

		this.bigWinnerTime_text.string = luckDog.award_time == 0 ? "" : cv.StringTools.formatTime(luckDog.award_time, cv.Enum.eTimeType.Month_Day, false) + "(" + blind + ")";

		let amount = cv.StringTools.numberToString(luckDog.award_amount / 100);
		this.bigWinnerNumber_text.string = amount.toString();
		//this.bigWinnerNumber_text.enableBold = true;
		if (award_players.length > 0) {
			this.jackPotInfo_text.node.active = false;
			//this.jackPotInfo_text.string = cv.StringTools.formatC(cv.config.getStringData("UIGameJackpotPlayerAwardAmount"), luckDog.player_name.toString(), amount);
		}
		
	}
	private setDissPanel() {
		this.jackPot_panel.active = false;
		this.jackPotSign_panel.active = false;
		this.allJackpotInfo_panel.active = false;

		this.allJackpot_img.active = false;
		this.jackpot_img.active = false;
		this.jackpotRecord_img.active = false;

		cc.find("button_panel/allJackpotInfo_button/Label", this.node).color = new cc.Color().fromHEX("#898A8A");
		cc.find("button_panel/jackpot_button/Label", this.node).color = new cc.Color().fromHEX("#898A8A");
		cc.find("button_panel/jackpotRecord_button/Label", this.node).color = new cc.Color().fromHEX("#898A8A");

		cc.find("button_panel/allJackpotInfo_button/Label", this.node).getComponent(cc.Label).enableBold = false;
		cc.find("button_panel/jackpot_button/Label", this.node).getComponent(cc.Label).enableBold = false;
		cc.find("button_panel/jackpotRecord_button/Label", this.node).getComponent(cc.Label).enableBold = false;
	}
	private initBlindArr(infos:any[])
	{
		this.blindArr = [];
		let list = [];
		let list1 = [];
		for (let index = 0; index < Blind_ClubMax; index++) {
			let blind = cv.config.getblindString(index);
			blind = blind.substr(0, blind.indexOf("/"));
			list[index] = cv.Number(blind);
			list1[index] = cv.Number(blind);
		}
		list.sort(function (a, b) {
			return a - b;
		});
		for (let i = 0; i < list.length; i++) {
			for (let j = 0; j < list1.length; j++) {
				if(list[i] == list1[j])
				{
					for (let index = 0; index < infos.length; index++) {
						if(infos[index].blind_level - 1  == j) 
						{
							this.blindArr.push(j);
						}
					}
					break;
				}
			}
		}
		
		// let iw = 155;
		// let ih = 166;
		// let xhgp = 8;
		// let yhgp = 8;
		// let height = this.blindArr.length * 215 / 3 + 4 * 8;
		// if (height > this.infoScorllView.content.height) {
		// 	this.infoScorllView.content.height = height;
		// }
		// for (let i = 0; i < this.blindArr.length; i++) {
		// 	let item = cc.instantiate(this.jackPotItem)
		// 	item.setPosition((iw + i % 3 * (xhgp + 284)), -190 / 2 - Math.floor(i / 3) * (yhgp + 190));
		// 	item.name = this.blindArr[i].toString();
		// 	item.active = true;
		// 	this.updateItem(item, false, this.blindArr[i]);
		// 	this.infoScorllView.content.addChild(item);
		let dataList = [];
		let line = 0;
		let lineNum = 2;
        for (let index = 0; index < this.blindArr.length;) {
            let obdata = [];
            for (let i = 0; i < lineNum; i++) {
                let curindex = i + line*lineNum;
                if(curindex < this.blindArr.length){

					//let amount = 0;
					let data = new dataItem();
					data.blind = this.blindArr[curindex];
					data.amount = 0;

					for (let j = 0; j < infos.length; j++) {
						//for (let i = 0; i < this.blindArr.length; i++) {
							if (this.blindArr[curindex] == infos[j].blind_level - 1)//服务器端从1开始
							{
								data.amount = infos[j].amount;
								// let item = this.infoScorllView.content.getChildByName(this.blindArr[i].toString());
								// this.setIsOpen(item, true);
								// this.updateItemAmount(item, infos[j].amount)
								//amount += infos[j].amount;
							}
						//}
					}

                    obdata.push(data);
                    index++
                }else{
                    break;
                }
			}
			
            dataList.push({ type: 0, data: obdata });
            line++;
		}
		
        this.infoScorllView.getComponent(ListView).init(this.bindcallfunc.bind(this), this.getItemType.bind(this));
        this.infoScorllView.getComponent(ListView).notifyDataSetChanged(dataList);
	}

	public bindcallfunc(node: cc.Node, info, i) {
        console.log(info);
        console.log(i);
        if (info.type == 0) {
            node.getComponent(GameJackpotItem).setdata(info.data);
        }
    }

	public bindrecordcallfunc(node: cc.Node, info, i) {
        console.log(info);
        console.log(i);
        if (info.type == 0) {
            node.getComponent(GameJackPotSignItem).setdata(info.data);
        }
	}
	
	public getItemType(data, index) {
        return data.type;
    }
}
