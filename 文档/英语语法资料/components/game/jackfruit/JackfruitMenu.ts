import cv from "../../lobby/cv";
import JackfruitMgr from "./JackfruitManager";
import {eRoundState} from "./JackfruitData";
import {JackfruitGameRule} from "./JackfruitGameRule"
import {JackfruitScene} from "./JackfruitScene"
import {JackfruitSetting} from "./JackfruitSetting"
import {JackfruitCardScore} from "./JackfruitCardScore"


const { ccclass, property } = cc._decorator;

@ccclass
export class JackfruitMenu extends cc.Component {
    @property(cc.Prefab) public goldview: cc.Prefab = null;
	@property(cc.Node) public menubg: cc.Node = null;
	@property(cc.Button) public standUp_button: cc.Button = null;
	@property(cc.Button) public ruleDiscription_button: cc.Button = null;
	@property(cc.Button) public changeCard_button: cc.Button = null;
	@property(cc.Button) public exitPoker_button: cc.Button = null;
	@property(cc.Button) public witchServer_button: cc.Button = null;
	@property(cc.Button) public cardMultiples_button: cc.Button = null;
	@property(cc.Button) public changeTable_button: cc.Button = null;

	public menuList: cc.Button[] = [];
	public menuImgList: cc.Node[] = [];
	public game: JackfruitScene = null;
	constructor() {
		super();
	}
	onLoad() {
        let goldView:cc.Node = cc.instantiate(this.goldview);
        cc.find("gold_Panel", this.node).addChild(goldView);
		cv.resMgr.adaptWidget(this.node, true);
		this.init();
	}
	
	setGameScene(scene:JackfruitScene)
	{
		this.game = scene;
	}

	start() {
		this.initLanguage();
	}

	public init() {
		this.menuList.push(this.witchServer_button);
		this.menuList.push(this.ruleDiscription_button);
		this.menuList.push(this.cardMultiples_button);
		this.menuList.push(this.changeCard_button);
		this.menuList.push(this.changeTable_button);
		this.menuList.push(this.standUp_button);
		this.menuList.push(this.exitPoker_button);
		for (let i = 0; i < 7; i++) {
			this.menuImgList.push(cc.find("menu_img" + i, this.node));
		}
	}

	public initLanguage() {
		cv.StringTools.setLabelString(this.standUp_button.node, "Label", "GameScene_menu_Panel_menu_img0_aroundLook_button");
		cv.StringTools.setLabelString(this.ruleDiscription_button.node, "Label", "jackfruit_menu_ruleDiscription_button_label");
		cv.StringTools.setLabelString(this.changeCard_button.node, "Label", "GameScene_menu_Panel_menu_img7_changeCard_button");
		cv.StringTools.setLabelString(this.exitPoker_button.node, "Label", "GameScene_menu_Panel_menu_img9_exitPoker_button");
		cv.StringTools.setLabelString(this.witchServer_button.node, "Label", "GameScene_menu_Panel_menu_img11_settlement_button");
		cv.StringTools.setLabelString(this.cardMultiples_button.node, "Label", "jackfruit_menu_cardMultiples_button_label");
		cv.StringTools.setLabelString(this.changeTable_button.node, "Label", "jackfruit_menu_changetable_button_label");
	}

	public onClickSelf(evt) {
		this.node.active = false;
	}

	public enableMenuButton(index: number, isSeat: boolean) {
		this.menuList[index].interactable = isSeat;
		console.log("index：" +index+"  isSeat::" + isSeat　);
		this.menuImgList[index].active = true;
		//this.menuList[index].getComponent(cc.Button).enabled = false;
		if (this.menuList[index].interactable) {
			this.menuList[index].node.color = cc.color(255, 255, 255);
			cc.find("Label", this.menuList[index].node).color = cc.color(255, 255, 255);
		}
		else {
			this.menuList[index].node.color = cc.color(130, 130, 130);
			cc.find("Label", this.menuList[index].node).color = cc.color(130, 130, 130);
		}
	}

	public updateMenu() {
		let offsetY: number = 0;
		if (cv.config.IS_FULLSCREEN) {
			offsetY = cv.config.FULLSCREEN_OFFSETY;
		}
		let _isSeat: boolean = (JackfruitMgr.tRoomData.nSelfSeatID != -1);
		this.enableMenuButton(0, true);
		this.enableMenuButton(1, true);
		this.enableMenuButton(2, true);
		this.enableMenuButton(3, true);
		this.enableMenuButton(4, !_isSeat);
		this.enableMenuButton(5, _isSeat);
		this.enableMenuButton(6, true);
		this.menuImgList[4].active = !_isSeat;

		let showLen = 0;
		for(let i = 0; i < this.menuImgList.length; i ++){
			if(this.menuImgList[i].active){
				this.menuImgList[i].setPosition(this.menuImgList[i].getPosition().x, this.menuImgList[0].y - showLen*130);
				showLen++;
			}
		}
		
		this.menubg.setContentSize(cc.size(this.menubg.getContentSize().width, 180 + 130 * showLen + offsetY));
	}
	
	public onBtnCardMultiplesButton() {
		cv.AudioMgr.playButtonSound('tab');
		// cv.StatusView.show(false);
		this.game.card_score_Panel.getComponent(JackfruitCardScore).show();
	}

	public onBtnstandUpButton() {
		cv.AudioMgr.playButtonSound('tab');
		this.node.active = false
		cv.jackfruitNet.requestStandUp(cv.GameDataManager.tRoomData.u32RoomId);
		
	}

	public onBtnRuleDiscription() {
		cv.AudioMgr.playButtonSound('tab');
		// cv.StatusView.show(false);
		this.game.gamerule_Panel.getComponent(JackfruitGameRule).show();
	}

	public onBtnChangeCard() {
		cv.AudioMgr.playButtonSound('tab');
		console.log("onBtnChangeCard");
        cv.tools.SaveStringByCCFile("changeCard_button", "1");
		// this.game.changeCard_panel.active = true;
		this.game.setting_Panel.getComponent(JackfruitSetting).show();
		this.node.active = false;
	}
	
	public onBtnExitPoker() {
		cv.AudioMgr.playButtonSound('tab');
		this.node.active = false;
		cv.roomManager.RequestLeaveRoom();
	}
	
	public onBtnChangeTable() {
		cv.AudioMgr.playButtonSound('tab');
		this.node.active = false;
        cv.jackfruitNet.requestChangeTable();
	}

    private onClickSwitchServer(evt) {
		cv.AudioMgr.playButtonSound('tab');
        cv.TP.showMsg(cv.config.getStringData("UIWitchServer2"), cv.Enum.ButtonStyle.TWO_BUTTON, this.onGoReconnect.bind(this));
	}
	
    private onGoReconnect() {
        cv.netWorkManager.onGoReconnect();
	}
}
