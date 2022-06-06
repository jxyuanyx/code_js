const { ccclass, property } = cc._decorator;
import cv from "./../../components/lobby/cv"

@ccclass
export default class RefreshTop extends cc.Component {

  @property(cc.ScrollView)
  sv: cc.ScrollView = null;
  @property(cc.Node)
  ndIcon: cc.Node = null;

  _actionDuration: number = 0.25;

  _defaultNodeX: number;
  _defaultNodeY: number;

  _defaultContentX: number;
  _defaultContentY: number;

  refreshListener: Function;

  onLoad() {
    this.updataNodePos();
    this.sv.elastic = true;
    var handler = new cc.Component.EventHandler();
    handler.target = this.node;
    handler.component = "RefreshTop";
    handler.handler = "onScrollEvent";
    this.sv.scrollEvents.push(handler);
  }

  updataNodePos()
  {
    this._defaultNodeX = this.node.x;
    this._defaultNodeY = this.node.y;

    this._defaultContentX = this.sv.content.x;

    if(cv.config.IS_FULLSCREEN){
        this._defaultContentY =  this._defaultNodeY - this.node.getContentSize().height/2; 
    }else{
        this._defaultContentY =  this.node.getParent().height * (1 - this.node.getParent().anchorY); 
    }
    this.resetUI();
  }

  onDisable() {
    if (this.isRefreshAtDefaultY()) return;
    this.node.y = this._defaultNodeY;
    this.updataNodePos();
  }

  isRefreshAtDefaultY() {
    return this.node.y == this._defaultNodeY;
  }

  resetUI() {
    this.clearActions();
    this.ndIcon.angle = 0;
    this.node.y = this._defaultNodeY;
    this.sv.content.y = this._defaultContentY;
    this.sv.elastic = true;
    this.sv.vertical = true;
  }

  onScrollEvent(sv: cc.ScrollView, eventType: cc.ScrollView.EventType) {
    let curY = sv.getScrollOffset().y;

    if (eventType == cc.ScrollView.EventType.SCROLLING) {
      //内容区域内自动滑动去除弹性
      if (curY >= 0 && curY <= sv.getMaxScrollOffset().y) {
        sv.elastic = !sv.isAutoScrolling();
      }else{
        sv.elastic = true;
      }

      //内容区域滑动不处理
      if (curY > 0) 
          return;

      this.node.y = this._defaultNodeY + curY;
      this.ndIcon.angle = -360 * Math.abs(curY) / this.node.height;
    } else if (eventType == cc.ScrollView.EventType.BOUNCE_TOP) {

      if (Math.abs(curY) >= this.node.height) { //刷新控件完全显示了
         this.showRefresh();
      }
    }
  }

  showRefresh() {
    this.sv.vertical = false;
    this.clearActions();
    this.ndIcon.runAction(cc.rotateBy(1, 360).repeatForever());
    this.node.runAction(cc.moveTo(this._actionDuration, this._defaultNodeX, this._defaultNodeY - this.node.height));
    this.sv.content.runAction(cc.sequence(cc.moveTo(this._actionDuration, this._defaultContentX, this._defaultContentY - this.node.height), cc.callFunc(() => {
       this.refreshListener && this.refreshListener();
    })));
  }
  
  hideRefresh(endListener?: Function) {
    if (this.isRefreshAtDefaultY()) {
      endListener && endListener();
      return;
    }

    this.clearActions();
    this.node.runAction(cc.moveTo(this._actionDuration, this._defaultNodeX, this._defaultNodeY));
    this.sv.content.runAction(cc.sequence(cc.moveTo(this._actionDuration, this._defaultContentX, this._defaultContentY), cc.callFunc(() => {
      this.sv.scrollToTop();
      this.sv.vertical = true;
      endListener && endListener();
    })));
  }

  clearActions() {
    this.ndIcon.stopAllActions();
    this.node.stopAllActions();
    this.sv.content.stopAllActions();
    this.sv.stopAutoScroll();
  }

  setRefreshListener(listener: Function) {
    this.refreshListener = listener;
  }
}
