// import ws_protocol = require("../../../common/pb/ws_protocol");
// import world_pb = ws_protocol.pb;

import cv from "../../../components/lobby/cv";
import { LANGUAGE_TYPE } from "../../../common/tools/Enum";
import { TableView } from "../../../common/tools/TableView";
import ws_protocol = require("../../../common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

export class MiniGameNewRoomListItemElectData {
    gameCode: string = "";                                                  // gameCode
    status: number = 0;                                                 // 游戏状态
    label: number = 0;                                                   // 游戏标签
    iconUrl:string = "";                                                 //游戏图标
    gameName: string = "";                                               //游戏名称                    
    isChamPoin: number = 1;                                               //是否锦标赛, 1 false 2 ture      
}

export class MiniGameNewRoomListItemElectsInfo {
    items: MiniGameNewRoomListItemElectData[] = [];
}

const { ccclass, property } = cc._decorator;
@ccclass
export class MiniGameNewRoomListItemElect extends cc.Component {
    @property({ type: [cc.Node] }) node_items: cc.Node[] = [];

    static g_class_name: string = "MiniGameNewRoomListItemElect";
    private _dataRef: MiniGameNewRoomListItemElectsInfo = null;

    private _img_icons: cc.Node[] = [];
    private _txt_titles: cc.Label[] = [];
    private _img_flag: cc.Node[] = [];
    private _txt_tips: cc.Node[] = [];
    private _img_ChamPion: cc.Node[] = [];

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node, true);

        for (let i = 0; i < this.node_items.length; ++i) {
            let img_icon: cc.Node = this.node_items[i].getChildByName("img_icon");
            let img_flag: cc.Node = img_icon.getChildByName("img_flag");
            let tips: cc.Node = this.node_items[i].getChildByName("tips");
            let txt_title: cc.Label = this.node_items[i].getChildByName("txt_title").getComponent(cc.Label);
            let _img_ChamPion: cc.Node = img_icon.getChildByName("img_ChamPion");

            this._img_icons.push(img_icon);
            this._txt_titles.push(txt_title);
            this._img_flag.push(img_flag);
            this._txt_tips.push(tips);
            this._img_ChamPion.push(_img_ChamPion);

            img_icon.on("click", (event: cc.Event): void => { this._onClickBtn(event, i) }, this);
        }
    }

    protected start(): void {
    }

    protected onEnable(): void {
    }

    protected onDisable(): void {
    }

    private _onClickBtn(event: cc.Event, idx: number): void {
        cv.AudioMgr.playButtonSound('button_click');

        if (!this._dataRef) return;
        if (idx < 0 || idx >= this._dataRef.items.length) return;
        cv.MessageCenter.send(`${MiniGameNewRoomListItemElect.g_class_name}_click`, this._dataRef.items[idx]);
    }

    updateSVReuseData(index: number, info: MiniGameNewRoomListItemElectsInfo, view?: TableView): void {
        this._dataRef = info;

        for (let i = 0; i < this.node_items.length; ++i) {
            let node: cc.Node = this.node_items[i];
            node.active = i < info.items.length;
            if (!node.active) continue;

            let t: MiniGameNewRoomListItemElectData = info.items[i];
            let img_icon: cc.Node = this._img_icons[i];
            let txt_title: cc.Label = this._txt_titles[i];
            let img_flag: cc.Node = this._img_flag[i];
            let txt_tips: cc.Node = this._txt_tips[i];
            let img_ChamPion: cc.Node = this._img_ChamPion[i];

            txt_title.string = t.gameName;
            //电子小游戏图标改成后台配置
            txt_tips.active = true;
            img_flag.active = false;
            img_ChamPion.active = false;

            cv.resMgr.loadRemote(t.iconUrl, function (error: Error, resource: cc.Texture2D) {
                if (error) {
                    console.log(error.message || error);
                    return;
                }
                txt_tips.active = false;
                let frame = new cc.SpriteFrame(resource);
                let defaultSprite = img_icon.getComponent(cc.Sprite);
                defaultSprite.spriteFrame = frame;
            }.bind(this));

            if(t.isChamPoin === 2){  //表示是锦标赛
                cv.resMgr.setSpriteFrame(img_ChamPion, cv.config.getLanguagePath("hall/miniGame/new/itemFlag/ic_slots_championship"));
                img_ChamPion.active = true;
            }

            if(t.label !=  world_pb.PgGameLabel.LabelNormal){
                let labelName = "";  //推荐
                switch(t.label){
                    case world_pb.PgGameLabel.LabelPopular:  //最受欢迎
                        labelName = "ic_slots_popular";
                        break;
                    
                    case world_pb.PgGameLabel.LabelMost:  //最多人玩
                        labelName = "ic_slots_trend";
                        break;

                    case world_pb.PgGameLabel.LabelRecommend:  //人工推荐
                        labelName = "ic_slots_featured";
                        break;

                    case world_pb.PgGameLabel.LabelNew:  //最新
                        labelName = "ic_slots_new";
                        break;
                }

                if(labelName.length > 0){
                    img_flag.active = true;
                    cv.resMgr.setSpriteFrame(img_flag, cv.config.getLanguagePath("hall/miniGame/new/itemFlag/" + labelName));
                }
            }
          
        }
    }
}
