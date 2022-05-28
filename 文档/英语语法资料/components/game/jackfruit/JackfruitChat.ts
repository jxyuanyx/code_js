import cv from "../../lobby/cv";
import JackfruitMgr from "./JackfruitManager";
import {ChatType} from "./JackfruitData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class JackfruitChat extends cc.Component {

    @property(cc.Node) chat_node_list: cc.Node[] = [];
    @property(cc.Label) chat_label_list: cc.Label[] = [];
    public lostTime:number = 0;
    public isEnabled:boolean = true;
    
    onLoad () {
        for (let i = 0; i < 4; i++) {
            this.chat_node_list[i].on(cc.Node.EventType.TOUCH_START, (event: cc.Event): void => {
                let time = (new Date()).getTime();
                if(!this.isEnabled)
                {
                    this.lostTime = time;
                    cv.jackfruitNet.requestSendChat(cv.roomManager.getCurrentRoomID(), ChatType.Enum_Barrage, i.toString());
                    this.node.active = false;
                }
            }, this);
            this.chat_label_list[i].string = cv.config.getStringData("jackfruit_chat_label_list_" + i);
        }
    }

    setLabel(isEnabled:boolean)
    {
        this.isEnabled = isEnabled;
        for (let i = 0; i < 4; i++) {
            this.chat_label_list[i].node.opacity = isEnabled ? 76.5 : 255;
        }
    }

    update (dt) { 
        let time = (new Date()).getTime()
        this.setLabel(time -  this.lostTime < JackfruitMgr.tRoomData.barrageLeftSeconds *1000);
    }
}
