// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import BaseDlg from "../../../gamecore/ui/baseview/imp/BaseDlg";
import ListAdapter from "../../../gamecore/ui/components/common/ListAdapter";
import ListView from "../../../gamecore/ui/components/common/ListView";
import { ENVIRONMENTS } from "../../GameConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SelectServers extends BaseDlg {

    @property(ListView)
    listView:ListView<any>=null;

    @property(cc.Toggle)
    checkToggle:cc.Toggle=null;

    UIBindData={
        url:"",
        env:""
    }

    afterShow(){
        let list=[];
        let env=cc.sys.localStorage.getItem("env") || "未选择";
        for(let key in ENVIRONMENTS){
            let data={desc:key,url:ENVIRONMENTS[key],checked:false};
            if(key==env){
                data.checked=true;
            }
            list.push(data);
        }

        let adapter=new ListAdapter(list);
        this.listView.setAdapter(adapter);
        this.UIBindData.env=env;

        adapter.setOnItemClickListener((ad:ListAdapter,index)=>{
            this.UIBindData.url=ad.getItem(index).url;
            this.UIBindData.env=ad.getItem(index).desc;
            
        },this)

        let isCheck=cc.sys.localStorage.getItem("isCheck");
        if(isCheck){
            this.checkToggle.isChecked=parseInt(isCheck)?true:false;
        }
    }

    onChangeServerClick(){
        if(!this.UIBindData.env)return;
        App.DlgManager.hideDlg("selectServers")
        cc.sys.localStorage.clear();
        if(cc.sys.isNative){
            jsb.fileUtils.removeDirectory(jsb.fileUtils.getWritablePath());
        }
        cc.sys.localStorage.setItem("isCheck",this.checkToggle.isChecked?1:0);
        cc.sys.localStorage.setItem("env",this.UIBindData.env);
        App.Net.close();
        cc.audioEngine.uncacheAll();
        cc.game.restart();
    }

    onCheckVersionClick(){

    }

}
