import * as CryptoJS from "./crypto";
import cv from "./../../components/lobby/cv"
import * as ByteBuffer from "./../protobuf/byteBuffer";
export class aesHandler {
    static AES_KEY: string = "";

    static EncryptString(content: string, key: string) {
        //这里是加密所需要的key
        let keyBytes = CryptoJS.enc.Utf8.parse(key); // 数据解析
        //需要加密的bytes数组
        let srcsBytes = CryptoJS.enc.Utf8.parse(content); // 数据解析
        let encrypted = CryptoJS.AES.encrypt(srcsBytes, keyBytes, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });

        console.log("-----------> 4:" + encrypted.toString());
        return CryptoJS.enc.Base64.parse(encrypted.toString());
    }

    static DecryptString(content: string, key: string) {
        let keyBytes = CryptoJS.enc.Utf8.parse(key);
        let word = CryptoJS.enc.Base64.stringify(content);

        let decrypt = CryptoJS.AES.decrypt(word, keyBytes, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });

        return decrypt.toString(CryptoJS.enc.Utf8);
    }

    static EncryptBytes(content) {
        //let keyBytes = CryptoJS.enc.Utf8.parse(this.AES_KEY);
        let keyBytes = CryptoJS.enc.Utf8.parse(cv.dataHandler.getUserData().secretKey);
        let srcsBytes = this.Int8parse(content);

        let encrypted = CryptoJS.AES.encrypt(srcsBytes, keyBytes, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });

        console.log("-----------> 4:" + encrypted.toString());
        return this.base64ToBytes(encrypted.toString());
    }

    static DecryptBytes(content) {
        content = new Int8Array(content);

        //let keyBytes = CryptoJS.enc.Utf8.parse(this.AES_KEY);
        let keyBytes = CryptoJS.enc.Utf8.parse(cv.dataHandler.getUserData().secretKey);

        let srcsBytes = this.Int8parse(content);
        let word = CryptoJS.enc.Base64.stringify(srcsBytes);

        let decrypt = CryptoJS.AES.decrypt(word, keyBytes, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });

        let result = [];
        let decryptLength = decrypt.words.length;
        for (let i = 0; i < decryptLength; i++) {

            let a = this.intTobytes(decrypt.words[i]);
            if (decrypt.sigBytes / 4 >= i + 1) {
                for (let j = 0; j < 4; j++) {
                    result.push(a[j]);
                }

                if (decrypt.sigBytes / 4 == i + 1) break;
            }
            else {
                let len = decrypt.sigBytes % 4;
                for (let j = 0; j < len; j++) {
                    result.push(a[j]);
                }
                break;
            }

        }
        return new Int8Array(result);
    }

    static Int8parse(u8arr) {
        // Shortcut
        let len = u8arr.length | u8arr.byteLength;

        // Convert
        let words = [];
        for (let i = 0; i < len; i++) {
            let x = u8arr[i];
            words[i >>> 2] |= (u8arr[i] & 0xff) << (24 - (i % 4) * 8);
        }

        return CryptoJS.lib.WordArray.create(words, len);
    }

    static getCharCode(codeString) {
        let result = "";
        let codeStringArray = codeString.split(",");
        for (let i = 0; i < codeStringArray.length; i++) {
            result += String.fromCharCode(codeStringArray[i]);
        }
        return result;
    }
    static bytesToHex(bytes) {
        let hex = []
        for (let i = 0; i < bytes.length; i++) {
            hex.push((bytes[i] >>> 4).toString(16));
            hex.push((bytes[i] & 0xF).toString(16));
        }
        return hex.join("");
    }
    static base64ToBytes(base64) {
        // Use browser-native function if it exists
        let base64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        // Remove non-base-64 characters
        base64 = base64.replace(/[^A-Z0-9+\/]/ig, "");
        let bytes = [];
        for (let i = 0, imod4 = 0; i < base64.length; imod4 = ++i % 4) {
            if (imod4 == 0) continue;
            bytes.push(((base64map.indexOf(base64.charAt(i - 1)) & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2)) |
                (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
        }
        return bytes;
    }
    static hexToBytes(hex) {
        let bytes = [];
        for (let c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substr(c, 2), 16));
        return bytes;
    }
    static bytesToBase64(bytes) {
        // Use browser-native function if it exists
        let base64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        let base64 = [];
        let len = bytes.length | bytes.byteLength;
        for (let i = 0; i < len; i += 3) {
            let triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
            for (let j = 0; j < 4; j++) {
                if (i * 8 + j * 6 <= len * 8)
                    base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
                else base64.push("=");
            }
        }
        return base64.join("");
    }

    static stringToUint8Array(str: string): Uint8Array {
        let arr = [];
        let len = str.length;
        for (let i = 0; i < len; ++i) {
            arr.push(str.charCodeAt(i));
        }

        let tmpUint8Array = new Uint8Array(arr);
        return tmpUint8Array;
    }

    static intTobytes(value) {
        var a = new Uint8Array(4)
        a[0] = (value >> 24) & 0xFF

        a[1] = (value >> 16) & 0xFF

        a[2] = (value >> 8) & 0xFF

        a[3] = value & 0xFF

        return a;
    }

    static DecryptBase64(content: string, key: string): string {
        let keyBytes = CryptoJS.enc.Utf8.parse(key);

        let decrypt = CryptoJS.AES.decrypt(content, keyBytes, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });

        let result = "";
        let decryptLength = decrypt.words.length;
        for (let i = 0; i < decryptLength; i++) {

            let a = this.intTobytes(decrypt.words[i]);
            if (decrypt.sigBytes / 4 >= i + 1) {
                for (let j = 0; j < 4; j++) {
                    if (a[j] != 0) {//过滤无效的值 
                        result += String.fromCharCode(a[j]);
                    }
                }

                if (decrypt.sigBytes / 4 == i + 1) break;
            }
            else {
                let len = decrypt.sigBytes % 4;
                for (let j = 0; j < len; j++) {
                    if (a[j] != 0) {//过滤无效的值 
                        result += String.fromCharCode(a[j]);
                    }
                }
                break;
            }

        }
        if (result.length <= 0) {
            result = content;
        }
        this.AES_KEY = result;
        return result;
    }
}