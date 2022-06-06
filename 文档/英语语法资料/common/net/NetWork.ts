/**
 * 网络模块 消息的封包与解包
 * 
 * WebSocket在close的时候立即new 新的进行重连，这里需要把原来的侦听函数也一起置为null，
 * 在new 出新的websocket的时候，老的socket的close函数可能后面才收到close的回调会导至一些不该执行的函数执行了
 */
import { ByteArray } from "./ByteArray";
import cv from "../../components/lobby/cv";
import { aesHandler } from "../plugg/aesHandler";
import { HashMap } from "../tools/HashMap";
import { BitHandler } from "./BitHandler";
const { ccclass, property } = cc._decorator;

@ccclass
export class NetWork {
    public wSocket: WebSocket = null;                 //websocket实体
    public u32seq: number = null;               //消息序号
    public handlers: HashMap<number, HashMap<number, Function>> = new HashMap();        //所有消息的引用
    private headLen: number = 20;               //包头长度
    private toConnecting: boolean = false;         //主动连接中。 连接完成至为false
    public static instence: NetWork;            //单例
    private _xorValue: number = 0;

    //! 获取单例
    public static getInstance(): NetWork {
        if (!this.instence) {
            this.instence = new NetWork();
        }
        return this.instence;
    }

    //! websocket创建与连接
    public connectServer(): void {
        if (this.isConnecting()) {
            console.log("connect websocket =====> isConnecting...");
            return;
        }
        this.disconnect();
        cv.LoadingView.addHttpMsg("connectServer");
        //
        let self = this;

        let urlData = cv.domainMgr.getServerInfo();
        if (!urlData || !urlData.gate_server) {
            console.log("urlData is null");
            return;
        }
        //开始连接
        this.toConnecting = true;

        let url = urlData.gate_server;
        console.log("connect websocket url=====>  " + url);
        //wss开头的需要设置证书,ws的不需要
        if (url.indexOf("wss") == 0 && cc.sys.isNative) {
            this.wSocket = new WebSocket(url, 'chat', cc.url.raw("resources/ca/cacert.pem"));
        } else {
            this.wSocket = new WebSocket(url);
        }
        this.wSocket.binaryType = "arraybuffer";
        this.u32seq = 0;
        this.wSocket.onmessage = self.onmessage.bind(this);
        this.wSocket.onopen = function (event) {
            cv.LoadingView.removeHttpMsg("connectServer");
            cv.LoadingCommonView.hide();
            console.log("Send Text WS was opened.");
            //本次连接结束
            self.toConnecting = false;
            if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) {
                cv.cowboyNet.onConnectOpen();
            }
            else {
                cv.worldNet.onConnectOpen();
            }
        };

        this.wSocket.onerror = function (event) {
            console.log("Send Text fired an error");
            cv.LoadingView.clean();

            if (cv.config.GET_CLIENT_TYPE() == cv.Enum.ClientType.CowboyWeb) {
                cv.dataHandler.getUserData().m_bIsLoginServerSucc = false;
                cv.netWorkManager._isOpenSwitch = false;
                cv.netWorkManager.UpdateNetwork(0);
            }
            else {
                /**
                 * 只有从new websoket主动连接的时候触发的error才要回调cv.worldNet.onConnectError 说明此次连接失败了 让程序继续进行重连，
                 * 如果不是主动连接触发的error不回调onConnectError
                 * 非主动连接失败的情况有:
                 * 1,主动close有可能触发error
                 * 2,像切换wifi，锁屏，切后台这种都有可能导至error的触发，此时不应该发送error 让networkManager自已去栓查网络并进行重连
                 */
                if (self.toConnecting) {
                    cv.worldNet.onConnectError();
                }
            }
        };

