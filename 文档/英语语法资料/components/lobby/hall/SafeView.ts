import cv from "../../lobby/cv";

const { ccclass, property } = cc._decorator;
@ccclass
export class SafeView extends cc.Component {

    @property(cc.Button) safeBtn: cc.Button = null;
    @property(cc.Label) safe_text: cc.Label = null;
    @property(cc.Prefab) safePref: cc.Prefab = null;

    safe: cc.Node = null;

    protected onLoad(): void {
        this.addRegister();
    }

    //调用safe界面
    public displaysafe(): void {
        cv.worldNet.RequestGetStrongboxInfo();
        this.safe = cc.instantiate(this.safePref);
        cc.director.getScene().addChild(this.safe, cv.Enum.ZORDER_TYPE.ZORDER_6);
        this.safe.name = "safe_pref";
    }

    private addRegister(): void {
    }

    private removeRegister(): void {
    }

    onDestroy(): void {
        this.removeRegister();
    }

    protected start(): void {

    }
}