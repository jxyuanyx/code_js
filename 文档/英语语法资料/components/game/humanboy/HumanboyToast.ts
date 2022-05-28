const { ccclass, property } = cc._decorator;
@ccclass
export class HumanboyToast extends cc.Component {

    @property(cc.Label) txt: cc.Label = null;

    protected onLoad(): void {
    }

    protected start(): void {
    }
}
