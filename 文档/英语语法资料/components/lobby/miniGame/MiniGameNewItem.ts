import cv from "../../../components/lobby/cv";
import { LANGUAGE_TYPE } from "../../../common/tools/Enum";
import { TableView } from "../../../common/tools/TableView";
import ws_protocol = require("./../../../common/pb/ws_protocol");
import world_pb = ws_protocol.pb;

export class MiniGameNewItemData {
    gameid: number = 0;                                         // 游戏id
    online: number = 0;                                         // 在线总人数
    status: number = 0;                                         // 游戏状态(0 维护, 1 正常)
    bHot:boolean = false;                                       //是否显示hot图标
    label:world_pb.MiniLabel = 0;                               //小游戏显示标签 0：正常不显示  1： 显示new标签
}

export class MiniGameNewItemsInfo {
    items: MiniGameNewItemData[] = [];
}

const { ccclass, property } = cc._decorator;
@ccclass
export class MiniGameNewItem extends cc.Component {
    @property({ type: [cc.Sprite] }) img_bg: cc.Sprite[] = [];
    @property({ type: [cc.Sprite] }) img_icon: cc.Sprite[] = [];
    @property({ type: [cc.Sprite] }) img_title: cc.Sprite[] = [];
    @property({ type: [cc.Sprite] }) img_hot: cc.Sprite[] = [];
    @property({ type: [cc.Label] }) txt_online: cc.Label[] = [];
    @property({ type: [cc.Sprite] }) img_new: cc.Sprite[] = [];


    static g_class_name: string = "MiniGameNewItem";
    private _dataRef: MiniGameNewItemsInfo = null;

    protected onLoad(): void {
        cv.resMgr.adaptWidget(this.node, true);
    }

    protected start(): void {
    }

    protected onEnable(): void {
    }

    protected onDisable(): void {
    }

    protected onDestroy(): void {
    }

    updateSVReuseData(index: number, info: MiniGameNewItemsInfo, view?: TableView): void {
        this._dataRef = info;
        let cellType: number = view.getCellType(index);

        for (let i = 0; i < this.img_bg.length; ++i) {
            let img_bg: cc.Sprite = this.img_bg[i];
            let img_icon: cc.Sprite = this.img_icon[i];
            let img_title: cc.Sprite = this.img_title[i];
            let img_hot: cc.Sprite = this.img_hot[i];
            let txt_online: cc.Label = this.txt_online[i];
            let img_new: cc.Sprite = this.img_new[i];

            img_bg.node.active = i < info.items.length;
            if (!img_bg.node.active) continue;

            let t: MiniGameNewItemData = info.items[i];
            let path_bg: string = `hall/miniGame/new/itemBg/bg_${t.gameid}`;
            let path_icon: string = `hall/miniGame/new/itemIcon/native/normal_icon_${t.gameid}`;
            let path_title: string = `hall/miniGame/new/itemTitle/normal_title_${t.gameid}`;

            // 有游戏id
            if (t.gameid > 0) {
                if (t.status === 0) {
                    path_bg = `hall/miniGame/new/itemBg/bg_disable_${cellType}`;
                    path_icon = `hall/miniGame/new/itemIcon/native/maintain_icon_${t.gameid}`;
                    path_title = `hall/miniGame/new/itemTitle/maintain_title_${t.gameid}`;
                }

                cv.resMgr.setSpriteFrame(img_bg.node, cv.config.getLanguagePath(path_bg, LANGUAGE_TYPE.zh_CN));
                cv.resMgr.setSpriteFrame(img_icon.node, cv.config.getLanguagePath(path_icon, LANGUAGE_TYPE.zh_CN));
                cv.resMgr.setSpriteFrame(img_title.node, cv.config.getLanguagePath(path_title));

                img_bg.getComponent(cc.Button).enabled = true;
                txt_online.node.active = true;
                img_hot.node.active = t.bHot;
                img_new.node.active = (t.label === world_pb.MiniLabel.MiniLabelNew)?true:false;

                if (t.status !== 0) {
                    txt_online.string = `${cv.config.getStringData("minigame_new_online")} ${t.online}`;
                }
                else {
                    txt_online.string = cv.config.getStringData("minigame_new_maintain");
                }
            }
            // 无游戏id, 则认为是待开放游戏...
            else {
                cv.resMgr.setSpriteFrame(img_bg.node, cv.config.getLanguagePath(path_bg, LANGUAGE_TYPE.zh_CN));
                cv.resMgr.setSpriteFrame(img_icon.node, cv.config.getLanguagePath(path_icon, LANGUAGE_TYPE.zh_CN));
                cv.resMgr.setSpriteFrame(img_title.node, cv.config.getLanguagePath(path_title, LANGUAGE_TYPE.zh_CN));

                img_bg.getComponent(cc.Button).enabled = false;
                txt_online.node.active = false;
                img_hot.node.active = false;
                img_new.node.active = false;
            }

            // 横向排版"在线人数/HOT"
            switch (cellType) {
                // 左对齐
                case 0: {
                    let img: cc.Sprite = this.img_hot[i];
                    if (img.node.active) {
                        let txt: cc.Label = this.txt_online[i];
                        let txt_w: number = cv.resMgr.getLabelStringSize(txt).width;
                        let x: number = txt.node.x;
                        let y: number = txt.node.y;
                        let offset: number = 0;

                        x += txt_w * txt.node.scaleX * (1 - txt.node.anchorX);
                        x += offset;
                        x += img.node.width * img.node.anchorX;
                        img.node.setPosition(x, y);
                    }
                } break;

                // 居中
                case 1: {
                    let img: cc.Sprite = this.img_hot[i];
                    let txt: cc.Label = this.txt_online[i];
                    let txt_w: number = cv.resMgr.getLabelStringSize(txt).width;
                    let x: number = -img_bg.node.width * img_bg.node.anchorX;
                    let y: number = txt.node.y;
                    let offset: number = 0;

                    // 计算居中起始横坐标
                    let left_w: number = img_bg.node.width;
                    left_w -= txt_w;
                    if (img.node.active) {
                        left_w -= img.node.width * img.node.scaleX;
                    }
                    left_w /= 2;
                    x += left_w;

                    // 文本位置
                    x += txt_w * txt.node.scaleX * txt.node.anchorX;
                    txt.node.setPosition(x, y);

                    // 图片位置
                    if (img.node.active) {
                        x += txt_w * txt.node.scaleX * (1 - txt.node.anchorX);
                        x += offset;
                        x += img.node.width * img.node.anchorX;
                        img.node.setPosition(x, y);
                    }
                } break;

                default: break;
            }
        }
    }

    onClickItem(event: cc.Event, idx: number): void {
        cv.AudioMgr.playButtonSound('button_click');
        
        if (!this._dataRef) return;
        if (idx < 0 || idx >= this._dataRef.items.length) return;
        cv.MessageCenter.send(`${MiniGameNewItem.g_class_name}_click`, this._dataRef.items[idx]);
    }
}
