import cv from "../../lobby/cv";

export class dataItem {
	blind: number = null;
	amount: number = null;
}

const { ccclass, property } = cc._decorator;
@ccclass
export class GameJackpotItem extends cc.Component {
    @property((cc.Node)) levelList:cc.Node [] = [];

    lineLevelData: dataItem[] = null;

    setdata(data: dataItem []) {
        this.lineLevelData = data;
        for (let index = 0; index < data.length; index++) {
            this.setleveldata(data[index],index);
        }
        //有设置数据的就显示，没有数据的隐藏
        let len = data.length;
        for (let index = 0; index < this.levelList.length; index++) {
            this.levelList[index].active = index < len;
        }
    }

    setleveldata(data: dataItem,index:number){
        let _potNum_text: cc.Label = this.levelList[index].getChildByName("potNum_text").getComponent(cc.Label);
        _potNum_text.enableBold = true;
		let _bindNum_tex: cc.Label = this.levelList[index].getChildByName("bindNum_text").getComponent(cc.Label);
        let bindNum_des_text: cc.Label = this.levelList[index].getChildByName("bindNum_des_text").getComponent(cc.Label);
        
        if (cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN) {
            bindNum_des_text.node.setPosition(bindNum_des_text.node.getPosition().x, -78);
        }

		bindNum_des_text.string = cv.config.getStringData("ClubJackPotItem_Node_bindNum_text");
        _potNum_text.string = cv.StringTools.numberToString(data.amount / 100);
		bindNum_des_text.string = cv.config.getStringData("ClubJackPotItem_Node_bindNum_text");
		let blind = cv.config.getblindString(data.blind);
		if (cv.GameDataManager.tRoomData.pkRoomParam.game_mode == cv.Enum.CreateGameMode.CreateGame_Mode_Short) {
			blind = blind.substr(0, blind.indexOf("/"));
		}
		_bindNum_tex.string = blind;
    }
}