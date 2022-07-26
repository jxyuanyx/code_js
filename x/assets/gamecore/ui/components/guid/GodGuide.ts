import { GodCommand } from "./GodCommand";
import { Locator } from "./Locator";
import { GameEvents } from '../../../events/GameEvents';
import App from "../../../App";

const RADIAN = 2 * Math.PI / 360;

function getRotatePoint(p, angle, center) {
    let out = cc.v2();
    let radian = -angle * RADIAN;
    out.x = (p.x - center.x) * Math.cos(radian) - (p.y - center.y) * Math.sin(radian) + center.x;
    out.y = (p.x - center.x) * Math.sin(radian) + (p.y - center.y) * Math.cos(radian) + center.y;
    return out;
}

function getRectRotatePoints(rect, angle, pt) {
    let array = [
        cc.v2(rect.x, rect.y),
        cc.v2(rect.x + rect.width, rect.y),
        cc.v2(rect.x + rect.width, rect.y + rect.height),
        cc.v2(rect.x, rect.y + rect.height),
    ];
    return array.map(p => getRotatePoint(p, angle, pt));
}


function getHTMLElementPosition(element) {
    var docElem = document.documentElement;
    var leftOffset = window.pageXOffset - docElem.clientLeft;
    var topOffset = window.pageYOffset - docElem.clientTop;
    if (typeof element.getBoundingClientRect === 'function') {
        var box = element.getBoundingClientRect();
        return {
            left: box.left + leftOffset,
            top: box.top + topOffset,
            width: box.width,
            height: box.height
        };
    }
    else {
        if (element instanceof HTMLCanvasElement) {
            return {
                left: leftOffset,
                top: topOffset,
                width: element.width,
                height: element.height
            };
        }
        else {
            return {
                left: leftOffset,
                top: topOffset,
                width: parseInt(element.style.width),
                height: parseInt(element.style.height)
            };
        }
    }
}

function touchSimulation(x, y) {

    let rect;
    //@ts-ignore
    let inputManager = window._cc ? window._cc.inputManager : cc.internal.inputManager
    if (cc.sys.isBrowser) {
        let canvas = document.getElementById("GameCanvas");
        rect = getHTMLElementPosition(canvas);
    } else {
        rect = cc.view.getFrameSize();
        rect.left = 0;
        rect.top = 0;
    }
    
    let vp = cc.view.getViewportRect();
    let sx = cc.view.getScaleX();
    let sy = cc.view.getScaleY();
    let ratio = cc.view.getDevicePixelRatio();
    let htmlx = (x * sx  + vp.x) / ratio + rect.left;
    let htmly = rect.top + rect.height - (y * sy + vp.y) / ratio;
    let pt = cc.v2(htmlx, htmly);

    cc.log(`模拟点击坐标：${pt.x}, ${pt.y}`);
    let touch = inputManager.getTouchByXY(pt.x, pt.y, rect);
    inputManager.handleTouchesBegin([touch]);
    setTimeout(() => {
        inputManager.handleTouchesEnd([touch]);    
    }, 200);
    
    // let click = document.createEvent("MouseEvents");
    // click.initMouseEvent("mousedown", true, true, window, 0, 0, 0, pt.x, pt.y, true, false, false, false, 0, null);
    // canvas.dispatchEvent(click);
    // setTimeout(function () {
    //     let mouseup = document.createEvent("MouseEvent");
    //     mouseup.initMouseEvent("mouseup", true, true, window, 0, 0, 0, pt.x, pt.y, true, false, false, false, 0, null);
    //     canvas.dispatchEvent(mouseup);
    // }, 500);
}

const { ccclass, property } = cc._decorator;
@ccclass
export default class GodGuide extends cc.Component {

    public eventTarget:cc.EventTarget=new cc.EventTarget();

    // @property(cc.Label)
    // label: cc.Label = null;

    _selector: string = '';


    _step:any=null;

    get selector(): string {
        return this._selector;
    }
    set selector(value: string) {
        this._selector = value;
        this.find(value);
    }

    type: {
        default: cc.Mask.Type.RECT;
        type: cc.Mask.Type;
    }

    @property(cc.Prefab)
    FINGER_PREFAB: cc.Prefab = null;

