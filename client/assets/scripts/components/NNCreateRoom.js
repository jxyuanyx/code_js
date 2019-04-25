cc.Class({
    extends: cc.Component,
    
    properties: {
      	contentPanel:cc.Node,
        rulePanel:cc.Node,
        wealthPanel:cc.Node,
        gameTiemItem:cc.Node,
        numOfPersonPanel:cc.Node,
        specialPanel:cc.Node,
        twistPanel:cc.Node,
        goldItem:cc.Node,
        controlItem:cc.Node,
    },

    onLoad:function(){
    	this.initSlider();
    },

    initSlider:function(){
        var valueNode = this.goldItem.getChildByName("allow");
        var rateNode = this.goldItem.getChildByName("rate");
        var slider = this.goldItem.getChildByName("slider");
        this._slider = slider;
        if(slider) {
            var goldHandle = slider.getChildByName("Handle");
            cc.module.utils.addSlideEvent(slider,this.node,"NNCreateRoom","onWealthSlider");
        }
        this._lblValue = valueNode.getComponent(cc.Label);
        this._rateValue = rateNode.getComponent(cc.Label);
        this.setWealth();
        var gameTimeSlider = this.gameTiemItem.getChildByName("slider");
        this._gameTimeSlider = gameTimeSlider;
        if(gameTimeSlider){
            cc.module.utils.addSlideEvent(gameTimeSlider,this.node,"NNCreateRoom","ongameTimeSlider");
        }
        var twistTimeSlider = this.twistPanel.getChildByName("slider");
        this._twistTimeSlider = twistTimeSlider;
        if(twistTimeSlider){
            cc.module.utils.addSlideEvent(twistTimeSlider,this.node,"NNCreateRoom","onTwistTimeSlider");
        }        
        var controlSlider = this.controlItem.getChildByName("slider");
        this._controlSlider = controlSlider;
        if(controlSlider){
            cc.module.utils.addSlideEvent(controlSlider,this.node,"NNCreateRoom","oncontrolSlider");
        }
    },

  	onWealthSlider:function (e) {
        var target = e.node;
        var progress = target.getChildByName("bg");
        progress.width = (e.progress)*510;
        var allowGold,waterGold;
        if(e.progress <= 0.1){
            allowGold = 200;
            waterGold = 1;
        }
        else if (0.1 < e.progress && e.progress <= 0.3) {
            allowGold = 400;
            waterGold = 2;
        }
        else if (0.3 < e.progress && e.progress <= 0.5) {
            allowGold = 1000;
            waterGold = 5;
        }
        else if (0.5 < e.progress && e.progress <= 0.7) {
            allowGold = 2000;
            waterGold = 10;
        }
        else if (0.7 < e.progress && e.progress <= 0.9) {
            allowGold = 4000;
            waterGold = 20;
        }
        else {
            allowGold = 6000;
            waterGold = 30;
        }
        this._gameInGold = allowGold;
        this._gameWater = waterGold;
        this._lblValue.string = allowGold;
        this._rateValue.string = waterGold+"金币/水";
        var wealth = this.wealthPanel.getChildByName("wealth").getChildByName("title").getChildByName("lbl_wealth");
        var boolean = allowGold > cc.module.self.gold ? true : false;
        this.changLblColor(wealth,boolean);
    },

    ongameTimeSlider:function (e) {
        var target = e.node;
        var progress = target.getChildByName("bg");
        progress.width = (e.progress)*510;
        var gameTimeStr = cc.find("content/time/lbl_time",this.gameTiemItem);
        var rateStr = cc.find("content/rate/lbl_rate",this.gameTiemItem);
        var gameTime,rateLeaf;
        if(e.progress <= 0.1){
            gameTime = 20;
            rateLeaf = 40;
        }
        else if (0.1< e.progress && e.progress <= 0.3) {
            gameTime = 30;
            rateLeaf = 50;
        }
        else if (0.3 <e.progress && e.progress <= 0.5) {
            gameTime = 40;
            rateLeaf = 60;
        }
        else if (0.5< e.progress && e.progress <= 0.7) {
            gameTime = 60;
            rateLeaf = 80;
        }
        else if (0.7< e.progress && e.progress <= 0.9) {
            gameTime = 90;
            rateLeaf = 120;
        }
        else{
            gameTime = 120;
            rateLeaf = 160;
        }
        this._gameLeaf = rateLeaf;
        this._gameTime = gameTime;
        gameTimeStr.getComponent(cc.Label).string = gameTime +"分钟";
        rateStr.getComponent(cc.Label).string = rateLeaf;
        var boolean = (rateLeaf > cc.module.self.leaf ? true : false);
        this.changLblColor(rateStr,boolean);
    },
    
    onTwistTimeSlider:function (e) {
        var target = e.node;
        var progress = target.getChildByName("bg");
        progress.width = (e.progress)*510;
        var twistTime;
        if(e.progress <= 0.2){
            twistTime = 10;
        }
        else if (0.2 < e.progress && e.progress <=0.4) {
            twistTime = 15;
        }
        else if (0.4 < e.progress && e.progress <=0.6) {
            twistTime = 20;
        }
        else if (0.6 < e.progress && e.progress <= 0.8) {
            twistTime = 25;
        }
        else{
            twistTime = 30;
        }
        this._cscp = twistTime;
        var twistTimeStr = cc.find("content/time/lbl_time",this.twistPanel);
        twistTimeStr.getComponent(cc.Label).string = twistTime +"秒";
    },

    oncontrolSlider:function (e) {
        var allowDouble = this.controlItem.getChildByName("content").getChildByName("allow_in").getChildByName("lbl_num");
        var slider = this._controlSlider.getComponent(cc.Slider);
        var progressBg = cc.find("progress/bg",this._controlSlider);
        progressBg.width = slider.progress * 510;
        var double;
        if(e.progress <= 0.1){
            double = 4;
        }
        else if (0.1 < e.progress && e.progress <= 0.3) {
            double = 5;
        }
        else if (0.3 < e.progress && e.progress <= 0.5) {
            double = 6;
        }
        else if (0.5 < e.progress && e.progress <= 0.7) {
            double = 7;
        }
        else if (0.7 < e.progress && e.progress <= 0.9) {
            double = 8;
        }
        else{
            double = 9;
        }
        this._allowDouble = double;
        allowDouble.getComponent(cc.Label).string = double == 9 ? "无限" : double;
    },

    setWealth:function(){
        var wealth = this.wealthPanel.getChildByName("wealth").getChildByName("title").getChildByName("lbl_wealth");
        var lblWealth = wealth.getComponent(cc.Label);
        lblWealth.string = cc.module.self.gold;
        var boolean = (this._gameInGold > cc.module.self.leaf ? true : false);
        this.changLblColor(wealth,boolean);
    },

    changLblColor:function(node,isRed){
        isRed ? node.color = new cc.Color(255,0,0,255) : node.color = new cc.Color(255,255,255,255);
    },

    onClickOnOff:function(e){
        var btn = e.target;
        btn.children[0].active = !(btn.children[0].active);
        btn.children[1].active = !(btn.children[1].active);
    },

    onClickAllowIn:function(e){
        var btn = e.target;
        btn.children[0].active = !(btn.children[0].active);
        btn.children[1].active = !(btn.children[1].active);
        this._allowIn = (btn.children[1].active);
    },    

    onClickConfirm:function(){
    	console.log('--------206 nn confirm');
    },
});

