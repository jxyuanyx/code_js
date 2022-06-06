// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import cv from "../../components/lobby/cv";
const { ccclass, property } = cc._decorator;

@ccclass
export class StatusView extends cc.Component {

    private signalCircleList: Array<cc.Node> = [];
    // private signalList: Array<cc.Node> = null;
    private msgNode: cc.Node = null;
    private systemTime: cc.Node = null;
    private electric_text: cc.Node = null;
    private electricBar: cc.Node = null;
    private electricIng_img: cc.Node = null;
    private is_loading: boolean = false;
    private batteryLevel: number = 100;
    private is_charging: boolean = false;

    preloadRes(callback: Function): void {
        cv.resMgr.load("zh_CN/commonPrefab/topView", cc.Prefab, (prefab: cc.Prefab): void => {
            if (callback) callback();
        }, cv.resMgr.CleanResLevel.LEVEL_BASE);
    }

    init() {
        let prefab: cc.Prefab = cv.resMgr.get("zh_CN/commonPrefab/topView", cc.Prefab);
        this.msgNode = cc.instantiate(prefab);
        cc.game.addPersistRootNode(this.msgNode);
        console.log("cv.config.WIDTH：" + cv.config.WIDTH + " cc.winsize.width：" + cc.winSize.width + " cc.view.getVisibleSize：" + cc.view.getVisibleSize());
        console.log("cc.view.getFrameSize().width:" + cc.view.getFrameSize().width);
        cv.config.WIDTH = cc.winSize.width;
        cv.config.HEIGHT = cc.winSize.height;
        cv.action.WIDTH = cc.winSize.width;
        cv.action.HEIGHT = cc.winSize.height;
        console.log("cv.config.WIDTH：" + cv.config.WIDTH + " cc.winsize.width：" + cc.winSize.width + " cc.view.getVisibleSize：" + cc.view.getVisibleSize());
        // this.msgNode.setPosition(cc.v2(cv.config.WIDTH * 0.5, cv.config.HEIGHT));
        console.log("==========> this.msgNode.pos = " + this.msgNode.getPosition() + "," + cc.winSize.width + "~" + cc.winSize.height);
        this.msgNode.zIndex = cv.Enum.ZORDER_TYPE.ZORDER_5;

        this.msgNode.active = false;
        for (var i = 0; i < 4; i++) {
            // this.signalList.push(cc.find("leftNode/Image_index" + i, this.msgNode));
            this.signalCircleList.push(cc.find("layout/leftNode/Image_index" + i + "/insideCircle_img", this.msgNode));
        }
        this.systemTime = cc.find("layout/systime_text", this.msgNode);
        this.electric_text = cc.find("layout/rightNode/electric_text", this.msgNode);
        this.electricBar = cc.find("layout/rightNode/electricBarFrame/electricBar", this.msgNode);
        this.electricIng_img = cc.find("layout/rightNode/electricIng_img", this.msgNode);

        if (cv.config.GET_CLIENT_TYPE() != cv.Enum.ClientType.CowboyWeb) {
            this.openView();
            this.is_loading = true;
        }

        cv.MessageCenter.register("on_change_delay", this.OnChangeDelay.bind(this), this.node);
    }