    @property(cc.Prefab)
    TEXT_PREFAB: cc.Prefab = null;

    GodGuide: any;
    _targetNode: cc.Node;
    _finger: cc.Node;
    _text: cc.Node;
    _dialogue: cc.Node;
    _mask: cc.Mask;
    _dispatchEvent: any;
    _task: any;
    _recordSteps: any[];

    _canTouch:boolean=false;

    onLoad() {
        this.init();
        this.GodGuide = this;
        this.node.active=false;
    }

    touchSimulation(node) {
        this.log('自动执行，模拟触摸');
        this.scheduleOnce(() => {
            cc.log('自动节点 :', JSON.stringify(node.position));
            let p = node.parent.convertToWorldSpaceAR(node.position);
            cc.log('世界节点 :', JSON.stringify(p));
            touchSimulation(p.x, p.y);
        }, 1);
    }

    init() {
        this.node.setContentSize(cc.winSize);
        //创建手指提示
        this._targetNode = null;
        if (this.FINGER_PREFAB) {
            this._finger = cc.instantiate(this.FINGER_PREFAB);
            this._finger.parent = this.node;
            this._finger.active = false;
        }

        //创建文本提示
        if (this.TEXT_PREFAB) {
            this._text = cc.instantiate(this.TEXT_PREFAB);
            this._text.parent = this.node;
            this._text.active = false;
        }

        //获取遮罩组件 
        this._mask = this.node.getComponentInChildren(cc.Mask);
        this._mask.inverted = true;
        this._mask.node.active = false;

        /*
        //监听事件
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
             //@ts-ignore
            this.node._touchListener.setSwallowTouches(true);
        });*/

        //监听事件
        this.node.on(cc.Node.EventType.TOUCH_START, (event) => {

            if(!this._canTouch){
                //@ts-ignore
                this.node._touchListener.setSwallowTouches(true);
                return;
            }

            //录制中，放行
            if (this._dispatchEvent) {
                //@ts-ignore
                this.node._touchListener.setSwallowTouches(false);
                return;
            }

            //放行
            if (!this._mask.node.active) {
                //@ts-ignore
                this.node._touchListener.setSwallowTouches(false);
                return;
            }

            //目标节点不存在，拦截
            if (!this._targetNode) {
                //@ts-ignore
                this.node._touchListener.setSwallowTouches(true);
                return;
            }
            
            //目标区域存在，击中放行
            let rect 
            if(this._step.clickRect){
                rect=this._step.clickRect;
                cc.error(">>>>>>>",rect,)
            }else{
                let root = cc.find('Canvas');

                rect =new cc.Rect(this._targetNode.x,this._targetNode.y,this._targetNode.width*this._targetNode.scaleX,this._targetNode.height*this._targetNode.scaleY);
                let p:cc.Vec2 = this._targetNode.parent.convertToWorldSpaceAR(rect.origin);
                rect.x=p.x-this._targetNode.anchorX*this._targetNode.width*this._targetNode.scaleX;
                rect.y=p.y-this._targetNode.anchorY*this._targetNode.height*this._targetNode.scaleY;
                /*
                rect=new cc.Rect(
                    this._targetNode.x-this._targetNode.anchorX*this._targetNode.width,
                    this._targetNode.y-this._targetNode.anchorY*this._targetNode.height,
                    this._targetNode.width,
                    this._targetNode.height);
                let pos=root.convertToWorldSpaceAR(cc.v2(rect.x,rect.y))
                rect.x = pos.x;
                rect.y = pos.y;*/
            }

            if (rect.contains(event.getLocation())) {
                //@ts-ignore
                this.node._touchListener.setSwallowTouches(false);
                cc.log('命中目标节点，放行');
            } else {
                //@ts-ignore
                this.node._touchListener.setSwallowTouches(true);
                cc.log('未命中目标节点，拦截');
            }
        }, this);
    }


    start() {
        cc.debug.setDisplayStats(false);
    }

    setTask(task) {
        if (this._task) {
            cc.warn('当前任务还未处理完毕！');
            return;
        }
        this._task = task;
    }

    getTask() {
        return this._task;
    }

