import { JSEncrypt } from "./jsencrypt";
import cv from "./../../components/lobby/cv"
import { aesHandler } from "../plugg/aesHandler"

export class rsaHandler {

    //rsa公钥
    static RSA_PUB_KEY: string = "-----BEGIN PUBLIC KEY-----\n" +
        "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3nBEl1X8qNEjxBFI2oOg\n" +
        "e5wVCzO4vGiFJ+PeBcAljYxNi6/wA1kwTtm4kRtBQDeCFcpFFY0EQtIw/BX0LBCT\n" +
        "DAivZFD+hMPyq8hN0nd/HXEklyNFtb78iEOaas5p3XfLBE8fFTAPubpN+cSZWifp\n" +
        "wZH1x7Dykimjz2gUNZ4TR6tRCKx6WJfJB8xJ5EpeiEumW6s8ajpUfCVfIiqTQ+cE\n" +
        "Jyvnxluz1I+3HKXqRXNHtO8zcGt1niPAMcPouexcP8+GDaAjnLWexdzK/5WM3F3H\n" +
        "eh5Mo1N9tai9yDqcf8QUiSBXF2J01NXRUkkI9dBkDZq6TfpzFI6YGzrun1bdx4Lz\n" +
        "vwIDAQAB\n" +
        "-----END PUBLIC KEY-----";


    //rsa私钥
    static RSA_PRI_KEY: string = "-----BEGIN PRIVATE KEY-----\n" +
        "-----END PRIVATE KEY-----";

    //加密文本
    static RSA_EncryptString(content: string): string {

        //获取 public 里面的写好的公钥
        let publicKey = this.RSA_PUB_KEY;

        let options = {
            default_key_size: 2048,
        };

        var encrypt = new window.JSEncrypt(options);
        //放入你的公钥
        encrypt.setPublicKey(publicKey);
        //加密后的内容
        var encryptData = encrypt.encrypt(content);

        return encryptData;
    }

    //解密文本
    static RSA_DecryptString(content: string) {
        var privateKey = this.RSA_PRI_KEY;

        let options = {
            default_key_size: 2048,
        };

        var decrypt = new window.JSEncrypt(options);
        decrypt.setPrivateKey(privateKey);
        var decryptData = decrypt.decrypt(content);
        return decryptData;
    }

    //产生32位随机数
    static RSA_get32BitRand(): string {

        let md5Str = "";
        let randMap = "_0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";
        let randNum = 32;
        let getStr = "";
        for (let i = 0; i < randNum; i++) {
            let x = cv.StringTools.randomRange(0, randMap.length); getStr += randMap[x];
        }

        let timeStamp = Math.floor((new Date()).getTime() / 1000);
        let randStr = cv.StringTools.formatC("%lld%s", timeStamp, getStr)

        md5Str = cv.md5.md5(randStr);

        return md5Str;
    }

    //测试函数
    static RSA_run_test() {

        var content = "this is a busy.";
        //760f05668c7c11ad1ba69b1869deca48
        var enData = this.RSA_EncryptString(content);
        console.log("加密文本:" + enData);
        var deData = this.RSA_DecryptString(enData);
        console.log("解密文本:" + deData);

        let md5Str = this.RSA_get32BitRand();
        console.log("md5Str =====================%s", md5Str);
        let enMd5Str = this.RSA_EncryptString(md5Str);
        console.log("enMd5Str =====================%s", enMd5Str);

        let _baseData: string = aesHandler.bytesToBase64(aesHandler.stringToUint8Array(enMd5Str));
        console.log("_baseData ====================== %s", _baseData);
    }

}