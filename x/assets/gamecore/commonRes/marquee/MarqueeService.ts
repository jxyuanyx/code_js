import App from "../../App";
import { COMMON_RES } from "../../manager/imps/CommonResManager";
import GameHelper from "../../tools/GameHelper";
import { Marquee, NoticeType_MarQuee } from "./Marquee";


export  class MarqueeService{
    
    public static _noticeService:MarqueeService=null;

    private _marquee:Marquee=null;


    static getInstance(){
      if(!this._noticeService){
          this._noticeService=new MarqueeService();
      }
      return this._noticeService;
    }

    constructor(){
        App.NoticeManager.addMsgType(NoticeType_MarQuee);
        let view:cc.Node=cc.instantiate(App.CommonResManager.getRes(COMMON_RES.MARQUEE) as cc.Prefab);
        this._marquee=view.getComponent(Marquee);
        cc.game.addPersistRootNode(view);
        view.zIndex=999;
        let safeAreaRect=cc.sys.getSafeAreaRect();
        let offsetY=safeAreaRect.height-cc.winSize.height;
        this._marquee.node.setPosition(0,safeAreaRect.height-offsetY-140);
        this._marquee.node.active=false;
    }


    startMarqueeNotice(){
        if(!this._marquee.node.active){
            this._marquee.showNotice()
        }
    }
}