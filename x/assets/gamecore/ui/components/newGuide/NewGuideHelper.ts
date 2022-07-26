// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../App";
import { GameEvents } from "../../../events/GameEvents";

export enum PassMode{
    OPERATION,      //手动放行
    AUTO            //自动放行
}

export  class GuideTask{
    id:number;          //任务ID
    desc:string;        //描述
    findStr:string;     //查找节点的位置
    delayTime:number;   //延迟多少秒去查找
    rect_light:cc.Rect; //要显示的区域
    rect_click:cc.Rect; //可点击的区域  
    p_offset:cc.Vec2;   //偏移位置 
    pass_mode:PassMode=PassMode.AUTO; //放行模式
    auto_next:boolean=true;
    next_id:number=0;
    data:any;
    hasMask:boolean=true;//是否需要遮罩
}

export enum GUIDE_EVENTS{
    START="guide_start",  //开始
    FINISH="guide_finish"  //完成
}

const { ccclass, property } = cc._decorator;
@ccclass

export  class NewGuideHelper{

    private _tasksMap:Map<string,Map<number,GuideTask>>=new Map();
    private _currentTask:GuideTask;     //当前进行中的任务
    private _guideView:cc.Node;

    private static _helper:NewGuideHelper;

    private _currentTaskKey:string;//当前的任务key

    static getInstance(){
        if(!this._helper){
            this._helper=new NewGuideHelper();
        }
        return this._helper;
    }
    /**
     * 初始化
     * @param taskConfigPath 
     */
    async init(taskConfigPath:string,viewPath:string,bundleName?:string,key?:string){
        if(!key)key=bundleName;
        this._currentTaskKey=key;
        if(this._tasksMap.get(key))return
        //加载配置文件
        await this._loadConfig(taskConfigPath,bundleName,key);
        if(this._guideView)return

        //加载

        let prefab=await App.BundleManager.loadAssestAsync(viewPath,cc.Prefab,bundleName)
        this._guideView=cc.instantiate(prefab);
        cc.game.addPersistRootNode(this._guideView);
        this._guideView.active=false;
        this._guideView.zIndex=9999;
        this._addEvent();
    }
    
    _addEvent(){

        cc.game.off(GameEvents.GUIDE_CLICK);
        cc.game.on(GameEvents.GUIDE_CLICK,this._onGuideClick,this);
        //this._guideView.on(cc.Node.EventType.TOUCH_START,this._onTouchStart,this);

        //this._guideView.on(cc.Node.EventType.TOUCH_MOVE,this._onTouchMove,this);
        //this._guideView.on(cc.Node.EventType.TOUCH_CANCEL,this._onTouchEnd,this);
        //this._guideView.on(cc.Node.EventType.TOUCH_END,this._onTouchEnd,this);

    }

    _onGuideClick(){
       
        //自动放行模式
        if(this._currentTask.pass_mode==PassMode.AUTO){
            cc.log("自动放行")
            this.finishTask();
        }else{//手动放行模式
            cc.log("手动放行")
        }
    }

    private _isClick=false;

    private _onTouchStart(event){
        let rect=this._currentTask.rect_click;
        let p=event.getLocation();
        p=this._guideView.parent.convertToNodeSpaceAR(p);
        if (rect.contains(p)) {

            this._isClick=true;
            //@ts-ignore
            cc.view.multiTouchEnable=true;
            //@ts-ignore
            this._guideView._touchListener.setSwallowTouches(false);
        } else {
            //@ts-ignore
        }
    }

    finishTask(){
        if (App.isCheck || App.DataManager.getGameData()?.isRecord) return;
        this._guideView.stopAllActions();
        cc.tween(this._guideView).to(0.2,{opacity:0}).set({active:false}).start();
        this._guideView.active=false;
        cc.game.emit(GUIDE_EVENTS.FINISH,this._currentTask.id);
        if(this._currentTask.auto_next){
            //@ts-ignore
            let nextId=this._currentTask.next_id;
            this.run(nextId);
        }else{
            //@ts-ignore
            this._openTouch();
             //@ts-ignore
            cc.Node.clickRect=null;
        }
    }

    private _onTouchMove(e){
        this._isClick=false;
    }

    private _onTouchEnd(){  
        if(this._isClick){
            
        }
        this._isClick=false;
        /*
        //@ts-ignore
        cc.view.multiTouchEnable=true;
        //@ts-ignore
        this._guideView._touchListener.setSwallowTouches(true);*/
    }

