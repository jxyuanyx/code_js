import App from "../App"
import { COMMON_RES } from "../manager/imps/CommonResManager";
import BaseGameConfig from "../models/BaseGameConfig";
import TopTip from "../ui/components/common/TopTip"
import pako from "../../gamecore/tools/GZip-js/pako";
import { BaseComponent } from "../ui/baseview/imp/BaseComponent";
let CryptoJS = require("crypto-js");




export default class GameHelper{

    private static _topTipMessages:{msg:string,delayTime:number}[]=[];

    private static _checkCodeSequence:string[]=[];

    private static _checkCodeIndex:number=100;

    static formatByte(bytes){
        if(bytes<1024*1024){
            let  result=(bytes/(1024))+''
            let infos=result.split('.')
            if(infos.length>1){
                return infos[0]+'.'+infos[1].substr(0,2)+'k'
            }else{
                return result+'k'
            }
        }else{
            let  result=(bytes/(1024*1024))+''
            let infos=result.split('.')
            if(infos.length>1){
                return infos[0]+'.'+infos[1].substr(0,2)+'m'
            }else{
                return result+'m'
            }
        }
    }

    static loadHead(url:string,sp:cc.Sprite){
        //本地加载
        if(url.length==1){
            let heads=App.BundleManager.getCommonAtlas("gamemain/head");
            sp.spriteFrame=heads.getSpriteFrame("head"+url);
        }else{
            cc.resources.load(url,cc.SpriteFrame,(error,spriteFrame)=>{
                if(sp.node){
                    sp.spriteFrame=spriteFrame as cc.SpriteFrame;
                }
            })
        }
    }

    static showTopTip(data:{msg:string,delayTime:number}|string){
        if(typeof data =="string"){
            this._topTipMessages.push({msg:data,delayTime:1.5})
        }else{
            this._topTipMessages.push(data)
        }
        if(this._topTipMessages.length==1){
            this._showTopTipTask();
        }
        
    }

    private static _showTopTipTask(){
        if(this._topTipMessages.length==0)return;
        let data:{msg:string,delayTime:number}=this._topTipMessages[0];
        BaseGameConfig.topTip.getComponent(TopTip).show(data.msg,data.delayTime,()=>{
            this._topTipMessages.shift();
            this._showTopTipTask();
        });
    }

