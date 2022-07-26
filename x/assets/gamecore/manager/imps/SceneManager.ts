import App from "../../App";
import { ISceneManager } from "../ISceneManager";

export class SceneManager implements ISceneManager{

    private _currentSceneName:string=null;
    private _currentBundle:string=null;

    public currentSceneName(){return this._currentSceneName;}
    public curentBundle(){return this._currentBundle};

    loadScene(sceneName: string, bundle?:string,cb?:Function,openUIFlushing?:boolean){
        if(!bundle)bundle=App.BundleManager.defaultBundle;
        this._currentBundle=bundle;
        this._currentSceneName=sceneName;
        App.Net.flushingUI=true;
        let onComplete=(error: Error, scene: cc.Scene)=>{
            if(error){
                App.LogManager.e(error.message);
            }else{
                cc.director.getScene().runAction(cc.fadeTo(0.3,100));
                cc.director.runScene(scene,null,(error:Error,scene:cc.Scene)=>{
                    if(!openUIFlushing)App.Net.flushingUI=false;
                    if(cb)cb();
                    if(error){
                        App.LogManager.e(error.message);
                        return;
                    }
                    App.DlgManager.frontDlgs();
                    let canvas=scene.getChildByName("Canvas");
                    let widget=canvas.getComponent(cc.Widget);
                    if(!widget){
                        widget=canvas.addComponent(cc.Widget);
                        widget.isAlignTop=true;
                        widget.isAlignBottom=true;
                        widget.top=0;
                        widget.bottom=0;
                    }
                    canvas.addComponent(cc.SafeArea);
                    canvas.setContentSize(cc.sys.getSafeAreaRect().size);
                    canvas.opacity=100;
                    canvas.runAction(cc.fadeIn(0.3));
                });
            }
        }
        

        if(bundle){
            App.BundleManager.getBundle(bundle).loadScene(sceneName,onComplete);
        }else{
            cc.director.loadScene(sceneName,onComplete);
        }
    }


    async loadSceneAsync(sceneName: string, bundle?:string,openUIFlushing?:boolean){
        return new Promise((resolve,reject)=>{
            if(!bundle)bundle=App.BundleManager.defaultBundle;
            this._currentBundle=bundle;
            this._currentSceneName=sceneName;
            App.Net.flushingUI=true;
            let onComplete=(error: Error, scene: cc.Scene)=>{
                if(error){
                    reject(error.message);
                    App.LogManager.e(error.message);
                }else{
                    cc.director.getScene().runAction(cc.fadeTo(0.3,100));
                    cc.director.runScene(scene,null,(error:Error,scene:cc.Scene)=>{
                        if(!openUIFlushing)App.Net.flushingUI=false;
                        resolve(null);
                        if(error){
                            App.LogManager.e(error.message);
                            reject(error.message);
                            return;
                        }
                        App.DlgManager.frontDlgs();
                        let canvas=scene.getChildByName("Canvas");
                        let widget=canvas.getComponent(cc.Widget);
                        if(!widget){
                            widget=canvas.addComponent(cc.Widget);
                            widget.isAlignTop=true;
                            widget.isAlignBottom=true;
                            widget.top=0;
                            widget.bottom=0;
                        }
                        canvas.addComponent(cc.SafeArea);
                        canvas.setContentSize(cc.sys.getSafeAreaRect().size);
                        canvas.opacity=100;
                        canvas.runAction(cc.fadeIn(0.3));
                    });
                }
            }
            
    
            if(bundle){
                App.BundleManager.getBundle(bundle).loadScene(sceneName,onComplete);
            }else{
                cc.director.loadScene(sceneName,onComplete);
            }
        })
        
    }

    preLoadScene(sceneName: string, bundle?: string): void {
        if(bundle){
            App.BundleManager.getBundle(bundle).preloadScene(sceneName,(finish,total,item)=>{
            },null)
        }else{
            cc.director.preloadScene(sceneName);
        }
    }

    /*
    async backHall(cb?:Function){
        App.DataManager.getGameData().tableData=null;
        App.DataManager.getGameData().isInGame=false;
        
        await this.loadSceneAsync("hall");
        cb&&cb();
    }*/

    /**
     * 跳转进入的时候 不同的审核进不同的审核大厅
     * @param
     */
     async backHall(cb?:Function){
        if (App.DataManager.getGameData()) {    //第一次进入的时候 没有游戏信息 加个判断
            App.DataManager.getGameData().tableData=null;
            App.DataManager.getGameData().isInGame=false;
        }
        if(App.isCheck){
            let fakePackageName=App.NativeManager.getFakePackageName();
            if(fakePackageName){
                await this.loadSceneAsync("hall",fakePackageName);
            }else{
                await this.loadSceneAsync("hall");
            }
        }else{
            await this.loadSceneAsync("hall");
        }
        cb&&cb();
    }


    

    isInGame(){
        return this._currentBundle!=App.BundleManager.defaultBundle;
    }

}