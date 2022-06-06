// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import cv from "../../lobby/cv";

const { ccclass, property } = cc._decorator;

@ccclass
export default class labaBtn extends cc.Component {

    @property(cc.Label) num: cc.Label = null;
    @property(cc.ProgressBar) img_circle: cc.ProgressBar = null;
    @property(cc.Node) bg: cc.Node = null;
    @property(cc.Node) copper: cc.Node = null;
    @property(cc.Node) silver: cc.Node = null;
    @property(cc.Node) golden: cc.Node = null;
    @property(cc.Animation) plus: cc.Animation = null;
    startPrograss: number = 0;
    endPrograss: number = 0;

    start() {
        this.plus.node.active = false;
    }

    updateLabaNum(playAni: boolean) {
        let handStr = cv.dataHandler.getUserData().hand_num;
        if (cv.Number(this.num.string) == handStr) {
            playAni = false;
        }

        let arr = cv.dataHandler.getUserData().playerHands;
        let hitArr = [arr[0], arr[1], arr[2]];
        if (playAni) {
            this.plus.node.active = true;
            let aniState = this.plus.getAnimationState(this.plus.defaultClip.name);
            if (aniState && aniState.isPlaying) return;
            this.plus.play();
            this.plus.on("finished", (event: cc.Event): void => {
                this.plus.off("finished");
                this.setNumAndCircle(true);
                switch (handStr) {
                    case 1:
                        if (this.golden.opacity == 255 && this.golden.active == true) {
                            this.runAc(this.golden, this.bg);
                        }
                        break;
                    case hitArr[0]:
                        this.runAc(this.bg, this.copper);
                        break;
                    case hitArr[0] + 1:
                        this.runAc(this.copper, this.bg);
                        break;
                    case hitArr[1]:
                        this.runAc(this.bg, this.silver);
                        break;
                    case hitArr[1] + 1:
                        this.runAc(this.silver, this.bg);
                        break;
                    case hitArr[2]:
                        this.runAc(this.bg, this.golden);
                        break;
                }
            }, this);
        }
        else {
            this.setNumAndCircle(false);
            this.bg.stopAllActions();
            this.copper.stopAllActions();
            this.silver.stopAllActions();
            this.golden.stopAllActions();
            this.plus.stop();
            this.plus.off("finished");
            this.plus.node.active = false;
            switch (handStr) {
                case 1:
                    if (this.golden.opacity == 255 && this.golden.active == true) {
                        this.setState(this.golden, this.bg);
                    }
                    break;
                case hitArr[0]:
                    this.setState(this.bg, this.copper);
                    break;
                case hitArr[0] + 1:
                    this.setState(this.copper, this.bg);
                    break;
                case hitArr[1]:
                    this.setState(this.bg, this.silver);
                    break;
                case hitArr[1] + 1:
                    this.setState(this.silver, this.bg);
                    break;
                case hitArr[2]:
                    this.setState(this.bg, this.golden);
                    break;
            }
        }
    }

    runAc(outNode: cc.Node, inNode: cc.Node) {
        let actionTime = 0.3;
        outNode.active = false;
        inNode.opacity = 0;
        inNode.active = true;
        inNode.runAction(cc.fadeIn(actionTime));
    }

    setState(outNode: cc.Node, inNode: cc.Node) {
        outNode.active = false;
        inNode.active = true;
        inNode.opacity = 255;
    }

    setNumAndCircle(playAni: boolean) {
        let handStr = cv.dataHandler.getUserData().hand_num;
        let playerHandsStr = cv.dataHandler.getUserData().getPlayerHands();
        this.startPrograss = cv.Number(this.num.string) / playerHandsStr;
        this.endPrograss = handStr / playerHandsStr;
        if (this.startPrograss > this.endPrograss) {
            this.startPrograss = 0;
        }
        this.img_circle.progress = this.startPrograss;

        this.num.string = cv.String(handStr);
        this.unschedule(this.updateCircle);
        if (!playAni) {
            this.img_circle.progress = this.endPrograss;
        }
        else {
            this.schedule(this.updateCircle, 1 / 60);
        }
    }

    updateCircle(dt: number) {
        if (this.img_circle.progress >= this.endPrograss) {
            this.unschedule(this.updateCircle);
            return;
        }
        this.img_circle.progress += (this.endPrograss - this.startPrograss) / 60;
    }
}
