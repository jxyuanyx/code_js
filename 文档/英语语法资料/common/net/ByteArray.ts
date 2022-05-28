// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import cv from "../../components/lobby/cv";
const {ccclass, property} = cc._decorator;

@ccclass
export class ByteArray extends cc.Component {
    buffer:any;
    rpos:number;
    wpos:number;
    public createBuffer(size_or_buffer:any):void{
        if (size_or_buffer instanceof ArrayBuffer) {
            this.buffer = size_or_buffer;
        }
        else {
            this.buffer = new ArrayBuffer(size_or_buffer);
        }

        this.rpos = 0;
        this.wpos = 0;
    }
    public readInt8():number {
        var buf = new DataView(this.buffer);

        //var buf = new Int8Array(this.buffer, this.rpos, 1);
        this.rpos += 1;
        return buf.getInt8(this.rpos-1);
    }
    public readInt16():number{
        var v = this.readUint16();
        if (v >= 32768)
            v -= 65536;
        return v;
    }

    public readInt32():number {
        var buffers = this.buffer.slice(this.rpos, this.rpos + 4);
        var byteBuffer = cv.ByteBuffer.wrap(buffers, "utf8", cv.ByteBuffer.LITTLE_ENDIAN);
        var ret = byteBuffer.readInt32();
        this.rpos += 4;
        return ret;
    }

    public readInt64():number{
        var buffers = this.buffer.slice(this.rpos, this.rpos + 8);
        var byteBuffer = cv.ByteBuffer.wrap(buffers, "utf8", cv.ByteBuffer.LITTLE_ENDIAN);
        var ret = byteBuffer.readInt64();
        this.rpos += 8;
        return ret;
    }

    public readUint8():number {
        var buf = new DataView(this.buffer);
        //var buf = new Uint8Array(this.buffer, this.rpos, 1);
        this.rpos += 1;
        return buf.getUint8(this.rpos-1);
        //return buf[0];
    }

    public readUint16():number {
        var buf = new DataView(this.buffer);
        //var buf = new Uint8Array(this.buffer, this.rpos);
        this.rpos += 2;
        //return ((buf[1] & 0xff) << 8) + (buf[0] & 0xff);
        //return ((buf.getUint8(1) & 0xff) << 8) + (buf.getUint8(0) & 0xff);
        return buf.getUint16(this.rpos-2);
    }

    public readUint32():number {
        //console.log("this.rpos::" + this.rpos);
        var buf = new DataView(this.buffer);
        
        //var buffers = this.buffer.slice(this.rpos, this.rpos + 4);
        //var byteBuffer = cv.ByteBuffer.wrap(buffers, "utf8", cv.ByteBuffer.LITTLE_ENDIAN);
        //var ret = byteBuffer.readUint32();
        this.rpos += 4;
        //return ret;
        return buf.getUint32(this.rpos-4);
    }

    public readUint64():number {
        var buffers = this.buffer.slice(this.rpos, this.rpos + 8);
        var byteBuffer = cv.ByteBuffer.wrap(buffers, "utf8", cv.ByteBuffer.LITTLE_ENDIAN);
        var ret = byteBuffer.readUint64();
        this.rpos += 8;
        return ret;
    }

    public readFloat():number{
        try {
            var buf = new Float32Array(this.buffer, this.rpos, 1);
        }
        catch (e) {
            var buf = new Float32Array(this.buffer.slice(this.rpos, this.rpos + 4));
        }

        this.rpos += 4;
        return buf[0];
    }

    public readDouble():number {
        try {
            var buf = new Float64Array(this.buffer, this.rpos, 1);
        }
        catch (e) {
            var buf = new Float64Array(this.buffer.slice(this.rpos, this.rpos + 8), 0, 1);
        }

        this.rpos += 8;
        return buf[0];
    }

    public readString():string {
        var buf = new Uint8Array(this.buffer, this.rpos);
        var i = 0;
        var s = "";

        while (true) {
            if (buf[i] != 0) {
                s += String.fromCharCode(buf[i]);
            }
            else {
                i++;
                break;
            }

            i++;

            if (this.rpos + i >= this.buffer.byteLength)
                throw(new Error("KBEngine.MemoryStream::readString: rpos(" + (this.rpos + i) + ")>=" +
                    this.buffer.byteLength + " overflow!"));
        }

        this.rpos += i;
        return s;
    }

    public readBlob():any {
        let size = this.readUint32();
        var buf = new Uint8Array(this.buffer, this.rpos, size);
        this.rpos += size;
        return buf;
    }

    /*public readStream(): {
        var buf = new Uint8Array(this.buffer, this.rpos, this.buffer.byteLength - this.rpos);
        this.rpos = this.buffer.byteLength;
        return new KBEngine.MemoryStream(buf);
    }*/

    /*readPackXZ :function () {
        var xPackData = new KBEngine.MemoryStream.PackFloatXType();
        var zPackData = new KBEngine.MemoryStream.PackFloatXType();

        xPackData.fv[0] = 0.0;
        zPackData.fv[0] = 0.0;

        xPackData.uv[0] = 0x40000000;
        zPackData.uv[0] = 0x40000000;

        var v1 = this.readUint8();
        var v2 = this.readUint8();
        var v3 = this.readUint8();

        var data = 0;
        data |= (v1 << 16);
        data |= (v2 << 8);
        data |= v3;

        xPackData.uv[0] |= (data & 0x7ff000) << 3;
        zPackData.uv[0] |= (data & 0x0007ff) << 15;

        xPackData.fv[0] -= 2.0;
        zPackData.fv[0] -= 2.0;

        xPackData.uv[0] |= (data & 0x800000) << 8;
        zPackData.uv[0] |= (data & 0x000800) << 20;

        var data = new Array(2);
        data[0] = xPackData.fv[0];
        data[1] = zPackData.fv[0];
        return data;
    },*/

