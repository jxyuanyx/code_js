import { rejects } from "assert";
import { resolve } from "dns";
import App from "../../App";
import { TagEnum } from "../../enums/TagEnum";
import { GameEvents } from "../../events/GameEvents";
import GameHelper from "../../tools/GameHelper";
import { IHttpManager } from "../IHttpManager";

export enum HTTP_ERRORS{
    SERVER_ERROR=10000,
    NEEDDEPOSIT=37,//提现需要先充值
    TIMEOUT
}

export class HttpManager implements IHttpManager{

    private _url:string=null;

    private _token:string=null;

    private _commonData:any=null;

    private _id:string="";

    private _signKey="";

    private _requestMap:Map<string,number>=new Map();

    init(url: string): void {
        this._url=url;
    }

    setCommonInfo(data:any):void{
        this._commonData=Object.assign({},data);
    }

    removeRequestById(reqId:string){
        if(this._requestMap.has(reqId)){
            this._requestMap.delete(reqId);
        }
    }

    setToken(token: string,id:string): void {
        this._token=token;
        this._id=id;
        if(this._commonData){
            this._commonData["uid"]=id;
        }
    }

    cancel(xhr:XMLHttpRequest):void{
        xhr.abort();
    }


    get(api: string, reqData?: any,node?:cc.Node,cb?:Function,errCb?:Function,target?:Function){
        let body= "?";

        if(this._commonData){
            reqData=Object.assign(reqData || {},this._commonData);
        }

        let keys=Object.keys(reqData);
        keys.sort();
        let sign=""
        for(let i=0;i<keys.length;i++){
            if (sign != ""){
                sign += "&"
            } 
            sign+=keys[i]+"="+reqData[keys[i]]
            body += keys[i] +"=" +reqData[keys[i]] +"&";
        }

        //@ts-ignore
        body+="sign="+hex_md5(sign+"@1%ss(&@1v%mf-z5(#p26slu#&v-do9awafskpytylw#6xp#");
        

        api+=body;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4){
                if(xhr.status >= 200 && xhr.status < 400){
                    if(node&&!node.active)return;
                    var response = xhr.responseText;
                    var responseJson = JSON.parse(response);
                    let ret=responseJson.ret;

                    App.LogManager.i(TagEnum.NET_MESSAGE,responseJson);
                    if(ret==undefined){
                        cb&&cb.call(target,responseJson);
                    }else if(ret==0){
                        cb&&cb.call(target,responseJson.data);
                    }else{
                        App.DlgManager.hideDlg("loading");
                        //GameHelper.showTopTip(`errorCode:${code},${App.DataManager.getExtInfo("error_code")?.code}`)
                        App.NativeManager.echo("http response error,code:"+ret);
                        errCb&&errCb.call(target,ret);
                        //token过期
                        if(ret==3){
                            cc.game.emit(GameEvents.ERROR_TOKEN);
                        }
                    }
                }else{
                    App.DlgManager.hideDlg("loading");
                    errCb&&errCb.call(target,null);
                }
            }
        };
        xhr.open("GET", this._url + "/"+api, true);
        xhr.setRequestHeader('token',this._token);
        xhr.ontimeout = function (e) {
            // XMLHttpRequest 超时。在此做某事。
            App.DlgManager.hideDlg("loading");
        };
        App.LogManager.i("send http get",this._url+"/"+api);
        xhr.send();

        return xhr;
    }

    post(api: any, reqData: any,node?:cc.Node,cb?:Function,errCb?:Function,target?:Function) {
        let body:any={
            params:{

            }
        }
        if(this._commonData){
            for(var item in this._commonData){
                body[item]=this._commonData[item];
            }
        }

        Object.assign(body.params,reqData || {})

        let keys=Object.keys(body);
        keys.sort();
        let sign=""
        for(let i=0;i<keys.length;i++){
            if (sign != ""){
                sign += "&"
            } 
            let signData=body[keys[i]];
            sign+=keys[i]+"="+((typeof signData == "object")?JSON.stringify(signData):signData); 
        }

        console.log("sign",sign)
        //@ts-ignore
        body["sign"]=hex_md5(sign+"@1%ss(&@1v%mf-z5(#p26slu#&v-do9awafskpytylw#6xp#");

        //2.发起请求
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4){
                if(xhr.status >= 200 && xhr.status < 400){
                    if(node&&!node.active)return;
                    var response = xhr.responseText;
                    var responseJson = JSON.parse(response);
                    let ret=responseJson.ret;

                    App.LogManager.i(TagEnum.NET_MESSAGE,responseJson);
                    if(ret==undefined){
                        cb&&cb.call(target,responseJson);
                    }else if(ret==0){
                        cb&&cb.call(target,responseJson.data);
                    }else{
                        App.DlgManager.hideDlg("loading");
                        App.NativeManager.echo("http response error,code:"+ret);
                        //GameHelper.showTopTip(`errorCode:${code},${App.DataManager.getExtInfo("error_code")?.code}`)
                        errCb&&errCb.call(target,ret);
                        //token过期
                        if(ret==3){
                            cc.game.emit(GameEvents.ERROR_TOKEN)
                        }
                    }
                }else{
                    App.DlgManager.hideDlg("loading");
                    errCb&&errCb.call(target,null);
                }
            }
        };

        xhr.timeout = 20000;
        xhr.open("post", this._url +"/"+ api, true);
        xhr.setRequestHeader('Authorization',this._token);
        xhr.setRequestHeader("Content-Type" , "application/json");  
        App.LogManager.i("send http POST",this._url+"/"+api);
        xhr.send(JSON.stringify(body));//reqData为字符串形式： "key=value"
        xhr.ontimeout = function (e) {
            // XMLHttpRequest 超时。在此做某事。
            App.DlgManager.hideDlg("loading");
        };

        xhr.onerror=function(e){
            App.DlgManager.hideDlg("loading");
            errCb&&errCb.call(target,null);
        }

        return xhr;
    }
    
    //@ts-ignore
    async postAsync(api:string,reqData?:any,showLoading?:boolean){
       cc.error(this._requestMap);
      
        return new Promise(async (resolve,reject)=>{
            if(this._requestMap.has(api)){
                //App.DlgManager.showDlg("toast",{title:"tips","content":"请求过于频繁"});
                return reject("请求过于频繁");
            }
            if (api == "activity_api/check_new_player_recharge_status") {
                cc.log(api);
            }
            this._requestMap.set(api,cc.sys.now());
            if(showLoading){
                await App.DlgManager.showDlg("loading","").catch(e=>{

                })
            }
            let body:any={
                params:{
    
                }
            }
            if(this._commonData){
                for(var item in this._commonData){
                    body[item]=this._commonData[item];
                }
            }
    
            Object.assign(body.params,reqData || {})
    
            let keys=Object.keys(body);
            keys.sort();
            let sign=""
            for(let i=0;i<keys.length;i++){
                if (sign != ""){
                    sign += "&"
                } 
                let signData=body[keys[i]];
                sign+=keys[i]+"="+((typeof signData == "object")?JSON.stringify(signData):signData); 
            }
    
           // console.log("sign",sign)
            //@ts-ignore
            body["sign"]=hex_md5(sign+"@1%ss(&@1v%mf-z5(#p26slu#&v-do9awafskpytylw#6xp#");
            
            //2.发起请求
            var xhr = new XMLHttpRequest();
            let self=this;
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4){
                    if(xhr.status >= 200 && xhr.status < 400){
                        var response = xhr.responseText;
                        var responseJson = JSON.parse(response);
                        let ret=responseJson.ret;
    
                        App.LogManager.i(TagEnum.NET_MESSAGE,responseJson);
                        if(showLoading)App.DlgManager.hideDlg("loading");
                        self.removeRequestById(api);
                        if(ret==undefined){
                            resolve(responseJson)
                        }else if(ret==0){
                            resolve(responseJson.data);
                        }else{
                            App.NativeManager.echo("http response error,code:"+ret);
                            //token过期
                            App.DlgManager.showDlg("toast",{title:"Tips",content:responseJson.data});
                            reject(ret);
                        }
                    }else{
                        self.removeRequestById(api);
                        if(showLoading)App.DlgManager.hideDlg("loading");
                        reject(HTTP_ERRORS.SERVER_ERROR);
                    }
                }
            };
    
            xhr.timeout = 20000;
            xhr.open("post", this._url +"/"+ api, true);
            xhr.setRequestHeader('Authorization',this._token);
            xhr.setRequestHeader("Content-Type" , "application/json");  
            App.LogManager.i("send http POST",this._url+"/"+api);

            App.NativeManager.echo("send http POST:"+this._url+"/"+api)
            App.NativeManager.echo("body:"+JSON.stringify(body))
            xhr.send(JSON.stringify(body));//reqData为字符串形式： "key=value"
            xhr.ontimeout = function (e) {
                self.removeRequestById(api);
                // XMLHttpRequest 超时。在此做某事。
                //App.DlgManager.showDlg("toast",{title:"Tips",content:"request timeout"});
                reject(HTTP_ERRORS.TIMEOUT);
                if(showLoading)App.DlgManager.hideDlg("loading");
            };

            xhr.onerror=function(e){
                self.removeRequestById(api);
               // App.DlgManager.showDlg("toast",{title:"Tips",content:" d=====(￣▽￣*)b\n接口报错了,请联系管理员"});
                reject(HTTP_ERRORS.SERVER_ERROR);
            }
        })
    }

    upload(api: string, data: any) {
        throw new Error("Method not implemented.");
    }
    
}