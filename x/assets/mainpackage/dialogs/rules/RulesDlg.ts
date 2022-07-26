// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";

const {ccclass, property} = cc._decorator;
export class RulesDlgData {
    group:{txt:string,isTitle:boolean}[];
}

@ccclass
export class RulesDlg extends BaseDlg {

    @property(cc.Prefab)
    label_txt:cc.Prefab = null;

    @property(cc.Node)
    content:cc.Node = null;


    afterShow(){
        this.content.removeAllChildren();
        for (let index = 0; index < this._data.group.length; index++) {
            let label = cc.instantiate(this.label_txt);
            if (this._data.group[index].isTitle) {
                label.getComponent(cc.Label).string = this._data.group[index].txt;
            }
            else{
                label.getComponent(cc.Label).string = this._data.group[index].txt.concat("\n");
            }
            label.getComponent(cc.Label).enableBold = this._data.group[index].isTitle;
            this.content.addChild(label);
        }
    }

}
