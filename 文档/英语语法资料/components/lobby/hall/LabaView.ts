// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import cv from "../cv";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LabaView extends cc.Component {

    @property(cc.Node) laba_panel: cc.Node = null;
    @property(cc.Node) result_panel: cc.Node = null;
    @property(cc.Node) result_title: cc.Node = null;
    @property(cc.Node) cell: cc.Node = null;
    @property(cc.Node) gold_effect_panel: cc.Node = null;
    @property(cc.Node) item_panel: cc.Node = null;
    @property(cc.Node) effect_panel: cc.Node = null;
    @property(cc.Sprite) animation1: cc.Sprite = null;
    @property(cc.Sprite) mask_image: cc.Sprite = null;
    @property(cc.Sprite) animation2: cc.Sprite = null;
    @property(cc.Sprite) arrow_left: cc.Sprite = null;
    @property(cc.Sprite) arrow_right: cc.Sprite = null;
    @property(cc.Sprite) hand_image: cc.Sprite = null;
    @property(cc.Label) result_number: cc.Label = null;
    @property(cc.Node) result_effect_panel: cc.Node = null;
    @property(cc.Sprite) gold_image: cc.Sprite = null;  
    @property(cc.RichText) des_num_text: cc.RichText = null;  
    @property(cc.Label) des_text: cc.Label = null;  
    @property(cc.Prefab) labaCellPref: cc.Prefab = null;
    @property(cc.Node) spTitle: cc.Node = null;
    @property(cc.Node) bg_img: cc.Node = null;
    @property(cc.Node) targetPos:cc.Node = null;


    _show_action:boolean = false;
    _item: cc.Node = null;
 

    ITEM_NUMBER:number = 120;
    _num_list: cc.Node[] = [];
    _num_virtual_list: cc.Node[] = [];
    _index: number = 0;
    _cellSize : cc.Size = null;
    _tempLabel : cc.Node = null;
    _bFirst: boolean = true;


    _audioID:number = -1;

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        
        this.arrow_right.node.runAction(cc.flipX(true));

        this._num_list = [];        
        this._num_virtual_list = [];   
        this._item = new cc.Node();
        this._cellSize = this.cell.getContentSize();
        this._item.setContentSize(cc.size(this.cell.getContentSize().width, this.cell.getContentSize().height*this.ITEM_NUMBER));
        
        this.laba_panel.on(cc.Node.EventType.TOUCH_END, this.onTouchLabaPanelEnd, this);
        for(let i = 0; i < this.ITEM_NUMBER; i++){
            let item = cc.instantiate(this.labaCellPref);
            item.setPosition(cc.v2(0, i*item.getContentSize().height - 250));
            this._item.addChild(item);
            this._num_list.push(item.getChildByName("animation_panel").getChildByName("number"));
            this._num_virtual_list.push(item.getChildByName("animation_panel").getChildByName("number_virtual"));
        }
        this.cell.active = false;
        this.item_panel.addChild(this._item);
        this.des_text.string = cv.config.getStringData("Laba_laba_panel_des_text");

        cv.resMgr.setSpriteFrame(this.spTitle, cv.config.getLanguagePath("hall/laba/title"));
        cv.resMgr.setSpriteFrame(this.result_title, cv.config.getLanguagePath("hall/laba/result_title"));

        cv.resMgr.adaptWidget(this.node);
        cv.resMgr.adaptWidget(this.result_number.node);
    }

    onDestroy(){
        cv.AudioMgr.stop(this._audioID);
    }

    start () {
        //this.updateView();
    }

    onTouchLabaPanelEnd(event: cc.Event){
        console.log("Touch End LabaPanel");

        if(!this._show_action){
            this._show_action = true;
            this.runAnimation();
        }
    }

    setLabaNum(num:number):void{
        cv.StringTools.setRichTextString(this.des_num_text.node, cv.StringTools.formatC(cv.config.getStringData("Laba_laba_panel_des_num_text"), num));
    }

    updateView(){
        if(!this._show_action && cv.dataHandler.getUserData().luckindex >= cv.dataHandler.getUserData().lucks.length){
            this.closeView()
            return;
        }
        this.setLabaNum(cv.dataHandler.getUserData().lucks.length - cv.dataHandler.getUserData().luckindex);
        
        //播放音乐
        if(this._bFirst == true){  //第一次显示界面播放背景音乐
            this._bFirst = false;
            cv.AudioMgr.play("zh_CN/hall/laba/audio/laba_bg", true);
            this._audioID = cv.AudioMgr.getAudioID("zh_CN/hall/laba/audio/laba_bg");
        }

        this.mask_image.node.active = false;
        this.animation2.node.active = false;
        this._item.y = 0;
        this.animationRegularly();
        this.animationHand();

        this._show_action = false;
        this.laba_panel.active = true;
        this.result_panel.active = false;
        this.gold_effect_panel.active = false;
        //this.mask_image.node.active = true;
        cv.resMgr.setSpriteFrame(this.mask_image.node, "zh_CN/hall/laba/zhezhao");

        let _luckIndex = cv.dataHandler.getUserData().luckindex;
        let list:any[] = cv.dataHandler.getUserData().lucks;
        let index = list[_luckIndex].index;
        for(let i = 0; i < this.ITEM_NUMBER - 12; i++){
            let _amoutRanges = list[_luckIndex].amount_ranges;
            let num = _amoutRanges[i%list[_luckIndex].amount_ranges.length];
            let numStr = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(num));
            this._num_list[i].getComponent(cc.Label).string = numStr;
        }
        
        //设置中奖额度
        for(let i = 0; i < 12; i++){
            let tempindex;
            if(index >= 10){
                tempindex = index - 10 + i + 1;
            }else{
                tempindex = index - 10 + list[_luckIndex].amount_ranges.length + 1 + i;
            }

            let num = list[_luckIndex].amount_ranges[tempindex%list[_luckIndex].amount_ranges.length];
            let numstr = cv.StringTools.numberToString(cv.StringTools.clientGoldByServer(num));
            this._num_list[this.ITEM_NUMBER - 12 + i].getComponent(cc.Label).string = numstr;
        }
    }

    animationRegularly(){
        let rotateby =  cc.rotateBy(8, 45);
        let repeatAction = cc.repeatForever(rotateby);
        this.animation1.node.runAction(repeatAction);
    }

    animationHand(){

        this.effect_panel.active = true;
        let pkCall = cc.callFunc(() => {
            this.hand_image.node.y = 35; //this.effect_panel.getContentSize().height;
        }, this);

        let fadein = cc.fadeIn(1);
        let fadeout = cc.fadeOut(1);
        let moveto = cc.moveTo(1, cc.v2(this.hand_image.node.getPosition().x, -120));
        let delaytime = cc.delayTime(0.5);
        let repeatforeverAction = cc.repeatForever(cc.sequence(pkCall, fadein, moveto, fadeout, delaytime));
        this.hand_image.node.runAction(repeatforeverAction);
    }

    runAnimation(){

        this.setLabaNum(cv.dataHandler.getUserData().lucks.length - cv.dataHandler.getUserData().luckindex - 1);

        this.mask_image.node.active = true;
        this.effect_panel.active = false;
        this.hand_image.node.stopAllActions();
        this.animation1.node.stopAllActions();
        this._doAnimation2();

        //播放音乐
        //cv.AudioMgr.stop(this._audioID);
        //this._audioID = -1;
        cv.AudioMgr.playEffect("zh_CN/hall/laba/audio/laba");
    }

    _doAnimation2(){

        let rotateBy = cc.rotateBy(5, 360*4);
        let easeout = rotateBy.easing(cc.easeSineInOut());
        let callBack = cc.callFunc(() => {
            this.animation3();
        }, this);
        this.animation1.node.runAction(cc.sequence(easeout, callBack));

        let moveY = this._item.getContentSize().height - this.item_panel.getContentSize().height - 80;
        let move2 = cc.moveTo(4, cc.v2(0, -moveY + 10));
        let easeout3 = move2.easing(cc.easeSineInOut());
        let move2111 = cc.moveTo(1, cc.v2(0, -moveY));
        let backout = move2111.easing(cc.easeElasticOut(0.3));
        this._item.runAction(cc.sequence(easeout3, backout));

        //两个箭头旋转
        let arrow_time = 0.03;
        let repeat1 = cc.repeat(cc.sequence(cc.rotateTo(0.05,15), cc.rotateTo(0.05,0)),15);
        let repeat11 = cc.repeat(cc.sequence(cc.rotateTo(0.05,-15), cc.rotateTo(0.05,0)),15);
        let repeat2 = cc.repeat(cc.sequence(cc.rotateTo(arrow_time,15), cc.rotateTo(arrow_time,0)), 2.0/(arrow_time*2.0));
        let repeat12 = cc.repeat(cc.sequence(cc.rotateTo(arrow_time,-15), cc.rotateTo(arrow_time,0)),2.0/(arrow_time*2.0));
        let repeat3 = cc.repeat(cc.sequence(cc.rotateTo(arrow_time,15), cc.rotateTo(arrow_time,0)), 1.0/(arrow_time*2.0) + 1);
        let repeat13 = cc.repeat(cc.sequence(cc.rotateTo(arrow_time,-15), cc.rotateTo(arrow_time,0)),1.0/(arrow_time*2.0) + 1);

        let easeout1 = repeat2.easing(cc.easeSineOut());
        let easeout2 = repeat12.easing(cc.easeSineOut());
        let easein1 = repeat3.easing(cc.easeBackIn());
        let easein2 = repeat13.easing(cc.easeBackIn());

        this.arrow_left.node.runAction(cc.sequence(easein1, repeat1, easeout1));
        this.arrow_right.node.runAction(cc.sequence(easein2, repeat11, easeout2));
        this.animationNumVirtual();
    } 

    animationNumVirtual(){
        let fadeout = cc.fadeOut(1);
        let fadein = cc.fadeIn(1);
        let delaytime = cc.delayTime(0.5);
        let delaytime1 = cc.delayTime(2);
        let sequence = cc.sequence(delaytime, fadeout, delaytime, fadein, delaytime);
        let sequence1 = cc.sequence(delaytime, fadein, delaytime, fadeout, delaytime);
        for(let i = 0; i < this.ITEM_NUMBER; i++){
            let sequence2 = sequence.clone();
            let sequence3 = sequence1.clone();
            this._num_list[i].runAction(sequence2);
            this._num_virtual_list[i].runAction(sequence3);
        }
    }

    animation3(){
   
        cv.resMgr.setSpriteFrame(this.mask_image.node, "zh_CN/hall/laba/mengban");
        cv.AudioMgr.playEffect("zh_CN/hall/laba/audio/laba_result");

        //播放音乐
        let blik = cc.blink(3,5);
        let cItem = this._num_list[117];
        let pkCall = cc.callFunc(() => {
            this.showResult();
            if(cc.isValid(this._tempLabel)){
                this._tempLabel.removeFromParent(true);
                this._tempLabel.destroy();
                this._tempLabel = null;
            }
            if(cItem){
                cItem.active = true;
            }
        }, this);
        this.animation2.node.active = true;
        this.animation2.node.runAction(cc.sequence(blik, pkCall));

        let tintTo = cc.tintTo(0.2, 180,180,180);
        let tintTo1 = cc.tintTo(0.2, 255,255,255);
        let repeat = cc.repeat(cc.sequence(tintTo, tintTo1), 5);
        let scaleTo = cc.scaleTo(0.5,1.86);

   
        let temp = cc.instantiate(cItem);
        this.result_number.string = temp.getComponent(cc.Label).string;
        cItem.parent.parent.parent.addChild(temp);
        //temp.setPosition(cc.v2(this.laba_panel.getContentSize().width/2, this.laba_panel.getContentSize().height/2));
        temp.setPosition(cItem.parent.parent.getPosition());
        temp.runAction(cc.sequence(repeat, scaleTo));

        if(cc.isValid(this._tempLabel)){
            this._tempLabel.removeFromParent(true);
            this._tempLabel.destroy();
            this._tempLabel = null;
        }
        this._tempLabel = temp;
        cItem.active = false;

        this.animationRegularly();
    }
    //显示结果框
    showResult(){
        this.animation1.node.stopAllActions();
        this.laba_panel.active = false;
        this.result_panel.active = true;
        this.gold_effect_panel.active = false;
        this.result_panel.setScale(0);
        this._index = 1;
        let action: cc.Animation = this.result_panel.getComponent(cc.Animation);
        if (!action.hasEventListener("finished")) {
            action.on("finished", function () {
                this.showGoldAnimation();
            }, this)
        }
        action.play("resultAnim");
        
        let _id = cv.dataHandler.getUserData().lucks[cv.dataHandler.getUserData().luckindex].id;
        cv.worldNet.RequestLuckDrawDone(_id);
        cv.dataHandler.getUserData().luckindex++;
    }

    //显示金币动画
    showGoldAnimation(){
        this.laba_panel.active = false;
        this.result_panel.active = false;
        this.gold_effect_panel.active = true;

        let size = this.gold_effect_panel.getContentSize();

        this.gold_image.node.setPosition(cc.v2(0,0));
        let anim = this.gold_image.getComponent(cc.Animation);
        anim.play('goldAnim');
        anim.on('finished',  this.onAnimationFinished,   this);
  
        let adaptIndex = cc.winSize.height / cv.config.DESIGN_HEIGHT;
        if (cv.config.IS_FULLSCREEN) {
            adaptIndex = (cc.winSize.height - cv.config.FULLSCREEN_OFFSETY) / cv.config.DESIGN_HEIGHT;
        }
        let _pos = this.targetPos.getPosition();
        this.gold_image.node.runAction(cc.moveTo(0.83,cc.v2(_pos.x, _pos.y*adaptIndex)));

    }

    onAnimationFinished(){
       // console.log("labaView onAnimationFinished");
        if(cv.dataHandler.getUserData().luckindex < cv.dataHandler.getUserData().lucks.length){
            if(this._show_action){
                this._show_action = false;
                this.updateView();
            }
        }else{
            this.closeView();
        }

        cv.AudioMgr.playEffect("zh_CN/hall/laba/audio/laba_chipfly");
        cv.worldNet.requestGetUserData();
    }

    closeView(isShowSortATLView:Boolean = true){
        cv.AudioMgr.stopAll();
        this.node.active = false;
        if(isShowSortATLView) {
            cv.MessageCenter.send("sortATLView");
        }
    }
    // update (dt) {}
}
