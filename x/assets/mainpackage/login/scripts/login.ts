// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import App from "../../../gamecore/App";
import { NetEnum } from "../../../gamecore/enums/NetEnum";
import { GuestAccountData, LoginType, TokenAccountData } from "../../../gamecore/models/AccountData";
import { UpdateService } from "../../../gamecore/tools/updateService";
import { BaseScene } from "../../../gamecore/ui/baseview/imp/BaseScene";
import { CONSTANTS, GameConfig, Games } from "../../GameConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Login extends BaseScene {
    UIBindData={
        login:"Login",
        reg:"Register"
    }

    @property(cc.Node)
    tipNode:cc.Node;

    @property(sp.Skeleton)
    logoAnim:sp.Skeleton;

    @property(cc.Node)
    app:cc.Node;

    onLoad(){
        super.onLoad();
        

        cc.game.addPersistRootNode(this.app);

        if(cc.sys.isNative){
            //设置unity hook目录
            let path=`${jsb.fileUtils.getWritablePath()}unity/AssetBundles/unityCommon_${App.NativeManager.getarchabi()}`
            App.NativeManager.usedatadir(path);
        }
    }

    beforeEnter(){
        super.beforeEnter();
    }


    onLoginClick(){
        if(!GameConfig.TEST)return
        App.DlgManager.showDlg("login")
    }

    onRegClick(){
        if(!GameConfig.TEST)return
        App.DlgManager.showDlg("reg")
    }

    onFacebookClick(){
        App.DlgManager.showDlg("loading");
        App.NativeManager.loginByFaceBook();
    }

    onGoogleClick(){
        App.DlgManager.showDlg("loading");
        App.NativeManager.loginByGoogle();
    }

    onGuestClick(){
        let accountData=new GuestAccountData();
        accountData.Type=LoginType.GUEST;
        cc.game.emit(NetEnum.REQ_CONTECT,accountData);
    }

    afterEnter(){
        this.UI_BTNS.get("guest").active=App.DataManager.getExtInfo(CONSTANTS.SYSTEM_CONFIG).guest_switch;
        if(App.isCheck){
            this.LANG_LBS.get("loginAgreeTip").active=false;
            this.tipNode.active=false;
        }

        if(App.isCheck){
            let guideData={hall:0,games:{}};
            guideData.hall=2;
            Games.forEach(game=>{
                guideData.games[game.gameName]=1;
            })
            App.DataManager.setExtInfo("guideData",guideData);
        }
        if(!cc.sys.isBrowser){
            //解压文件
            Games.forEach(game=>{
                //如果是随包的unity游戏，需要拷贝一下
                let gamePath=jsb.fileUtils.getDefaultResourceRootPath()+`assets/${game.packageName}`;
                if(game.isUnity&&!cc.sys.localStorage.getItem(game.packageName)&&jsb.fileUtils.isDirectoryExist(gamePath)){
                    App.NativeManager.echo("解压游戏》》》》》："+gamePath);
                    let destDir=jsb.fileUtils.getWritablePath()+"unity/AssetBundles/"+game.packageName;
                    App.NativeManager.copyAssetsToDst(`assets/${game.packageName}`,destDir);
                    cc.sys.localStorage.setItem(game.packageName,"1")
                }
            })
        }
        this._autoEnterGame();
        //App.DlgManager.showDlg("login")
    }

    _autoEnterGame(){
        let token=cc.sys.localStorage.getItem("token")
        if(token){
            let account=new TokenAccountData();
            account.Type=LoginType.TOKEN;
            account.token=token;
            cc.game.emit(NetEnum.REQ_CONTECT,account);
        }
    }

    onAnimReady(){
       
    }

    onServiceClick(){
        App.DlgManager.showDlg("webWin",{title:"privacy policy",url:GameConfig.PRIVACY_POLICY});

    }

    // update (dt) {}
}