    /**
     * 加载配置
     * @param taskConfig 
     */
    async _loadConfig(taskConfig:string,bundleName?:string,key?:string){
        if(App.isCheck)return;
        if(!key)key=bundleName;
        let tMap:Map<number,GuideTask>=new Map();
        this._tasksMap.set(key,tMap);
        let asset=await App.BundleManager.loadAssestAsync(taskConfig,cc.JsonAsset,bundleName)
        let configs=asset.json;
        
        configs.forEach(config => {
            let task=new GuideTask();
            Object.assign(task,config);
            if(config.rect_light)task.rect_light=cc.rect.apply(null,config.rect_light);
            if(config.rect_click)task.rect_click=cc.rect.apply(null,config.rect_click);
            if(config.p_offset)task.p_offset=cc.rect.apply(null,config.p_offset);
            tMap.set(task.id,task);
        });
    }

    setCurrentTaskKey(key:string){
        this._currentTaskKey=key;
    }

    /**
     * 设置当前的引导任务
     * @param id 
     */
    _setCurrentTask(id:number){
        let task=this._tasksMap.get(this._currentTaskKey).get(id);
        if(task){
            this._currentTask=task;
        }
    }

    /**
     * 更新可点区域
     * @param rect 
     * @param taskId 
     */
    updateClickRect(rect:cc.Rect,taskId?:number,){
        let task:GuideTask;
        if(taskId){
            task=this._tasksMap.get(this._currentTaskKey).get(taskId);
        }else{
            task=this._currentTask;
        }
        task.rect_click=rect;

        this._updateShouZhiClick(rect,task)
    }

    updateFingerPos(p:cc.Vec2){
        let shouzhi=this._guideView.getChildByName("shouzhi");
        shouzhi.setPosition(p);
    }

    //开始引导
    run(id:number=1){
        if(App.isCheck || !this._guideView || App.DataManager.getGameData()?.isRecord)return
        this._currentTask=null;
        this._setCurrentTask(id);
        this._closeTouch();
        setTimeout(()=>{
            this._guideView.active=true;
            this._guideView.opacity=0;
            this._guideView.stopAllActions();
            cc.tween(this._guideView).to(0.2,{opacity:255}).start();
            this._guideView.zIndex=9999;
    
            //设置高亮区域
            if(!this._currentTask.rect_light){
                //取绑定的节点
                let node=cc.find(this._currentTask.findStr);
                cc.log("errorfind>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",this._currentTask.findStr)
                let rect=node.getBoundingBox();
                let p=node.parent.convertToWorldSpaceAR(rect.origin);
                p=this._guideView.convertToNodeSpaceAR(p);
                //转换成锚点为0,0的坐标
                rect.origin=p;
                this._currentTask.rect_light=rect;
            }
            this._setLightRect(this._currentTask.rect_light);
            //设置可点区域
            if(!this._currentTask.rect_click){
                this._currentTask.rect_click=this._currentTask.rect_light;
            }
                    
            this._updateShouZhiClick(this._currentTask.rect_click);

            cc.game.emit(GUIDE_EVENTS.START,this._currentTask.id,this._currentTask.rect_light,this._currentTask.rect_click,this._currentTask.data);

            this._openTouch();

        },this._currentTask.delayTime)
    }

    _openTouch(){
        //@ts-ignore
        cc.Node.canTouch=true;
    }

    _closeTouch(){
        //@ts-ignore
        cc.Node.canTouch=false;
    }

    _updateShouZhiClick(rect:cc.Rect,task?:GuideTask){
        if(!task)task=this._currentTask;
        //设置手指的位置
        let shouzhi=this._guideView.getChildByName("shouzhi");
        shouzhi.x=rect.x+rect.width/2;
        shouzhi.y=rect.y+rect.height/2;
        if(task.p_offset){
            shouzhi.x+=task.p_offset.x;
            shouzhi.y+=task.p_offset.y;
        }
        shouzhi.active=true;
        shouzhi.scale=2;
        shouzhi.getComponent(sp.Skeleton).paused=true;
        cc.tween(shouzhi).to(0.5,{scale:1}).call(()=>{
            shouzhi.getComponent(sp.Skeleton).paused=false;
        }).start();

        //@ts-ignore
        cc.Node.clickRect=rect;
    }

    _setLightRect(rect:cc.Rect){
        let mask=this._guideView.getChildByName("mask");
        if(!this._currentTask.hasMask){
            mask.setPosition(cc.Vec3.ZERO);
            mask.setContentSize(cc.winSize);
            return
        }
        mask.setContentSize(rect.size);
        mask.setPosition(rect.origin);
    }

    //暂停
    pause(){

    }

    /**
     * 执行任务
     * @param task 
     */
    private async runTask(task:GuideTask){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{

            },task.delayTime)
        })
    }
}