    //格式化时间    D h m s
    static fromatTimeNew2(time:number){
        let str=""
        if (time/86400>=1) {
            var day = Math.floor(time/86400)+'D '
            str +=day;
            time = time%86400;
        }
        if(time/3600>=1){
            var hour=Math.floor(time/3600)+''
            if(hour.length<2){
                str+="0"+hour
            }else{
                str+=hour
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

    //格式化时间    h m s
    static fromatTimeNew(time:number){
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

    static createAttachRegion(spriteFrame:cc.SpriteFrame):sp.spine.TextureAtlasRegion{
        const texture = spriteFrame.getTexture();
        let rect = spriteFrame.getRect();
        let isrotated = spriteFrame.isRotated();
        let offset = spriteFrame.getOffset();
        let original_size = spriteFrame.getOriginalSize();
        //@ts-ignore
        let skeletonTexture = new sp.SkeletonTexture();
        skeletonTexture.setRealTexture(texture);
        let page = new sp.spine.TextureAtlasPage();
        page.name = texture.name;
        page.uWrap = sp.spine.TextureWrap.ClampToEdge;
        page.vWrap = sp.spine.TextureWrap.ClampToEdge;
        page.texture = skeletonTexture;
        page.texture.setWraps(page.uWrap, page.vWrap);
        page.width = rect.width;
        page.height = rect.height;
        let region = new sp.spine.TextureAtlasRegion();
        region.page = page;
        region.rotate = isrotated;
        region.x = rect.x;
        region.y = rect.y;
        region.offsetX = offset.x
        region.offsetY = offset.y;
        region.width = rect.width;
        region.height = rect.height;
        region.originalWidth = original_size.width;
        region.originalHeight = original_size.height;
        region.u = rect.x / texture.width;
        region.v = (rect.y) / texture.height;
        region.u2 = (rect.x + rect.width) / texture.width;
        region.v2 = (rect.y + rect.height) / texture.height;
        region.texture = skeletonTexture;
        return region;
    }

    static replaceSlot(skeleton:sp.Skeleton,spriteFrame:cc.SpriteFrame){
        let numSlot=skeleton.findSlot("1");
        let region=GameHelper.createAttachRegion(spriteFrame);
        numSlot.attachment.setRegion(region);
        numSlot.attachment.updateOffset();
    }

    static getBase64Data(filePath:string){
        //@ts-ignore
        let imageData=jsb.fileUtils.getDataFromFile(filePath);
        return encodeURIComponent(this._arrayBufferToBase64Image(imageData));
    }

    static _arrayBufferToBase64(buffer){

        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
              binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);

        /*
        var base64 = '';
        var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        var byteLength = bytes.byteLength;
        var byteRemainder = byteLength % 3;
        var mainLength = byteLength - byteRemainder;
        var a, b, c, d;
        var chunk;
        // Main loop deals with bytes in chunks of 3
        for (var i = 0; i < mainLength; i = i + 3) {
            // Combine the three bytes into a single integer
            chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
            // Use bitmasks to extract 6-bit segments from the triplet
            a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
            b = (chunk & 258048) >> 12; // 258048 = (2^6 - 1) << 12
            c = (chunk & 4032) >> 6; // 4032 = (2^6 - 1) << 6
            d = chunk & 63; // 63 = 2^6 - 1
            // Convert the raw binary segments to the appropriate ASCII encoding
            base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
        }
        // Deal with the remaining bytes and padding
        if (byteRemainder == 1) {
            chunk = bytes[mainLength];
            a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2;
            // Set the 4 least significant bits to zero
            b = (chunk & 3) << 4 // 3 = 2^2 - 1;
            base64 += encodings[a] + encodings[b] + '==';
        }
        else if (byteRemainder == 2) {
            chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
            a = (chunk & 16128) >> 8 // 16128 = (2^6 - 1) << 8;
            b = (chunk & 1008) >> 4 // 1008 = (2^6 - 1) << 4;
            // Set the 2 least significant bits to zero
            c = (chunk & 15) << 2 // 15 = 2^4 - 1;
            base64 += encodings[a] + encodings[b] + encodings[c] + '=';
        }
        return base64;*/
    }

    static _arrayBufferToBase64Image(bytes) {
        
        return "data:image/jpeg;base64," + this._arrayBufferToBase64(bytes);
        //return base64;
    }

    selectPhotoSuccess(filePath:string,type:number=0){
        if(type==0){
            cc.game.emit("onSelectPhotoData",filePath)
            return
        }
        //@ts-ignore
        let imageBase64 =this.getBase64Data(filePath);
        
        if(type==0){
            
        }else if(type==0){
            
        }
    }

    selectPhoto(data){
        if(cc.sys.isNative){
            if(cc.sys.os==cc.sys.OS_ANDROID){
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GameTools", "selectPhoto", "(Ljava/lang/String;)V",data);
            }else if(cc.sys.os==cc.sys.OS_IOS){
                
            }
        }else{

        }
    }

    /**
     * 添加数据加载的loading
     * @param parent 
     * @param pos 
     */
    static addDataLoading(parent:cc.Node,pos?:cc.Vec2){
        if(!parent || !parent.active)return;
        if(parent.getChildByName("DataLoading"))return;
        let loadView:cc.Node=cc.instantiate(App.CommonResManager.getRes(COMMON_RES.DATALOADING) as cc.Prefab);
        loadView.name="DataLoading";
        parent.addChild(loadView,999);
        if(!pos){
            pos=new cc.Vec2();
            pos.x=parent.width*(0.5-parent.anchorX);
            pos.y=parent.height*(0.5-parent.anchorY)
        }
        loadView.setPosition(pos);
        return loadView;
    }

    /**
     * 删除数据加载
     * @param parent 
     * @returns 
     */
     static removeDataLoading(parent:cc.Node){
        let dataLoading=parent.getChildByName("DataLoading");
        if(!dataLoading)return;
        dataLoading.removeFromParent();
        dataLoading.destroy();
    }

    static getWinOffsetY():number{
        return cc.sys.getSafeAreaRect().height-cc.winSize.height
    }

    static addEmptyDataView(parent:cc.Node,pos?:cc.Vec2):void{
        let emptyView:cc.Node=cc.instantiate(App.CommonResManager.getRes(COMMON_RES.EMPTYDATA) as cc.Prefab);
        emptyView.name="emptyView";
        parent.addChild(emptyView,999);
        if(!pos){
            pos=new cc.Vec2();
            pos.x=parent.width*(0.5-parent.anchorX);
            pos.y=parent.height*(0.5-parent.anchorY)
            cc.error(parent.width,parent.height)
        }
        emptyView.setPosition(pos);
    }

    static removeEmptyDataView(parent:cc.Node){
        let emptyView=parent.getChildByName("emptyView");
        if(!emptyView)return;
        emptyView.removeFromParent();
        emptyView.destroy();
    }
    /*
    static encrypt(buffer,key){
        var cipher = crypto.createCipher('aes-128-ecb',key)
        var crypted = Buffer.concat([cipher.update(buffer),cipher.final()]);
        return crypted;
      }*/
       /*
      static decrypt(buffer){
        var decipher = crypto.createDecipher(algorithm,password)
        var dec = Buffer.concat([decipher.update(buffer) , decipher.final()]);
        return dec;
      }*/
  
    // AES加密
    static AESDecrypto(str, key){     
        var key = CryptoJS.enc.Utf8.parse(key);
         var decrypt = CryptoJS.AES.decrypt(str, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7}); 
         return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }
    
    // AES加密
    static AESEncrypto(str, key){  
        str=this._arrayBufferToBase64(str);
        var key = CryptoJS.enc.Utf8.parse(key);
        var srcs = CryptoJS.enc.Utf8.parse(str); 
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.ZeroPadding}); 
        return encrypted.toString();//this.string2buffer(encrypted.toString());
    }


