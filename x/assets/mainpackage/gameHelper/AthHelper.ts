import App from "../../gamecore/App";
import GameItemData from "../../gamecore/models/GameItemData";
import { GameStatus } from "../../gamecore/models/GameStatus";
import GameHelper from "../../gamecore/tools/GameHelper";
import { ENTER_TYPES } from "../dialogs/downloadgame/DownloadGame";
import { CONSTANTS, GameConfig, Games } from "../GameConfig"
import { ENTER_STEPS } from "../hall/guid/HallGuideConfig";
import { EVENTS, PAGES } from "../hall/scripts/hall";


const MONTHNAMES=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];

export function formatCurrency(coin:number,hasPrefix?:boolean):string {
    coin=coin/GameConfig.EXCHANGE_RATE;
    let str=hasPrefix?"₹":"";
    if(coin>=10000){
        return str+fromatChip(coin);
    }else{
        return str+fromatNumber1(coin);
    }
}

export function fromatRate(coin:number){
    coin = coin/GameConfig.EXCHANGE_RATE;
    return coin; 
}

export function fromatTime(timestamp:number){
    var nowtime=new Date().getTime()/1000;
    var time=nowtime-timestamp;
    var result:string="";
    //几前天
    if(time>=60*60*24){
        result=App.LangManager.getTxtByKey("daysAgo",[Math.floor(time/(60*60*24))])
    }else if(time>=60*60){
        result=App.LangManager.getTxtByKey("hoursAgo",[Math.floor(time/(60*60))]);
    }else if(time>=60){
        result=App.LangManager.getTxtByKey("minutesAgo",[Math.floor(time/60)]);
    }else{
        result=App.LangManager.getTxtByKey("secondsAgo",[Math.floor(time)]);          
    }
    return result
}

export function fromatChip(value:number,n?:Boolean):string{
    let ext=""
    let result:string="";
    if(value>=1000000000000){
        result=(value/1000000000000).toFixed(3)
        ext=(n?'t':"T")
    }else if(value>=1000000000){
        result=(value/1000000000).toFixed(3)
        ext=(n?'b':"B")
    }else if(value>=1000000){
        result=(value/1000000).toFixed(3)
        ext=(n?'m':"M")
    }else if(value>=1000){
        result=(value/1000).toFixed(3)
        ext=(n?'k':"K")
    }else{
        return value.toString();
    }
    let str1=result.substring(0,result.lastIndexOf('.')+3)
    let info=str1.split('.')
    let right=parseInt(info[1])
    if(right%10==0){
        if(right==0){
            result=info[0]
        }else {
            while(right%10==0){
                right/=10
            }
            result=info[0]+"."+right
        }
    }else{
        return str1+ext
    }
    
    return result+ext
}

export function fromatNumber1(value:number):string{
    let part1=Math.floor(value);
    let part2=value-part1;
    let result="";
    let part1Str=part1.toString();
    while(part1Str.length>3){
        result=','+part1Str.substr(part1Str.length-3,3)+result
        part1Str=part1Str.substr(0,part1Str.length-3);
    }
    result=part1Str+result;
    if(part2!=0){
        let part2Str=part2.toFixed(2);
        result+=part2Str.substr(1,part2Str.length);
    }
    return result
}

export function formatDate(time:number):string {
    var date = new Date(time);
    var YY = date.getFullYear() + '/';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return YY + MM + DD +" "+hh + mm + ss;
}

export function formatDateToEN(time:number,regex?:string):string {
    var date = new Date(time);
    var YY = date.getFullYear().toString();
    var MM = date.getMonth();
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()).toString();
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()).toString();
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes());
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()).toString();
    if(regex){
        let str=regex.replace(/(hh)/g,hh).replace(/(mm)/g,hh).replace(/(ss)/g,ss).replace(/(MM)/g,MONTHNAMES[MM]).replace(/(DD)/g,DD).replace(/(YY)/g,YY);
        return str;
    }else{
        return `${hh}:${mm}:${ss},${MONTHNAMES[MM]} ${DD},${YY}`;
    }
}

export function formatEngDate(time:number){
    var date = new Date(time);
    var YY = date.getFullYear();
    var MM = date.getMonth();
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    return hh + mm + ","  + MONTHNAMES[MM] + " " + DD + "," + YY;
}

export function formatDateWithOutTime(time:number,fromatStr:string="YYYY-MM-DD"):string {
    var date = new Date(time);
    var YYYYY = date.getFullYear().toString();
    var MM = (date.getMonth() + 1 < 10) ? ('0' + (date.getMonth() + 1)) :(date.getMonth() + 1).toString();
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate().toString());

    return fromatStr.replace("YYYY",YYYYY).replace("MM",MM).replace("DD",DD);
}

