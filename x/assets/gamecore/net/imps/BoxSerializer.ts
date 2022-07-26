const { ccclass, property } = cc._decorator;

@ccclass
export class BoxSerializer{
    private MAGIC:number = 2037952207;
    private INT_SIZE:number = 4;
    private SHORT_SZIE = 2;

    constructor(){}

    public initHeader():any{
        let self = this;
        let header:any = {};
        header.magic = {value: self.MAGIC, length: self.INT_SIZE};
        header.version = {value: 0, length: self.SHORT_SZIE};
        header.flag = {value: 0, length: self.SHORT_SZIE};
        header.boxSize = {value: 0, length: self.INT_SIZE};
        header.cmd = {value: 0, length: self.INT_SIZE};
        header.ret = {value: 0, length: self.INT_SIZE};
        header.sn = {value: 0, length: self.INT_SIZE};

        return header;
    }

    public getHeaderPropertyList(){
        return ["magic", "version", "flag", "boxSize", "cmd", "ret", "sn"];
    }

    public packBox(cmd, sn, bodyArrayBuffer):ArrayBuffer{
        let self = this;

        let header = self.initHeader();

        header.cmd.value = cmd;
        header.sn.value = sn;
        //从500版本开始增加协议签名，flag使用二进制第二位
        header.flag.value = 0x02;
        let boxSize = self.getBoxSize(header, bodyArrayBuffer);
        header.boxSize.value = boxSize;

        //偏移量
        let pos = 0;

        let headerPropertyList = self.getHeaderPropertyList();

        //写入header
        let boxArrayBuffer = new ArrayBuffer(boxSize);
        let boxDataView = new DataView(boxArrayBuffer);
        let propLen = headerPropertyList.length;
        for(let i = 0; i < propLen; i++) {
            let propObj = header[headerPropertyList[i]];
            if (propObj.length === self.INT_SIZE) {
                boxDataView.setInt32(pos, propObj.value);
            } else if (propObj.length === self.SHORT_SZIE) {
                boxDataView.setInt16(pos, propObj.value);
            }
            pos += propObj.length;
        }

        //写入body
        let bodyBytes = new Uint8Array(bodyArrayBuffer);
        let bodyLength = bodyBytes.length;
        for(let i = 0; i < bodyLength; i++) {
            boxDataView.setUint8(pos, bodyBytes[i]);
            pos += 1;
        }

        return boxArrayBuffer;
    }

    public unpackBox(boxArrayBuffer):{cmd:number,ret:number,sn:number,body:Uint8Array}{
        let self = this;

        let header = self.initHeader();

        //偏移量
        let pos = 0;

        let headerPropertyList = self.getHeaderPropertyList();

        //先解码header
        let boxDataView = new DataView(boxArrayBuffer);
        let propLen = headerPropertyList.length;
        for(let i = 0; i < propLen; i++) {
            let propObj = header[headerPropertyList[i]];
            if (propObj.length === self.INT_SIZE) {
                propObj.value = boxDataView.getInt32(pos);
            } else if (propObj.length === self.SHORT_SZIE) {
                propObj.value = boxDataView.getInt16(pos);
            }
            pos += propObj.length;
        }

        //获取body
        let boxSize = header.boxSize.value;
        let headerSize = self.getHeaderSize(header);
        let bodyArrayBuffer = boxArrayBuffer.slice(headerSize, boxSize);

        let ret:any = {};
        ret.cmd = header.cmd.value;
        ret.ret = header.ret.value;
        ret.sn = header.sn.value;
        ret.body = bodyArrayBuffer;

        return ret;
    }

    private getBoxSize(header, bodyArrayBuffer):number{
        let self = this;
        let boxSize = self.getHeaderSize(header);

        if (bodyArrayBuffer) {
            boxSize += bodyArrayBuffer.byteLength;
        }

        return boxSize;
    }

    private getHeaderSize(header):number{
        let headerSize = 0;
        for(let prop in header) {
            headerSize += header[prop].length;
        }
        return headerSize;
    }

    public BoxSerializerUnitTest(){
        
        let self = this;
        //模拟发送数据
        let sendArrayBuffer = new ArrayBuffer(1024);
        let sendDataView = new DataView(sendArrayBuffer);
        let cmd = 1001;
        let sn = 1;
        let sendData = -100;
        sendDataView.setInt32(0, sendData);
        let boxArrayBuffer = self.packBox(cmd, sn, sendArrayBuffer);

        //模拟接收数据
        let data = self.unpackBox(boxArrayBuffer);
        let receiveDataView = new DataView(data.body);
        let receiveCmd = data.cmd;
        let receiveSn = data.sn;
        let receiveData = receiveDataView.getInt32(0);//临时修改

        //测试验证
        if (sendData === receiveData && cmd === receiveCmd && sn === receiveSn) {
            console.log("success!!!!", "raintian test");
        } else {
            console.log("fail!!!!", "raintian test");
        }

        // dump(data);
    }
}
