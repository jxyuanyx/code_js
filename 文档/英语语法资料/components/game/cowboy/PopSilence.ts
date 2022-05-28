import cv from "../../lobby/cv";

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class popSilence extends cc.Component {

    @property(cc.Label) title: cc.Label = null;  //标题

    @property(cc.Label) desc1: cc.Label = null;  //描述1
    @property(cc.Label) desc2: cc.Label = null;  //描述2
    @property(cc.Node) icon: cc.Node = null;  //图标
    @property(cc.Label) txtTimeDown: cc.Label = null;  //描述2
    @property(cc.Node)  btnCancel: cc.Node = null;  //继续游戏按钮
    @property(cc.Node)  btnQuit: cc.Node = null;  //退出游戏按钮

    private CalmDownDeadLineTimeStamp:number = 0; //冷静到期时间戳
    private calmDownLeftSeconds:number = 0; //游戏内冷静剩余倒计时
    private curPopType = cv.Enum.popSilenceType.countDownGame;
    private static _g_prefabInst: cc.Node = null;    



          /**
     * 获取指定节点下的预制件单例
     * @param prefab        未实例化的预制件引用
     * @param parentNode    父节点(若为空, 则默认从该场景中获取)
     */
    static getSinglePrefabInst(prefab: cc.Prefab, parentNode?: cc.Node): cc.Node {
        let node: cc.Node = parentNode;
        if (!node) node = cc.director.getScene();
        if (!popSilence._g_prefabInst) popSilence._g_prefabInst = cc.instantiate(prefab);
        if (!node.getChildByUuid(popSilence._g_prefabInst.uuid)) {
            if (!cc.isValid(popSilence._g_prefabInst, true)) {
                popSilence._g_prefabInst = cc.instantiate(prefab);
            }
        }
        return popSilence._g_prefabInst;
    }

   
    /**
     * 
     * @param popType 
     *      cv.Enum.popSilenceType.calmDownNotice: 冷静选择弹框
     *      cv.Enum.popSilenceType.countDown： 冷静倒计时弹框
     * @param data 
     *      calmDownSeconds：  //冷静多长时间
	 *      numNotification：  //本次是第几次冷静
     * @param parentNode  弹框添加的父节点
     * @param zIndex   弹框的zIndex
     */
    public autoShow(popType:number, data:any, parentNode?:cc.Node, zIndex?: number):void{

        let parent: cc.Node = parentNode;
        if (!parent) parent = cc.director.getScene();
        if (!parent.getChildByUuid(this.node.uuid)) {
            parent.addChild(this.node);
        }

        if(zIndex){
            this.node.zIndex = zIndex;
        }

        this.curPopType = popType;
        this.adjustScreen();
   
        this.calmDownLeftSeconds = data.CalmDownLeftSeconds? data.CalmDownLeftSeconds:0;
        this.CalmDownDeadLineTimeStamp = data.CalmDownDeadLineTimeStamp? data.CalmDownDeadLineTimeStamp:0;

        this.updateCalmDownTime();
        //倒计时
        this.unscheduleAllCallbacks();
        this.schedule(function() {
            // 这里的 this 指向 component
            this.updateCalmDownTime();
        }, 1);
    }

    onLoad () {
        this.initLanguage();
        cc.game.on(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
        cc.game.on(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
    }

    onDestroy(){

        cc.game.off(cc.game.EVENT_HIDE, this.OnAppEnterBackground, this);
        cc.game.off(cc.game.EVENT_SHOW, this.OnAppEnterForeground, this);
      
    }

    
    /**
     * 游戏进入后台时触发的事件
     */
    OnAppEnterBackground(): void {
        console.log("OnAppEnterBackground popSilence.");
    }

    /**
     * 游戏进入前台运行时触发的事件
     */
    OnAppEnterForeground(): void {
        console.log("OnAppEnterForeground popSilence.");
        //从后台切回来，定时器暂停，倒计时需要校正一下
        let time = Date.now();
        let diffTime = this.CalmDownDeadLineTimeStamp - time/1000;
        if(diffTime > 0){
            this.calmDownLeftSeconds = diffTime;
        }else{
            this.closeDlg();
        }
    }

    start () {
    }

    private initLanguage() {
        this.title.string = cv.config.getStringData("pop_silence_title");
        this.btnCancel.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = cv.config.getStringData("pop_silence_btn_continue");
        this.btnQuit.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = cv.config.getStringData("pop_silence_btn_quit");
        this.desc1.getComponent(cc.Label).string =   cv.StringTools.formatC(cv.config.getStringData("pop_silence_tips1"));
        this.desc2.getComponent(cc.Label).string =   cv.StringTools.formatC(cv.config.getStringData("pop_silence_tips2"));

        if(cv.config.getCurrentLanguage() == cv.Enum.LANGUAGE_TYPE.zh_CN){
            this.desc1.fontSize = 48;
        }else{
            this.desc1.fontSize = 44;
        }
    }

   
    private updateCalmDownTime(){

        this.txtTimeDown.getComponent(cc.Label).string = "（" + cv.StringTools.countTime(this.calmDownLeftSeconds, cv.Enum.eTimeType.Hour_Min_Sec) + "）";
        if(this.calmDownLeftSeconds <= 0){  //倒计时为0的时候 关闭窗口
            this.closeDlg();
        }

        this.calmDownLeftSeconds--;
    }

    private adjustScreen(){
        if (cv.native.isScreenLandscape()) {  //如果是横屏
            this.node.setContentSize(cc.size(cv.config.DESIGN_HEIGHT, cv.config.DESIGN_WIDTH));
        }else{
            this.node.setContentSize(cc.size(cv.config.DESIGN_WIDTH, cv.config.DESIGN_HEIGHT));
        }
    }
    
    //继续游戏 取消冷静状态
    private onBtnCancel(){
        cv.AudioMgr.playButtonSound('button_click');
        cv.worldNet.requestCalmDownConfirm(false);
        this.closeDlg();
    }

    //退出游戏
    private onBtnQuit(){
        cv.AudioMgr.playButtonSound('button_click');
        cv.roomManager.RequestLeaveRoom();
    }

    private closeDlg(){
        this.unscheduleAllCallbacks();
        this.node.removeFromParent();
        this.node.destroy();
    }

}