    async run(callback?) {
        if(App.isCheck)return;
        if (!this._task) {
            return;
        }
        //@ts-ignore
        cc.view.multiTouchEnable = true;

        this.node.active=true;

        for(let i=0;i<this._task.steps.length;i++){
            let step=this._task.steps[i];
            this._step=step;
            this._canTouch=false;
            //@ts-ignore
            await this._processStep(step);
        }
        this._task=null;
        this._mask.node.active = false;
        if (this._finger) {
            this._finger.active = false;
        }
        //@ts-ignore
        //cc.view.multiTouchEnable = false;
        //@ts-ignore
        this.node._touchListener.setSwallowTouches(false);
        if (callback) {
            callback();
        }
    }

    fillPoints(points) {
        let p0 = points[0];
        //@ts-ignore
        this._mask._graphics.moveTo(p0.x, p0.y);
        points.slice(1).forEach(p => {
            //@ts-ignore
            this._mask._graphics.lineTo(p.x, p.y);
        });
        //@ts-ignore
        this._mask._graphics.lineTo(p0.x, p0.y);

        //@ts-ignore
        this._mask._graphics.stroke();

        //@ts-ignore
        this._mask._graphics.fill();
    }

    async exeCommand(step){
        return new Promise((resolve, reject)=>{
            this.scheduleOnce(async () => {
                this._processStepCommand(step,ret=>{
                    resolve(ret)
                })
            }, step.delayTime || 0);
        })
       
    }


    async _processStep(step) {

        cc.game.emit(GameEvents.GUIDE_STEP_START,step.id,step);

        this._mask.node.active = this._task.mask || true;
        
        await this.exeCommand(step);

        //@ts-ignore
        this._mask._graphics.clear();
        this._finger.active = false;
        cc.game.emit(GameEvents.GUIDE_STEP_END,step.id,step);

        this.log(`步骤【${step.desc}】结束！`);
    }

    /**
     * 手指动画
     */
    fingerToNode(node:cc.Node,offset:cc.Vec2,cb:Function) {
        if (!this._finger) {
            cb();
        }

        this._finger.active = true;
        // let rect = node.getBoundingBoxToWorld();
        // let p = this.node.convertToNodeSpaceAR(rect.origin);   
        // p = cc.v2(p.x + rect.width * 0.5, p.y + rect.height * 0.5);
        let p:cc.Vec3 = this.node.convertToNodeSpaceAR(node.parent.convertToWorldSpaceAR(node.position));
        p.x+=(0.5-node.anchorX)*node.width;
        p.y+=(0.5-node.anchorY)*node.height;

        if(offset){
            p.x+=offset.x;
            p.y+=offset.y;
        }

        let duration = p.sub(this._finger.position).mag() / cc.winSize.height;
        let moveTo = cc.moveTo(duration, p.x,p.y);
        let callFunc = cc.callFunc(() => {
            cb();
        });

        let sequnce = cc.sequence(moveTo, callFunc);
        this._finger.runAction(sequnce);
    }

    log(text) {

        if (this._task.debug) {
            cc.log(text);
        }
        
    }

    /**
     * 处理步骤指令
     * @param {*} step 
     * @param {*} cb 
     */
    async _processStepCommand(step,cb) {

        let cmd = GodCommand[step.command.cmd];
        if (cmd) {
            this.log(`执行步骤【${step.desc}】指令: ${step.command.cmd}`);
            cmd(this, step, () => {
                this.log(`步骤【${step.desc}】指令: ${step.command.cmd} 执行完毕`);
                cb(true);
            });
        } else {
            this.log(`执行步骤【${step.desc}】指令: ${step.command.cmd} 不存在！`);
            cb(false);
        }
    }

    find(value, cb?:Function,isDialog?:boolean) {
        console.log("find>>>>>>>>",isDialog);
        let root = cc.find(isDialog?'DlgLayer':'Canvas');
        Locator.locateNode(root, value, (error, node) => {
            if (error) {
                cc.log(error);
                return;
            }
            cc.log('定位节点成功');
            let rect = this._focusToNode(node);
            if (cb) {
            cb(node, rect);
            }
        });
    }

    locateNodeByEvent(sender) {
        this._selector = sender.string;
    }

