import {IDlgManager} from "../IDlgManager";
import {DlgEnum} from "../../enums/DlgEnum";
import App from "../../App";
import BaseDlg  from "../../ui/baseview/imp/BaseDlg";
import Asset = cc.Asset;
import { DlgSequecene} from "../../tools/DlgSequecene";

export const DLG_LAYER="DlgLayer";


export class DlgManager implements IDlgManager{
    private _dlgMode:DlgEnum;
    private _showTime:number;
    private _hideTime:number;

    private _dlgs:Map<string, BaseDlg>;

    private _dlgBgSpriteFrame:cc.SpriteFrame;

    private _hasEasing:boolean=false;

    private _dlgLayer:cc.Node=null;

    private _dlgSequenece:string[]=null;

    hideDlg(dlgName: string,bundleName?:string) {
        if(!bundleName){
            bundleName=App.BundleManager.defaultBundle;
        }

        let dlgKey=this._getDlgkey(bundleName,dlgName);
        let dlgCom=this._dlgs.get(dlgKey);
        this._dlgs.delete(dlgKey);
        if(!dlgCom)return;
        //清除背景
        let parent=this._dlgLayer || cc.director.getScene();
        let bg:cc.Node=null;
        let children=parent.children;
        for(let i=0;i<children.length;i++){
            let child=children[i];
            if(child.name==(dlgKey+"_bg")&&!child["hiding"]){
                child["hiding"]=true;
                bg=child;
                break;
            }
        }
        if(dlgCom){
            dlgCom.beforeHide();
            this._hideDlgAnim(dlgCom,dlgCom.afterHide,dlgCom,dlgKey);
        }
        this._dlgSequenece.splice(this._dlgSequenece.indexOf(dlgKey),1);
        if(bg){
            bg.runAction(cc.sequence(
                cc.fadeOut(0.3),
                cc.callFunc(node=>{
                    node.removeFromParent(true);
                    node.destroy();
                })
            ))
        }
    }

    init(dlgMode: DlgEnum, showTime: number=0.2, hideTime: number=0.2,hasEasing?:boolean) {
        this._dlgMode=dlgMode;
        this._showTime=showTime;
        this._hideTime=hideTime;
        this._hasEasing=hasEasing || false;
        this._dlgs=new Map<string, BaseDlg>();
        this._dlgSequenece=[];
    }

    setDlgLayer(layer:cc.Node){
        this._dlgLayer=layer;
        cc.game.addPersistRootNode(layer);
    }

    _getDlgkey(bundleName: string,dlgName: string){
        if(!bundleName) bundleName=App.BundleManager.defaultBundle;

        return bundleName+"_"+dlgName;
    }

    async showDlg(dlgName: string, data?: any, bundleName?: string) {
        return new Promise((resolve,reject)=>{
            if(!bundleName){
                bundleName=App.BundleManager.defaultBundle;
            }
    
            let parent=this._dlgLayer || cc.director.getScene();
            let dlgKey=this._getDlgkey(bundleName,dlgName);
    
            let dlg=this._dlgs.get(dlgKey);
            if(dlg!==undefined){
                if(dlg===null){
                    App.LogManager.e("dialog already loading");
                    resolve(null)
                    return;
                }else{
                    //更新数据信息
                    dlg.getComponent(BaseDlg).updateData(data);
                    resolve(null);
                    return;
                }
            }
            this._dlgs.set(dlgKey,null);
            let addToView=(prefab:Asset)=>{
                //解决关闭过快的问题
                if(this._dlgs.get(dlgKey)===undefined)return;
                let dlgView=(cc.instantiate(prefab) as any) as cc.Node;
                let dlgCom=dlgView.getComponent(BaseDlg);
                dlgCom.dlgName=dlgName;
                dlgCom.bundleName=bundleName;
                dlgView.addComponent(cc.BlockInputEvents);
                //dlgView.setPosition(cc.winSize.width/2,cc.winSize.height/2)
                //dlgView.setPosition(cc.Vec2.ZERO);    
                this._dlgSequenece.push(dlgKey);
                if(!dlgCom.showMode)dlgCom.showMode=this._dlgMode;
                //是否创建背景
                let bg=new cc.Node(dlgKey+"_bg");
                if(dlgCom.autoMask){
                    let sp=bg.addComponent(cc.Sprite);
                    sp.spriteFrame=this._dlgBgSpriteFrame;
                    sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                }
                if(dlgCom.hitSpaceHide){
                    bg.on(cc.Node.EventType.TOUCH_START,this._clickSpaceHide.bind(this,dlgName,bundleName));
                }
                bg.setContentSize(parent.getContentSize());
                bg.setPosition(0,(parent.height-cc.winSize.height)/2);
                bg.addComponent(cc.BlockInputEvents);
                parent.addChild(bg);
                bg.opacity=0;
                bg.runAction(cc.fadeTo(0.2,dlgCom.bgOpacity));
                dlgCom.init(data);
                //dlgCom.beforeShow();
                let widget=dlgView.getComponent(cc.Widget)
                if(dlgCom.isFull){
                    dlgView.setContentSize(parent.getContentSize());
                    dlgView.setPosition(cc.Vec2.ZERO);
                }
                parent.addChild(dlgView);
                if(widget)widget.updateAlignment();
                dlgView.removeComponent(cc.Widget);
                this._showDlgAnim(dlgCom,dlgCom.afterShow,dlgCom);
                this._dlgs.set(dlgKey,dlgCom);
            }
            if(bundleName){
                let bundle=App.BundleManager.getBundle(bundleName);
                bundle.load(`dialogs/${dlgName}/main`,cc.Prefab,(finish,total,item)=>{
    
                },(error,prefab)=>{
                    if(error){
                        reject(error)
                        return
                    }
                    addToView(prefab);
                    resolve(null)
                });
            }else{
                cc.resources.load(`dialogs/${dlgName}/main`,cc.Prefab,(error,prefab)=>{
                    if(error){
                        reject(error)
                        return
                    }
                    addToView(prefab);
                    resolve(null)
                })
            }
        })
        
    }