export function formatDateWithDate(time:number):string {
    var date = new Date(time);
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return hh + mm + ss;
}


    //格式化时间
export function fromatTimeNew(time:number){
        let str=""
        if(time/3600>=1){
            var hour=Math.floor(time/3600)+''
            if(hour.length<2){
                str="0"+hour
            }else{
                str=hour
            }
            str+=":"
            time=time%3600
        }
        if(time/60>=1){
            let minu=Math.floor(time/60)+''
            if(minu.length<2){
                str+="0"+minu
            }else{
                str+=minu
            }
            str+=":"
            time=time%60
        }else{
            str+="00:"
        }
    
        let sec=time+''
        if(sec.length<2){
            str+="0"+sec
        }else{
            str+=sec
        }
        
        return str
    }

    export function getHead(url:string,sp:cc.Sprite,uid?:number){
        if(url==null){
            url=Math.ceil(Math.random()*2)+"";
        }
        //网络图像
        if(url.substr(0,4).toLocaleLowerCase()=="http"){
            cc.assetManager.loadRemote(url,{ext:'.png'},(err, texture:cc.Texture2D) =>{
                if(err){
                    sp.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/head").getSpriteFrame((uid%10+1).toString());
                    return;
                }
                var spframe=new cc.SpriteFrame(texture);
                if(sp&&sp.node){
                    sp.spriteFrame=spframe;
                }
            });
        }else{
            //取本地头像
            if(url){
                sp.spriteFrame=App.BundleManager.getCommonAtlas("mainpackage/head").getSpriteFrame(url);
            }
        }
    }

    export function formatCommonCmd(cmd:string){
        let gameData=App.DataManager.getGameData();
        if(!gameData)return null;
        return cc.js.formatStr(cmd,gameData.serverModuleName);
    }

    export function playEffect(speed:number = 1,path: string, spine: sp.Skeleton, animation: string = '', loop: boolean = true, bundle:string, callback:Function,target ?: any, onComplete?: Function){
        App.BundleManager.loadAssest(path, sp.SkeletonData, ( assets) => {
            animation = animation || "";
            loop = loop == null ? true : loop;
            spine.timeScale = speed;
            spine.skeletonData = assets as sp.SkeletonData;
            spine.premultipliedAlpha = false;
            spine.setAnimation(0, animation, loop);
            if (target && onComplete) onComplete.call(target)
        },null,bundle);
        callback&&spine.setCompleteListener(callback.bind(this));
        return spine;
    }

    export const MOCKUSERS="mockUsers";
    export function loadMockUsers(){
        App.BundleManager.loadAssest("config/mockUsers", cc.JsonAsset, ( data:cc.JsonAsset) => {
            App.DataManager.setExtInfo(MOCKUSERS,data.json);
        });
    }

    export function getRandomMockUsers(count:number=10){
        let result:any[]=[];
        let data=App.DataManager.getExtInfo(MOCKUSERS);
        if(data){
            data=data.concat();
            while(result.length<count){
                let index=Math.floor(Math.random()*data.length);
                result.push(data.splice(index,1)[0]);
            }
        }
        return result;
    }

    export function getGameInfoByName(gameName:string){
        let data;
        Games.forEach(game=>{
            if(game.gameName==gameName){
                data=game;
            }
        })
        return data;
    }

    export function getGameInfoByRoomType(roomType:number){
        let data;
        Games.forEach(game=>{
            if(game.room_type==roomType){
                data=game;
            }
        })
        return data;
    }

    //@ts-ignore
    export async function getRemoteGameStatus(gameName:string) {

        return true;

        let data=getGameInfoByName(gameName);
        App.DlgManager.showDlg("loading","Check for game state...")
        let remoteGameInfo=await App.HttpManager.postAsync("gamestatus",{name:gameName,channel:App.NativeManager.getChannel()});
        if(!remoteGameInfo){
            App.DlgManager.hideDlg("loading")
            App.DlgManager.showDlg("toast",{
                title:"Tips",
                content:"Failed to check game update!"
            });
            return false
        }else{
            App.DlgManager.hideDlg("loading")
            let config=App.DataManager.getExtInfo("GameConfig");
            config[data.packageName]=remoteGameInfo;
            return true
        }
    }

    export function checkGameStatus(roomType:number,enterType?:ENTER_TYPES,enterInfo?:any,isGuide?:boolean):GameStatus{

        let data=getGameInfoByRoomType(roomType);
        if(!data)return GameStatus.NOTFOUND;
        //禁用adb
        if(App.NativeManager.isAdb()){
            App.DlgManager.showDlg("toast",{
                title:"Tips",
                content:"Please turn off the phone's debug mode and try again"
            });
            return;
        }
        let config=App.DataManager.getExtInfo(CONSTANTS.GAMECONFIG);
        let versionConfig=App.DataManager.getExtInfo(CONSTANTS.GAMEVERSION_CONFIG);
        let subConfig=config[roomType];
        let subVersionConfig=versionConfig[roomType];

        if(subConfig.status==GameStatus.SERVICING){
            App.DlgManager.showDlg("toast",{title:"Tips",content:"Under maintenance",error:true});
            return;
        }

        if(subConfig.status==GameStatus.NOTOPEN){
            App.DlgManager.showDlg("toast",{title:"Tips",content:"The game is not yet open",error:true});
            return
        }

        if(cc.sys.isNative){
            //查找缓存
            let manifestPath=`${data.packageName}/project.manifest`;
            let manifest=jsb.fileUtils.getWritablePath()+"gamecaches/assets/"+manifestPath;
            if(data.isUnity){
                manifest=jsb.fileUtils.getWritablePath()+"unity/AssetBundles/"+manifestPath;
            }

            if(!jsb.fileUtils.isFileExist(manifest)){
                //查找本地的
                manifest=jsb.fileUtils.getDefaultResourceRootPath()+`assets/${data.packageName}/project.manifest`;
                if(!jsb.fileUtils.isFileExist(manifest)){
                    manifest=jsb.fileUtils.getDefaultResourceRootPath()+"assets/project.manifest";
                }
            }
            
            let packageVersion=cc.sys.localStorage.getItem(data.packageName+"_version");
            let subUrl:string=null;

            if(config){
               // let subConfig=config[data.packageName];
                if(subConfig){
                    if(packageVersion!=subVersionConfig.version){
                        data.gameState=GameStatus.NEED_UPDATE;
                        subUrl=subVersionConfig.url;
                    }else{
                        data.gameState=GameStatus.NORMAL;
                    }
                }else{
                    subUrl=subVersionConfig.url;
                    data.gameState=GameStatus.NEED_DOWNLOAD;
                }
            }else{
                data.gameState=GameStatus.NEED_UPDATE;
            }

            if(data.gameState!=GameStatus.NORMAL){
                App.NativeManager.echo("showDlg downloadgame subVersionConfig:" + JSON.stringify(subVersionConfig));
                App.DlgManager.showDlg("downloadgame",{gameData:data,path:manifest,url:subUrl,enterType:enterType,enterInfo:enterInfo,isGuide:isGuide});
            }
            return data.gameState;
        }else{
            return GameStatus.NORMAL;
        }
    }

    export function saveGuidData(step:number){
        App.DataManager.getSelfData().progress=step;
        App.HttpManager.postAsync("game_api/update_guide_progress",{module:0,progress:step},false);
    }

    export function saveEnterProgress(step:number){
        App.HttpManager.postAsync("login_api/update_enter_progress",{enter_progress:step},false);
    }

    export function isChinese(str) {  //判断是不是中文汉字、中文标点
        var reCh = /[u4e00-u9fa5]/;
        //常用中文标点符号 。 ？ ！ ， 、 ； ： “ ” ‘ ' （ ） 《 》 〈 〉 【 】 『 』 「 」 ﹃ ﹄ 〔 〕 … — ～ ﹏ ￥
        var reChP = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
        return !reCh.test(str) || reChP.test(str);
    }
    
    export function isEnglish(str){//判断是不是英文字母、英文标点、数字
        var reEn = /[a-zA-Z0-9]/;
        //常用英文标点符号 , . ? [ ] ; ' : " ! $ ^ ( ) 
        var reEnP = /^[_&a-zA-Z0-9\s+!&$#@%*^~`()\-+=\.\,\/<>?';:\"\{\}\|\\ ]/;
        return reEn.test(str) || reEnP.test(str);
    }

    //获取字符串长度 （不同语言的都可以）
    export function getStrLen(str:string){
        var strlen = 0; //初始定义长度为0
        //var txtval = $('#'+id).val();
        for (var i = 0; i < str.length; i++) {
            if(isEnglish(str.charAt(i)) == true){//英文字母、英文标点、数字
                strlen = strlen + 1;
            }else if(isChinese(str.charAt(i)) == true){//中文汉字、标点
                strlen = strlen + 2;
            } else {//其他字符
                strlen = strlen + 2; 
            }
        }
        return strlen;
    }

    //获取字符串多少位数（不同语言的都可以）
    export function getStrForLen(str:string,len:number){
        if (!str) {
            return "";
        }
        var num = 0;
        var result = "";
        for (var i = 0; i < str.length; i++) {
            result += str[i]
            if(isEnglish(str.charAt(i)) == true){//英文字母、英文标点、数字
                num = num + 1;
            }else if(isChinese(str.charAt(i)) == true){//中文汉字、标点
                num = num + 2;
            } else {//其他字符
                num = num + 2; 
            }
            if (num >= len) {
                result += "...";
                break;
            }
        }
        return result;
    }
