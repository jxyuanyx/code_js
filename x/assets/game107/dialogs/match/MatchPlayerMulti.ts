import App from "../../../gamecore/App";
import { core } from "../../../gamecore/net/protos/proto";
import ListItem from "../../../gamecore/ui/components/common/ListItem";
import { getHead } from "../../../mainpackage/gameHelper/AthHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MatchPlayerMulti extends ListItem {

    UIBindData={
        head:null,
        gq:null,
        userName:""
    }

    onLoad(){
        super.onLoad();
        this.node.opacity=0;
    }

    setData(index:number,data:any){
        super.setData(index,data);
        this.UIBindData.userName=data.nick;
        getHead(data.avatar,this.UIBindData.head);
        this.UIBindData.gq=App.BundleManager.getCommonAtlas("mainpackage/country").getSpriteFrame(data.area_code);
        this.node.runAction(cc.fadeIn(0.2));
    }
}
