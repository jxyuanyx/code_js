/**
 * zxh
 */

import App from "../../../App";
import GodGuide from "./GodGuide";

export const FINISHSTEP="finishStep";

//根据命令
export class GodCommand {

    static readonly DIALOGUE: string = 'dialogue';//对话框
    static readonly FINGER: string = 'finger';//节点定位加手指指引
    static readonly TEXT: string = 'text';//文本显示
    static readonly LOCATOR: string = 'locator';//节点定位
    static readonly SAVE: string = 'save';//保存进度

    static readonly typeList = [GodCommand.DIALOGUE, GodCommand.FINGER, GodCommand.TEXT, GodCommand.LOCATOR, GodCommand.SAVE];


    //定位节点
    static locator(godGuide, step, callback) {
        let { args } = step.command;
        godGuide.find(args, (node) => {
            godGuide._targetNode = node;

            //点击确认
            node.once(cc.Node.EventType.TOUCH_END, () => {
                cc.log('节点被点击');
                //任务完成
                callback();
            });
            //触摸模拟
            let autorun = godGuide.getTask().autorun;
            if (autorun) {
                godGuide.touchSimulation(node);
            }
        },step.isDialog);
    }

    //定位节点，显示一个手指动画
    static finger(godGuide:GodGuide, step, callback) {
        let { args,offset} = step.command;
        let customTask=step.customTask;
        godGuide._targetNode = null;
        //定位节点
        godGuide.find(args, (node:cc.Node,rect:cc.Rect) => {
            //手指动画
            godGuide.fingerToNode(node,offset,() => {
                godGuide._targetNode = node;
                //点击确认
                // if(step.hasAgent)
                {
                    let agentNode=new cc.Node();
                    agentNode.scale=node.scale;
                    node.parent.addChild(agentNode,999);
                    agentNode.setAnchorPoint(node.getAnchorPoint());
                    agentNode.setContentSize(node.getContentSize());
                    agentNode.setPosition(node.getPosition());

                    agentNode.once(cc.Node.EventType.TOUCH_START, (event) => {
                        event.currentTarget._touchListener.setSwallowTouches(false);
                    });

                    agentNode.once(cc.Node.EventType.TOUCH_END, (event) => {
                        event.currentTarget._touchListener.setSwallowTouches(false);
                        if(!customTask){
                            event.currentTarget.removeFromParent();
                            event.currentTarget.destroy();  
                            //任务完成
                            callback();
                        }
                    });

                    if(customTask){
                        godGuide.eventTarget.on(FINISHSTEP,()=>{
                            agentNode.removeFromParent();
                            agentNode.destroy();  
                             //任务完成
                             callback();
                        })
                    }
                }
                godGuide._canTouch=true;
                //@ts-ignore
                godGuide.node._touchListener.setSwallowTouches(false);

            });
        },step.isDialog);
    }
    // //文本指令
    // static text(godGuide: GodGuide, step, callback) {
    //     let { args } = step.command;
    //     if (args && (typeof args === 'string' || typeof args === 'number')) {
    //         args = [args];
    //     }

    //     //触摸模拟
    //     let autorun = godGuide.getTask().autorun;

    //     let index = 0;
    //     //顺序显示文本
    //     async.eachSeries(args, (str, cb) => {
    //         let flag = false;
    //         let next = () => {
    //             if (++index >= args.length - 1) {
    //                 flag = true;
    //                 console.log('step------------->',step)
    //                 cb();
    //                 return;
    //             } else {
    //                 if (flag) {
    //                     return;
    //                 }
    //                 flag = true;
    //                 cb();
    //             }
    //         }

    //         godGuide.showText(str, () => {//点击回调
    //             next();
    //         });

    //         //自动引导
    //         if (autorun) {
    //             setTimeout(() => {
    //                 next();
    //             }, 1000);
    //         }
    //     }, callback);
    // }
};