        this.wSocket.onclose = function (event) {
            console.log("WebSocket instance closed.");
        };
    }

    //! 消息注册    
    public registerMsg(serverId: number, msgid: number, fn: any): void {
        let value: HashMap<number, Function> = this.handlers.get(serverId);
        if (!value) {
            this.handlers.add(serverId, new HashMap());
            value = this.handlers.get(serverId);
        }
        // if (value.get(msgid)) {
        //     console.log("msgid:" + msgid + "' handler has been registered.");
        //     return;
        // }
        value.add(msgid, fn);

        // console.log("register:msgid: " + msgid);
    }

    /**
     * 清理GameId的所有消息注册
     * @param serverId 对应的GameId
     */
    public unregisterMsgForGame(serverId: number) {
        let value: HashMap<number, Function> = this.handlers.get(serverId);
        if (value) {
            value.clear();
            this.handlers.remove(serverId);
        }
    }

    //! 消息发送 loading显示
    public sendMsg(pbbuf: any, msgid: number, Roomid: number, ServerType: number, ServerId: number): boolean {
        if (this.sendPackage(pbbuf, msgid, Roomid, ServerType, ServerId)) {
            cv.LoadingView.addWebSocketMsg(ServerId, msgid);
            return true;
        }
        else {
            console.log(ServerId + ": " + msgid + "消息发送失败!");
            return false;
        }
    }

    /**
     * 消息封包
     * @param pbbuf 数据
     * @param msgid 消息ID
     * @param Roomid 房间ID
     * @param ServerType 服务器类型 SeverType_World, SeverType_Game
     * @param ServerId 游戏服ID
     */
    public sendPackage(pbbuf: any, msgid: number, Roomid: number, ServerType: number, ServerId: number): boolean {
        let entryptStr;
        let isEncrypt: boolean = this.isEncrypt(ServerId);
        if (isEncrypt) {
            entryptStr = aesHandler.EncryptBytes(pbbuf);
        }
        let burffer = new ByteArray();
        burffer.createBuffer(1024);
        let u16PackLen = this.headLen + (isEncrypt ? entryptStr.length : (pbbuf == null ? 0 : pbbuf.byteLength));   //消息总长度
        let u16Msgid = msgid;                                                       //消息ID
        let u32playerid = cv.dataHandler.getUserData().user_id;                     //玩家ID
        let u32roomid = Roomid;                                                     //房间ID
        let u16serverType = ServerType;                                             //服务器类型
        let u16serverId = ServerId;                                                 //服务器ID
        burffer.writeUint16(u16serverType);
        burffer.writeUint16(u16serverId);
        burffer.writeUint16(u16PackLen);
        burffer.writeUint16(u16Msgid);
        burffer.writeUint32(this.u32seq);
        burffer.writeUint32(u32playerid);
        burffer.writeUint32(u32roomid);

        burffer.writeBuffer(isEncrypt ? entryptStr : pbbuf);
        burffer.wpos = u16PackLen;
        console.log("发包:====>> u16Msgid:" + u16Msgid + "   u16serverType:" + u16serverType + " u16serverId:" + u16serverId + " u16PackLen:" + u16PackLen + " U32seq:" + this.u32seq + " U32playerid:" + u32playerid + " U32roomid:" + u32roomid);
        return this.send(burffer.getbuffer());
    }

    //! 消息发送
    public send(data): boolean {
        if (!this.wSocket) return false;
        console.log("=====> wSocket.readyState  1111= " + this.wSocket.readyState);
        if (this.wSocket.readyState == WebSocket.OPEN) {
            this.wSocket.send(data);
            this.u32seq += 1;
            console.log("发包=====================:: " + "  u32seq:" + this.u32seq);
            return true;
        }
        return false;
    }


    //数据操作
    //opType: 操作类型 0、对指定数据进行异或操作 1、数据翻转 2、相邻两位数据互换 3、数据取反
    //bitSize: 当前数据操作位数 16 or 32
    //value： 操作数据值
    private getValueByOp(opType: number, bitSize: number, value: number): number {

        let _xorValue = this._xorValue;
        if (opType == 0) {  //不操作
            if (bitSize == 8) {
                return (value ^ _xorValue) & 0xff;
            } else if (bitSize == 16) {
                return (value ^ _xorValue) & 0xffff;
            } else if (bitSize == 32) {
                return value ^ _xorValue;
            }
        } else if (opType == 1) {  //数据位翻转
            return BitHandler.reverse_bits(value, bitSize);
        } else if (opType == 2) {  // 数据位相邻两位互换
            if (bitSize == 8) {
                return BitHandler.swapoddeven_8bits(value);
            } else if (bitSize == 16) {
                return BitHandler.swapoddeven_16bits(value);
            } else if (bitSize == 32) {
                return BitHandler.swapoddeven_32bits(value);
            }
        } else if (opType == 3) {  //对数据进行取反

            if (bitSize == 8) {
                return (~value) & 0xff;
            } else if (bitSize == 16) {
                return (~value) & 0xffff;
            } else if (bitSize == 32) {
                return ~value;
            }

        }
    }

    //解析数据协议
    //buffer:ByteArray操作对象
    //policyData1: 数据协议的前32位
    //policyData2: 数据头协议的后32位
    private parsePolicyData(buffer: ByteArray, policyData1: number, policyData2: number): number[] {
        //读取协议位
        let bitExtent = 32;
        let offset = 0;

        let retArray: number[] = [];
        let _MsgHeadMap: HashMap<number, number> = new HashMap();

        let _curPlicyData = policyData1;

        let msgHeaderFlag = BitHandler.readLeftBitFromByte(_curPlicyData, bitExtent, 8);  //读取8位协议位
        offset += 8;
        if (msgHeaderFlag != 0x8c && msgHeaderFlag != 0x7a) {
            console.log("Error: parsePolicyData error. unknow msgHeaderFlag:" + msgHeaderFlag);
            return retArray;
        }

        if (msgHeaderFlag == 0x7a) {  //如果操作值是0x7a 表示按照之前逻辑操作
            let U32serverType = buffer.readUint16();//服务器类型
            retArray[0] = U32serverType;
            let U32serverid = buffer.readUint16();//服务器ID
            retArray[1] = U32serverid;
            let u16PackLen = buffer.readUint16();
            retArray[2] = u16PackLen;
            let u16Msgid = buffer.readUint16();
            retArray[3] = u16Msgid;
            let u32seq = buffer.readUint32();
            retArray[4] = u32seq;
            let U32playerid = buffer.readUint32();
            retArray[5] = U32playerid;
            let U32roomid = buffer.readUint32();
            retArray[6] = U32roomid;
            return retArray;
        }

        //console.log("###################policyData1 2 :" + policyData1.toString(2));
        //console.log("###################policyData2 2 :" + policyData2.toString(2));
        let msgBitLen = BitHandler.getReadMidNumFromByte(_curPlicyData, bitExtent, offset, offset + 4);
        offset += 4;

        for (let i = 0; i < 7; i++) {
            let msgType = 0;
            let msgValue = 0;

            if (bitExtent - offset < msgBitLen) {  //如果当前位数不够了
                let _remainBit = BitHandler.readRightBitFromByte(_curPlicyData, bitExtent, bitExtent - offset);
                _curPlicyData = policyData2;
                let _feedBitLen = msgBitLen - (bitExtent - offset);
                let _feedBit = BitHandler.readLeftBitFromByte(_curPlicyData, bitExtent, _feedBitLen);
                msgType = BitHandler.concatBinaryNumber(_remainBit, _feedBit, _feedBitLen);
                offset = _feedBitLen;

            } else {
                msgType = BitHandler.getReadMidNumFromByte(_curPlicyData, bitExtent, offset, offset + msgBitLen);
                offset += msgBitLen;
            }

            if (bitExtent - offset < 2) {  //如果当前位数不够了
                let _remainBit = BitHandler.readRightBitFromByte(_curPlicyData, bitExtent, bitExtent - offset);
                _curPlicyData = policyData2;
                let _feedBitLen = 2 - (bitExtent - offset);
                let _feedBit = BitHandler.readLeftBitFromByte(_curPlicyData, bitExtent, _feedBitLen);
                msgValue = BitHandler.concatBinaryNumber(_remainBit, _feedBit, _feedBitLen);
                offset = _feedBitLen;
            } else {
                msgValue = BitHandler.getReadMidNumFromByte(_curPlicyData, bitExtent, offset, offset + 2);
                offset += 2;
            }

            if (offset >= bitExtent) {
                _curPlicyData = policyData2;
                offset = 0;
            }

            _MsgHeadMap.add(msgType, msgValue);
        }

        //跳过无效字节
        let slackByteLen = BitHandler.readRightBitFromByte(_curPlicyData, bitExtent, 3);
        for (let i = 0; i < slackByteLen; i++) {
            buffer.readUint8();
        }
        //根据消息字段对应操作类型 进行解析
        _MsgHeadMap.forEach(function (key: number, opValue: number, i: number) {
            switch (key) {
                case 0:
                    let U32serverType = buffer.readUint16();//服务器类型
                    retArray[0] = this.getValueByOp(opValue, 16, U32serverType);
                    break;

                case 1:
                    let U32serverid = buffer.readUint16();//服务器ID
                    retArray[1] = this.getValueByOp(opValue, 16, U32serverid);
                    break;

                case 2:
                    let u16PackLen = buffer.readUint16();
                    retArray[2] = this.getValueByOp(opValue, 16, u16PackLen);
                    break;

                case 3:
                    let u16Msgid = buffer.readUint16();  //消息id
                    retArray[3] = this.getValueByOp(opValue, 16, u16Msgid);
                    break;

                case 4:
                    let u32seq = buffer.readUint32();
                    retArray[4] = this.getValueByOp(opValue, 32, u32seq);
                    break;

                case 5:
                    let U32playerid = buffer.readUint32();  //playerid
                    retArray[5] = this.getValueByOp(opValue, 32, U32playerid);
                    break;

                case 6:
                    let U32roomid = buffer.readUint32(); //房间号
                    retArray[6] = this.getValueByOp(opValue, 32, U32roomid);
                    break;
            }
        }.bind(this));

        return retArray;
    }

    //! 消息接收，拆包
    public onmessage(msg: any): void {
        let burffer = new ByteArray();
        burffer.createBuffer(msg.data);
        burffer.wpos = msg.data.byteLength;


        let policyData1 = burffer.readUint32();
        let policyData2 = burffer.readUint32();
        this._xorValue = policyData2;
        let retHeaderArray: number[] = this.parsePolicyData(burffer, policyData1, policyData2);
        if (retHeaderArray.length < 1) {
            console.log("Error: onmessage retHeaderArray is null.");
            return;
        }
        let U32serverType = retHeaderArray[0];
        let U32serverid = retHeaderArray[1];
        let u16PackLen = retHeaderArray[2];
        let u16Msgid = retHeaderArray[3];
        let u32seq = retHeaderArray[4];
        let U32playerid = retHeaderArray[5];
        let U32roomid = retHeaderArray[6];


        console.log("收包:  u16Msgid:" + u16Msgid + "  U32serverid:" + U32serverid + "  U32serverType:" + U32serverType + "  u16PackLen:" + u16PackLen + "  u32seq:" + u32seq + "  U32playerid:" + U32playerid + "  U32roomid:" + U32roomid);
        console.log("收包=====================:: " + "  u32seq:" + u32seq);
        //！消息体
        let pbbuf = burffer.getbuffer();

        //!是否解密
        let decryptStr: Uint8Array;
        let isEncrypt: boolean = this.isEncrypt(U32serverid);

        if (isEncrypt) {
            decryptStr = aesHandler.DecryptBytes(pbbuf);
            console.log(decryptStr);
        } else {
            console.log(pbbuf);
        }

        //因为急速、必下消息分发回调都与德州Texas是一样的，都是根据德州Texsa，serverid绑定的。在搜索消息分发回调函数之前，将搜索的serverid设置为Texas的
        if (cv.roomManager.checkGameIsZoom(U32serverid)) {
            U32serverid = cv.Enum.GameId.Texas;
        }
        else if (U32serverid === cv.Enum.GameId.Bet
            || U32serverid === cv.Enum.GameId.StarSeat
            || U32serverid === cv.Enum.GameId.Plo) {
            U32serverid = cv.Enum.GameId.Texas;
        }

        //！消息分发
        let value: HashMap<number, Function> = this.handlers.get(U32serverid);
        if (value) {
            let func = value.get(u16Msgid);
            if (typeof func == "function") {
                // 测试环境不抛异常便于查找错误
                if (cv.config.GET_DEBUG_MODE() == 1) {
                    func(isEncrypt ? decryptStr : pbbuf, u16Msgid);
                } else {
                    try {
                        func(isEncrypt ? decryptStr : pbbuf, u16Msgid);
                    } catch (e) {
                        console.error("onmessage err:" + e);
                        return;
                    }
                }
                cv.LoadingView.removeWebSocketMsg(U32serverid, u16Msgid);
            }
            else {
                console.log("未注册消息id = " + u16Msgid);
            }
        }
        else {
            console.log("未注册游戏id = " + U32serverid);
        }
    }

    //! 主动断开，不走重连逻辑
    disconnect(): void {
        console.log('NetWork: disconnect close');
        this.close();
    }

    //! 关闭 websocket, 触发重连
    close(): void {
        console.log('NetWork:close');
        cv.LoadingView.clean();
        cv.dataHandler.getUserData().m_bIsLoginServerSucc = false;
        if (this.wSocket) {
            this.wSocket.close();
            this.wSocket.onopen = null;
            this.wSocket.onmessage = null;
            this.wSocket.onerror = null;
            this.wSocket.onclose = null;
            this.wSocket = null;
            this.u32seq = 0;
        }
    };

    //! websocket连接状态
    isConnect(): boolean {
        return (this.wSocket && this.wSocket.readyState == WebSocket.OPEN);
    }

    //! 是否在连接
    isConnecting(): boolean {
        return (this.wSocket && this.wSocket.readyState == WebSocket.CONNECTING);
    }

    //！是否需要加密
    isEncrypt(serverId: number): boolean {
        let arr = cv.dataHandler.getUserData().isEncrypt;
        let len = cv.StringTools.getArrayLength(arr);

        if (cv.roomManager.checkGameIsZoom(serverId)) {  //急速房间
            for (let i = cv.Enum.GameId.ZoomTexas; i <= cv.Enum.GameId.ZoomTexasMax; i++) {
                for (let j = 0; j < len; j++) {
                    if (i == arr[j]) {
                        return true;
                    }
                }
            }
        } else {
            for (let i = 0; i < len; i++) {
                if (serverId == arr[i]) {
                    return true;
                }
            }
        }


        return false;
    }
}
