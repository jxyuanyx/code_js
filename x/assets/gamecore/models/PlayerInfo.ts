export class PlayerInfo{
    userId:number;              //用户ID
    sex:number;                 //用户性别
    chips:number;               //金币
    giftId:number;              //礼物ID
    gameId:number;              //当前游戏ID
    roomType:number;            //房间类型
    roomId:number;              //房间ID
    diamonds:number;            //钻石
    iconUrl:string;             //头像
    nickName:string;            //名字
    online:boolean;             //是否在线
    otherInfo:Map<string,any>;  //其它信息
    sid:string;             //serveId
    seat:number;
}