
import cv from "../../../components/lobby/cv"
import FaceItem from "./JackfruitFaceItem";
import JackfruitMgr from "./JackfruitManager";

const {ccclass, property} = cc._decorator;

@ccclass
export class JackfruitFace extends cc.Component {

    @property(cc.Prefab) faceItem: cc.Prefab = null;
    _opcityNum: number = 0;

    onLoad () {
        let viewpanel = this.node.getChildByName("view_panel");
        let size = viewpanel.getContentSize();
        for (let i = 0; i < 12; i++) {
            let item = cc.instantiate(this.faceItem);
            let itemSize = item.getContentSize();
            let pos = cc.v2(-(size.width - itemSize.width) / 2, (size.height - itemSize.height) / 2);
            item.getComponent(FaceItem).setData(i, JackfruitMgr.tRoomData.fee.emotionFee);
            item.setPosition(cc.v2(pos.x + Math.floor(i % 4) * itemSize.width, pos.y - Math.floor(i / 4) * itemSize.height));
            viewpanel.addChild(item);
        }
        cv.MessageCenter.register("effet_call", this.doOpcityX.bind(this), this.node);
    }

    onDestroy()
    {
        cv.MessageCenter.unregister("effet_call", this.node);
    }

    start () {

    }

    Update(f32Delta: number) {
        this._opcityNum = this._opcityNum - 1;
        if (this._opcityNum <= 150) {
            this.node.active = false;
            this._opcityNum = 300;
            this.unschedule(this.Update);
            return;
        }
        let num = this._opcityNum >= 255 ? 255 : this._opcityNum;
        this.doOpcity(this.node, num);
    }

    doOpcity(obj: cc.Node, opacityNum: number) {
        if (!obj) {
            return;
        }
        obj.opacity = opacityNum;
        let len = obj.childrenCount;
        let list = obj.children;
        for (let i = 0; i < len; i++) {
            list[i].opacity = opacityNum;
            if (list[i].childrenCount > 0) {
                this.doOpcity(list[i], opacityNum);
            }
        }
    }
    
    doOpcityX(sender: any) {
        this.doOpcity(this.node, 255);
        this.unschedule(this.Update);
        this._opcityNum = 300;
        this.schedule(this.Update, 0);
    }

    show()
    {
        this.unschedule(this.Update);
        this.node.active = true;
        this.doOpcity(this.node, 255);
    }
}