    _clickSpaceHide(dlgName,bundleName){
        if(!bundleName){
            bundleName=App.BundleManager.defaultBundle;
        }
        let dlgKey=this._getDlgkey(bundleName,dlgName);
        let dlgCom=this._dlgs.get(dlgKey);
        if(!dlgCom)return;
        if(dlgCom){
            if(dlgCom.hitSpaceHide){
                this.hideDlg(dlgName,bundleName);
            }
        }
    }

    _showDlgAnim(com:BaseDlg,cb:Function,target:any){
        let node:cc.Node=com.node;
        com.node.stopAllActions()
        let contentSize=node.parent.getContentSize();
        let y=(contentSize.height-cc.winSize.height)/2
        let tartgetPos:cc.Vec2=new cc.Vec2(0,y);

        let showTime=((com.showTime==null)?this._showTime:com.showTime)
        if(com.showMode==DlgEnum.NONE){
            node.setPosition(tartgetPos);
            if(cb)cb.call(target);
            return
        }
        let action:cc.ActionInterval=null
        let size=node.getContentSize();

        if(com.showMode==DlgEnum.SCALE){
            node.scale=0.5
            node.setPosition(tartgetPos);
            console.log("tartgetPos",tartgetPos)
            action=cc.scaleTo(showTime,1)
        }
        if(com.showMode==DlgEnum.L2R){
            node.setPosition(-contentSize.width-size.width/2,y)
            action=cc.moveTo(showTime,tartgetPos)
        }
        if(com.showMode==DlgEnum.R2L){
            node.setPosition(contentSize.width+size.width/2,y)
            action=cc.moveTo(showTime,tartgetPos)
        }
        if(com.showMode==DlgEnum.T2B){
            node.setPosition(0,contentSize.height/2+size.height/2)
            action=cc.moveTo(showTime,tartgetPos)
        }
        if(com.showMode==DlgEnum.B2T){
            node.setPosition(0,-contentSize.height/2-size.height/2)
            action=cc.moveTo(showTime,tartgetPos)
        }
        if(com.showMode==DlgEnum.FADE){
            node.opacity=0;
            node.setPosition(tartgetPos);
            action=cc.fadeIn(showTime);
        }

        if(com.showMode==DlgEnum.DOCK_BOTTOM){
            node.setPosition(0,-contentSize.height/2+(node.anchorY-1)*size.height)
            action=cc.moveTo(showTime,0,-contentSize.height/2+node.anchorY*size.height+y)
        }

        if(com.showMode==DlgEnum.DOCK_TOP){
            node.setPosition(0,contentSize.height/2+node.anchorY*size.height)
            action=cc.moveTo(showTime,0,contentSize.height/2-(1-node.anchorY)*size.height+y)
        }

        if(com.showMode==DlgEnum.DOCK_RIGHT){
            node.setPosition(contentSize.width/2+node.anchorX*size.width,y)
            action=cc.moveTo(showTime,contentSize.width/2+(node.anchorX-1)*size.width,y)
        }

        if(com.showMode==DlgEnum.DOCK_LEFT){
            node.setPosition(-contentSize.width/2+(node.anchorX-1)*size.width,y)
            action=cc.moveTo(showTime,-contentSize.width/2+node.anchorX*size.width,y)
        }

        if(action){
            if(this._hasEasing){
                action.easing(cc.easeBackOut())
            }
            node.runAction(cc.sequence(
                action,
                cc.callFunc(()=>{
                    cb.call(target);
                })
            ))
        }
    }