    public readPackY():number {
        var v = this.readUint16();
        return v;
    }

    //---------------------------------------------------------------------------------
    public writeInt8(v):void{
        var buf = new DataView(this.buffer);
        buf.setInt8(this.wpos,v);
        //var buf = new Int8Array(this.buffer, this.wpos, 1);
        //buf[0] = v;
        this.wpos += 1;
    }

    public writeInt16(v){
        this.writeInt8(v & 0xff);
        this.writeInt8(v >> 8 & 0xff);
    }

    public writeInt32(v) {
        for (let i = 0; i < 4; i++)
            this.writeInt8(v >> i * 8 & 0xff);
    }

    public writeInt64(v) {
        this.writeInt32(v.lo);
        this.writeInt32(v.hi);
    }

    public writeUint8(v) {
        var buf = new DataView(this.buffer);
        buf.setUint8(this.wpos,v);
        //var buf = new Uint8Array(this.buffer, this.wpos, 1);
        //buf[0] = v;
        this.wpos += 1;
    }

    public writeUint16(v) {
        var buf = new DataView(this.buffer);
        buf.setUint16(this.wpos,v,false);
        //this.writeUint8(v & 0xff);
        //this.writeUint8(v >> 8 & 0xff);
        this.wpos += 2;
    }

    public writeUint32(v) {
        var buf = new DataView(this.buffer);
        buf.setUint32(this.wpos,v,false);
        //for (i = 0; i < 4; i++)
            //this.writeUint8(v >> i * 8 & 0xff);
        this.wpos += 4;
    }

    public writeUint64(v) {
        this.writeUint32(v.lo);
        this.writeUint32(v.hi);
    }

    public writeFloat(v) {
        try {
            var buf = new Float32Array(this.buffer, this.wpos, 1);
            buf[0] = v;
        }
        catch (e) {
            var buf = new Float32Array(1);
            buf[0] = v;
            var buf1 = new Uint8Array(this.buffer);
            var buf2 = new Uint8Array(buf.buffer);
            buf1.set(buf2, this.wpos);
        }

        this.wpos += 4;
    }

    public writeDouble(v) {
        try {
            var buf = new Float64Array(this.buffer, this.wpos, 1);
            buf[0] = v;
        }
        catch (e) {
            var buf = new Float64Array(1);
            buf[0] = v;
            var buf1 = new Uint8Array(this.buffer);
            var buf2 = new Uint8Array(buf.buffer);
            buf1.set(buf2, this.wpos);
        }

        this.wpos += 8;
    }

    public writeBlob(v) {
        /*let size = v.length;
        if (size + 4 > this.space()) {
            KBEngine.ERROR_MSG("memorystream::writeBlob: no free!");
            return;
        }

        this.writeUint32(size);
        var buf = new Uint8Array(this.buffer, this.wpos, size);

        if (typeof(v) == "string") {
            for (i = 0; i < size; i++) {
                buf[i] = v.charCodeAt(i);
            }
        }
        else {
            for (i = 0; i < size; i++) {
                buf[i] = v[i];
            }
        }

        this.wpos += size;*/
    }

    public writeString(v:string) {
        if (v.length > this.space()) {
           // KBEngine.ERROR_MSG("memorystream::writeString: no free!");
            return;
        }

        var buf = new Uint8Array(this.buffer, this.wpos);
        var i = 0;
        for (var idx = 0; idx < v.length; idx++) {
            buf[i++] = v.charCodeAt(idx);
        }

        buf[i++] = 0;
        this.wpos += i;
    }


    public writeBuffer(buf){
        var ut8Buffer = new Uint8Array(this.buffer,this.wpos);
        var ut8BufferB = new Uint8Array(buf);
        for (var i = 0, len = ut8BufferB.length; i < len; ++i) {
	        ut8Buffer[i] = ut8BufferB[i];
        }
        this.wpos += ut8BufferB.length;
    }
    //---------------------------------------------------------------------------------
    public readSkip(v) {
        this.rpos += v;
    }

    //---------------------------------------------------------------------------------
    public space() {
        return this.buffer.byteLength - this.wpos;
    }

    //---------------------------------------------------------------------------------
    //this.length = function () {
       // return this.wpos - this.rpos;
    //}

    //---------------------------------------------------------------------------------
    public readEOF() {
        return this.buffer.byteLength - this.rpos <= 0;
    }

    //---------------------------------------------------------------------------------
    public done() {
        this.rpos = this.wpos;
    }

    public getrpos()
    {
        return this.rpos;
    }

    public getwpos()
    {
        return this.wpos;
    }

    public getbuffer():any {
        return this.buffer.slice(this.rpos, this.wpos);
    }

    public islittleEndian():boolean {
        var buffer = new ArrayBuffer(2);
        new DataView(buffer).setInt16(0, 256, true);
        var num = new Int16Array(buffer)[0];
        return num == 256;
    }
}
