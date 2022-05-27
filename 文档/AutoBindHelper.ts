import App from "../../../App";
import { BaseComponent } from "../imp/BaseComponent";

const PIX_BTN="auto_btn_";
const PIX_LB="auto_lb_";
const PIX_SP="auto_sp_";

const LANG_TXT="lang_lb_";
const LANG_SP="lang_sp_";

export class AutoBindHelper{
    /**
     * 解析数据
     * @param root 
     * @returns 
     */
    static evel(component:BaseComponent):void{
        let root=component.node;
        let evelNode=(node:cc.Node)=>{
            let children=node.children;
            for(let i=0;i<children.length;i++){
                let child=children[i];
                if(child.name.startsWith(PIX_BTN)){
                    component.UI_BTNS.set(child.name.replace(PIX_BTN,""),child);
                }else if(child.name.startsWith(PIX_LB)){
                    component.UI_LBS.set(child.name.replace(PIX_LB,""),child);
                }else if(child.name.startsWith(PIX_SP)){
                    component.UI_SPS.set(child.name.replace(PIX_SP,""),child);
                }else if(child.name.startsWith(LANG_TXT)){
                    component.LANG_LBS.set(child.name.replace(LANG_TXT,""),child);
                }else if(child.name.startsWith(LANG_SP)){
                    component.LANG_SPS.set(child.name.replace(LANG_SP,""),child);
                }
                if(child.children.length>0){
                    evelNode(child);
                }
            }
        }
        evelNode(root);
    }

    static  bindBtn(component:BaseComponent){
        component.UI_BTNS.forEach((node,key)=>{
            let btn=node.addComponent(cc.Button);
            btn.transition=cc.Button.Transition.SCALE;
            btn.target=node;
            btn.enableAutoGrayEffect=true;
            btn.interactable=true;

            btn.zoomScale=component.btnScaleZoom;
            let eventHandler:cc.Component.EventHandler =new cc.Component.EventHandler();
            eventHandler.target=component.node;
            let handName=node.name.replace(PIX_BTN,"");
            let tHandleName="on"+handName[0].toUpperCase()+handName.substr(1,handName.length)+"Click";
            let components=component.node.getComponents(BaseComponent);
            for(let i=0;i<components.length;i++){
                let com=components[i];
                if(com[tHandleName]){
                    eventHandler.handler=tHandleName;
                    let componentName=/(?<=\<)[\s\S]*?(?=\>)/g.exec(com.name)[0];
                    eventHandler.component=componentName;
                    break;
                }
            }
            btn.clickEvents.push(eventHandler);
       })
    }

    static bindLb(component:BaseComponent){
        component.UI_LBS.forEach((node,key)=>{
            let lbkey=key.replace(PIX_LB,"");
            if(component.UIBindData[lbkey]!=undefined){
                let com:cc.Label|cc.EditBox|cc.RichText=component.UI_LBS.get(lbkey).getComponent(cc.Label) ||
                                                        component.UI_LBS.get(lbkey).getComponent(cc.RichText)
                                                        || component.UI_LBS.get(lbkey).getComponent(cc.EditBox);
                if(com instanceof cc.EditBox){
                    com.node.on('text-changed', (editbox:cc.EditBox)=>{
                        component.UIBindData[lbkey]=editbox.string;
                    });
                }
                let data=component.UIBindData[lbkey];
                Object.defineProperty(component.UIBindData,lbkey,{
                    set:function(val) {
                        com.string=val;
                        component._MetaData[lbkey]=val;
                    },
                    get:function() {
                        return  component._MetaData[lbkey];
                    }
                })
                component.UIBindData[lbkey]=data;
            }
        })
    }

    static bindSprite(component:BaseComponent){
        component.UI_SPS.forEach((node,key)=>{
            let com:cc.Sprite=component.UI_SPS.get(key).getComponent(cc.Sprite);
            let data=component.UIBindData[key];
            Object.defineProperty(component.UIBindData,key,{
                set:function(val) {
                    com.spriteFrame=val;
                },
                get:function() {
                    return  com;
                }
            })
            if(data){
                component.UIBindData[key]=data;
            }
        })
    }


    static flushLangLb(component:BaseComponent){
        let subGameData=App.DataManager.getGameData();
        let bundleName:string;
        if(subGameData&&subGameData.tableData){
            bundleName=subGameData.packageName;
        }else{
            bundleName=App.BundleManager.defaultBundle;
        }
        component.LANG_LBS.forEach((node,key)=>{
            let str=App.LangManager.getTxtByKey(key,[],bundleName);
            let com:cc.Label|cc.EditBox|cc.RichText=node.getComponent(cc.Label) ||
                                                        node.getComponent(cc.RichText)
                                                        || node.getComponent(cc.EditBox);
            com.string=str;
        });
    }

    static flushLangSp(component:BaseComponent){
        let subGameData=App.DataManager.getGameData();
        let bundleName:string;
        if(subGameData){
            bundleName=subGameData.packageName;
        }else{
            bundleName=App.BundleManager.defaultBundle;
        }
        component.LANG_SPS.forEach((node,key)=>{
            let spriteFrame=App.LangManager.getSpriteFrameByKey(key,bundleName);
            if(spriteFrame){
                let com:cc.Sprite=node.getComponent(cc.Sprite);
                com.spriteFrame=spriteFrame;
            }else{
                App.LogManager.e("lang sp not found",key);
            }
            
        });
    }
}