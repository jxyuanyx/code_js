import {BundleManager} from "./manager/imps/BundleManager";
import {DlgManager} from "./manager/imps/DlgManager";
import {SceneManager} from "./manager/imps/SceneManager";
import App from "./App";
import {LogManager} from "./manager/imps/LogManager";
import {DataManager} from "./manager/imps/DataManager";
import {DlgEnum} from "./enums/DlgEnum";
import { HttpManager } from "./manager/imps/HttpManager";
import { LangManager } from "./manager/imps/LangManager";
import { NativeManager } from "./manager/imps/NativeManager";
import { CommonResManager, COMMON_RES } from "./manager/imps/CommonResManager";
import { NoticeManager } from "./manager/imps/NoticeManager";
import { MarqueeService } from "./commonRes/marquee/MarqueeService";
import { AudioManager } from "./manager/imps/AudioManager";
import GameNet from "./net/imps/GameNet";

const {ccclass, property} = cc._decorator;

@ccclass
export class BaseGame extends cc.Component{

    @property(cc.SpriteFrame)
    private dlgBg:cc.SpriteFrame=null;

    private _cursor:cc.Node;

    onLoad(){
        this._init();
    
        App.DlgManager.setDlgBg(this.dlgBg);
        this._addEvent();
        this.initCommon();
    }

    _init(){
        App.BundleManager=new BundleManager();
        App.DlgManager=new DlgManager();
        App.SceneManager=new SceneManager();
        App.LogManager=new LogManager();
        App.DataManager=new DataManager();
        App.HttpManager=new HttpManager();
        App.LangManager=new LangManager();
        App.NativeManager=new NativeManager();
        App.Net=new GameNet();
        App.CommonResManager=new CommonResManager();
        App.DlgManager.init(DlgEnum.FADE);
        App.NoticeManager=new NoticeManager();
        App.AudioManager=new AudioManager();
    }

    _addEvent(){
    
    }

    startGame(){
        //设置光标
        let cursorInstance=App.CommonResManager.getRes(COMMON_RES.CURSOR) as cc.Prefab;
        this._cursor=cc.instantiate(cursorInstance);
        MarqueeService.getInstance();
    }

    initCommon(){
        App.CommonResManager.loadSystemRes(this.startGame,this);
        

        cc.Button.prototype["touchBeganClone"] = cc.Button.prototype["_onTouchEnded"];

        cc.Button.prototype["_onTouchEnded"] = function (event) {
            if(App.isRestarting)return
            if (this.interactable && this.enabledInHierarchy&&event.currentTarget.sound!=false) {
                App.AudioManager.playSound("gamecore","sounds/click");
            }
            this.touchBeganClone(event);
        }


        cc.Toggle.prototype["_onTouchEnded"] = function (event) {
            if(App.isRestarting)return
            if (this.interactable && this.enabledInHierarchy) {
                App.AudioManager.playSound("gamecore","sounds/tab");
            }
            this.touchBeganClone(event);
        }


        //
        
        cc.EditBox.prototype["_updateStringClone"]=cc.EditBox.prototype["_updateString"];

        cc.EditBox.prototype["editBoxEditingDidEndedClone"]=cc.EditBox.prototype["editBoxEditingDidEnded"];

        let self=this;
         //添加事件
         cc.EditBox.prototype["_updateString"]=function(str){
            let label:cc.Label=this.textLabel as cc.Label;
            this._updateStringClone(str);
            //@ts-ignore
            label._forceUpdateRenderData();
            self._cursor.x=label.node.x+label.node.width*(1-label.node.getAnchorPoint().x)+2;
        }

        cc.EditBox.prototype["editBoxEditingDidEnded"]=function(){
            this.editBoxEditingDidEndedClone();
            self._cursor.removeFromParent(false);
        }


        cc.EditBox.prototype["_onTouchBegan"]=function (event){
            let touch=event.touch
            let node=event.target
            let upLoadY=touch.getLocationY()
            let nodePos=node.convertToNodeSpaceAR(touch.getLocation())
            upLoadY-=nodePos.y+node.height/2
            if(cc.sys.isNative){
                if(cc.sys.os==cc.sys.OS_ANDROID){
                    jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "upLoadEditBoxY", "(Ljava/lang/String;)V",upLoadY*cc.view.getScaleY())                                
                }else{
                    
                }
            }

            //设置光标
            self._cursor.removeFromParent(false);
            let label:cc.Label=this.textLabel as cc.Label;
            self._cursor.color=label.node.color;
            label.overflow=cc.Label.Overflow.NONE;
            //label.node.x=label.node.parent.getChildByName("PLACEHOLDER_LABEL").x;
            //设置
            /*
            if(label.node.anchorX==0.5){
                label.node.anchorX=label.node.anchorX=0;
            }*/
            self._cursor.height=label.lineHeight;
            self._cursor.setAnchorPoint(label.node.getAnchorPoint());
            self._cursor.setPosition(label.node.position);
            label.node.parent.addChild(self._cursor);
            this._updateString(label.string)
        }
    }
}