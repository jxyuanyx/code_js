// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export class RuntimeMd5 extends cc.Component {
    private static _g_Instance: RuntimeMd5 = null;                                 // 单例
    // convert number to (unsigned) 32 bit hex, zero filled string
    public to_zerofilled_hex(n) {
        var t1 = (n >>> 24).toString(16);
        var t2 = (n & 0x00FFFFFF).toString(16);
        return "00".substr(0, 2 - t1.length) + t1 +
            "000000".substr(0, 6 - t2.length) + t2;
    }

    // convert a 64 bit unsigned number to array of bytes. Little endian
    public int64_to_bytes(num) {
        var retval = [];
        for (var i = 0; i < 8; i++) {
            retval.push(num & 0xFF);
            num = num >>> 8;
        }
        return retval;
    }

    //  32 bit left-rotation
    public rol(num, places) {
        return ((num << places) & 0xFFFFFFFF) | (num >>> (32 - places));
    }

    // The 4 MD5 publics
    public fF(b, c, d) {
        return (b & c) | (~b & d);
    }

    public fG(b, c, d) {
        return (d & b) | (~d & c);
    }

    public fH(b, c, d) {
        return b ^ c ^ d;
    }

    public fI(b, c, d) {
        return c ^ (b | ~d);
    }

    // pick 4 bytes at specified offset. Little-endian is assumed
    public bytes_to_int32(arr, off) {
        return (arr[off + 3] << 24) | (arr[off + 2] << 16) | (arr[off + 1] << 8) | (arr[off]);
    }
    // convert the 4 32-bit buffers to a 128 bit hex string. (Little-endian is assumed)
    public int128le_to_hex(a, b, c, d) {
        var ra = "";
        var t = 0;
        var ta = 0;
        for (var i = 3; i >= 0; i--) {
            ta = arguments[i];
            t = (ta & 0xFF);
            ta = ta >>> 8;
            t = t << 8;
            t = t | (ta & 0xFF);
            ta = ta >>> 8;
            t = t << 8;
            t = t | (ta & 0xFF);
            ta = ta >>> 8;
            t = t << 8;
            t = t | ta;
            ra = ra + this.to_zerofilled_hex(t);
        }
        return ra;
    }

    /**
     * name
     */
    public updateRun(a,b,c,d ,nf, sin32, dw32, b32) {
        var temp = d;
            d = c;
            c = b;
            //b = b + rol(a + (nf + (sin32 + dw32)), b32);
            b = this._add(b,
                this.rol(
                    this._add(a,
                        this._add(nf, this._add(sin32, dw32))
                    ), b32
                )
            );
            a = temp;
    }
    /**
     * name
     */
    public getFileMd5(data: any) {
        if (!(data instanceof Uint8Array)) {
            console.log("input data type mismatch only support Uint8Array");
            return null;
        }
        var databytes = [];
        for (var i = 0; i < data.byteLength; i++) {
            databytes.push(data[i]);
        }

        // save original length
        var org_len = databytes.length;

        // first append the "1" + 7x "0"
        databytes.push(0x80);

        // determine required amount of padding
        var tail = databytes.length % 64;
        // no room for msg length?
        if (tail > 56) {
            // pad to next 512 bit block
            for (var i = 0; i < (64 - tail); i++) {
                databytes.push(0x0);
            }
            tail = databytes.length % 64;
        }
        for (i = 0; i < (56 - tail); i++) {
            databytes.push(0x0);
        }
        // message length in bits mod 512 should now be 448
        // append 64 bit, little-endian original msg length (in *bits*!)
        databytes = databytes.concat(this.int64_to_bytes(org_len * 8));

        // initialize 4x32 bit state
        var h0 = 0x67452301;
        var h1 = 0xEFCDAB89;
        var h2 = 0x98BADCFE;
        var h3 = 0x10325476;

        // temp buffers
        var a = 0,
            b = 0,
            c = 0,
            d = 0;
            /*
        // public update partial state for each run
        let updateRun = (nf, sin32, dw32, b32){
            var temp = d;
            d = c;
            c = b;
            //b = b + rol(a + (nf + (sin32 + dw32)), b32);
            b = this._add(b,
                this.rol(
                    this._add(a,
                        this._add(nf, this._add(sin32, dw32))
                    ), b32
                )
            );
            a = temp;
        }*/
            // Digest message
            for (i = 0; i < databytes.length / 64; i++) {
                // initialize run
                a = h0;
                b = h1;
                c = h2;
                d = h3;

                var ptr = i * 64;

                // do 64 runs
                this.updateRun(a,b,c,d,this.fF(b, c, d), 0xd76aa478, this.bytes_to_int32(databytes, ptr), 7);
                this.updateRun(a,b,c,d,this.fF(b, c, d), 0xe8c7b756, this.bytes_to_int32(databytes, ptr + 4), 12);
                this.updateRun(a,b,c,d,this.fF(b, c, d), 0x242070db, this.bytes_to_int32(databytes, ptr + 8), 17);
                this.updateRun(a,b,c,d,this.fF(b, c, d), 0xc1bdceee, this.bytes_to_int32(databytes, ptr + 12), 22);
                this.updateRun(a,b,c,d,this.fF(b, c, d), 0xf57c0faf, this.bytes_to_int32(databytes, ptr + 16), 7);
                this.updateRun(a,b,c,d,this.fF(b, c, d), 0x4787c62a, this.bytes_to_int32(databytes, ptr + 20), 12);
                this.updateRun(a,b,c,d,this.fF(b, c, d), 0xa8304613, this.bytes_to_int32(databytes, ptr + 24), 17);
                this.updateRun(a,b,c,d,this.fF(b, c, d), 0xfd469501, this.bytes_to_int32(databytes, ptr + 28), 22);
                this.updateRun(a,b,c,d,this.fF(b, c, d), 0x698098d8, this.bytes_to_int32(databytes, ptr + 32), 7);
                this.updateRun(a,b,c,d,this.fF(b, c, d), 0x8b44f7af, this.bytes_to_int32(databytes, ptr + 36), 12);
                this.updateRun(a,b,c,d,this.fF(b, c, d), 0xffff5bb1, this.bytes_to_int32(databytes, ptr + 40), 17);
                this.updateRun(a,b,c,d,this.fF(b, c, d), 0x895cd7be, this.bytes_to_int32(databytes, ptr + 44), 22);
                this.updateRun(a,b,c,d,this.fF(b, c, d), 0x6b901122, this.bytes_to_int32(databytes, ptr + 48), 7);
                this.updateRun(a,b,c,d,this.fF(b, c, d), 0xfd987193, this.bytes_to_int32(databytes, ptr + 52), 12);
                this.updateRun(a,b,c,d,this.fF(b, c, d), 0xa679438e, this.bytes_to_int32(databytes, ptr + 56), 17);
                this.updateRun(a,b,c,d,this.fF(b, c, d), 0x49b40821, this.bytes_to_int32(databytes, ptr + 60), 22);
                this.updateRun(a,b,c,d,this.fG(b, c, d), 0xf61e2562, this.bytes_to_int32(databytes, ptr + 4), 5);
                this.updateRun(a,b,c,d,this.fG(b, c, d), 0xc040b340, this.bytes_to_int32(databytes, ptr + 24), 9);
                this.updateRun(a,b,c,d,this.fG(b, c, d), 0x265e5a51, this.bytes_to_int32(databytes, ptr + 44), 14);
                this.updateRun(a,b,c,d,this.fG(b, c, d), 0xe9b6c7aa, this.bytes_to_int32(databytes, ptr), 20);
                this.updateRun(a,b,c,d,this.fG(b, c, d), 0xd62f105d, this.bytes_to_int32(databytes, ptr + 20), 5);
                this.updateRun(a,b,c,d,this.fG(b, c, d), 0x2441453, this.bytes_to_int32(databytes, ptr + 40), 9);
                this.updateRun(a,b,c,d,this.fG(b, c, d), 0xd8a1e681, this.bytes_to_int32(databytes, ptr + 60), 14);
                this.updateRun(a,b,c,d,this.fG(b, c, d), 0xe7d3fbc8, this.bytes_to_int32(databytes, ptr + 16), 20);
                this.updateRun(a,b,c,d,this.fG(b, c, d), 0x21e1cde6, this.bytes_to_int32(databytes, ptr + 36), 5);
                this.updateRun(a,b,c,d,this.fG(b, c, d), 0xc33707d6, this.bytes_to_int32(databytes, ptr + 56), 9);
                this.updateRun(a,b,c,d,this.fG(b, c, d), 0xf4d50d87, this.bytes_to_int32(databytes, ptr + 12), 14);
                this.updateRun(a,b,c,d,this.fG(b, c, d), 0x455a14ed, this.bytes_to_int32(databytes, ptr + 32), 20);
                this.updateRun(a,b,c,d,this.fG(b, c, d), 0xa9e3e905, this.bytes_to_int32(databytes, ptr + 52), 5);
                this.updateRun(a,b,c,d,this.fG(b, c, d), 0xfcefa3f8, this.bytes_to_int32(databytes, ptr + 8), 9);
                this.updateRun(a,b,c,d,this.fG(b, c, d), 0x676f02d9, this.bytes_to_int32(databytes, ptr + 28), 14);
                this.updateRun(a,b,c,d,this.fG(b, c, d), 0x8d2a4c8a, this.bytes_to_int32(databytes, ptr + 48), 20);
                this.updateRun(a,b,c,d,this.fH(b, c, d), 0xfffa3942, this.bytes_to_int32(databytes, ptr + 20), 4);
                this.updateRun(a,b,c,d,this.fH(b, c, d), 0x8771f681, this.bytes_to_int32(databytes, ptr + 32), 11);
                this.updateRun(a,b,c,d,this.fH(b, c, d), 0x6d9d6122, this.bytes_to_int32(databytes, ptr + 44), 16);
                this.updateRun(a,b,c,d,this.fH(b, c, d), 0xfde5380c, this.bytes_to_int32(databytes, ptr + 56), 23);
                this.updateRun(a,b,c,d,this.fH(b, c, d), 0xa4beea44, this.bytes_to_int32(databytes, ptr + 4), 4);
                this.updateRun(a,b,c,d,this.fH(b, c, d), 0x4bdecfa9, this.bytes_to_int32(databytes, ptr + 16), 11);
                this.updateRun(a,b,c,d,this.fH(b, c, d), 0xf6bb4b60, this.bytes_to_int32(databytes, ptr + 28), 16);
                this.updateRun(a,b,c,d,this.fH(b, c, d), 0xbebfbc70, this.bytes_to_int32(databytes, ptr + 40), 23);
                this.updateRun(a,b,c,d,this.fH(b, c, d), 0x289b7ec6, this.bytes_to_int32(databytes, ptr + 52), 4);
                this.updateRun(a,b,c,d,this.fH(b, c, d), 0xeaa127fa, this.bytes_to_int32(databytes, ptr), 11);
                this.updateRun(a,b,c,d,this.fH(b, c, d), 0xd4ef3085, this.bytes_to_int32(databytes, ptr + 12), 16);
                this.updateRun(a,b,c,d,this.fH(b, c, d), 0x4881d05, this.bytes_to_int32(databytes, ptr + 24), 23);
                this.updateRun(a,b,c,d,this.fH(b, c, d), 0xd9d4d039, this.bytes_to_int32(databytes, ptr + 36), 4);
                this.updateRun(a,b,c,d,this.fH(b, c, d), 0xe6db99e5, this.bytes_to_int32(databytes, ptr + 48), 11);
                this.updateRun(a,b,c,d,this.fH(b, c, d), 0x1fa27cf8, this.bytes_to_int32(databytes, ptr + 60), 16);
                this.updateRun(a,b,c,d,this.fH(b, c, d), 0xc4ac5665, this.bytes_to_int32(databytes, ptr + 8), 23);
                this.updateRun(a,b,c,d,this.fI(b, c, d), 0xf4292244, this.bytes_to_int32(databytes, ptr), 6);
                this.updateRun(a,b,c,d,this.fI(b, c, d), 0x432aff97, this.bytes_to_int32(databytes, ptr + 28), 10);
                this.updateRun(a,b,c,d,this.fI(b, c, d), 0xab9423a7, this.bytes_to_int32(databytes, ptr + 56), 15);
                this.updateRun(a,b,c,d,this.fI(b, c, d), 0xfc93a039, this.bytes_to_int32(databytes, ptr + 20), 21);
                this.updateRun(a,b,c,d,this.fI(b, c, d), 0x655b59c3, this.bytes_to_int32(databytes, ptr + 48), 6);
                this.updateRun(a,b,c,d,this.fI(b, c, d), 0x8f0ccc92, this.bytes_to_int32(databytes, ptr + 12), 10);
                this.updateRun(a,b,c,d,this.fI(b, c, d), 0xffeff47d, this.bytes_to_int32(databytes, ptr + 40), 15);
                this.updateRun(a,b,c,d,this.fI(b, c, d), 0x85845dd1, this.bytes_to_int32(databytes, ptr + 4), 21);
                this.updateRun(a,b,c,d,this.fI(b, c, d), 0x6fa87e4f, this.bytes_to_int32(databytes, ptr + 32), 6);
                this.updateRun(a,b,c,d,this.fI(b, c, d), 0xfe2ce6e0, this.bytes_to_int32(databytes, ptr + 60), 10);
                this.updateRun(a,b,c,d,this.fI(b, c, d), 0xa3014314, this.bytes_to_int32(databytes, ptr + 24), 15);
                this.updateRun(a,b,c,d,this.fI(b, c, d), 0x4e0811a1, this.bytes_to_int32(databytes, ptr + 52), 21);
                this.updateRun(a,b,c,d,this.fI(b, c, d), 0xf7537e82, this.bytes_to_int32(databytes, ptr + 16), 6);
                this.updateRun(a,b,c,d,this.fI(b, c, d), 0xbd3af235, this.bytes_to_int32(databytes, ptr + 44), 10);
                this.updateRun(a,b,c,d,this.fI(b, c, d), 0x2ad7d2bb, this.bytes_to_int32(databytes, ptr + 8), 15);
                this.updateRun(a,b,c,d,this.fI(b, c, d), 0xeb86d391, this.bytes_to_int32(databytes, ptr + 36), 21);

                // update buffers
                h0 = this._add(h0, a);
                h1 = this._add(h1, b);
                h2 = this._add(h2, c);
                h3 = this._add(h3, d);

                // Done! Convert buffers to 128 bit (LE)
                return this.int128le_to_hex(h3, h2, h1, h0).toLowerCase();　
            }
        
    }
    // check input data type and perform conversions if needed

    public calMD5OfFile(filePath):string{
        return this.getFileMd5(jsb.fileUtils.getDataFromFile(filePath));
    }
    public _add(n1, n2) {
        return 0x0FFFFFFFF & (n1 + n2)
    }

    /**
     * 获取单例
     */
    static getInstance(): RuntimeMd5 {
        if (!RuntimeMd5._g_Instance) {
            RuntimeMd5._g_Instance = new RuntimeMd5();
        }
        return RuntimeMd5._g_Instance;
    }
}