    static AESEncryptoNew(str){  
        var key = CryptoJS.enc.Utf8.parse("vj2Y+OmPbi9Gu+TcPOI5KX1usXzaG1pg");
        var srcs = CryptoJS.enc.Utf8.parse(cc.sys.now()+""+this._checkCodeIndex+str); 
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7}); 
        return encrypted.toString();
    }

    static _clearCheck(source:string[],str:string){
        source.splice(source.indexOf(str),1);
    }

    //时间戳+包索引+包内容
    static AESDecryptoNew(str){  
        var key = CryptoJS.enc.Utf8.parse("vj2Y+OmPbi9Gu+TcPOI5KX1usXzaG1pg");
        var decrypt = CryptoJS.AES.decrypt(str, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7}); 
        let decryptStr:string=CryptoJS.enc.Utf8.stringify(decrypt).toString();
        if(decryptStr){
            let time=parseFloat(decryptStr.substr(0,13))
            let index=decryptStr.substr(13,3)
            cc.log("time>>>>>>",index)
            let data=decryptStr.substring(16,decryptStr.length);
            if(this._checkCodeSequence.indexOf(decryptStr)==-1){
                let isExpires=false;//(cc.sys.now()-time)>5000;
                if(!isExpires){
                    this._checkCodeIndex++;
                    this._checkCodeSequence.push(decryptStr);
                    setTimeout(this._clearCheck.bind(null,this._checkCodeSequence,decryptStr), 5000);
                    if(this._checkCodeIndex>=1000){
                        this._checkCodeIndex=100;
                    }
                    return data;
                }
            }
        }
        return null;
    }
    static AESEncrypResult(str){
        var key = CryptoJS.enc.Utf8.parse("vj2Y+OmPbi9Gu+TcPOI5KX1usXzaG1pg");
        var srcs = CryptoJS.enc.Utf8.parse(str); 
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7}); 
        return encrypted.toString();
    }

    static AESDecrypResult(str){  
        var key = CryptoJS.enc.Utf8.parse("vj2Y+OmPbi9Gu+TcPOI5KX1usXzaG1pg");
        var decrypt = CryptoJS.AES.decrypt(str, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7}); 
        let decryptStr:string=CryptoJS.enc.Utf8.stringify(decrypt).toString();
        return decryptStr;
    }

    static Uint8ArrayToString(fileData){
        var dataString = "";
        for (var i = 0; i < fileData.length; i++) {
          dataString += String.fromCharCode(fileData[i]);
        }
       
        return dataString
      
      }


    static string2buffer (str) {
        // 首先将字符串转为16进制
        let val = ""
        for (let i = 0; i < str.length; i++) {
          if (val === '') {
            val = str.charCodeAt(i).toString(16)
          } else {
            val += ',' + str.charCodeAt(i).toString(16)
          }
        }
        // 将16进制转化为ArrayBuffer
        return new Uint8Array(val.match(/[\da-f]{2}/gi).map(function (h) {
          return parseInt(h, 16)
        }))//.buffer
    }

    static  base64ToUint8Array(base64String) {
　　　　const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
                    .replace(/\-/g, '+')
                    .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
    
    /**
     * 加密分数
     * @param key 
     * @param score 
     */
    static encryScore(key:string,score:string,scoreKey:string=""){
        let mapKeys:string="0123456789+-";
        if(!key || key.length!=26)return;
        let byteMap=key.substr(0,12);
        //let scoreStr=(score>0)?`+${score}`:score.toString();
        for(let i=0;i<score.length;i++){
            scoreKey+=byteMap[mapKeys.indexOf(score[i])]
        }
        return scoreKey;
    }

    static deCodeScoreStep(steps:string,key:string){
        let mapKeys:string="0123456789+-";
        let byteMap=key.substr(0,12);
        let scoreSteps:string[]=[];
        let score:string="";
        for(let i=0;i<steps.length;i++){
            let index=byteMap.indexOf(steps[i])
            let str=mapKeys[index];
            if(/[+-]{1}/g.test(str)){
                if(score){
                    scoreSteps.push(score)
                }
                score=str
            }else{
                score+=str
            }
        }
        if(score){
            scoreSteps.push(score);
        }

        let sum=0;

        scoreSteps.map(item=>{
            sum+=parseInt(item);
        })

        console.log("总分:",sum);
        console.log("步骤:",scoreSteps);
    }

    static encryBase64Score(key:string,scoreKey:string){
        let shaKey=key[2]+key[9]+key[10]+key[12]+key[17];
        let ret=CryptoJS.HmacSHA1(scoreKey,shaKey).toString();
        ret= btoa(encodeURI(ret));
        return ret;
    }

    static unGzip(key){
        // 将二进制字符串转换为字符数组
        var charData = key.split('').map(function (x) { return x.charCodeAt(0); });
        console.log('压缩后的文件大小:', charData.join(","))
        
        // 将数字数组转换成字节数组
        var binData = new Uint8Array(charData);
        cc.log("字节数组：",binData)
        
        // 解压
        var data = pako.inflate(binData);
        cc.log("解压：",data)
        // 将GunZip ByTAREAR转换回ASCII字符串
        key = String.fromCharCode.apply(null, new Uint16Array(data));
        cc.log("ASCII字符串",key)
        //unescape(str)  --->解压后解码，防止中午乱码
        return unescape(key);
    }

    static gzip(str){
        //escape(str)  --->压缩前编码，防止中午乱码
        var binaryString = pako.gzip(escape(str), { to: 'string' });
        return binaryString;
    }

    static closeBtnSound(btnName:string,target:BaseComponent){
        target.UI_BTNS.get(btnName)["sound"]=false;
    }

    static isEmail(str){
      var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
      return reg.test(str);
    }

    static protectData(target:any,key:string,value:number,code:number){
        target["checkXor_"+key]=0^code;
        target["checkXor_code_"+key]=code;

    }

    static getProtectData(target:any,key:string){
        let code=target["checkXor_code_"+key];
        if(code==undefined)return 0;
        return target["checkXor_"+key]^code;
    }

    static updateProtectData(target:any,key:string,value:number){
        let data=target["checkXor_"+key];
        let code=target["checkXor_code_"+key];
        if(data!=undefined){
            data=value;
            target["checkXor_"+key]=data^code;
        }
    }

    static getXorCode(){
        let index=Math.floor(Math.random()*10);
        let key=cc.sys.now().toString();
        return parseInt(key.substring(index,(index+6)>key.length?(key.length-(index+6)):(index+6)));
    }

    static subStr(source:string,maxLen:number=10,ext:string="..."){
        if(source.length>maxLen){
            return source.substring(0,maxLen-1)+ext;
        }
        return source;
    }
}