    onDestroy(): void {
        cv.MessageCenter.unregister("on_change_delay", this.node);
    }
    public openView() {
        if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) return;
        if (this.msgNode.active) return;
        this.msgNode.active = true;
        cv.resMgr.adaptWidget(this.msgNode);
        this.updateValue();
        cc.director.getScheduler().schedule(function () {
            this.updateValue();
        }, this, 15);
    };

    public reset(sceneName: string) {
        if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) return;
        cv.resMgr.adaptWidget(this.msgNode, true);
        //this.msgNode.setPosition(this.msgNode.x, cv.config.HEIGHT);
        this.show(true);
        this.showLeftCircles(true);
        this.showSystemTime(true);
        this.showElectricImgs(true);
        this.updateValue();

        switch (sceneName) {
            case cv.Enum.SCENE.HUMANBOY_SCENE:
            case cv.Enum.SCENE.POKERMASTER_SCENE:
            case cv.Enum.SCENE.TOPMATCHE_SCENE: {
                this.show(false);
            } break;

            case cv.Enum.SCENE.COWBOY_SCENE:
            case cv.Enum.SCENE.VIDEOCOWBOY_SCENE: {
                this.showLeftCircles(false);
                this.showSystemTime(false);
            } break;

            case cv.Enum.SCENE.SPORTS_SCENE: {
                let layout = this.msgNode.getChildByName("layout");
                layout.setPosition(layout.x, layout.y - 15);
            } break;

            default: break;
        }
    }

    public show(isView: boolean) {
        if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) return;
        this.msgNode.active = isView;
    }

    showLeftCircles(isView: boolean): void {
        // for (var i = 0; i < 5; i++) {
        //     this.signalCircleList[i].active = isView;
        // }

        let leftNode = cc.find("layout/leftNode", this.msgNode);
        if (leftNode) {
            leftNode.active = isView;
        }
    }

    showSystemTime(isView: boolean): void {
        this.systemTime.active = isView;
    }

    showElectricImgs(isView: boolean, worldPos?: cc.Vec2): void {
        let rightNode = cc.find("layout/rightNode", this.msgNode);
        if (rightNode) {
            rightNode.active = isView;
            if (worldPos) {
                rightNode.setPosition(rightNode.parent.convertToNodeSpaceAR(worldPos));
            }
        }
    }

    public updateValue() {
        if (!this || !this.msgNode || !cc.isValid(this.msgNode, true) || !this.msgNode.active) return;

        if (cc.sys.isBrowser && cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {
            cv.native.SYwebjsToClient("{\"cmd\": \"1010\"}");
        }

        this.getBatteryInfo();

        var date = new Date();
        var hour = date.getHours();
        var miniute = date.getMinutes();
        // console.log((hour < 10 ? "0" : "") + hour + ":" + (miniute < 10 ? "0" : "") + miniute);
        // console.log(this.systemTime.active);
        // console.log(this.systemTime.getPosition().x);
        // console.log(this.systemTime.getPosition().y);
        this.systemTime.getComponent(cc.Label).string = (hour < 10 ? "0" : "") + hour + ":" + (miniute < 10 ? "0" : "") + miniute;
    };

    getBatteryInfo(): void {
        if (cc.sys.isBrowser && cv.config.GET_CLIENT_TYPE() != cv.Enum.ClientType.H5WebPage) {
            let x: any = window.navigator;
            if (cc.sys.OS_IOS) return;//ios浏览器模式获取电量接口未找到
            x.getBattery().then(function (battery) {
                // 是否正在充电，yes-充电
                this.is_charging = battery.charging;

                this.electricIng_img.active = this.is_charging;
                if (this.is_charging) {
                    this.electricBar.color = new cc.Color(16, 234, 16);
                }
                else {
                    this.electricBar.color = cc.Color.WHITE;
                }

                // 当前剩余电量
                this.batteryLevel = battery.level;

                if (!this.batteryLevel || this.batteryLevel < 0) return;
                var electricNum: number = this.batteryLevel * 100;
                electricNum = (electricNum >= 100) ? 100 : electricNum;
                this.electric_text.getComponent(cc.Label).string = Math.floor(electricNum) + "%";
                this.electricBar.getComponent(cc.ProgressBar).progress = electricNum * 0.01;

            }.bind(this));
        }
        else {

            if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.H5WebPage) {

                let _batterInfo = cv.native.SYgetBatteryLevel();
                if (_batterInfo == null) {
                    return;
                }
                let batteryInfo = JSON.parse(_batterInfo);
                this.batteryLevel = batteryInfo["battery"] / 100;
                this.is_charging = batteryInfo["is_charging"];

                console.log("SYINfo ==== this.batteryLevel: = " + this.batteryLevel);
                console.log("SYINfo ==== this.is_charging: = " + this.is_charging);


                console.log("SYINfo ==== SYgetSysLanguage: = " + cv.native.SYgetSysLanguage());

            } else {
                let ret = cv.native.invokeSyncFunc(cv.nativeCMD.KEY_IS_BATTERY_CHARGE);
                if (cc.sys.os === cc.sys.OS_IOS) {
                    this.is_charging = (ret == "true");
                } else {
                    this.is_charging = parseInt(ret) != 0;
                }

                this.batteryLevel = cc.sys.getBatteryLevel();
            }

            this.electricIng_img.active = this.is_charging;
            if (this.is_charging) {
                this.electricBar.color = new cc.Color(16, 234, 16);
            }
            else {
                this.electricBar.color = cc.Color.WHITE;
            }

            if (!this.batteryLevel || this.batteryLevel < 0) return;
            var electricNum: number = this.batteryLevel * 100;
            electricNum = (electricNum >= 100) ? 100 : electricNum;
            this.electric_text.getComponent(cc.Label).string = Math.floor(electricNum) + "%";
            this.electricBar.getComponent(cc.ProgressBar).progress = electricNum * 0.01;

        }
    }

    updateSystemTimePos(isOpen: boolean) {
        if (this.is_loading) {
            if (isOpen == true) {
                console.log(-cv.config.WIDTH / 2 + 160);
                //this.systemTime.setPosition(cc.v2(-cv.config.WIDTH / 2 + 160, this.systemTime.getPosition().y));
            }
            else if (!isOpen && !cv.config.IS_FULLSCREEN) {
                //this.systemTime.setPosition(cc.v2( - this.systemTime.width * 0.5, this.systemTime.getPosition().y));
            }
        }
    }

    public OnChangeDelay() {
        let delay = cv.dataHandler.getUserData().u64DelayEnd - cv.dataHandler.getUserData().u64DelayBegin;
        if (delay < 100) {
            this.setSignal(4);
        }
        else if (delay < 200 && delay > 100) {
            this.setSignal(3);
        }
        else if (delay < 300 && delay > 200) {
            this.setSignal(2);
        }
        else {
            this.setSignal(1);
        }
    }

    private setSignal(num) {
        for (var i = 0; i < 4; i++) {
            if (i < num) {
                this.signalCircleList[i].active = true;
                cv.resMgr.setSpriteFrame(this.signalCircleList[i], "zh_CN/hall/ui/signal_" + num);
            }
            else {
                this.signalCircleList[i].active = false;
            }
        }
    };


    private static instance: StatusView;

    public static getInstance(): StatusView {
        if (!this.instance || !this.instance.msgNode || !cc.isValid(this.instance.msgNode, true)) {
            this.instance = new StatusView();
        }
        return this.instance;
    }
}
