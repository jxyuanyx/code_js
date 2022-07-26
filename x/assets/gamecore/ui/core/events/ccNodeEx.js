cc.view.multiTouchEnable=false;
// 声明全局开关，用于控制多点触摸是否允许，默认禁止多点触摸。

var __dispatchEvent__ = cc.Node.prototype.dispatchEvent;

//开始点击的时间
var startTime=0;
var intervalTime=500;
cc.Node.canTouch=true;

//适配新手引导
cc.Node.clickRect;//可点区域/
//cc.Node.openMove=true;

cc.Node.prototype.dispatchEvent = function (event) {

    if (cc.view.multiTouchEnable) {
        __dispatchEvent__.call(this, event);
        return;
    }

    switch (event.type) {
        case 'touchstart':
                if(!cc.Node.canTouch)return false
                let nowTime=cc.sys.now();
                if(startTime==0 || (nowTime-startTime)>intervalTime){
                    startTime=nowTime;
                    //点击区域判定
                    if(cc.Node.clickRect){
                        let t=event.getLocation();
                        if(!cc.Node.clickRect.contains(t)){                        
                            return
                        }
                    }
                    __dispatchEvent__.call(this, event);
                }else{
                    cc.error("click too quick")
                }
            break;
        case 'touchmove':
            //新手引导禁止移动 
           // if (cc.Node.canTouch&&(!cc.Node.clickRect || (cc.Node.clickRect&&cc.Node.openMove))) {
            if (cc.Node.canTouch&&!cc.Node.clickRect) {
                __dispatchEvent__.call(this, event);
            }
            break;
        case 'touchend':
            if (cc.Node.canTouch) {
                if(cc.Node.clickRect){
                    let t=event.getLocation();
                    if(!cc.Node.clickRect.contains(t)){    
                        return
                    }else{
                        cc.game.emit("guide_click")
                    }
                }
                __dispatchEvent__.call(this, event);
            }
            break;
        case 'touchcancel':
            if (cc.Node.canTouch) {
                __dispatchEvent__.call(this, event);
            }
            break;
        default:
            __dispatchEvent__.call(this, event);
    }
};