    _hideDlgAnim(com:BaseDlg,cb:Function,target:any,dlgKey?:string){
        let node:cc.Node=com.node;
        if(!node)return;
        node.stopAllActions()
        if(com.showMode==DlgEnum.NONE){
            cb.call(target);
            node.removeFromParent();
            node.destroy();
            DlgSequecene.getInstance().removeDlg(dlgKey);
            return
        }
        var action=null
        var size=node.getContentSize()
        let contentSize=node.parent.getContentSize();
        
        let y=(contentSize.height-cc.winSize.height)/2;

        let hideTime=((com.hideTime==null)?this._hideTime:com.hideTime)

        if(com.showMode==DlgEnum.SCALE){
            action=cc.scaleTo(hideTime,0.5)
        }
        if(com.showMode==DlgEnum.L2R){
            action=cc.moveTo(hideTime,cc.v2(-contentSize.width-size.width/2,y))
        }
        if(com.showMode==DlgEnum.R2L){
            action=cc.moveTo(hideTime,cc.v2(contentSize.width+size.width/2,y))
        }
        if(com.showMode==DlgEnum.T2B){
            action=cc.moveTo(hideTime,cc.v2(0,contentSize.height/2+size.height/2))
        }
        if(com.showMode==DlgEnum.B2T){
            action=cc.moveTo(hideTime,cc.v2(0,-contentSize.height/2-size.height/2))
        }

        if(com.showMode==DlgEnum.FADE){
            node.opacity=255;
            action=cc.fadeOut(hideTime);
        }
        
        if(com.showMode==DlgEnum.DOCK_BOTTOM){
            action=cc.moveTo(hideTime,0,-contentSize.height/2+(node.anchorY-1)*size.height)
        }

        if(com.showMode==DlgEnum.DOCK_TOP){
            action=cc.moveTo(hideTime,0,contentSize.height/2+node.anchorY*size.height)
        }

        if(com.showMode==DlgEnum.DOCK_RIGHT){
            action=cc.moveTo(hideTime,contentSize.width/2+node.anchorX*size.height,y)
        }

        if(com.showMode==DlgEnum.DOCK_LEFT){
            action=cc.moveTo(hideTime,-contentSize.width/2+(node.anchorX-1)*size.width,y)
        }


        if(action){
            if(this._hasEasing){
                action.easing(cc.easeBackIn());
            }
            var actions=cc.sequence(
                action,
                cc.callFunc(node=>{
                    cb&&cb.call(target);
                    node.removeFromParent();
                    node.destroy();
                    DlgSequecene.getInstance().removeDlg(dlgKey);
                })
            )
            node.runAction(actions)
        }
    }

    updateData(dlgName: string, data?: any,bundleName?:string) {
        let dlgKey=this._getDlgkey(bundleName,dlgName);
        let dlg=this._dlgs.get(dlgKey)
        if(dlg){
            dlg.updateData(data);
        }
    }

    preDlg(dlgName: string, bundleName?: string) {
        if(!bundleName){
            bundleName=App.BundleManager.defaultBundle;
        }
        let path=`dialogs/${dlgName}/main`;
        if(bundleName){
            let bundle=App.BundleManager.getBundle(bundleName);
            bundle.preload(path);
        }else{
            cc.resources.preload(path);
        }
    }

    getDlgBg(): cc.SpriteFrame {
        return this._dlgBgSpriteFrame;
    }

    setDlgBg(bg: cc.SpriteFrame) {
        this._dlgBgSpriteFrame=bg;
    }

    frontDlgs(){
        this._dlgLayer.zIndex=999;
    }

    clearAllDlgs(): void {

        this._dlgLayer.destroyAllChildren();

        this._dlgs.clear();

        this._dlgSequenece.splice(0,this._dlgSequenece.length);
    }

    closeTopDlg():boolean{
        if(this._dlgSequenece.length>0){
            let key=this._dlgSequenece[this._dlgSequenece.length-1];
            let comDlg=this._dlgs.get(key);
            if(comDlg&&comDlg.hitSpaceHide){
                let dlgInfo=key.split("_");
                this.hideDlg(dlgInfo[1],dlgInfo[0]);
            }
            return true;
        }else{
            return false;
        }
    }

    isEmptyDlg(){
        console.log(">>>>>sssssss",this._dlgSequenece)
        return this._dlgSequenece.length==0;
    }

    setDlgActive(dlgName:string,val:boolean,bundle?:string){
        let key=this._getDlgkey(bundle,dlgName);
        let dlgCom=this._dlgs.get(key);
        if(dlgCom){
            dlgCom.node.active=val;
            let bg=this._dlgLayer.getChildByName(key+"_bg");
            if(bg){
                bg.active=val;
            }
        }
    }

}