import cv from "../cv";

const {ccclass, property} = cc._decorator;
import { FeedbackCommentData } from "../../../../Script/data/userData";

@ccclass
export default class FeedbackDetailItem extends cc.Component {
    @property(cc.Node) my_speak_panel: cc.Node = null;
    @property(cc.Node) other_speak_panel: cc.Node = null;
    @property(cc.Node) my_imgs: cc.Node[] = [];
    @property(cc.Node) time: cc.Node = null;

    private my_imgSize:cc.Size = cc.size(0, 0);
    private interval:number = 0;
    onLoad()
    {
        this.my_imgSize = this.my_imgs[0].getContentSize();
        this.interval = this.my_imgs[1].x - this.my_imgs[0].x;
    }

    updateData(data:FeedbackCommentData)
    {
        for (let i = 0; i < this.my_imgs.length; i++) {
            this.my_imgs[i].active = false;
        }
        let isSelf = data.type == 1;
        this.my_speak_panel.active = isSelf;
        this.other_speak_panel.active = !isSelf;
        this.time.getComponent(cc.Label).string = cv.StringTools.formatTime(data.create_time, cv.Enum.eTimeType.Year_Month_Day_Hour_Min_Sec);
        if(data.type == 1) {
            this._setSelfData(data);
        } else {
            this._setOtherData(data);
        }
    }

    private _setSelfData(data:FeedbackCommentData)
    {
        let bg = cc.find("bg", this.my_speak_panel);
        let imgNum = 0;
        let label = cc.find("label", this.my_speak_panel);
        let size = cv.resMgr.getLabelStringSize(label.getComponent(cc.Label), data.content)
        if(size.width > 806) {
            label.width = 806;
            label.getComponent(cc.Label).overflow = cc.Label.Overflow.RESIZE_HEIGHT;
            label.getComponent(cc.Label)._forceUpdateRenderData(true);
            size = label.getContentSize();
        } else {
            label.getComponent(cc.Label).overflow = cc.Label.Overflow.NONE;
        }

        for (let i = 0; i < data.pics.length; i++) {
            this.my_imgs[i].active = true;
            imgNum++;
            cv.resMgr.loadRemote(data.pics[i], function (error: Error, resource: cc.Texture2D) {
                if (error) {
                    console.log(error.message || error);
                    return;
                }
                this.my_imgs[i].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(resource);
            }.bind(this));
        }
        if(imgNum != 0) {
            let imgW = this.interval * (imgNum - 1) + this.my_imgSize.width;
            if(imgW > size.width){
                bg.width = imgW + 80;
                this._updataSelfPanel(-imgW - 80);
            }else {
                bg.width = size.width + 60;
                this._updataSelfPanel(-size.width - 60);
            }
            if(data.content.length > 0) {
                bg.height = label.height + this.my_imgSize.height + 80 + 30;
            } else {
                bg.height = this.my_imgSize.height + 80;
            }
        }else {
            bg.width = size.width + 60;
            bg.height = size.height + 80;
        }
        this.time.y = bg.y - bg.height - 40;
        this.node.height = bg.height + 46 + 20 + 50 + 40;
    }

    private _updataSelfPanel(firstX:number)
    {
        let label = cc.find("label", this.my_speak_panel);
        for (let i = 0; i < this.my_imgs.length; i++) {
            if(this.my_imgs[i].active){
                this.my_imgs[i].x = firstX + this.my_imgSize.width / 2 + this.interval * i;
                if(label.getComponent(cc.Label).string.length > 0) {
                    this.my_imgs[i].y = label.y - label.height - 30 - this.my_imgs[i].height / 2;
                } else {
                    this.my_imgs[i].y = label.y - this.my_imgs[i].height / 2;
                }
            }
        }
        label.x = firstX + label.width;
    }

    private _setOtherData(data:FeedbackCommentData)
    {
        let name = cc.find("name", this.other_speak_panel);
        let bg = cc.find("bg", this.other_speak_panel);
        name.getComponent(cc.Label).string = data.name;
        let label = cc.find("label", this.other_speak_panel);
        let size = cv.resMgr.getLabelStringSize(label.getComponent(cc.Label), data.content)
        if(size.width > 806) {
            label.width = 806;
            label.getComponent(cc.Label).overflow = cc.Label.Overflow.RESIZE_HEIGHT;
            label.getComponent(cc.Label)._forceUpdateRenderData(true);
            size = label.getContentSize();
        } else {
            label.getComponent(cc.Label).overflow = cc.Label.Overflow.NONE;
        }
        bg.width = size.width + 60;
        bg.height = size.height + 60;
        this.time.y = bg.y - bg.height - 40;
        this.node.height = bg.height + 212;
    }
}