    getNodePoints(rect, angle, pt) {
        return getRectRotatePoints(rect, angle, pt).map(p => {
            return p;
        });
    }

    fillPolygon(points) {
        let p0 = points[0];
        //@ts-ignore
        this._mask._graphics.moveTo(p0.x, p0.y);
        points.slice(1).forEach(p => {
            //@ts-ignore
            this._mask._graphics.lineTo(p.x, p.y);
        });
        //@ts-ignore
        this._mask._graphics.lineTo(p0.x, p0.y);
        //@ts-ignore
        this._mask._graphics.stroke();
        //@ts-ignore
        this._mask._graphics.fill();
    }

    _focusToNode(node:cc.Node) {
        //@ts-ignore
        this._mask._graphics.clear();

        //如果内容体里面的东西超出父节点长度，会出问题
        //let rect=node.getBoundingBoxToWorld();
        
        let rect =new cc.Rect(node.x,node.y,node.width*node.scaleX,node.height*node.scaleY);
        let p:cc.Vec2 = this.node.convertToNodeSpaceAR(node.parent.convertToWorldSpaceAR(rect.origin));
        let x=p.x-node.anchorX*node.width*node.scaleX;
        let y=p.y-node.anchorY*node.height*node.scaleY;
        //@ts-ignore
        this._mask._graphics.fillRect(x, y, rect.width, rect.height);
        return rect;
    }

    /**
     * 获取节点全路径
     * @param {*} node 
     */
    getNodeFullPath(node) {
        let array = [];
        let temp = node;
        do {
            array.unshift(temp.name);
            temp = temp.parent;
        } while (temp && temp.name !== 'Canvas')
        return array.join('/');
    }

    /**
     * 是否为引导层节点
     * @param {*} node 
     */
    isGuideNode(node) {
        let result = false;
        let temp = node;
        do {
            if (temp === this.node) {
                result = true;
                break;
            }
        } while (temp = temp.parent)

        return result;
    }

    /**
     * 录制节点触摸
     */
    startRecordNodeTouch() {
        if (this._task) {
            cc.warn(`任务引导中，不能录制`);
            return;
        }

        if (this._dispatchEvent) {
            cc.warn('已经进入录制模式');
            return;
        }

        //缓存引擎原生触摸派发函数
        this._dispatchEvent = cc.Node.prototype.dispatchEvent;
        this._recordSteps = [];

        let self = this;
        let time = Date.now();
        //Hook节点事件派发函数
        cc.Node.prototype.dispatchEvent = function (event) {
            //执行引擎原生触摸派发函数
            self._dispatchEvent.call(this, event);
            //过滤掉引导节点上的事件，
            if (self.isGuideNode(this)) {
                return;
            }
            //仅缓存对节点的TouchEnd操作
            if (event.type === cc.Node.EventType.TOUCH_END) {
                let now = Date.now();
                let delay = (now - time) / 1000;
                time = now;
                let args = self.getNodeFullPath(this);
                self._recordSteps.push({
                    desc: `点击${args}`,
                    command: { cmd: 'finger', args },
                    delay,
                });
            }
        }
    }

    /**
     * 停止节点触摸录制
     */
    stopRecordNodeTouch() {
        if (this._dispatchEvent) {
            cc.Node.prototype.dispatchEvent = this._dispatchEvent;
            this._dispatchEvent = null;
            cc.warn('退出录制状态');
        } else {
            cc.warn('未进入录制状态');
        }
    }

    /**
     * 回放录制
     */
    playRecordNodeTouch(sender, autorun) {
        this.stopRecordNodeTouch();
        if (this._recordSteps && this._recordSteps.length) {
            cc.log('生成任务：', JSON.stringify(this._recordSteps));
            let task = {
                autorun: !!autorun,
                debug: true,
                steps: this._recordSteps,
            }
            this._recordSteps = null;
            this.setTask(task);
            this.run();
        }
    }

    //显示文本
    showText(text, callback) {
        if(this._text){
            this._text.once('click', callback);
            let godText = this._text.getComponent(this.TEXT_PREFAB.name);
            godText.setText(text, callback);
        }
    }

    
    close() {
        this.node.active = false;
    }
}
