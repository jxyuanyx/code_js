// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { IAudioManager } from "./manager/IAudioManager";
import { IBundleManager } from "./manager/IBundleManager";
import { ICommonRes } from "./manager/ICommonRes";
import { IDataManager } from "./manager/IDataManager";
import { IDlgManager } from "./manager/IDlgManager";
import { IHttpManager } from "./manager/IHttpManager";
import { ILangManager } from "./manager/ILangManager";
import { ILogManager } from "./manager/ILogManager";
import { INativeManager } from "./manager/INativeManager";
import { INoticemanager } from "./manager/INoticeManager";
import { ISceneManager } from "./manager/ISceneManager";
import { IGameNet } from "./net/IGameNet";
import { IMqttGameNet } from "./net/IMqttGameNet";

export default class App{
    static BundleManager:IBundleManager;
    static SceneManager:ISceneManager;
    static DlgManager:IDlgManager;
    static LogManager:ILogManager;
    static Net:IGameNet;
    static DataManager:IDataManager;
    static HttpManager:IHttpManager;
    static LangManager:ILangManager;
    static NativeManager:INativeManager; 
    static CommonResManager:ICommonRes;
    static NoticeManager:INoticemanager;
    static AudioManager:IAudioManager;

    static isCheck:boolean=false;

    static isRestarting:boolean=false;
}

window["App"]=App;